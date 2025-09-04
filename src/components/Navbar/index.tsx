'use client'
import React, { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Search, CircleUserRound, ShoppingCart } from 'lucide-react'

type Props = {
  data: any
  baseUrl?: string
  className?: string
}

type NavItem = { key: string; label: string; url: string }

/* ----------------------------- helpers ----------------------------- */
const DEFAULT_LINKS = { cart: '/cart', search: '/search', signin: '/signin' }

const resolveSrc = (url?: string, baseUrl?: string) => {
  if (!url) return ''
  return url.startsWith('http') ? url : `${baseUrl ?? ''}${url}`
}

const mapNav = (list: any[]): NavItem[] =>
  (Array.isArray(list) ? list : []).map((n: any, i: number) => ({
    key: String(n?.id ?? n?.path ?? n?.url ?? i),
    label: String(n?.text ?? '').trim(),
    url: String(n?.path ?? n?.url ?? '#'),
  }))

/* --------------------------- sub-components --------------------------- */
function MobileMenu({
  nav,
  open,
  onToggle,
  onClose,
}: {
  nav: NavItem[]
  open: boolean
  onToggle: () => void
  onClose: () => void
}) {
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

function DesktopNav({ nav }: { nav: NavItem[] }) {
  if (nav.length === 0) return null
  return (
    <nav className="mr-2 hidden md:flex lg:mr-7">
      <ul className="flex items-center space-x-1">
        {nav.map((item) => (
          <li key={item.key}>
            <Link
              href={item.url}
              className="block rounded px-3 py-2 font-medium text-gray-700 transition-all hover:bg-gray-50 hover:text-black"
            >
              {item.label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  )
}

function SearchBar() {
  return (
    <div className="mr-3 hidden max-w-sm flex-1 items-center rounded-full bg-gray-100 px-4 py-2 transition-colors hover:bg-gray-200 md:flex lg:mr-10">
      <Search className="h-5 w-5 text-gray-500" aria-hidden="true" />
      <input
        type="search"
        placeholder="Search for products..."
        className="ml-2 flex-1 bg-transparent outline-none placeholder:text-gray-500"
      />
    </div>
  )
}

function Actions({ links }: { links: typeof DEFAULT_LINKS }) {
  return (
    <div className="ml-auto flex items-center">
      <Link
        href={links.search}
        aria-label="Open search"
        className="mr-4 block rounded p-1 transition-colors hover:bg-gray-100 md:hidden"
      >
        <Search className="h-5 w-5 text-gray-500" aria-hidden="true" />
      </Link>

      <Link
        href={links.cart}
        aria-label="Cart"
        className="relative mr-3 rounded p-1 transition-colors hover:bg-gray-100"
      >
        <ShoppingCart className="h-5 w-5 text-gray-700" aria-hidden="true" />
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
export default function TopNavbar({ data, baseUrl, className = '' }: Props) {
  const [menuOpen, setMenuOpen] = useState(false)

  const logoSrc = resolveSrc(data?.logoPicture1?.url, baseUrl) || '/logo.svg'
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

        <DesktopNav nav={nav} />
        <SearchBar />
        <Actions links={links} />
      </div>
    </nav>
  )
}
