'use client'
import { useState } from 'react'
import StarRating from '@/components/Itemcard/Starrating/index'

interface ItemCardProps {
  name?: string
  price?: number
  originalPrice?: number | null
  discount?: number | null
  rating?: number
  image?: string
  onClick?: () => void
  className?: string
  showDiscountTag?: boolean
}

export default function ItemCard({
  name = 'T-shirt with Tape Details',
  price = 120,
  originalPrice = null,
  discount = null,
  rating = 4.5,
  image = '/api/placeholder/240/300',
  onClick = () => {},
  className = '',
  showDiscountTag = true,
}: ItemCardProps) {
  const [isHovered, setIsHovered] = useState(false)

  const discountPercent =
    discount ??
    (originalPrice && price ? Math.round(((originalPrice - price) / originalPrice) * 100) : null)

  return (
    <div
      className={`p-2  transition-all duration-200 ${className}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={onClick}
    >
      <div className="w-40 h-50 md:w-74 md:h-74 mb-6 bg-gray-100 rounded-3xl">
        <img
          src={image}
          alt={name}
          className={` w-40 h-50 md:w-74 md:h-74 object-cover mb-2 rounded-3xl transition-transform duration-300 ${
            isHovered ? 'scale-105' : ''
          }`}
        />
      </div>

      <h3 className="font-medium font-primary text-lg mb-1">{name}</h3>

      <div className="mb-2">
        <StarRating rating={rating} />
      </div>

      <div className="flex items-center">
        <p className="font-bold font-primary text-lg">${price}</p>
        {originalPrice !== null && (
          <p className="font-primary font-bold text-gray-400 line-through ml-2">${originalPrice}</p>
        )}
        {showDiscountTag && discountPercent !== null && (
          <p className=" bg-red-100 text-red-500 text-xs px-2 py-1 ml-2 rounded-md">
            -{discountPercent}%
          </p>
        )}
      </div>
    </div>
  )
}
