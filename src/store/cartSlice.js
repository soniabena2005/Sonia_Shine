import { createSlice } from "@reduxjs/toolkit";

const initialState = { items: [], isOpen: false, step: "cart", orders: [], lastOrder: null };

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart(state, action) {
      const p = action.payload;
      const existing = state.items.find((i) => i.id === p.id);
      if (existing) existing.quantity += 1;
      else state.items.push({ id: p.id, name: p.name, price: p.price, image: p.image, quantity: 1 });
    },
    removeFromCart(state, action) {
      state.items = state.items.filter((i) => i.id !== action.payload);
    },
    increaseQuantity(state, action) {
      const item = state.items.find((i) => i.id === action.payload);
      if (item) item.quantity += 1;
    },
    decreaseQuantity(state, action) {
      const item = state.items.find((i) => i.id === action.payload);
      if (!item) return;
      if (item.quantity > 1) item.quantity -= 1;
      else state.items = state.items.filter((i) => i.id !== item.id);
    },
    clearCart(state) {
      state.items = [];
    },
    openCart(state) {
      state.isOpen = true;
    },
    closeCart(state) {
      state.isOpen = false;
      if (state.step === "done") { state.step = "cart"; state.lastOrder = null; }
      else if (state.step === "checkout") state.step = "cart";
    },
    goToCheckout(state) {
      if (state.items.length > 0) state.step = "checkout";
    },
    backToCart(state) {
      state.step = "cart";
    },
    placeOrder(state, action) {
      const order = {
        id: Date.now(),
        customer: action.payload,
        items: state.items,
        total: state.items.reduce((t, i) => t + i.price * i.quantity, 0),
      };
      state.orders.push(order);
      state.lastOrder = order;
      state.items = [];
      state.step = "done";
    },
  },
});

export const {
  addToCart, removeFromCart, increaseQuantity, decreaseQuantity, clearCart,
  openCart, closeCart, goToCheckout, backToCart, placeOrder,
} = cartSlice.actions;

export const selectItems = (s) => s.cart.items;
export const selectCount = (s) => s.cart.items.reduce((n, i) => n + i.quantity, 0);
export const selectTotal = (s) => s.cart.items.reduce((t, i) => t + i.price * i.quantity, 0);

export default cartSlice.reducer;
