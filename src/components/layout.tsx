'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

import { Header } from '@/components/ui'
import links from '@/lib/links'

const DEFAULT_TITLE = 'stream zone'

const Layout = ({
  children,
  withHeader = true,
  withNav = true,
}: {
  title?: string
  children: React.ReactNode
  withHeader?: boolean
  withNav?: boolean
}) => {
  const pathname = usePathname()
  return (
    <>
      {withHeader && (
        <Header>
          {'/' === pathname ? (
            <span>{DEFAULT_TITLE}</span>
          ) : (
            <Link href='/' className='hover:text-cb-pink'>
              {DEFAULT_TITLE}
            </Link>
          )}
        </Header>
      )}
      {withNav && (
        <nav>
          <ul className='flex justify-center space-x-4'>
            {links.map(link => (
              <li key={link.href}>
                {link.href === pathname ? (
                  <span>{link.text}</span>
                ) : (
                  <Link
                    className='text-cb-pink hover:underline'
                    href={link.href}
                  >
                    {link.text}
                  </Link>
                )}
              </li>
            ))}
          </ul>
        </nav>
      )}
      {children}
    </>
  )
}

export default Layout
