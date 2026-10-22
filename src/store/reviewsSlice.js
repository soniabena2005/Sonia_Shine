import { createSlice } from "@reduxjs/toolkit";

const EMPTY = [];

const sampleReviews = {
  1: [
    { id: 101, name: "Amina B.", rating: 5, comment: "Very pretty and delicate. The blue charm looks exactly like the photo.", date: "12/09/2026" },
    { id: 102, name: "Lina K.", rating: 4, comment: "Nice chain, a little short for me but I wear it as a choker.", date: "03/10/2026" },
  ],
  2: [
    { id: 103, name: "Sarah M.", rating: 5, comment: "I love wearing the three together, the stone is very sparkly.", date: "28/09/2026" },
    { id: 104, name: "Meriem H.", rating: 5, comment: "Great value for three necklaces.", date: "15/09/2026" },
    { id: 105, name: "Yasmine D.", rating: 4, comment: "Good quality. They tangle sometimes so I keep them apart.", date: "05/10/2026" },
  ],
  3: [
    { id: 106, name: "Nesrine A.", rating: 5, comment: "Cute and light, perfect for every day.", date: "20/09/2026" },
  ],
  4: [
    { id: 107, name: "Ines R.", rating: 5, comment: "Beautiful hoops, the crystals shine in the light.", date: "01/10/2026" },
    { id: 108, name: "Amel T.", rating: 4, comment: "Slightly small but lovely.", date: "18/09/2026" },
  ],
  6: [
    { id: 109, name: "Rania S.", rating: 5, comment: "Everyone asks me where I got it.", date: "09/10/2026" },
    { id: 110, name: "Camelia Z.", rating: 4, comment: "The charms are cute and the clasp is easy to use.", date: "22/09/2026" },
  ],
  10: [
    { id: 111, name: "Selma O.", rating: 5, comment: "Elegant watch, looks great on a small wrist.", date: "07/10/2026" },
    { id: 112, name: "Hadjer L.", rating: 4, comment: "Beautiful and light.", date: "25/09/2026" },
  ],
  11: [
    { id: 113, name: "Aya F.", rating: 5, comment: "The sun pendant is bigger than I expected, in a good way.", date: "11/10/2026" },
  ],
  14: [
    { id: 114, name: "Wafa N.", rating: 4, comment: "I bought both colors, the brown one goes with everything.", date: "30/09/2026" },
  ],
  15: [
    { id: 115, name: "Khadidja M.", rating: 5, comment: "Very feminine and easy to match.", date: "14/10/2026" },
  ],
  16: [
    { id: 116, name: "Dounia C.", rating: 5, comment: "Nice set, the bracelet and the watch look good together.", date: "16/10/2026" },
  ],
};

const reviewsSlice = createSlice({
  name: "reviews",
  initialState: { byProduct: sampleReviews },
  reducers: {
    addReview: {
      reducer(state, action) {
        const { productId, ...review } = action.payload;
        if (!state.byProduct[productId]) state.byProduct[productId] = [];
        state.byProduct[productId].unshift(review);
      },
      prepare(productId, name, rating, comment) {
        return {
          payload: {
            productId,
            id: Date.now(),
            name,
            rating,
            comment,
            date: new Date().toLocaleDateString("fr-FR"),
          },
        };
      },
    },
  },
});

export const { addReview } = reviewsSlice.actions;

export const selectReviews = (productId) => (state) =>
  state.reviews.byProduct[productId] ?? EMPTY;

export function summarize(list) {
  const counts = [0, 0, 0, 0, 0];
  list.forEach((r) => { counts[r.rating - 1] += 1; });
  const count = list.length;
  const average = count ? list.reduce((t, r) => t + r.rating, 0) / count : 0;
  return { count, average, counts };
}

export default reviewsSlice.reducer;
