import { useState } from "react";
import ProductCard from "./ProductCard";
import { products, categories } from "../data/products";

export default function ProductList() {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("All");

  const visible = products.filter(
    (p) =>
      (category === "All" || p.category === category) &&
      p.name.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <section id="shop" className="shop">
      <h2 className="section-title">The collection</h2>
      <div className="toolbar">
        <input
          type="search"
          placeholder="Search accessories"
          aria-label="Search accessories"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <div className="chips">
          {categories.map((c) => (
            <button
              key={c}
              className={"chip" + (c === category ? " active" : "")}
              onClick={() => setCategory(c)}
            >
              {c}
            </button>
          ))}
        </div>
      </div>
      {visible.length === 0 ? (
        <p className="empty">Nothing matches your search. Try another word or category.</p>
      ) : (
        <div className="grid">
          {visible.map((p) => <ProductCard key={p.id} product={p} />)}
        </div>
      )}
    </section>
  );
}
