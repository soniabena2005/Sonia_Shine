# Sonia Shine

**Student name:** _Your name here_

## Description
Sonia Shine is an online boutique for gold accessories made of stainless steel (acier inoxydable): necklaces, earrings, bracelets, rings, watches, sets and headbands. Visitors browse the collection, search and filter it, fill a cart, and order by entering their name, phone number and address. After the order, they see a thank-you message saying the shop will contact them soon.

Built for the WAMD TD-TP 2 lab. There is no backend: orders are kept in the Redux store for the current session only.

## Technologies
React 18, JSX, JavaScript (ES6+), Redux Toolkit, React-Redux, Vite, Node.js / npm.

## Main React components
| Component | Role |
|---|---|
| `App` | Page layout |
| `Header` | Brand name, link to the shop, cart button with live item count |
| `Hero` | Welcome section describing the boutique |
| `ProductList` | Search box, category filter (local state), product grid |
| `ProductCard` | One product; receives `product` as a prop; dispatches `addToCart` |
| `ProductModal` | Product detail view: large photo with click-to-zoom, price, description, add to cart / buy now |
| `ReviewSection` | Rating summary, list of customer reviews, form to post a review |
| `Stars` | Read-only star display and clickable star input |
| `Cart` | Side panel with three steps: cart, details form, thank-you message |
| `CartItem` | One cart line with quantity controls and remove button |
| `CheckoutForm` | Name / phone / address form with validation (local state) |

## Redux state
```js
{ cart: {
    items: [{ id, name, price, image, quantity }],
    isOpen: boolean,
    step: "cart" | "checkout" | "done",
    orders: [{ id, customer: { name, phone, address }, items, total }],
    lastOrder: order | null
  },
  product: { selectedId: number | null },
  reviews: { byProduct: { [productId]: [{ id, name, rating, comment, date }] } }
}
```
- **Actions / reducers** (`src/store/cartSlice.js`): `addToCart`, `removeFromCart`, `increaseQuantity`, `decreaseQuantity`, `clearCart`, `openCart`, `closeCart`, `goToCheckout`, `backToCart`, `placeOrder`
- **Product view** (`src/store/productSlice.js`): `openProduct`, `closeProduct`
- **Reviews** (`src/store/reviewsSlice.js`): `addReview`, plus `selectReviews` and `summarize` for the average and rating bars
- **Selectors:** `selectItems`, `selectCount`, `selectTotal`
- **Store:** `src/store/store.js`, provided to the app with `<Provider>` in `main.jsx`

The reviews shown at the start are sample data. Local React state (`useState`) is used for the search text, the category filter, the zoom of the product photo, the review form, the "Added" button feedback and the checkout form fields.

## Features
Required: product catalog, add and remove from cart, live updates, Redux store, actions, reducers, React-Redux hooks.
Extra: product detail view with zoom, customer reviews and ratings, search, category filter, quantity management, cart total, order form with validation (Algerian phone format), thank-you message, responsive layout.

## Run the app
```bash
npm install
npm run dev
```
Then open the URL shown in the terminal (usually http://localhost:5173).

## Screenshots
_Add screenshots here: home page, collection, cart, order form, thank-you message._
