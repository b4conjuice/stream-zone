'use client'

import { useEffect, useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { Combobox } from '@headlessui/react'
import { TrashIcon, MagnifyingGlassIcon } from '@heroicons/react/24/solid'
import classnames from 'classnames'
import Fuse from 'fuse.js'
// import useSwr, { type Fetcher } from 'swr'

import Layout from '@/components/layout'
import { Main } from '@/components/ui'
import espnRank, { toString } from '@/data/espnRank'
import useLocalStorage from '@/lib/useLocalStorage'
import { type Player } from '@/lib/types'

// const fetcher = (...args) => fetch(...args).then(res => res.json())

// Make the `request` function generic
// to specify the return data type:
// function fetcher<TResponse>(
//   url: string,
//   // `RequestInit` is a type for configuring
//   // a `fetch` request. By default, an empty object.
//   config: RequestInit = {}

//   // This function is async, it will return a Promise:
// ): Promise<TResponse> {
//   // Inside, we call the `fetch` function with
//   // a URL and config given:
//   return (
//     fetch(url, config)
//       // When got a response call a `json` method on it
//       .then(response => response.json())
//       // and return the result data.
//       .then(data => data as TResponse)
//   )

//   // We also can use some post-response
//   // data-transformations in the last `then` clause.
// }

// type Results = {
//   data: {
//     first_name: string
//     last_name: string
//     position: string
//   }
// }

// const fetcher: Fetcher<Results, string> = (name: string) =>
//   `https://www.balldontlie.io/api/v1/players?search=${name}`

// const useSearchNBAPlayers = (name: string) => {
//   const { data } = useSwr(
//     name ? `https://www.balldontlie.io/api/v1/players?search=${name}` : null,
//     fetcher
//   )
//   console.log({ data })
//   return data?.data || []
// }

const Depth = ({ team }: { team: Player[] }) => {
  const positions = ['PG', 'SG', 'SF', 'PF', 'C']
  const getPlayersByPosition = (position: string) => {
    const playersByPosition = team
      .filter(player => {
        const { position: playerPosition } = player
        if (typeof playerPosition === 'string') {
          return playerPosition.includes(position)
        } else {
          return playerPosition.some(pos => pos === position)
        }
      })
      .map(player => player.name)
    return playersByPosition.length > 0
      ? `${playersByPosition.join(' ')} (${playersByPosition.length})`
      : ''
  }
  return (
    <div className='flex w-full'>
      <div className='w-12'>
        <table className='w-full table-fixed border-r-4 border-gray-400'>
          <tbody>
            {positions.map(position =>
              getPlayersByPosition(position) ? (
                <tr key={position} className='odd:bg-cb-blue'>
                  <td className='py-1 text-center'>{position}</td>
                </tr>
              ) : null
            )}
          </tbody>
        </table>
      </div>
      <div className='flex flex-grow overflow-x-auto'>
        <table className='w-full'>
          <tbody>
            {positions.map(position =>
              getPlayersByPosition(position) ? (
                <tr key={position} className='px-1 odd:bg-cb-blue'>
                  {team
                    .filter(player => {
                      const { position: playerPosition } = player
                      if (typeof playerPosition === 'string') {
                        return playerPosition.includes(position)
                      } else {
                        return playerPosition.some(pos => pos === position)
                      }
                    })
                    .map(player => (
                      <td
                        key={player.name}
                        className='max-w-sm truncate px-1 py-1 text-center'
                      >
                        <a className='hover:text-cb-yellow'>
                          {toString(player, { short: true })}
                        </a>
                      </td>
                    ))}
                </tr>
              ) : null
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default function TeamPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const query = searchParams.get('q')
  const [search, setSearch] = useState(query ?? '')
  useEffect(() => {
    if (query) {
      setSearch(query)
    }
  }, [query])
  const [selectedPlayer, setSelectedPlayer] = useState<Player | null>(null)
  const [players, setPlayers] = useLocalStorage<Player[]>(
    'stream-zone-players',
    []
  )

  // const results = useSearchNBAPlayers(search)
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
          {players && players.length > 0 && <Depth team={players} />}
          {/* <input
            type='text'
            className='w-full bg-cb-blue'
            placeholder='search'
            value={search}
            onChange={e => {
              const { value } = e.target
              setSearch(value)
              const url = `/wl${value ? `?q=${value}` : ''}`
              router.push(url)
            }}
          />
          {!search ? null : !results ? (
            <p>loading</p>
          ) : (
            <ul className='divide-y divide-cb-dusty-blue'>
              {results.map(player => (
                // <li key={player.id} className='flex items-center space-x-4 p-2'>
                //   {`${player.first_name} ${player.last_name}`}
                // </li>
                <li key={player.name} className='flex items-center space-x-4 p-2'>
                  {player.name}
                </li>
              ))}
            </ul>
          )} */}
          <Combobox
            as='div'
            value={selectedPlayer}
            onChange={(player: Player) => {
              setSelectedPlayer(null)
              setPlayers([...players, player])
              setSearch('')
              const url = '/team'
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
                  const url = `/team${value ? `?q=${value}` : ''}`
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
