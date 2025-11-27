import React from 'react'
import Link from 'next/link'
import Image from 'next/image'

interface Media {
  id: string | number
  url?: string | null
  alt?: string | null
  [key: string]: any
}

interface HomeBannerData {
  homeBannerImage?: number | Media
  mainTitle?: string
  subTitle?: string
  buttonText?: string
  buttonLink?: string
}

interface HomebannerProps {
  data?: HomeBannerData
}

const Homebanner = ({ data }: HomebannerProps) => {
  if (!data) return null

  const {
    homeBannerImage,
    mainTitle,
    subTitle,
    buttonText,
    buttonLink,
  } = data

  const imageUrl = typeof homeBannerImage === 'object' ? homeBannerImage?.url : null
  const imageAlt = typeof homeBannerImage === 'object' ? homeBannerImage?.alt : 'Banner Image'

  return (
    <header className="relative min-h-screen md:min-h-[42rem] overflow-hidden bg-gray-100">
      {/* Background Image with padding */}
      <div className="absolute inset-0 z-0 p-1 md:p-8">
        <div className="w-full h-full relative rounded-lg overflow-hidden">
          {imageUrl && (
            <Image
              src={imageUrl}
              alt={imageAlt || 'Banner Image'}
              fill
              className="object-cover rounded-lg"
              priority
              sizes="100vw"
            />
          )}
          <div className="absolute inset-0 bg-black/40 rounded-lg" />
        </div>
      </div>

      {/* Content */}
      <div className="relative z-10 flex items-center justify-center min-h-screen md:min-h-[32rem] px-4 text-center text-white">
        <div className="w-full max-w-4xl mx-auto flex flex-col items-center gap-6 md:gap-8">
          <h1 className="text-4xl md:text-6xl font-bold drop-shadow-lg">
            {mainTitle}
          </h1>
          <p className="text-base md:text-lg max-w-xl mx-auto drop-shadow-md">
            {subTitle}
          </p>
          {buttonLink && (
            <Link
              href={buttonLink}
              className="inline-block px-6 py-3 bg-white text-black font-medium rounded-full text-sm md:text-base hover:bg-gray-200 transition-colors"
            >
              {buttonText || 'Shop Now'}
            </Link>
          )}
        </div>
      </div>
    </header>
  )
}

export default Homebanner
