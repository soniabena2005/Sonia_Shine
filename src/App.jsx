import Header from "./components/Header";
import Hero from "./components/Hero";
import ProductList from "./components/ProductList";
import ProductModal from "./components/ProductModal";
import Cart from "./components/Cart";

export default function App() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <ProductList />
      </main>
      <footer className="footer">
        <strong>Sonia Shine</strong>
        <span>Stainless steel accessories, delivered to your door.</span>
      </footer>
      <ProductModal />
      <Cart />
    </>
  );
}
