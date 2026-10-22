import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../store/cartSlice";
import { openProduct } from "../store/productSlice";
import { selectReviews, summarize } from "../store/reviewsSlice";
import { formatPrice } from "../data/products";
import { Stars } from "./Stars";

export default function ProductCard({ product }) {
  const dispatch = useDispatch();
  const reviews = useSelector(selectReviews(product.id));
  const { count, average } = summarize(reviews);
  const [added, setAdded] = useState(false);

  function handleAdd() {
    dispatch(addToCart(product));
    setAdded(true);
    setTimeout(() => setAdded(false), 1200);
  }

  return (
    <article className="card">
      <button
        className="card-img"
        aria-label={`View ${product.name}`}
        onClick={() => dispatch(openProduct(product.id))}
      >
        <img src={product.image} alt="" loading="lazy" />
        <span className="card-view">View details</span>
      </button>
      <div className="card-body">
        <p className="card-cat">{product.category}</p>
        <h3>
          <button className="link-btn" onClick={() => dispatch(openProduct(product.id))}>
            {product.name}
          </button>
        </h3>
        <div className="rating-line small">
          <Stars value={average} />
          <span>{count > 0 ? `(${count})` : "No reviews"}</span>
        </div>
        <p className="card-desc">{product.desc}</p>
        <div className="card-foot">
          <strong>{formatPrice(product.price)}</strong>
          <button className={"btn small" + (added ? " added" : "")} onClick={handleAdd}>
            {added ? "Added" : "Add to cart"}
          </button>
        </div>
      </div>
    </article>
  );
}
