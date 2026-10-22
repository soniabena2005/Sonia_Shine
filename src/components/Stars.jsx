export function Stars({ value, className = "" }) {
  const filled = Math.round(value);
  return (
    <span className={"stars " + className} role="img" aria-label={`${value.toFixed(1)} out of 5`}>
      {[1, 2, 3, 4, 5].map((n) => (
        <span key={n} className={n <= filled ? "star on" : "star"}>★</span>
      ))}
    </span>
  );
}

export function StarInput({ value, onChange }) {
  return (
    <div className="star-input" role="radiogroup" aria-label="Your rating">
      {[1, 2, 3, 4, 5].map((n) => (
        <button
          key={n}
          type="button"
          role="radio"
          aria-checked={n === value}
          aria-label={`${n} star${n > 1 ? "s" : ""}`}
          className={n <= value ? "star on" : "star"}
          onClick={() => onChange(n)}
        >
          ★
        </button>
      ))}
    </div>
  );
}
