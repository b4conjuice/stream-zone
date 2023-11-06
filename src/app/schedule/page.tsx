'use client'

import { useState } from 'react'
import format from 'date-fns/format'

import Layout from '@/components/layout'
import { Main } from '@/components/ui'
import { useNBASchedule } from '@/lib/useNBA'
import {
  CalendarIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
} from '@heroicons/react/24/solid'
import { addDays, isSameDay, subDays } from 'date-fns'
import useLocalStorage from '@/lib/useLocalStorage'

export default function SchedulePage() {
  const today = new Date()
  const [filterType, setFilterType] = useLocalStorage<'my-team' | 'all'>(
    'sz-schedule-filterType',
    'all'
  )
  const [scheduleType, setScheduleType] = useLocalStorage<'daily' | 'weekly'>(
    'sz-schedule-scheduleType',
    'daily'
  )
  const [date, setDate] = useState(today)
  const formattedDate = format(date, 'yyyy-MM-dd')
  const { data: games } = useNBASchedule({
    start: formattedDate,
  })
  console.log({ games })
  return (
    <Layout>
      <Main className='space-y-2 px-2'>
        <div>
          <label
            htmlFor='checked'
            className='inline-flex cursor-pointer items-center justify-center space-x-3'
          >
            <span className={filterType === 'all' ? 'text-gray-500' : ''}>
              my team
            </span>
            <span className='relative'>
              <span className='block h-6 w-10 rounded-full bg-cb-yellow shadow-inner' />
              <span
                className={`focus-within:shadow-outline absolute inset-y-0 left-0 ml-1 mt-1 block h-4 w-4 rounded-full bg-cb-blue shadow transition-transform duration-300 ease-in-out ${
                  filterType === 'all' ? 'translate-x-full transform' : ''
                }`}
              >
                <input
                  id='checked'
                  type='checkbox'
                  checked
                  onChange={() =>
                    setFilterType(filterType === 'all' ? 'my-team' : 'all')
                  }
                  className='absolute h-0 w-0 opacity-0'
                />
              </span>
            </span>
            <span className={filterType === 'my-team' ? 'text-gray-500' : ''}>
              all
            </span>
          </label>
        </div>
        <div>
          <label
            htmlFor='checked'
            className='inline-flex cursor-pointer items-center justify-center space-x-3'
          >
            <span className={scheduleType === 'weekly' ? 'text-gray-500' : ''}>
              daily
            </span>
            <span className='relative'>
              <span className='block h-6 w-10 rounded-full bg-cb-yellow shadow-inner' />
              <span
                className={`focus-within:shadow-outline absolute inset-y-0 left-0 ml-1 mt-1 block h-4 w-4 rounded-full bg-cb-blue shadow transition-transform duration-300 ease-in-out ${
                  scheduleType === 'weekly' ? 'translate-x-full transform' : ''
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
        </div>
        <div>type: {scheduleType}</div>
        <div className='flex items-center'>
          <input
            type='date'
            className='w-full bg-cb-blue'
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
        <ul className='space-y-1'>
          {games?.data.map(
            ({
              id,
              visitor_team,
              home_team,
              visitor_team_score,
              home_team_score,
            }) => (
              <li
                key={id}
              >{`${visitor_team.abbreviation} @ ${home_team.abbreviation} ${visitor_team_score}-${home_team_score}`}</li>
            )
          )}
        </ul>
      </Main>
    </Layout>
  )
}
