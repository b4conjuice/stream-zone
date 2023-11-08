import useSWR, { type Fetcher } from 'swr'

import fetcher from '@/lib/fetcher'

const CURRENT_SEASON = 2023 // TODO
const PER_PAGE = 100 // TODO

const BALLDONTLIE_GAMES_API_URL = 'https://www.balldontlie.io/api/v1/games'
const BALLDONTLIE_PLAYERS_API_URL = 'https://www.balldontlie.io/api/v1/players'

type Game = {
  id: number
  visitor_team: {
    id: number
    abbreviation: string
  }
  home_team: {
    id: number
    abbreviation: string
  }
  visitor_team_score: number
  home_team_score: number
  date: string
  status: string
}

type NBAScheduleResponse = {
  data: Game[]
}

const fetchNBASchedule: Fetcher<NBAScheduleResponse, string> = (...args) =>
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
      team.forEach(teamId => {
        searchParams.append('team_ids[]', String(teamId))
      })
    }
  }

  const scheduleURL = new URL(BALLDONTLIE_GAMES_API_URL)
  scheduleURL.search = searchParams.toString()
  const { data } = useSWR(scheduleURL.toString(), fetchNBASchedule)
  return {
    data,
  }
}

export const useNBAPlayer = (params: { id: number; season: number }) => {
  const { id, season } = params
  const { data: player } = useSWR(
    id ? `${BALLDONTLIE_PLAYERS_API_URL}/${id}` : null,
    fetcher
  )
  return player
  // const { data: seasonStats } = useSwr(
  //   id
  //     ? `https://www.balldontlie.io/api/v1/season_averages?&seasons[]=${season}&player_ids[]=${id}&start_date=${startDate}`
  //     : null,
  //   fetcher
  // )
  // const { data: stats } = useSwr(
  //   id
  //     ? `https://www.balldontlie.io/api/v1/stats?&per_page=100&seasons[]=${season}&player_ids[]=${id}&start_date=${startDate}`
  //     : null,
  //   fetcher
  // )
  // return player && stats && seasonStats
  //   ? {
  //       ...player,
  //       season: seasonStats.data[0],
  //       stats: stats.data.sort(
  //         (b, a) => new Date(a.game.date) - new Date(b.game.date)
  //       ),
  //     }
  //   : undefined
}

type PlayerResponse = {
  id: number
  first_name: string
  last_name: string
  team: {
    id: number
  }
}

type PlayersSearchResponse = {
  data: PlayerResponse[]
}

const searchNBAPlayers: Fetcher<PlayersSearchResponse, string> = (...args) =>
  fetcher(...args)

export const useSearchNBAPlayers = (name: string) => {
  const { data } = useSWR(
    name ? `https://www.balldontlie.io/api/v1/players?search=${name}` : null,
    searchNBAPlayers
  )
  return data?.data ?? []
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
