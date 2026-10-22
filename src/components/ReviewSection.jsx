import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addReview, selectReviews, summarize } from "../store/reviewsSlice";
import { Stars, StarInput } from "./Stars";

export default function ReviewSection({ productId }) {
  const dispatch = useDispatch();
  const reviews = useSelector(selectReviews(productId));
  const { count, average, counts } = summarize(reviews);

  const [name, setName] = useState("");
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const [errors, setErrors] = useState({});
  const [sent, setSent] = useState(false);

  function handleSubmit(e) {
    e.preventDefault();
    const found = {};
    if (name.trim().length < 2) found.name = "Enter your name.";
    if (rating === 0) found.rating = "Choose a rating.";
    if (comment.trim().length < 5) found.comment = "Write a short comment.";
    setErrors(found);
    if (Object.keys(found).length > 0) return;
    dispatch(addReview(productId, name.trim(), rating, comment.trim()));
    setName("");
    setRating(0);
    setComment("");
    setSent(true);
  }

  return (
    <section className="reviews" aria-labelledby="reviews-title">
      <h3 id="reviews-title">Customer reviews</h3>

      {count === 0 ? (
        <p className="empty">No reviews yet. Be the first to share your opinion.</p>
      ) : (
        <div className="summary">
          <div className="summary-score">
            <strong>{average.toFixed(1)}</strong>
            <Stars value={average} />
            <span>{count} review{count > 1 ? "s" : ""}</span>
          </div>
          <ul className="bars">
            {[5, 4, 3, 2, 1].map((n) => (
              <li key={n}>
                <span>{n} ★</span>
                <div className="bar"><div style={{ width: `${(counts[n - 1] / count) * 100}%` }} /></div>
                <span>{counts[n - 1]}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      <ul className="review-list">
        {reviews.map((r) => (
          <li key={r.id} className="review">
            <div className="avatar" aria-hidden="true">{r.name.charAt(0).toUpperCase()}</div>
            <div>
              <div className="review-head">
                <strong>{r.name}</strong>
                <Stars value={r.rating} />
                <span className="review-date">{r.date}</span>
              </div>
              <p>{r.comment}</p>
            </div>
          </li>
        ))}
      </ul>

      <form className="review-form" onSubmit={handleSubmit} noValidate>
        <h4>Write a review</h4>
        {sent && <p className="sent" role="status">Thank you, your review has been added.</p>}
        <label>Your name
          <input value={name} onChange={(e) => { setName(e.target.value); setSent(false); }} />
          {errors.name && <span className="error">{errors.name}</span>}
        </label>
        <div>
          <span className="label-text">Your rating</span>
          <StarInput value={rating} onChange={(n) => { setRating(n); setSent(false); }} />
          {errors.rating && <span className="error">{errors.rating}</span>}
        </div>
        <label>Your comment
          <textarea rows="3" value={comment} onChange={(e) => { setComment(e.target.value); setSent(false); }} />
          {errors.comment && <span className="error">{errors.comment}</span>}
        </label>
        <button className="btn" type="submit">Post my review</button>
      </form>
    </section>
  );
}
