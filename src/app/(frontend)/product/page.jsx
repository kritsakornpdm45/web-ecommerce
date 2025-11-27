import React from 'react'
import { getPayload } from 'payload'
import configPromise from '@payload-config'
import ProductPage from '@/components/Products/index.tsx'

export default async function ProductListingPage() {
  const payload = await getPayload({ config: configPromise })

  const categoriesData = await payload.find({
    collection: 'product-categories',
    where: {
      isActive: { equals: true }
    },
    depth: 0,
    limit: 100 
  })

  const productsData = await payload.find({
    collection: 'products',
    where: {
      and: [
        { _status: { equals: 'published' } },
        { isActive: { equals: true } },
      ],
    },
    depth: 1, 
    limit: 1000 
  })

  return (
    <ProductPage 
      initialProducts={productsData} 
      allCategories={categoriesData} 
    />
  )
}