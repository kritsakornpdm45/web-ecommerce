'use client'

import { useState } from 'react'
import { useCart } from '@/context/CartContext'
import { CreditCard, Truck, MapPin, Check } from 'lucide-react'

export default function CheckoutPage() {
  const { cart } = useCart()
  const [currentStep, setCurrentStep] = useState(1)
  const [formData, setFormData] = useState({
    email: '',
    firstName: '',
    lastName: '',
    address: '',
    city: '',
    postalCode: '',
    phone: '',
    deliveryMethod: '',
    paymentMethod: '',
  })

  const subtotal = cart.reduce((total, item) => total + item.price * item.qty, 0)
  const isFreeShipping = subtotal >= 80

  let deliveryFee = 0
  if (!isFreeShipping) {
    deliveryFee =
      formData.deliveryMethod === 'express' ? 15 : formData.deliveryMethod === 'standard' ? 5 : 0
  }

  const total = subtotal + deliveryFee

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleContinue = () => {
    if (currentStep < 3) setCurrentStep(currentStep + 1)
  }

  const handleBack = () => {
    if (currentStep > 1) setCurrentStep(currentStep - 1)
  }

  const steps = [
    { num: 1, title: 'Contact & Address', icon: MapPin },
    { num: 2, title: 'Delivery', icon: Truck },
    { num: 3, title: 'Payment', icon: CreditCard },
  ]

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Progress Steps */}
        <div className="mb-12">
          <div className="flex items-center justify-between max-w-3xl mx-auto">
            {steps.map((step, index) => {
              const Icon = step.icon
              return (
                <div key={step.num} className="flex items-center flex-1">
                  <div className="flex flex-col items-center flex-1">
                    <div
                      className={`w-12 h-12 rounded-full flex items-center justify-center border-2 transition-all ${
                        currentStep >= step.num
                          ? 'bg-black border-black text-white'
                          : 'bg-white border-gray-300 text-gray-400'
                      }`}
                    >
                      {currentStep > step.num ? (
                        <Check className="w-6 h-6" />
                      ) : (
                        <Icon className="w-6 h-6" />
                      )}
                    </div>
                    <p
                      className={`mt-2 text-sm font-medium ${
                        currentStep >= step.num ? 'text-black' : 'text-gray-400'
                      }`}
                    >
                      {step.title}
                    </p>
                  </div>
                  {index < steps.length - 1 && (
                    <div
                      className={`h-0.5 flex-1 mx-4 transition-all ${
                        currentStep > step.num ? 'bg-black' : 'bg-gray-300'
                      }`}
                    />
                  )}
                </div>
              )
            })}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* Step 1: Contact & Address */}
            {currentStep === 1 && (
              <div className="space-y-6">
                <h2 className="text-2xl font-bold text-black">Contact & Address</h2>

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-black mb-2">Email</label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent"
                      placeholder="your@email.com"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-black mb-2">
                        First Name
                      </label>
                      <input
                        type="text"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent"
                        placeholder="John"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-black mb-2">Last Name</label>
                      <input
                        type="text"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent"
                        placeholder="Doe"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-black mb-2">Address</label>
                    <input
                      type="text"
                      name="address"
                      value={formData.address}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent"
                      placeholder="123 Main Street"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-black mb-2">City</label>
                      <input
                        type="text"
                        name="city"
                        value={formData.city}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent"
                        placeholder="New York"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-black mb-2">
                        Postal Code
                      </label>
                      <input
                        type="text"
                        name="postalCode"
                        value={formData.postalCode}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent"
                        placeholder="10001"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-black mb-2">Phone</label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent"
                      placeholder="+1 (555) 000-0000"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Step 2: Delivery */}
            {currentStep === 2 && (
              <div className="space-y-6">
                <h2 className="text-2xl font-bold text-black">Delivery</h2>
                <p className="text-gray-600">Select a delivery method from the options below</p>

                {/* Free Shipping Banner */}
                {isFreeShipping ? (
                  <div className="bg-black text-white p-4 rounded-lg flex items-center justify-center space-x-2">
                    <Check className="w-5 h-5" />
                    <p className="font-semibold">Free shipping applied! Order over $80</p>
                  </div>
                ) : (
                  <div className="bg-gray-100 border border-gray-300 text-black p-4 rounded-lg text-center">
                    <p className="font-medium">
                      Add ${(80 - subtotal).toFixed(2)} more to get free shipping!
                    </p>
                  </div>
                )}

                <div className="space-y-4">
                  <label
                    className={`block p-6 border-2 rounded-lg cursor-pointer transition-all ${
                      formData.deliveryMethod === 'standard'
                        ? 'border-black bg-gray-50'
                        : 'border-gray-300 hover:border-gray-400'
                    }`}
                  >
                    <input
                      type="radio"
                      name="deliveryMethod"
                      value="standard"
                      checked={formData.deliveryMethod === 'standard'}
                      onChange={handleInputChange}
                      className="sr-only"
                    />
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <div
                          className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                            formData.deliveryMethod === 'standard'
                              ? 'border-black'
                              : 'border-gray-300'
                          }`}
                        >
                          {formData.deliveryMethod === 'standard' && (
                            <div className="w-3 h-3 rounded-full bg-black" />
                          )}
                        </div>
                        <div>
                          <div className="flex items-center justify-between">
                            <p className="font-semibold text-black">Standard Delivery</p>
                            {isFreeShipping && (
                              <span className="text-xs bg-black text-white px-2 py-1 rounded">
                                FREE
                              </span>
                            )}
                          </div>
                          <p className="text-sm text-gray-600">5-7 business days</p>
                        </div>
                      </div>
                      <p className="font-semibold text-black">
                        {isFreeShipping ? 'Free' : '$5.00'}
                      </p>
                    </div>
                  </label>

                  <label
                    className={`block p-6 border-2 rounded-lg cursor-pointer transition-all ${
                      formData.deliveryMethod === 'express'
                        ? 'border-black bg-gray-50'
                        : 'border-gray-300 hover:border-gray-400'
                    }`}
                  >
                    <input
                      type="radio"
                      name="deliveryMethod"
                      value="express"
                      checked={formData.deliveryMethod === 'express'}
                      onChange={handleInputChange}
                      className="sr-only"
                    />
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <div
                          className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                            formData.deliveryMethod === 'express'
                              ? 'border-black'
                              : 'border-gray-300'
                          }`}
                        >
                          {formData.deliveryMethod === 'express' && (
                            <div className="w-3 h-3 rounded-full bg-black" />
                          )}
                        </div>
                        <div>
                          <div className="flex items-center justify-between">
                            <p className="font-semibold text-black">Express Delivery</p>
                            {isFreeShipping && (
                              <span className="text-xs bg-black text-white px-2 py-1 rounded">
                                FREE
                              </span>
                            )}
                          </div>
                          <p className="text-sm text-gray-600">2-3 business days</p>
                        </div>
                      </div>
                      <p className="font-semibold text-black">
                        {isFreeShipping ? 'Free' : '$15.00'}
                      </p>
                    </div>
                  </label>

                  <label
                    className={`block p-6 border-2 rounded-lg cursor-pointer transition-all ${
                      formData.deliveryMethod === 'pickup'
                        ? 'border-black bg-gray-50'
                        : 'border-gray-300 hover:border-gray-400'
                    }`}
                  >
                    <input
                      type="radio"
                      name="deliveryMethod"
                      value="pickup"
                      checked={formData.deliveryMethod === 'pickup'}
                      onChange={handleInputChange}
                      className="sr-only"
                    />
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <div
                          className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                            formData.deliveryMethod === 'pickup'
                              ? 'border-black'
                              : 'border-gray-300'
                          }`}
                        >
                          {formData.deliveryMethod === 'pickup' && (
                            <div className="w-3 h-3 rounded-full bg-black" />
                          )}
                        </div>
                        <div>
                          <p className="font-semibold text-black">Store Pickup</p>
                          <p className="text-sm text-gray-600">Available next day</p>
                        </div>
                      </div>
                      <p className="font-semibold text-black">Free</p>
                    </div>
                  </label>
                </div>
              </div>
            )}

            {/* Step 3: Payment */}
            {currentStep === 3 && (
              <div className="space-y-6">
                <h2 className="text-2xl font-bold text-black">Payment</h2>

                <div className="space-y-4">
                  <label
                    className={`block p-6 border-2 rounded-lg cursor-pointer transition-all ${
                      formData.paymentMethod === 'card'
                        ? 'border-black bg-gray-50'
                        : 'border-gray-300 hover:border-gray-400'
                    }`}
                  >
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="card"
                      checked={formData.paymentMethod === 'card'}
                      onChange={handleInputChange}
                      className="sr-only"
                    />
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <div
                          className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                            formData.paymentMethod === 'card' ? 'border-black' : 'border-gray-300'
                          }`}
                        >
                          {formData.paymentMethod === 'card' && (
                            <div className="w-3 h-3 rounded-full bg-black" />
                          )}
                        </div>
                        <p className="font-semibold text-black">Credit / Debit Card</p>
                      </div>
                      <CreditCard className="w-6 h-6 text-black" />
                    </div>
                  </label>

                  {formData.paymentMethod === 'card' && (
                    <div className="ml-9 space-y-4 mt-4">
                      <div>
                        <label className="block text-sm font-medium text-black mb-2">
                          Card Number
                        </label>
                        <input
                          type="text"
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent"
                          placeholder="1234 5678 9012 3456"
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-black mb-2">
                            Expiry Date
                          </label>
                          <input
                            type="text"
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent"
                            placeholder="MM/YY"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-black mb-2">CVV</label>
                          <input
                            type="text"
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent"
                            placeholder="123"
                          />
                        </div>
                      </div>
                    </div>
                  )}

                  <label
                    className={`block p-6 border-2 rounded-lg cursor-pointer transition-all ${
                      formData.paymentMethod === 'paypal'
                        ? 'border-black bg-gray-50'
                        : 'border-gray-300 hover:border-gray-400'
                    }`}
                  >
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="paypal"
                      checked={formData.paymentMethod === 'paypal'}
                      onChange={handleInputChange}
                      className="sr-only"
                    />
                    <div className="flex items-center space-x-4">
                      <div
                        className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                          formData.paymentMethod === 'paypal' ? 'border-black' : 'border-gray-300'
                        }`}
                      >
                        {formData.paymentMethod === 'paypal' && (
                          <div className="w-3 h-3 rounded-full bg-black" />
                        )}
                      </div>
                      <p className="font-semibold text-black">PayPal</p>
                    </div>
                  </label>

                  <label
                    className={`block p-6 border-2 rounded-lg cursor-pointer transition-all ${
                      formData.paymentMethod === 'cod'
                        ? 'border-black bg-gray-50'
                        : 'border-gray-300 hover:border-gray-400'
                    }`}
                  >
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="cod"
                      checked={formData.paymentMethod === 'cod'}
                      onChange={handleInputChange}
                      className="sr-only"
                    />
                    <div className="flex items-center space-x-4">
                      <div
                        className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                          formData.paymentMethod === 'cod' ? 'border-black' : 'border-gray-300'
                        }`}
                      >
                        {formData.paymentMethod === 'cod' && (
                          <div className="w-3 h-3 rounded-full bg-black" />
                        )}
                      </div>
                      <p className="font-semibold text-black">Cash on Delivery</p>
                    </div>
                  </label>
                </div>
              </div>
            )}

            {/* Navigation Buttons */}
            <div className="flex justify-between mt-8">
              <button
                onClick={handleBack}
                disabled={currentStep === 1}
                className={`px-6 py-3 rounded-lg font-semibold transition-all ${
                  currentStep === 1
                    ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                    : 'bg-white border-2 border-black text-black hover:bg-gray-50'
                }`}
              >
                Back
              </button>
              <button
                onClick={handleContinue}
                className="px-6 py-3 bg-black text-white rounded-lg font-semibold hover:bg-gray-800 transition-all"
              >
                {currentStep === 3 ? 'Place Order' : 'Continue'}
              </button>
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-gray-50 p-6 rounded-lg border border-gray-200 sticky top-8">
              <h3 className="text-xl font-bold text-black mb-4">Order Summary</h3>

              <div className="space-y-4 mb-6">
                {cart.map((item) => (
                  <div key={item.id} className="flex items-center space-x-3">
                    <div className="w-16 h-16 bg-gray-200 rounded-lg">
                      <img
                        src={item.imageList?.[0]?.image?.url || 'https://placehold.co/100x100'}
                        alt={item.name}
                        className="w-full h-full object-cover rounded-lg"
                      />
                    </div>
                    <div className="flex-1">
                      <p className="font-medium text-black text-sm">{item.name}</p>
                      <p className="text-sm text-gray-600">Qty: {item.qty}</p>
                    </div>
                    <p className="font-semibold text-black">
                      ${(item.price * item.qty).toFixed(2)}
                    </p>
                  </div>
                ))}
              </div>

              <div className="border-t border-gray-300 pt-4 space-y-2">
                <div className="flex justify-between text-gray-600">
                  <span>Subtotal</span>
                  <span>${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Delivery</span>
                  <span className={isFreeShipping ? 'text-green-600 font-semibold' : ''}>
                    {isFreeShipping ? 'Free' : `${deliveryFee.toFixed(2)}`}
                  </span>
                </div>
                {isFreeShipping && (
                  <div className="flex justify-between text-sm text-green-600">
                    <span>✓ Free shipping applied</span>
                  </div>
                )}
                <div className="flex justify-between text-xl font-bold text-black pt-2 border-t border-gray-300">
                  <span>Total</span>
                  <span>${total.toFixed(2)}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
