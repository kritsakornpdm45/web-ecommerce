'use client'
import React, { useState, useMemo } from 'react'
import { Star, ShoppingCart, Heart, Filter } from 'lucide-react'
import { useCart } from '@/context/CartContext'

const ProductCard = React.memo(({ product }) => {
  const { addToCart } = useCart()

  const imageUrl =
    product.imageList?.[0]?.image?.url || 'https://placehold.co/400x400/f1f1f1/b0b0b0?text=No+Image'

  const handleAddToCart = () => {
    addToCart(product)
  }

  return (
    <div className="group bg-white border border-gray-200 rounded-lg overflow-hidden hover:shadow-xl transition-all duration-300 hover:border-black">
      <div className="relative overflow-hidden bg-gray-100">
        <img
          src={imageUrl}
          alt={product.name}
          loading="lazy"
          className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-500"
        />
        <button className="absolute top-4 right-4 p-2 bg-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity hover:bg-gray-100">
          <Heart className="w-5 h-5 text-gray-700" />
        </button>
      </div>

      <div className="p-4">
        <h3 className="text-lg font-semibold text-black mb-2 group-hover:text-gray-700 transition">
          {product.name}
        </h3>

        {product.rating && (
          <div className="flex items-center mb-3">
            <div className="flex items-center">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`w-4 h-4 ${
                    i < Math.floor(product.rating) ? 'fill-black text-black' : 'text-gray-300'
                  }`}
                />
              ))}
            </div>
            <span className="ml-2 text-sm text-gray-600">{product.rating}</span>
          </div>
        )}

        <div className="flex items-center justify-between">
          <div>
            <span className="text-2xl font-bold text-black">
              ${product.price?.toLocaleString() || 'N/A'}
            </span>
            {product.originalPrice && (
              <span className="ml-2 text-sm text-gray-400 line-through">
                ${product.originalPrice.toLocaleString()}
              </span>
            )}
          </div>
        </div>

        <button
          onClick={handleAddToCart}
          className="w-full mt-4 py-3 rounded-lg font-semibold flex items-center justify-center space-x-2 transition bg-black text-white hover:bg-gray-800"
        >
          <ShoppingCart className="w-5 h-5" />
          <span>Add to Cart</span>
        </button>
      </div>
    </div>
  )
})

ProductCard.displayName = 'ProductCard'

export default function ProductPage({
  initialProducts: initialProductsData,
  allCategories: allCategoriesData,
}) {
  const initialProducts = initialProductsData?.docs || []
  const allCategories = allCategoriesData?.docs || []

  const [selectedCategory, setSelectedCategory] = useState('all')
  const [sortBy, setSortBy] = useState('popular')
  const [priceRanges, setPriceRanges] = useState({
    under50: false,
    range50to100: false,
    range100to200: false,
    over200: false,
  })

  // Combined memoization - calculate everything in one pass
  const { categoriesForDisplay, sortedProducts } = useMemo(() => {
    // Calculate product counts
    const counts = {}
    for (const product of initialProducts) {
      if (Array.isArray(product.categories)) {
        for (const cat of product.categories) {
          if (cat?.id) {
            counts[cat.id] = (counts[cat.id] || 0) + 1
          }
        }
      }
    }

    // Build categories with counts
    const categories = [
      { id: 'all', name: 'All Products', count: initialProducts.length },
      ...allCategories.map((cat) => ({
        ...cat,
        count: counts[cat.id] || 0,
      })),
    ]

    // Filter products by category
    const filtered =
      selectedCategory === 'all'
        ? initialProducts
        : initialProducts.filter(
            (p) =>
              Array.isArray(p.categories) &&
              p.categories.some((cat) => cat?.id === selectedCategory),
          )

    // Filter by price range
    const priceFiltered = filtered.filter((product) => {
      const price = parseFloat(product.price) || 0
      const hasAnyRangeSelected = Object.values(priceRanges).some((v) => v)

      if (!hasAnyRangeSelected) return true

      if (priceRanges.under50 && price < 50) return true
      if (priceRanges.range50to100 && price >= 50 && price < 100) return true
      if (priceRanges.range100to200 && price >= 100 && price < 200) return true
      if (priceRanges.over200 && price >= 200) return true

      return false
    })

    // Sort products - always create new array to trigger re-render
    let sorted = [...priceFiltered]
    switch (sortBy) {
      case 'price-low':
        sorted.sort((a, b) => {
          const priceA = parseFloat(a.price) || 0
          const priceB = parseFloat(b.price) || 0
          return priceA - priceB
        })
        break
      case 'price-high':
        sorted.sort((a, b) => {
          const priceA = parseFloat(a.price) || 0
          const priceB = parseFloat(b.price) || 0
          return priceB - priceA
        })
        break
      case 'rating':
        sorted.sort((a, b) => (b.rating || 0) - (a.rating || 0))
        break
      case 'newest':
      case 'popular':
      default:
        // Keep original order for popular/newest
        break
    }

    return { categoriesForDisplay: categories, sortedProducts: sorted }
  }, [initialProducts, allCategories, selectedCategory, sortBy, priceRanges])

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="relative overflow-hidden bg-black text-white py-16 md:py-24">
        <div
          className="absolute inset-0 w-full h-full bg-cover bg-center opacity-40"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1555864326-5f22a71692b7?w=1200&h=400&fit=crop')",
          }}
          aria-hidden="true"
        />
        <div className="absolute inset-0 bg-black/60" aria-hidden="true" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Gaming Products</h1>
          <p className="text-gray-300 text-lg max-w-2xl mx-auto">
            Discover premium gaming gear for your ultimate setup
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar Categories */}
          <aside className="lg:w-64 flex-shrink-0">
            <div className="bg-white border border-gray-200 rounded-lg p-6 sticky top-4">
              <h2 className="text-xl font-bold text-black mb-4 flex items-center">
                <Filter className="w-5 h-5 mr-2" />
                Categories
              </h2>
              <nav className="space-y-2">
                {categoriesForDisplay.map((category) => (
                  <button
                    key={category.id}
                    onClick={() => setSelectedCategory(category.id)}
                    className={`w-full text-left px-4 py-3 rounded-lg transition-all flex items-center justify-between group ${
                      selectedCategory === category.id
                        ? 'bg-black text-white'
                        : 'text-gray-700 hover:bg-gray-100'
                    }`}
                  >
                    <span className="font-medium">{category.name}</span>
                    <span
                      className={`text-sm px-2 py-1 rounded-full ${
                        selectedCategory === category.id
                          ? 'bg-white text-black'
                          : 'bg-gray-200 text-gray-600 group-hover:bg-gray-300'
                      }`}
                    >
                      {category.count}
                    </span>
                  </button>
                ))}
              </nav>

              {/* Price Range */}
              <div className="mt-8 pt-6 border-t border-gray-200">
                <h3 className="text-lg font-semibold text-black mb-4">Price Range</h3>
                <div className="space-y-3">
                  <label className="flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      className="w-4 h-4 rounded border-gray-300"
                      checked={priceRanges.under50}
                      onChange={(e) =>
                        setPriceRanges({ ...priceRanges, under50: e.target.checked })
                      }
                    />
                    <span className="ml-3 text-gray-700">Under $50</span>
                  </label>
                  <label className="flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      className="w-4 h-4 rounded border-gray-300"
                      checked={priceRanges.range50to100}
                      onChange={(e) =>
                        setPriceRanges({ ...priceRanges, range50to100: e.target.checked })
                      }
                    />
                    <span className="ml-3 text-gray-700">$50 - $100</span>
                  </label>
                  <label className="flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      className="w-4 h-4 rounded border-gray-300"
                      checked={priceRanges.range100to200}
                      onChange={(e) =>
                        setPriceRanges({ ...priceRanges, range100to200: e.target.checked })
                      }
                    />
                    <span className="ml-3 text-gray-700">$100 - $200</span>
                  </label>
                  <label className="flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      className="w-4 h-4 rounded border-gray-300"
                      checked={priceRanges.over200}
                      onChange={(e) =>
                        setPriceRanges({ ...priceRanges, over200: e.target.checked })
                      }
                    />
                    <span className="ml-3 text-gray-700">Over $200</span>
                  </label>
                </div>
              </div>
            </div>
          </aside>

          {/* Products Grid */}
          <div className="flex-1">
            {/* Toolbar */}
            <div className="flex items-center justify-between mb-6 pb-4 border-b border-gray-200">
              <p className="text-gray-600">
                Showing <span className="font-semibold text-black">{sortedProducts.length}</span>{' '}
                products
              </p>
              <div className="flex items-center space-x-2">
                <span className="text-gray-600 text-sm">Sort by:</span>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-black cursor-pointer"
                >
                  <option value="popular">Most Popular</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                  <option value="rating">Highest Rated</option>
                  <option value="newest">Newest</option>
                </select>
              </div>
            </div>

            {/* Products */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {sortedProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>

            {sortedProducts.length === 0 && (
              <div className="text-center py-16">
                <p className="text-gray-500 text-lg">No products found in this category</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
