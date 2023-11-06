import useSWR, { type Fetcher } from 'swr'

import fetcher from '@/lib/fetcher'

const CURRENT_SEASON = 2023 // TODO
const PER_PAGE = 100 // TODO

const BALLDONTLIE_GAMES_API_URL = 'https://www.balldontlie.io/api/v1/games'

type Game = {
  id: number
  visitor_team: {
    abbreviation: string
  }
  home_team: {
    abbreviation: string
  }
  visitor_team_score: number
  home_team_score: number
  date: string
}

type NBASchedule = {
  data: Game[]
}

const fetchNBASchedule: Fetcher<NBASchedule, string> = (...args) =>
  fetcher(...args)

export const useNBASchedule = (params: {
  start: string
  end?: string
  team?: number | number[]
  season?: string
  postseason?: boolean
}) => {
  const { start, end, team, season, postseason } = params
  const searchParams = new URLSearchParams()

  searchParams.append('seasons[]', season ?? String(CURRENT_SEASON))
  searchParams.append('start_date', start)
  searchParams.append('end_date', end ?? start)
  searchParams.append('per_page', String(PER_PAGE))
  if (postseason) {
    searchParams.append('postseason', String(1))
  }
  if (team !== undefined) {
    if (typeof team === 'number') {
      searchParams.append('team_ids[]', String(team))
    } else {
      searchParams.append('team_ids[]', team.join(','))
    }
  }

  const scheduleURL = new URL(BALLDONTLIE_GAMES_API_URL)
  scheduleURL.search = searchParams.toString()
  const { data } = useSWR(scheduleURL.toString(), fetchNBASchedule)
  return {
    data,
  }
}

// export const useNBASchedule = (options = {}) => {
//   const { team, start, end, season, postseason } = options
//   const url = `https://www.balldontlie.io/api/v1/games?seasons[]=${
//     season || CURRENT_SEASON
//   }${team ? `&team_ids[]=${team}&per_page=${postseason ? '100' : '82'}` : ''}${
//     start
//       ? `&start_date=${start}&end_date=${end || start}&per_page=100`
//       : `&start_date=${startDate}&per_page=100`
//   }${postseason ? `&postseason=1` : ''}`
//   const { data, revalidate } = useSwr(url, fetcher)

//   const re = new RegExp('^(0?[1-9]|1[0-2]):([0-5][0-9]) ?([AaPp][Mm])')
//   const games = data?.data
//     .map(game => ({
//       ...game,
//       hour: getHour(game.status.match(re)),
//     }))
//     .sort(
//       team
//         ? (b, a) => new Date(b.date) - new Date(a.date)
//         : (b, a) => {
//             if (b.status === 'Final') {
//               if (a.status === 'Final') return 0
//               return 1
//             }
//             if (a.status === 'Final') {
//               return -1
//             }
//             if (b.status.includes(':')) {
//               if (a.status.includes(':')) {
//                 return b.hour - a.hour
//               }
//               return 1
//             }
//             if (a.status.includes(':')) {
//               return -1
//             }
//             return 0
//           }
//     )
//   return { data: games, meta: data?.meta, revalidate }
// }
