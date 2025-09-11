import React from 'react'
import './styles.css'

import { getPayload } from 'payload'
import configPromise from '@payload-config'

import TopNavbar from '@/components/Navbar'
import Footer from '@/components/Footer'

export const metadata = {
  description: 'A blank template using Payload in a Next.js app.',
  title: 'Payload Blank Template',
}

export default async function RootLayout(props: { children: React.ReactNode }) {
  const { children } = props

  const payload = await getPayload({ config: configPromise })
  const posts = await payload.findGlobal({
    slug: 'header',
    depth: 1,
  })

  const datas = await payload.findGlobal({
    slug: 'footer',
    depth: 1,
  })

  return (
    <html lang="en">
      <body>
        <TopNavbar data={posts} />
        <main>{children}</main>
        <Footer data={datas} />
      </body>
    </html>
  )
}
