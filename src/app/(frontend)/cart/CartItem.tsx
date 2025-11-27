import React from 'react'
import Image from 'next/image'

interface Product {
  id: string
  name: string
  price: number
  qty: number
  imageList: { image: { url: string } }[]
}

interface CartItemProps {
  item: Product
  onRemove: (id: string) => void
}

const CartItem: React.FC<CartItemProps> = ({ item, onRemove }) => {
  const imageUrl = item.imageList?.[0]?.image?.url || 'https://placehold.co/100x100'

  return (
    <div className="flex items-center justify-between p-4 bg-white rounded-lg shadow-md border border-gray-200">
      <div className="flex items-center space-x-4">
        <div className="w-24 h-24 bg-gray-200 rounded-lg relative overflow-hidden">
          <Image
            src={imageUrl}
            alt={item.name}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        </div>
        <div>
          <h3 className="text-lg font-semibold text-gray-800">{item.name}</h3>
          <p className="text-sm text-gray-500">${item.price}</p>
          <p className="text-sm text-gray-500">Quantity: {item.qty}</p>
        </div>
      </div>

      <button
        onClick={() => onRemove(item.id)}
        className="text-red-600 hover:text-red-800 font-semibold"
      >
        Remove
      </button>
    </div>
  )
}

export default CartItem
