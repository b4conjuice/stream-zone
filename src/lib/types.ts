export interface Player {
  name: string
  team: string
  position: string | string[]
}

export interface PlayerName {
  name: string
  position: never[]
}

export type Rank = {
  title: string
  items: Player[] | PlayerName[]
}
