import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { closeProduct } from "../store/productSlice";
import { addToCart, openCart } from "../store/cartSlice";
import { selectReviews, summarize } from "../store/reviewsSlice";
import { products, formatPrice } from "../data/products";
import { Stars } from "./Stars";
import ReviewSection from "./ReviewSection";

export default function ProductModal() {
  const dispatch = useDispatch();
  const selectedId = useSelector((s) => s.product.selectedId);
  const reviews = useSelector(selectReviews(selectedId));
  const product = products.find((p) => p.id === selectedId);

  const [zoom, setZoom] = useState(false);
  const [origin, setOrigin] = useState("50% 50%");
  const [added, setAdded] = useState(false);

  useEffect(() => {
    if (!product) return undefined;
    setZoom(false);
    setAdded(false);
    const onKey = (e) => { if (e.key === "Escape") dispatch(closeProduct()); };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [product, dispatch]);

  if (!product) return null;

  const { count, average } = summarize(reviews);

  function moveOrigin(e) {
    const box = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - box.left) / box.width) * 100;
    const y = ((e.clientY - box.top) / box.height) * 100;
    setOrigin(`${x}% ${y}%`);
  }

  function handleAdd() {
    dispatch(addToCart(product));
    setAdded(true);
    setTimeout(() => setAdded(false), 1200);
  }

  function handleBuy() {
    dispatch(addToCart(product));
    dispatch(closeProduct());
    dispatch(openCart());
  }

  return (
    <div className="modal-backdrop" onClick={() => dispatch(closeProduct())}>
      <div
        className="modal"
        role="dialog"
        aria-modal="true"
        aria-label={product.name}
        onClick={(e) => e.stopPropagation()}
      >
        <button className="modal-close" aria-label="Close" onClick={() => dispatch(closeProduct())}>✕</button>

        <div className="modal-top">
          <div
            className={"zoom-box" + (zoom ? " zoomed" : "")}
            onClick={(e) => { moveOrigin(e); setZoom(!zoom); }}
            onMouseMove={(e) => { if (zoom) moveOrigin(e); }}
          >
            <img
              src={product.image}
              alt={product.name}
              style={{ transform: zoom ? "scale(2.2)" : "scale(1)", transformOrigin: origin }}
            />
            <span className="zoom-hint">{zoom ? "Click to zoom out" : "Click to zoom in"}</span>
          </div>

          <div className="modal-info">
            <p className="card-cat">{product.category}</p>
            <h2>{product.name}</h2>
            <div className="rating-line">
              <Stars value={average} />
              <span>{count > 0 ? `${average.toFixed(1)} (${count} review${count > 1 ? "s" : ""})` : "No reviews yet"}</span>
            </div>
            <p className="modal-price">{formatPrice(product.price)}</p>
            <p>{product.desc}</p>
            <ul className="facts">
              <li>Stainless steel (acier inoxydable)</li>
              <li>Gold finish</li>
              <li>Delivered to your address, we call you to confirm</li>
            </ul>
            <div className="modal-actions">
              <button className={"btn" + (added ? " added" : "")} onClick={handleAdd}>
                {added ? "Added" : "Add to cart"}
              </button>
              <button className="btn ghost" onClick={handleBuy}>Buy now</button>
            </div>
          </div>
        </div>

        <ReviewSection productId={product.id} />
      </div>
    </div>
  );
}
