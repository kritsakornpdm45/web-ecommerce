import React from 'react'
import Link from 'next/link'

interface CartSummaryProps {
  total: number
}

const CartSummary: React.FC<CartSummaryProps> = ({ total }) => {
  return (
    <div className="mt-6 flex justify-between items-center">
      <p className="text-xl font-semibold text-gray-800">
        Total: ${total.toFixed(2)}
      </p>
      <Link
        href="/checkout"
        className="px-6 py-3 bg-black text-white rounded-lg font-semibold hover:bg-gray-800 transition-all"
      >
        Proceed to Checkout
      </Link>
    </div>
  )
}

export default CartSummary
