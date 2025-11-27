'use client'

import { useCart } from '@/context/CartContext'
import Link from 'next/link'
import CartItem from './CartItem'
import CartSummary from './CartSummary'

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

  const total = cart.reduce((acc, item) => acc + item.price * item.qty, 0)

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-3xl font-semibold text-gray-800 mb-8">Your Cart</h1>

      <div className="space-y-6">
        {cart.map((item) => (
          <CartItem key={item.id} item={item} onRemove={removeFromCart} />
        ))}
      </div>

      <CartSummary total={total} />
    </div>
  )
}
