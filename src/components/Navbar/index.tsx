'use client'
import React, { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { CircleUserRound, ShoppingCart } from 'lucide-react'
import { useCart } from '@/context/CartContext'

/* ----------------------------- helpers ----------------------------- */
const DEFAULT_LINKS = { cart: '/cart', signin: '/signin' }

interface NavItem {
  key: string
  label: string
  url: string
}

const mapNav = (list: any[]): NavItem[] =>
  (Array.isArray(list) ? list : []).map((n, i) => {
    let url = String(n?.path ?? n?.url ?? '#')
    // Fix specific path issues
    if (url.toLowerCase() === '/aboutus') {
      url = '/about-us'
    }
    return {
      key: String(n?.id ?? n?.path ?? n?.url ?? i),
      label: String(n?.text ?? '').trim(),
      url,
    }
  })

/* --------------------------- sub-components --------------------------- */
interface MobileMenuProps {
  nav: NavItem[]
  open: boolean
  onToggle: () => void
  onClose: () => void
}

function MobileMenu({ nav, open, onToggle, onClose }: MobileMenuProps) {
  return (
    <div className="mr-2 block md:hidden">
      <button
        type="button"
        aria-label="Toggle menu"
        onClick={onToggle}
        className="p-2 focus:outline-none focus:ring-2 focus:ring-gray-300 focus:ring-offset-2"
      >
        <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d={open ? 'M6 18L18 6M6 6l12 12' : 'M4 6h16M4 12h16M4 18h16'}
          />
        </svg>
      </button>

      {open && (
        <div className="absolute inset-x-0 top-full z-40 max-h-screen overflow-y-auto border-t bg-white shadow-lg md:hidden">
          <div className="p-4">
            {nav.map((item) => (
              <div key={item.key} className="mb-4">
                <Link
                  href={item.url}
                  className="block py-2 text-lg font-medium text-gray-700 hover:text-black"
                  onClick={onClose}
                >
                  {item.label}
                </Link>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

interface DesktopNavProps {
  nav: NavItem[]
  currentPath: string
}

function DesktopNav({ nav, currentPath }: DesktopNavProps) {
  if (nav.length === 0) return null
  return (
    <nav className="flex-1 hidden md:flex md:justify-center lg:justify-start">
      <ul className="flex items-center space-x-1">
        {nav.map((item) => {
          const isActive = currentPath === item.url
          return (
            <li key={item.key}>
              <Link
                href={item.url}
                className={`block rounded px-3 py-2 font-medium transition-all relative after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-black after:transition-transform after:duration-300 ${
                  isActive
                    ? 'text-black after:scale-x-100'
                    : 'text-gray-700 hover:bg-gray-50 hover:text-black after:scale-x-0 hover:after:scale-x-100'
                }`}
              >
                {item.label}
              </Link>
            </li>
          )
        })}
      </ul>
    </nav>
  )
}

interface ActionsProps {
  links: { cart: string; signin: string }
}

function Actions({ links }: ActionsProps) {
  const { cart } = useCart()
  const cartCount = cart.reduce((total, item) => total + item.qty, 0)

  return (
    <div className="flex items-center flex-shrink-0">
      <Link
        href={links.cart}
        aria-label="Cart"
        className="relative mr-3 rounded p-1 transition-colors hover:bg-gray-100"
      >
        <ShoppingCart className="h-5 w-5 text-gray-700" aria-hidden="true" />
        {cartCount > 0 && (
          <span className="absolute -top-2 -right-2 bg-black text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
            {cartCount}
          </span>
        )}
      </Link>

      <Link
        href={links.signin}
        aria-label="Account"
        className="rounded p-1 transition-colors hover:bg-gray-100"
      >
        <CircleUserRound className="h-5 w-5 text-gray-700" aria-hidden="true" />
      </Link>
    </div>
  )
}

/* --------------------------------- main --------------------------------- */
interface TopNavbarProps {
  data?: any
  className?: string
}

export default function TopNavbar({ data, className = '' }: TopNavbarProps) {
  const [menuOpen, setMenuOpen] = useState(false)
  const pathname = usePathname()

  const logoSrc = data?.logoPicture1?.url || '/logo.svg'
  const nav = mapNav(data?.navigationLinks)
  const links = DEFAULT_LINKS

  return (
    <nav className={`sticky top-0 z-20 bg-white shadow-sm ${className}`}>
      <div className="relative mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-4 md:gap-8 md:py-6 xl:px-0">
        {/* left: mobile menu + logo */}
        <div className="flex items-center gap-4">
          <MobileMenu
            nav={nav}
            open={menuOpen}
            onToggle={() => setMenuOpen((v) => !v)}
            onClose={() => setMenuOpen(false)}
          />

          <Link href="/" className="inline-flex items-center h-10 w-10 md:h-18 md:w-16 ">
            <Image src={logoSrc} alt="Website Logo" width={100} height={100} priority />
          </Link>
        </div>

        <DesktopNav nav={nav} currentPath={pathname} />
        <Actions links={links} />
      </div>
    </nav>
  )
}
