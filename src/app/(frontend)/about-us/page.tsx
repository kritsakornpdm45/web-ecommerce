import React from 'react'
import Image from 'next/image'

export const metadata = {
  title: 'About Us | Ipsum.co',
  description: 'Learn more about our story and values.',
}

export default function AboutUsPage() {
  return (
    <div className="bg-black text-white min-h-screen font-sans selection:bg-white selection:text-black">
      {/* Hero Section */}
      <section className="relative h-[80vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?q=80&w=2070&auto=format&fit=crop"
            alt="About Us Hero"
            fill
            className="object-cover opacity-40 grayscale"
            priority
          />
        </div>
        <div className="relative z-10 text-center px-4">
          <h1 className="text-6xl md:text-8xl font-bold tracking-tighter mb-6">
            WE ARE <br /> <span className="text-gray-400">IPSUM.CO</span>
          </h1>
          <p className="text-xl md:text-2xl text-gray-300 max-w-2xl mx-auto font-light">
            Redefining the digital shopping experience with minimalism and elegance.
          </p>
        </div>
      </section>

      {/* Our Story */}
      <section className="py-24 px-4 md:px-8 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          <div>
            <h2 className="text-4xl md:text-5xl font-bold mb-8 tracking-tight">OUR STORY</h2>
            <div className="space-y-6 text-lg text-gray-300 leading-relaxed">
              <p>
                Founded in 2000, Ipsum.co began with a simple mission: to curate the finest gaming gear and lifestyle products for the modern enthusiast. We believe that technology should not only perform but also inspire.
              </p>
              <p>
                Our journey started in a small garage, fueled by passion and caffeine. Today, we are a global community of creators, gamers, and innovators who demand the best.
              </p>
              <p>
                We strip away the unnecessary, focusing on pure performance and timeless design. This is why our platform is built on the principles of minimalism—black and white, light and shadow.
              </p>
            </div>
          </div>
          <div className="relative h-[600px] w-full bg-gray-900 rounded-lg overflow-hidden">
             <Image
                src="https://images.unsplash.com/photo-1542751371-adc38448a05e?q=80&w=2070&auto=format&fit=crop"
                alt="Our Story"
                fill
                className="object-cover grayscale hover:grayscale-0 transition-all duration-700"
             />
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-24 bg-white text-black">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <h2 className="text-4xl md:text-5xl font-bold mb-16 text-center tracking-tight">OUR VALUES</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <div className="text-center group">
              <div className="w-20 h-20 mx-auto mb-6 border-2 border-black rounded-full flex items-center justify-center text-3xl font-bold group-hover:bg-black group-hover:text-white transition-colors duration-300">
                01
              </div>
              <h3 className="text-2xl font-bold mb-4">QUALITY</h3>
              <p className="text-gray-600 leading-relaxed">
                We never compromise. Every product in our catalog is rigorously tested to meet the highest standards of durability and performance.
              </p>
            </div>
            <div className="text-center group">
              <div className="w-20 h-20 mx-auto mb-6 border-2 border-black rounded-full flex items-center justify-center text-3xl font-bold group-hover:bg-black group-hover:text-white transition-colors duration-300">
                02
              </div>
              <h3 className="text-2xl font-bold mb-4">DESIGN</h3>
              <p className="text-gray-600 leading-relaxed">
                Aesthetics matter. We curate products that look as good as they perform, elevating your workspace and setup.
              </p>
            </div>
            <div className="text-center group">
              <div className="w-20 h-20 mx-auto mb-6 border-2 border-black rounded-full flex items-center justify-center text-3xl font-bold group-hover:bg-black group-hover:text-white transition-colors duration-300">
                03
              </div>
              <h3 className="text-2xl font-bold mb-4">COMMUNITY</h3>
              <p className="text-gray-600 leading-relaxed">
                We are more than a store. We are a collective of like-minded individuals who share a passion for excellence.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-32 px-4 text-center">
        <h2 className="text-5xl md:text-7xl font-bold mb-8 tracking-tighter">
          JOIN THE REVOLUTION
        </h2>
        <p className="text-xl text-gray-400 mb-12 max-w-2xl mx-auto">
          Experience the future of gaming and lifestyle.
        </p>
        <a
          href="/product"
          className="inline-block px-12 py-4 bg-white text-black font-bold text-lg tracking-widest hover:bg-gray-200 transition-colors"
        >
          SHOP NOW
        </a>
      </section>
    </div>
  )
}
