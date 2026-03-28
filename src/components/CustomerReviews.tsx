import './CustomerReviews.css';

const reviews = [
  {
    id: 1,
    name: "Sarah Jenkins",
    rating: 5,
    date: "2 Days ago",
    comment: "Absolutely love the fast delivery and the quality of the products. FlipMini has become my go-to for quick e-commerce purchases. Highly recommended!"
  },
  {
    id: 2,
    name: "Michael Chen",
    rating: 4,
    date: "1 Week ago",
    comment: "The UI is incredibly sleek and responsive. Everything feels snappy. I just wish there were slightly more products available in the tech category."
  },
  {
    id: 3,
    name: "Priya Sharma",
    rating: 5,
    date: "2 Weeks ago",
    comment: "Fantastic experience all around. Finding items with the search bar is super quick, and returning an item was hassle-free. Five stars from me."
  }
];

export default function CustomerReviews() {
  return (
    <section className="reviews-section">
      <div className="reviews-header">
        <h2 className="reviews-title">What Our Customers Say</h2>
        <p className="reviews-subtitle">Real reviews from our trusted community.</p>
      </div>
      
      <div className="reviews-grid">
        {reviews.map(review => (
          <div key={review.id} className="review-card">
            <div className="review-header">
              <div className="review-avatar">
                {review.name.charAt(0)}
              </div>
              <div className="review-meta">
                <h4 className="review-name">{review.name}</h4>
                <div className="review-rating">
                  {'★'.repeat(review.rating)}{'☆'.repeat(5 - review.rating)}
                </div>
              </div>
            </div>
            <p className="review-comment">"{review.comment}"</p>
            <span className="review-date">{review.date}</span>
          </div>
        ))}
      </div>
    </section>
  );
}
