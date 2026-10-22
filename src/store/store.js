import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./cartSlice";
import productReducer from "./productSlice";
import reviewsReducer from "./reviewsSlice";

const store = configureStore({
  reducer: {
    cart: cartReducer,
    product: productReducer,
    reviews: reviewsReducer,
  },
});

export default store;
