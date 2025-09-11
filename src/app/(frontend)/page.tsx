// import { headers as getHeaders } from 'next/headers.js'
// import Image from 'next/image'

import React from 'react'
import { getPayload } from 'payload'
import configPromise from '@payload-config'
// import { fileURLToPath } from 'url'

// import config from '@/payload.config'
import './styles.css'

import Homebanner from '@/components/Homebanner'
import ServiceFeatures from '@/components/Feature'
import NewArrivalGrid from '@/components/Newarrival'
import CategoryGrid from '@/components/Category'
import PopularGrid from '@/components/PopularProduct'

export default async function HomePage() {
  const payload = await getPayload({ config: configPromise })

  //Fetch homePage data
  const posts = await payload.findGlobal({
    slug: 'homePage',
    depth: 1,
  })
  //Fetch catagory data
  const catagoriesGrid = await payload.find({
    collection: 'product-categories',
    depth: 1,
  })

  //Fetch newest products 4 latest products
  const newArrivals = await payload.find({
    collection: 'products',
    where: {
      and: [
        { _status: { equals: 'published' } },
        { isActive: { equals: true } },
        { publishedAt: { exists: true } },
      ],
    },
    sort: ['-publishedAt', '-createdAt'],
    limit: 4,
    depth: 1,
  })

  const popularProducts = await payload.find({
    collection: 'products',
    where: {
      isActive: {
        equals: true,
      },
    },
    sort: ['-soldCount'],
    depth: 1,
    limit: 4,
  })
  // const headers = await getHeaders()
  // const payloadConfig = await config

  // const fileURL = `vscode://file/${fileURLToPath(import.meta.url)}`

  return (
    <div className="home">
      <Homebanner data={posts} />
      <ServiceFeatures data={posts} />
      <NewArrivalGrid data={newArrivals} />
      <CategoryGrid data={catagoriesGrid} />
      <PopularGrid data={popularProducts} />
    </div>
  )
}
