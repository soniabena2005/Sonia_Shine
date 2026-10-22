import { createSlice } from "@reduxjs/toolkit";

const productSlice = createSlice({
  name: "product",
  initialState: { selectedId: null },
  reducers: {
    openProduct(state, action) {
      state.selectedId = action.payload;
    },
    closeProduct(state) {
      state.selectedId = null;
    },
  },
});

export const { openProduct, closeProduct } = productSlice.actions;
export default productSlice.reducer;
