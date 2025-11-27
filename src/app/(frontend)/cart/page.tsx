'use client'
import { useCart } from '@/context/CartContext'
import Link from 'next/link'

export default function CartPage() {
  const { cart, removeFromCart } = useCart()

  if (cart.length === 0) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center text-center">
        <h1 className="text-4xl font-semibold text-gray-800 mb-4">Your Cart is Empty</h1>
        <p className="text-gray-500 mb-6">Go back and add some products to your cart!</p>
        <Link href="/product" className="text-blue-500 hover:underline">
          Go to Products
        </Link>
      </div>
    )
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-3xl font-semibold text-gray-800 mb-8">Your Cart</h1>

      <div className="space-y-6">
        {cart.map((item) => {
          const imageUrl = item.imageList?.[0]?.image?.url || 'https://placehold.co/100x100'

          return (
            <div
              key={item.id}
              className="flex items-center justify-between p-4 bg-white rounded-lg shadow-md border border-gray-200"
            >
              <div className="flex items-center space-x-4">
                <div className="w-24 h-24 bg-gray-200 rounded-lg">
                  <img
                    src={imageUrl}
                    alt={item.name}
                    className="object-cover w-full h-full rounded-lg"
                  />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-800">{item.name}</h3>
                  <p className="text-sm text-gray-500">${item.price}</p>
                  <p className="text-sm text-gray-500">Quantity: {item.qty}</p>
                </div>
              </div>

              <button
                onClick={() => removeFromCart(item.id)}
                className="text-red-600 hover:text-red-800 font-semibold"
              >
                Remove
              </button>
            </div>
          )
        })}
      </div>

      <div className="mt-6 flex justify-between items-center">
        <p className="text-xl font-semibold text-gray-800">
          Total: ${cart.reduce((total, item) => total + item.price * item.qty, 0).toFixed(2)}
        </p>
        <Link
          href="/checkout"
          className="px-6 py-3 bg-black text-white rounded-lg font-semibold hover:bg-gray-800 transition-all"
        >
          Proceed to Checkout
        </Link>
      </div>
    </div>
  )
}
