/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'
import Image from 'next/image'
import StarRating from '@/components/Itemcard/Starrating/index'

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
}: any) {
  const discountPercent =
    discount ??
    (originalPrice && price ? Math.round(((originalPrice - price) / originalPrice) * 100) : null)
  const imageUrl = typeof image === 'string' ? image : image?.url

  return (
    <div className={`p-2 ${className}`} onClick={onClick}>
      {/* ส่วนบน: การ์ดเทา + รูป */}
      <div className="w-full mb-6 bg-gray-100 rounded-3xl overflow-hidden transition-transform duration-300 hover:scale-105">
        <div className="relative w-full" style={{ aspectRatio: '4 / 5' }}>
          <Image
            src={imageUrl || '/placeholder.png'}
            alt={name}
            fill
            className="object-contain rounded-3xl"
            sizes="(min-width:1024px) 25vw, (min-width:640px) 50vw, 100vw"
          />
        </div>
      </div>

      {/* ส่วนล่าง: ข้อความ (ไม่ขยาย) */}
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
          <p className="bg-red-100 text-red-500 text-xs px-2 py-1 ml-2 rounded-md">
            -{discountPercent}%
          </p>
        )}
      </div>
    </div>
  )
}
