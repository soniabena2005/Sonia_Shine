import { useDispatch, useSelector } from "react-redux";
import { selectItems, selectTotal, clearCart, closeCart, goToCheckout } from "../store/cartSlice";
import CartItem from "./CartItem";
import CheckoutForm from "./CheckoutForm";
import { formatPrice } from "../data/products";

export default function Cart() {
  const dispatch = useDispatch();
  const items = useSelector(selectItems);
  const total = useSelector(selectTotal);
  const { isOpen, step, lastOrder } = useSelector((s) => s.cart);

  const title = step === "checkout" ? "Your details" : step === "done" ? "Order received" : "Your cart";

  return (
    <>
      {isOpen && <div className="overlay" onClick={() => dispatch(closeCart())} />}
      <aside className={"cart" + (isOpen ? " open" : "")} aria-label="Shopping cart">
        <div className="cart-head">
          <h2>{title}</h2>
          <button className="close" aria-label="Close" onClick={() => dispatch(closeCart())}>✕</button>
        </div>

        {step === "done" && lastOrder && (
          <div className="thanks">
            <h3>Thank you, {lastOrder.customer.name}!</h3>
            <p>Your order of {formatPrice(lastOrder.total)} has been received. We will contact you soon on {lastOrder.customer.phone} to confirm it.</p>
            <button className="btn" onClick={() => dispatch(closeCart())}>Continue shopping</button>
          </div>
        )}

        {step === "checkout" && <CheckoutForm />}

        {step === "cart" && (items.length === 0 ? (
          <p className="empty">Your cart is empty. Add an accessory to get started.</p>
        ) : (
          <>
            <ul className="cart-list">
              {items.map((i) => <CartItem key={i.id} item={i} />)}
            </ul>
            <div className="cart-foot">
              <div className="total"><span>Total</span><strong>{formatPrice(total)}</strong></div>
              <button className="btn" onClick={() => dispatch(goToCheckout())}>Buy now</button>
              <button className="btn ghost" onClick={() => dispatch(clearCart())}>Empty cart</button>
            </div>
          </>
        ))}
      </aside>
    </>
  );
}
