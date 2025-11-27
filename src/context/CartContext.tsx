'use client'
import React, { createContext, useContext, useState, useEffect, useCallback } from 'react'

interface Product {
  id: string
  name: string
  price: number
  qty: number
  imageList: { image: { url: string } }[]
}

interface CartContextType {
  cart: Product[]
  addToCart: (product: Product) => void
  removeFromCart: (productId: string) => void
}

const CartContext = createContext<CartContextType | undefined>(undefined)

export const CartProvider = ({ children }: { children: React.ReactNode }) => {
  const [cart, setCart] = useState<Product[]>([])
  const [isClient, setIsClient] = useState(false)

  // ตรวจสอบว่าอยู่ในฝั่ง Client แล้ว
  useEffect(() => {
    setIsClient(true)
  }, [])

  // โหลดข้อมูลจาก localStorage เมื่อเป็น Client
  useEffect(() => {
    if (isClient) {
      try {
        const savedCart = localStorage.getItem('cart')
        if (savedCart) {
          setCart(JSON.parse(savedCart))
        }
      } catch (error) {
        console.error('Error loading cart from localStorage:', error)
      }
    }
  }, [isClient])

  // บันทึกข้อมูล cart ใน localStorage ทุกครั้งที่ cart เปลี่ยน
  useEffect(() => {
    if (isClient) {
      try {
        localStorage.setItem('cart', JSON.stringify(cart))
      } catch (error) {
        console.error('Error saving cart to localStorage:', error)
      }
    }
  }, [cart, isClient])

  // ฟังก์ชันเพิ่มสินค้าใน cart
  const addToCart = useCallback((product: Product) => {
    setCart((prevCart) => {
      const existingProduct = prevCart.find((p) => p.id === product.id)
      if (existingProduct) {
        // ถ้ามีสินค้านี้อยู่แล้วให้เพิ่ม qty
        return prevCart.map((p) => (p.id === product.id ? { ...p, qty: p.qty + 1 } : p))
      }
      // ถ้ายังไม่มีสินค้าใน cart ให้เพิ่ม
      return [...prevCart, { ...product, qty: 1 }]
    })
  }, [])

  // ฟังก์ชันลบสินค้าออกจาก cart
  const removeFromCart = useCallback((productId: string) => {
    setCart((prevCart) => prevCart.filter((p) => p.id !== productId))
  }, [])

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart }}>
      {children}
    </CartContext.Provider>
  )
}

export const useCart = () => {
  const context = useContext(CartContext)
  if (!context) {
    throw new Error('useCart must be used within a CartProvider')
  }
  return context
}
