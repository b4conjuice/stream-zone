'use client'

import { useEffect, useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { Combobox } from '@headlessui/react'
import {
  TrashIcon,
  MagnifyingGlassIcon,
  CalendarIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
} from '@heroicons/react/24/solid'
import classnames from 'classnames'
import Fuse from 'fuse.js'
// import useSwr, { type Fetcher } from 'swr'
import {
  addDays,
  eachDayOfInterval,
  endOfWeek,
  isSameDay,
  startOfWeek,
  subDays,
} from 'date-fns'

import Layout from '@/components/layout'
import { Main } from '@/components/ui'
import espnRank, { toString } from '@/data/espnRank'
import useLocalStorage from '@/lib/useLocalStorage'
import { type Player } from '@/lib/types'
import { useSearchNBAPlayers, useNBASchedule } from '@/lib/useNBA'
import { format } from 'date-fns'

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

const Table = (params: {
  leftHeaders: Array<string | null>
  rows: Array<Array<React.ReactNode | null | undefined> | null | undefined>
  leftHeaderClassName?: string
}) => {
  const { leftHeaders, rows, leftHeaderClassName } = params
  return (
    <div className='flex w-full'>
      <div className={classnames(leftHeaderClassName)}>
        <table className='w-full table-fixed border-r-4 border-gray-400'>
          <tbody>
            {leftHeaders.map(leftHeader =>
              leftHeader ? (
                <tr key={leftHeader} className='odd:bg-cb-blue'>
                  <td className='py-1 text-center'>{leftHeader}</td>
                </tr>
              ) : null
            )}
          </tbody>
        </table>
      </div>
      <div className='flex flex-grow overflow-x-auto'>
        <table className='w-full'>
          <tbody>
            {rows?.map((row, index) => (
              <tr key={index} className='px-1 odd:bg-cb-blue'>
                {row && row.length > 0 ? (
                  row.map((column, colindex) => (
                    <td
                      key={colindex}
                      className='max-w-sm truncate px-1 py-1 text-center'
                    >
                      {column}
                    </td>
                  ))
                ) : (
                  <td className='max-w-sm truncate px-1 py-1 text-center'>
                    --
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

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
  const rows = positions.map(position =>
    getPlayersByPosition(position)
      ? team
          .filter(player => {
            const { position: playerPosition } = player
            if (typeof playerPosition === 'string') {
              return playerPosition.includes(position)
            } else {
              return playerPosition.some(pos => pos === position)
            }
          })
          .map(player => (
            <a key={player.name} className='hover:text-cb-yellow'>
              {toString(player, { short: true })}
            </a>
          ))
      : null
  )
  return (
    <Table
      leftHeaders={positions.map(position =>
        getPlayersByPosition(position) ? position : null
      )}
      rows={rows}
      leftHeaderClassName='w-12'
    />
  )
}

type PlayerFromAPI = Player & {
  id: number
  teamId: number
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
  const [players, setPlayers] = useLocalStorage<PlayerFromAPI[]>(
    'sz-team-players',
    []
  )
  const [scheduleType, setScheduleType] = useLocalStorage<'daily' | 'weekly'>(
    'sz-team-scheduleType',
    'daily'
  )

  const teamIds = players ? players?.map(({ teamId }) => teamId) : undefined
  const today = new Date()
  const [date, setDate] = useState(today)
  const formattedDate = format(date, 'yyyy-MM-dd')
  const startDateOfWeek = startOfWeek(date, { weekStartsOn: 1 })
  const formattedStartOfWeek = format(startDateOfWeek, 'yyyy-MM-dd')
  const endDateOfWeek = endOfWeek(date, { weekStartsOn: 1 })
  const formattedEndOfWeek = format(endDateOfWeek, 'yyyy-MM-dd')
  const startDate =
    scheduleType === 'weekly' ? formattedStartOfWeek : formattedDate
  const endDate = scheduleType === 'weekly' ? formattedEndOfWeek : undefined

  const { data: games } = useNBASchedule({
    start: startDate,
    end: endDate,
    team: teamIds,
  })
  const days = eachDayOfInterval({
    start: startDateOfWeek,
    end: endDateOfWeek,
  })
  console.log({ games, days })

  // const results = useSearchNBAPlayers(search)
  const fuse = new Fuse(espnRank, {
    keys: [{ name: 'name', weight: 2 }, 'team', 'position'],
  })

  // const results: Player[] = !search
  //   ? []
  //   : fuse.search(search.toLowerCase()).map(({ item }) => item)

  const resultsFromAPI = useSearchNBAPlayers(search)

  const results: Player[] = !search
    ? []
    : espnRank
        .filter(espnPlayer => {
          return resultsFromAPI.some(
            apiPlayer =>
              espnPlayer.name ===
              `${apiPlayer.first_name} ${apiPlayer.last_name}`
          )
        })
        .map(espnPlayer => {
          const apiPlayer = resultsFromAPI.find(
            apiPlayer =>
              espnPlayer.name ===
              `${apiPlayer.first_name} ${apiPlayer.last_name}`
          )
          return {
            ...espnPlayer,
            id: apiPlayer?.id ?? 0,
            teamId: apiPlayer?.team?.id ?? 0,
          }
        })

  // console.log({
  //   search,
  //   results,
  //   resultsFromAPI,
  // })

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
            onChange={(player: PlayerFromAPI) => {
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
          <div className='flex justify-between'>
            <label
              htmlFor='checked'
              className='inline-flex cursor-pointer items-center justify-center space-x-3'
            >
              <span
                className={scheduleType === 'weekly' ? 'text-gray-500' : ''}
              >
                daily
              </span>
              <span className='relative'>
                <span className='block h-6 w-10 rounded-full bg-cb-yellow shadow-inner' />
                <span
                  className={`focus-within:shadow-outline absolute inset-y-0 left-0 ml-1 mt-1 block h-4 w-4 rounded-full bg-cb-blue shadow transition-transform duration-300 ease-in-out ${
                    scheduleType === 'weekly'
                      ? 'translate-x-full transform'
                      : ''
                  }`}
                >
                  <input
                    id='checked'
                    type='checkbox'
                    checked
                    onChange={() =>
                      setScheduleType(
                        scheduleType === 'weekly' ? 'daily' : 'weekly'
                      )
                    }
                    className='absolute h-0 w-0 opacity-0'
                  />
                </span>
              </span>
              <span className={scheduleType === 'daily' ? 'text-gray-500' : ''}>
                weekly
              </span>
            </label>
            <div className='flex items-center'>
              <input
                type='date'
                className='bg-cb-blue'
                value={formattedDate}
                onChange={e => {
                  const newDate = e.target.value
                  const [year, month, day] = newDate
                    .split('-')
                    .map(d => parseInt(d, 10))
                  if (year && month) {
                    setDate(new Date(year, month - 1, day))
                  }
                }}
              />
              <button
                type='button'
                className='px-2'
                onClick={() => {
                  setDate(subDays(date, 1))
                }}
              >
                <ChevronLeftIcon className='h-6 w-6 text-cb-yellow' />
              </button>
              <button
                type='button'
                className='px-2 disabled:pointer-events-none disabled:opacity-25'
                disabled={isSameDay(date, today)}
              >
                <CalendarIcon
                  className='h-6 w-6 text-cb-yellow'
                  onClick={() => {
                    setDate(today)
                  }}
                />
              </button>
              <button
                type='button'
                className='px-2'
                onClick={() => {
                  setDate(addDays(date, 1))
                }}
              >
                <ChevronRightIcon className='h-6 w-6 text-cb-yellow' />
              </button>
            </div>
          </div>
          {players &&
            players.length > 0 &&
            (scheduleType === 'weekly' ? (
              <Table
                leftHeaders={[
                  'player',
                  ...players.map(
                    player =>
                      `${player.name} ${
                        typeof player.position === 'string'
                          ? player.position
                          : player.position.join(', ')
                      }`
                  ),
                ]}
                rows={[
                  days.map(day => format(day, 'EEE M/d')),
                  ...players.map(player =>
                    days.map(day => {
                      const game = games?.data.find(
                        game =>
                          (game.home_team.id === player.teamId ||
                            game.visitor_team.id === player.teamId) &&
                          isSameDay(new Date(game.date.replace('Z', '')), day)
                      )
                      return game
                        ? `${
                            game.home_team.id === player.teamId ? 'VS' : '@'
                          } ${
                            game.home_team.id === player.teamId
                              ? game.visitor_team.abbreviation
                              : game.home_team.abbreviation
                          } ${
                            game.status === 'Final'
                              ? `${game.visitor_team_score}-${game.home_team_score}`
                              : format(new Date(game.status), 'h:mm a')
                          }`
                        : '--'
                    })
                  ),
                ]}
                leftHeaderClassName='w-64'
              />
            ) : (
              <Table
                leftHeaders={players.map(
                  player =>
                    `${player.name} ${
                      typeof player.position === 'string'
                        ? player.position
                        : player.position.join(', ')
                    }`
                )}
                rows={players.map(
                  player =>
                    games?.data
                      .filter(
                        game =>
                          game.home_team.id === player.teamId ||
                          game.visitor_team.id === player.teamId
                      )
                      .map(
                        game =>
                          `${
                            game.home_team.id === player.teamId ? 'VS' : '@'
                          } ${
                            game.home_team.id === player.teamId
                              ? game.visitor_team.abbreviation
                              : game.home_team.abbreviation
                          } ${
                            game.status === 'Final'
                              ? `${game.visitor_team_score}-${game.home_team_score}`
                              : format(new Date(game.status), 'h:mm a')
                          }`
                      )
                )}
                leftHeaderClassName='w-64'
              />
            ))}
          {players && players.length > 0 && (
            <ul className='divide-y divide-cb-dusty-blue'>
              {players.map((player, index) => {
                const game = games?.data.find(
                  game =>
                    game.home_team.id === player.teamId ||
                    game.visitor_team.id === player.teamId
                )
                const gameText = game
                  ? `${game.visitor_team.abbreviation} @ ${
                      game.home_team.abbreviation
                    } ${
                      game.status === 'Final'
                        ? `${game.visitor_team_score}-${game.home_team_score}`
                        : format(new Date(game.status), 'h:mm a')
                    }`
                  : ''
                return (
                  <li
                    key={player.name}
                    className='flex items-center justify-between p-2'
                  >
                    <span>
                      {player.name} {player.team}{' '}
                      {typeof player.position === 'string'
                        ? player.position
                        : player.position.join(', ')}
                    </span>

                    <div className='flex items-center space-x-2'>
                      {game && <span>{gameText}</span>}
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
                    </div>
                  </li>
                )
              })}
            </ul>
          )}
        </div>
      </Main>
    </Layout>
  )
}
