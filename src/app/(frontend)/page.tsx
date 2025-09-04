// import { headers as getHeaders } from 'next/headers.js'
// import Image from 'next/image'

import React from 'react'
import { getPayload } from 'payload'
import configPromise from '@payload-config'
// import { fileURLToPath } from 'url'

// import config from '@/payload.config'
import './styles.css'
import Footer from '@/components/Footer'

import Homebanner from '@/components/Homebanner'
import ServiceFeatures from '@/components/Feature'
import NewArrivalGrid from '@/components/Newarrival'
import CategoryGrid from '@/components/Category'
import PopularGrid from '@/components/PopularProduct'

import { categoryMock } from '@/utils/category'

export default async function HomePage() {
  const payload = await getPayload({ config: configPromise })
  const posts = await payload.findGlobal({
    slug: 'homePage',
    depth: 1,
  })
  // const headers = await getHeaders()
  // const payloadConfig = await config

  // const fileURL = `vscode://file/${fileURLToPath(import.meta.url)}`

  return (
    <div className="home">
      <Homebanner data={posts} />
      <ServiceFeatures />
      <NewArrivalGrid />
      <CategoryGrid items={categoryMock} />
      <PopularGrid />
      <Footer />
      <h1 className="text-amber-400">Welcome to Payload + Next.js</h1>
    </div>
  )
}
