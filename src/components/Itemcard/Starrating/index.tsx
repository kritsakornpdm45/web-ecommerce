interface StarRatingProps {
  rating: number
}

// Star rating component with SVG stars
export default function StarRating({ rating }: StarRatingProps) {
  return (
    <div className="flex">
      {[1, 2, 3, 4, 5].map((star) => (
        <div key={star} className="w-4 h-4 relative">
          {/* Empty star (always shown) */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            className="w-4 h-4 absolute text-yellow-400"
          >
            <polygon
              points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"
              strokeWidth="2"
              fill="none"
            />
          </svg>

          {/* Full/partial star overlay */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            className="w-4 h-4 absolute text-yellow-400"
            style={{
              clipPath: `inset(0 ${
                star > Math.floor(rating) ? (star - 0.5 <= rating ? '50%' : '100%') : '0%'
              } 0 0)`,
            }}
          >
            <polygon
              points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"
              fill="currentColor"
            />
          </svg>
        </div>
      ))}
      <span className="text-gray-500 text-sm ml-1">{rating}/5</span>
    </div>
  )
}
