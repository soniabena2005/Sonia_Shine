import { useDispatch, useSelector } from "react-redux";
import { openCart, selectCount } from "../store/cartSlice";

export default function Header() {
  const dispatch = useDispatch();
  const count = useSelector(selectCount);
  return (
    <header className="header">
      <a href="#top" className="logo">Sonia Shine</a>
      <nav className="nav">
        <a href="#shop">Shop</a>
        <button className="cart-btn" onClick={() => dispatch(openCart())}>
          Cart <b className="badge">{count}</b>
        </button>
      </nav>
    </header>
  );
}
