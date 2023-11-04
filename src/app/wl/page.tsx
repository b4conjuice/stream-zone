'use client'

import { useEffect, useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { Combobox } from '@headlessui/react'
import { TrashIcon, MagnifyingGlassIcon } from '@heroicons/react/24/solid'
import classnames from 'classnames'
import Fuse from 'fuse.js'

import Layout from '@/components/layout'
import { Main } from '@/components/ui'
import espnRank, { toString } from '@/data/espnRank'
import useLocalStorage from '@/lib/useLocalStorage'
import { type Player } from '@/lib/types'

export default function WatchlistPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const query = searchParams.get('q')
  const [search, setSearch] = useState(query ?? '')
  useEffect(() => {
    if (query) {
      setSearch(query)
    }
  }, [query])
  const [players, setPlayers] = useLocalStorage<Player[]>(
    'stream-zone-watchlist',
    []
  )

  const fuse = new Fuse(espnRank, {
    keys: [{ name: 'name', weight: 2 }, 'team', 'position'],
  })

  const results: Player[] = !search
    ? []
    : fuse.search(search.toLowerCase()).map(({ item }) => item)

  console.log({
    search,
    results,
  })

  return (
    <Layout>
      <Main className='space-y-2 px-2'>
        <div className='flex flex-col space-y-4'>
          <Combobox
            as='div'
            onChange={(player: Player) => {
              setPlayers([...players, player])
              setSearch('')
              const url = '/wl'
              router.push(url)
            }}
            className='relative mx-auto w-full max-w-lg divide-y divide-cb-dusty-blue overflow-hidden rounded-xl bg-cb-blue ring-1 ring-cb-mint'
          >
            <div className='flex items-center space-x-2 px-4'>
              <MagnifyingGlassIcon className='h-6 w-6 text-cb-yellow' />
              <Combobox.Input
                onChange={e => {
                  const { value } = e.target
                  setSearch(value)
                  const url = `/wl${value ? `?q=${value}` : ''}`
                  router.push(url)
                }}
                className='h-12 w-full border-0 bg-transparent placeholder-cb-yellow/75 focus:outline-0 focus:ring-0'
                placeholder='add player'
                value={search}
              />
            </div>
            {results.length > 0 && (
              <Combobox.Options
                static
                className='max-h-40 overflow-y-auto py-4'
              >
                {results.map(player => {
                  const disabled =
                    players?.findIndex(p => p.name === player.name) !== -1
                  return (
                    <Combobox.Option
                      key={player.name}
                      value={player}
                      disabled={disabled}
                    >
                      {({ active }) => {
                        return (
                          <div
                            className={classnames(
                              'space-x-1 px-4 py-2',
                              active ? 'bg-cb-yellow' : 'bg-cb-blue',
                              disabled ? 'text-cb-dusty-blue' : ''
                            )}
                          >
                            <span
                              className={classnames(
                                'font-medium',
                                active ? 'text-cb-blue' : ''
                              )}
                            >
                              {toString(player)}
                            </span>
                          </div>
                        )
                      }}
                    </Combobox.Option>
                  )
                })}
              </Combobox.Options>
            )}
            {search && results.length === 0 && (
              <p className='p-4 text-sm'>no results found</p>
            )}
          </Combobox>
          {players && players.length > 0 && (
            <ul className='divide-y divide-cb-dusty-blue'>
              {players.map((player, index) => (
                <li
                  key={player.name}
                  className='flex items-center justify-between space-x-4 p-2'
                >
                  {player.name} {player.team}{' '}
                  {typeof player.position === 'string'
                    ? player.position
                    : player.position.join(', ')}
                  <button
                    type='button'
                    onClick={() => {
                      const newPlayers = [...players]
                      newPlayers.splice(index, 1)
                      setPlayers(newPlayers)
                    }}
                  >
                    <TrashIcon className='h-6 w-6 text-red-600' />
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
      </Main>
    </Layout>
  )
}
