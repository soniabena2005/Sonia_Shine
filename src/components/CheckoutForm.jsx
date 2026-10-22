import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { placeOrder, backToCart, selectTotal } from "../store/cartSlice";
import { formatPrice } from "../data/products";

export default function CheckoutForm() {
  const dispatch = useDispatch();
  const total = useSelector(selectTotal);

  const [form, setForm] = useState({ name: "", phone: "", address: "" });
  const [errors, setErrors] = useState({});

  const update = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  function validate() {
    const e = {};
    if (form.name.trim().length < 3) e.name = "Enter your full name.";
    if (!/^0[567]\d{8}$/.test(form.phone.replace(/\s/g, ""))) e.phone = "Enter a valid number, like 0555 12 34 56.";
    if (form.address.trim().length < 8) e.address = "Enter your full delivery address.";
    return e;
  }

  function handleSubmit(ev) {
    ev.preventDefault();
    const e = validate();
    setErrors(e);
    if (Object.keys(e).length === 0) {
      dispatch(placeOrder({ name: form.name.trim(), phone: form.phone.trim(), address: form.address.trim() }));
    }
  }

  return (
    <form className="checkout" onSubmit={handleSubmit} noValidate>
      <p className="checkout-total">Order total <strong>{formatPrice(total)}</strong></p>

      <label>Full name
        <input name="name" value={form.name} onChange={update} autoComplete="name" />
        {errors.name && <span className="error">{errors.name}</span>}
      </label>
      <label>Phone number
        <input name="phone" value={form.phone} onChange={update} inputMode="tel" autoComplete="tel" />
        {errors.phone && <span className="error">{errors.phone}</span>}
      </label>
      <label>Delivery address
        <textarea name="address" rows="3" value={form.address} onChange={update} autoComplete="street-address" />
        {errors.address && <span className="error">{errors.address}</span>}
      </label>

      <button className="btn" type="submit">Place my order</button>
      <button className="btn ghost" type="button" onClick={() => dispatch(backToCart())}>Back to cart</button>
    </form>
  );
}
