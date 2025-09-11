import React from 'react'
import PropTypes from 'prop-types'
import Image from 'next/image'
import Link from 'next/link'

/* ---------------- helpers ---------------- */
const getSrc = (img, fallback = '') =>
  typeof img === 'string' ? img : (img && img.url) || fallback

const toLinks = (links) => {
  if (!Array.isArray(links)) return []
  // รองรับทั้ง string[] และ [{label, href}]
  return typeof links[0] === 'string'
    ? links.map((label) => ({ label }))
    : links
}

/* ---------------- sub-components ---------------- */
function NewsletterForm({ placeholder, buttonText }) {
  return (
    <div className="w-full md:w-auto">
      <div className="flex flex-col gap-3 w-full">
        <input
          type="email"
          placeholder={placeholder || 'Enter your email address'}
          className="px-4 py-3 rounded-full text-black w-full bg-white placeholder-gray-500"
          aria-label="Email address for newsletter"
        />
        <button className="bg-white text-black font-medium px-6 py-3 rounded-full whitespace-nowrap hover:bg-gray-100 transition-colors w-full md:w-auto">
          {buttonText || 'Subscribe to Newsletter'}
        </button>
      </div>
    </div>
  )
}

NewsletterForm.propTypes = {
  placeholder: PropTypes.string,
  buttonText: PropTypes.string,
}

function NewsletterSection({ title, placeholder, buttonText }) {
  const text = title || 'STAY UP TO DATE ABOUT OUR LATEST OFFERS'
  const words = text.split(' ')
  const mid = Math.floor(words.length / 2)

  return (
    <div className="absolute left-0 right-0 transform -translate-y-1/2 px-4 z-10">
      <div className="max-w-7xl mx-auto">
        <div className="bg-black text-white rounded-lg p-6 md:p-8 flex flex-col md:flex-row md:items-center md:justify-between shadow-lg">
          <div className="mb-6 sm:mb-0">
            <h2 className="text-xl md:text-2xl lg:text-3xl font-bold leading-tight">
              {words.map((word, i) =>
                i === mid ? (
                  <React.Fragment key={i}>
                    <br />
                    {word + ' '}
                  </React.Fragment>
                ) : (
                  word + ' '
                )
              )}
            </h2>
          </div>
          <NewsletterForm placeholder={placeholder} buttonText={buttonText} />
        </div>
      </div>
    </div>
  )
}

NewsletterSection.propTypes = {
  title: PropTypes.string,
  placeholder: PropTypes.string,
  buttonText: PropTypes.string,
}

function SocialLinks({ icons = [] }) {
  return (
    <div className="flex space-x-4">
      {icons.map((icon) => {
        const src = getSrc(icon.icon) || icon.src || ''
        if (!src) return null
        return (
          <Link
            key={icon.name}
            href={icon.href || '#'}
            className="text-black hover:text-gray-600 transition-colors"
            aria-label={`Visit our ${icon.name} page`}
          >
            <Image
              src={src}
              alt={`${icon.name} logo`}
              width={28}
              height={28}
              className="hover:scale-110 transition-transform"
            />
          </Link>
        )
      })}
    </div>
  )
}

SocialLinks.propTypes = {
  icons: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      icon: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.shape({ url: PropTypes.string }),
      ]),
      src: PropTypes.string,
      href: PropTypes.string,
    })
  ),
}

function BrandSection({ brand, socialIcons }) {
  return (
    <div className="col-span-2 sm:col-span-1">
      <h3 className="text-2xl font-bold mb-4">{brand?.name || 'SHOP.CO'}</h3>
      <p className="text-gray-600 mb-6">
        {brand?.description ||
          'We provide gaming gear that enhances your playstyle and makes you proud to use — from keyboards to chairs.'}
      </p>
      <SocialLinks icons={socialIcons} />
    </div>
  )
}

BrandSection.propTypes = {
  brand: PropTypes.shape({
    name: PropTypes.string,
    description: PropTypes.string,
  }),
  socialIcons: SocialLinks.propTypes.icons,
}

function FooterLinkSection({ section }) {
  const links = toLinks(section.links)

  return (
    <div>
      <h4 className="text-sm font-semibold mb-4 uppercase">{section.title}</h4>
      <ul className="space-y-2">
        {links.map((link) => (
          <li key={typeof link === 'string' ? link : link.label}>
            <Link
              href={(link && link.href) || '#'}
              className="text-gray-600 hover:text-black transition-colors"
            >
              {typeof link === 'string' ? link : link.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}

FooterLinkSection.propTypes = {
  section: PropTypes.shape({
    title: PropTypes.string.isRequired,
    links: PropTypes.oneOfType([
      PropTypes.arrayOf(PropTypes.string),
      PropTypes.arrayOf(
        PropTypes.shape({
          label: PropTypes.string.isRequired,
          href: PropTypes.string,
        })
      ),
    ]).isRequired,
  }).isRequired,
}

function FooterLinksGrid({ sections = [] }) {
  return (
    <>
      {sections.map((section) => (
        <FooterLinkSection key={section.title} section={section} />
      ))}
    </>
  )
}

FooterLinksGrid.propTypes = {
  sections: PropTypes.arrayOf(FooterLinkSection.propTypes.section),
}

function PaymentMethods({ methods = [] }) {
  return (
    <div className="flex items-center space-x-2">
      {methods.map((m) => {
        const src = getSrc(m.icon) || m.src || ''
        if (!src) return null
        return (
          <div key={m.name} className="relative hover:scale-105 transition-transform w-[46px] h-[30px] ">
            <Image src={src} alt={m.name} fill sizes='46px' className="rounded object-contain"  />
          </div>
        )
      })}
    </div>
  )
}

PaymentMethods.propTypes = {
  methods: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      icon: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.shape({ url: PropTypes.string }),
      ]),
      src: PropTypes.string,
    })
  ),
}

function CopyrightSection({ text, paymentMethods }) {
  return (
    <div className="mt-12 pt-8 border-t border-gray-200 flex flex-col md:flex-row justify-between items-center">
      <p className="text-gray-500 text-sm mb-4 md:mb-0">
        {text || 'Shop.co © 2000-2023, All Rights Reserved'}
      </p>
      <PaymentMethods methods={paymentMethods} />
    </div>
  )
}

CopyrightSection.propTypes = {
  text: PropTypes.string,
  paymentMethods: PaymentMethods.propTypes.methods,
}

/* ---------------- Main Footer ---------------- */
export default function Footer({ data }) {
  const {
    brand,
    newsletter,
    socialIcons,
    paymentMethods,
    footerSections,
    copyright,
  } = data || {}

  return (
    <div className="relative pt-24">
      <NewsletterSection
        title={newsletter?.title}
        placeholder={newsletter?.placeholder}
        buttonText={newsletter?.buttonText}
      />

      <footer className="w-full bg-gray-100 pt-24 pb-12">
        <div className="max-w-7xl mx-auto px-4 mt-12">
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8">
            <BrandSection brand={brand} socialIcons={socialIcons} />
            <FooterLinksGrid sections={footerSections} />
          </div>

          <CopyrightSection text={copyright} paymentMethods={paymentMethods} />
        </div>
      </footer>
    </div>
  )
}

Footer.propTypes = {
  data: PropTypes.shape({
    brand: PropTypes.shape({
      name: PropTypes.string,
      description: PropTypes.string,
    }),
    newsletter: PropTypes.shape({
      title: PropTypes.string,
      placeholder: PropTypes.string,
      buttonText: PropTypes.string,
    }),
    socialIcons: SocialLinks.propTypes.icons,
    paymentMethods: PaymentMethods.propTypes.methods,
    footerSections: FooterLinksGrid.propTypes.sections,
    copyright: PropTypes.string,
  }),
}
