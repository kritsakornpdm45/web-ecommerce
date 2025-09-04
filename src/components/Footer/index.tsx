import React from 'react'
import Image from 'next/image'
import Link from 'next/link'

// TypeScript interfaces
interface SocialIcon {
  name: string
  src: string
  href?: string
}

interface PaymentMethod {
  name: string
  src: string
}

interface FooterSection {
  title: string
  links: string[]
}

// Configuration data
const FOOTER_CONFIG = {
  brand: {
    name: 'SHOP.CO',
    description: "We have clothes that suit your style and which you're proud to wear. From women to men."
  },
  newsletter: {
    title: 'STAY UP TO DATE ABOUT OUR LATEST OFFERS',
    placeholder: 'Enter your email address',
    buttonText: 'Subscribe to Newsletter'
  },
  copyright: 'Shop.co © 2000-2023, All Rights Reserved'
} as const

// Data arrays
const socialIcons: SocialIcon[] = [
  { name: 'Twitter', src: '/icons/twitterlogo.png', href: '#' },
  { name: 'Facebook', src: '/icons/facebooklogo.png', href: '#' },
  { name: 'Instagram', src: '/icons/instagramlogo.png', href: '#' },
  { name: 'Github', src: '/icons/githublogo.png', href: '#' }
]

const paymentMethods: PaymentMethod[] = [
  { name: 'Visa', src: '/icons/Visalogo.png' },
  { name: 'Mastercard', src: '/icons/Mastercardlogo.png' },
  { name: 'PayPal', src: '/icons/Paypallogo.png' },
  { name: 'Apple Pay', src: '/icons/Applepaylogo.png' },
  { name: 'Google Pay', src: '/icons/Gpaylogo.png' }
]

const footerSections: FooterSection[] = [
  {
    title: 'Company',
    links: ['About', 'Features', 'Works', 'Career']
  },
  {
    title: 'Help',
    links: ['Customer Support', 'Delivery Details', 'Terms & Conditions', 'Privacy Policy']
  },
  {
    title: 'FAQ',
    links: ['Account', 'Manage Deliveries', 'Orders', 'Payments']
  },
  {
    title: 'Resources',
    links: ['Free eBooks', 'Development Tutorial', 'How to - Blog', 'Youtube Playlist']
  }
]

// Sub-components
const NewsletterSection: React.FC = () => (
  <div className="absolute left-0 right-0 transform -translate-y-1/2 px-4 z-10">
    <div className="max-w-7xl mx-auto">
      <div className="bg-black text-white rounded-lg p-6 md:p-8 flex flex-col md:flex-row md:items-center md:justify-between shadow-lg">
        <div className="mb-6 sm:mb-0">
          <h2 className="text-xl md:text-2xl lg:text-3xl font-bold leading-tight">
            {FOOTER_CONFIG.newsletter.title.split(' ').map((word, index, array) => 
              index === Math.floor(array.length / 2) ? (
                <React.Fragment key={index}><br />{word} </React.Fragment>
              ) : `${word} `
            )}
          </h2>
        </div>
        <NewsletterForm />
      </div>
    </div>
  </div>
)

const NewsletterForm: React.FC = () => (
  <div className="w-full md:w-auto">
    <div className="flex flex-col gap-3 w-full">
      <input
        type="email"
        placeholder={FOOTER_CONFIG.newsletter.placeholder}
        className="px-4 py-3 rounded-full text-black w-full bg-white placeholder-gray-500"
        aria-label="Email address for newsletter"
      />
      <button className="bg-white text-black font-medium px-6 py-3 rounded-full whitespace-nowrap hover:bg-gray-100 transition-colors w-full md:w-auto">
        {FOOTER_CONFIG.newsletter.buttonText}
      </button>
    </div>
  </div>
)


const BrandSection: React.FC = () => (
  <div className="col-span-2 sm:col-span-1">
    <h3 className="text-2xl font-bold mb-4">{FOOTER_CONFIG.brand.name}</h3>
    <p className="text-gray-600 mb-6">
      {FOOTER_CONFIG.brand.description}
    </p>
    <SocialLinks />
  </div>
)

const SocialLinks: React.FC = () => (
  <div className="flex space-x-4">
    {socialIcons.map((icon) => (
      <Link 
        key={icon.name} 
        href={icon.href || '#'} 
        className="text-black hover:text-gray-600 transition-colors"
        aria-label={`Visit our ${icon.name} page`}
      >
        <Image 
          src={icon.src} 
          alt={`${icon.name} logo`} 
          width={28} 
          height={28}
          className="hover:scale-110 transition-transform"
        />
      </Link>
    ))}
  </div>
)

const FooterLinksGrid: React.FC = () => (
  <>
    {footerSections.map((section) => (
      <FooterLinkSection key={section.title} section={section} />
    ))}
  </>
)

const FooterLinkSection: React.FC<{ section: FooterSection }> = ({ section }) => (
  <div>
    <h4 className="text-sm font-semibold mb-4 uppercase">{section.title}</h4>
    <ul className="space-y-2">
      {section.links.map((link) => (
        <li key={link}>
          <Link 
            href="#" 
            className="text-gray-600 hover:text-black transition-colors"
          >
            {link}
          </Link>
        </li>
      ))}
    </ul>
  </div>
)

const PaymentMethods: React.FC = () => (
  <div className="flex items-center space-x-2">
    {paymentMethods.map((method) => (
      <div key={method.name} className="hover:scale-105 transition-transform">
        <Image 
          src={method.src}
          alt={method.name}
          width={46}
          height={30}
          className="rounded"
        />
      </div>
    ))}
  </div>
)

const CopyrightSection: React.FC = () => (
  <div className="mt-12 pt-8 border-t border-gray-200 flex flex-col md:flex-row justify-between items-center">
    <p className="text-gray-500 text-sm mb-4 md:mb-0">
      {FOOTER_CONFIG.copyright}
    </p>
    <PaymentMethods />
  </div>
)

// Main Footer Component
const Footer: React.FC = () => {
  return (
    <div className="relative pt-24">
      <NewsletterSection />
      
      <footer className="w-full bg-gray-100 pt-24 pb-12">
        <div className="max-w-7xl mx-auto px-4 mt-12">
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8">
            <BrandSection />
            <FooterLinksGrid />
          </div>
          
          <CopyrightSection />
        </div>
      </footer>
    </div>
  )
}

export default Footer