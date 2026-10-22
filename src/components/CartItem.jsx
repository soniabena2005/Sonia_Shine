import { useDispatch } from "react-redux";
import { increaseQuantity, decreaseQuantity, removeFromCart } from "../store/cartSlice";
import { formatPrice } from "../data/products";

export default function CartItem({ item }) {
  const dispatch = useDispatch();
  return (
    <li className="cart-item">
      <img src={item.image} alt="" />
      <div className="cart-info">
        <strong>{item.name}</strong>
        <span>{formatPrice(item.price * item.quantity)}</span>
        <div className="qty">
          <button aria-label="Decrease quantity" onClick={() => dispatch(decreaseQuantity(item.id))}>−</button>
          <span>{item.quantity}</span>
          <button aria-label="Increase quantity" onClick={() => dispatch(increaseQuantity(item.id))}>+</button>
        </div>
      </div>
      <button className="remove" onClick={() => dispatch(removeFromCart(item.id))}>Remove</button>
    </li>
  );
}
