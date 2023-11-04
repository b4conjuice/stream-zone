'use client'

import Link from 'next/link'
import { useRouter, usePathname } from 'next/navigation'

import Layout from '@/components/layout'
import { Main } from '@/components/ui'
import CommandPalette from '@/components/commandPalette'
import links from '@/lib/links'

export default function HomePage() {
  const router = useRouter()
  const pathname = usePathname()
  const commands = links.map(link => ({
    id: link.href,
    title: `Go to ${link.text}`,
    action: () => {
      router.push(link.href)
    },
  }))
  return (
    <Layout withNav={false}>
      <Main className='space-y-2 px-2'>
        <nav>
          <ul className='flex flex-col items-center space-y-4'>
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
      </Main>
      <CommandPalette commands={commands} />
    </Layout>
  )
}
