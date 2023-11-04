'use client'

import {
  type Dispatch,
  type SetStateAction,
  useRef,
  useState,
  useEffect,
} from 'react'
import Link from 'next/link'
import {
  CogIcon,
  HomeIcon,
  PlusCircleIcon,
  TrashIcon,
} from '@heroicons/react/24/solid'
import classnames from 'classnames'

import { Main } from '@/components/ui'
import DragDropList from '@/components/dragDropList'
import DraftListItem from '@/components/draftListItem'
import CommandPalette from '@/components/commandPalette'
import espnRank from '@/data/espnRank'
import espnRankWithinDraft from '@/data/espnRankWithinDraft'
import hashtagRank from '@/data/hashtagRank'
import useLocalStorage from '@/lib/useLocalStorage'
import hashtagASTRank from '@/data/hashtagPuntASTRank'
import hashtagBLKRank from '@/data/hashtagPuntBLKRank'
import Modal from '@/components/modal'
import Button from '@/components/ui/design/button'

interface Player {
  name: string
  team: string
  position: string | string[]
}

interface PlayerName {
  name: string
  position: never[]
}

type Rank = {
  title: string
  items: Player[]
}

const normalizePlayerName = (player: Player) => {
  const names: Record<string, string> = {
    'Robert Williams': 'Robert Williams III',
    'PJ Washington': 'P.J. Washington',
    'Nicolas Claxton': 'Nic Claxton',
    'Jabari Smith Jr': 'Jabari Smith Jr.',
    'OG Anunoby': 'O.G. Anunoby',
    'Alperen Sengün': 'Alperen Sengun',
  }
  const newName = names[player.name]
  return {
    ...player,
    name: newName ?? player.name,
  }
}

const ranks = [
  // {
  //   title: 'espn (draft)',
  //   items: espnRankWithinDraft.map(normalizePlayerName),
  // },
  {
    title: 'hashtag',
    items: hashtagRank.map(normalizePlayerName),
  },
  {
    title: 'ht punt AST',
    items: hashtagASTRank.map(normalizePlayerName),
  },
  {
    title: 'ht punt BLK',
    items: hashtagBLKRank.map(normalizePlayerName),
  },
]

const projections: Rank = {
  title: 'espn',
  // items: espnRank,
  // items: espnRank.slice(0, 300),
  items: espnRankWithinDraft.map(playerr => {
    const player = espnRank.find(p => p.name === playerr.name)
    if (player) return player
    else return { name: playerr.name, team: '', position: [] }
  }),
}

const PlusMinus = ({
  index,
  rank,
  compare,
  isProjections,
}: {
  index: number
  rank: Player[] | PlayerName[]
  compare: Player[] | PlayerName[]
  isProjections?: boolean
}) => {
  const index2 = compare.findIndex(p => p.name === rank[index]?.name)
  const difference = isProjections ? index - index2 : index2 - index
  const absoluteDifference = Math.abs(difference)
  if (isProjections) {
    return (
      <td
        className={`p-2 text-center ${
          index > index2 ? 'bg-green-700' : index < index2 ? 'bg-red-700' : ''
        } ${
          absoluteDifference > 24
            ? 'bg-opacity-100'
            : absoluteDifference > 12
            ? 'bg-opacity-75'
            : absoluteDifference > 6
            ? 'bg-opacity-50'
            : 'bg-opacity-25'
        }`}
      >
        <div>{`${index > index2 ? '+' : ''}${difference}`}</div>
        <div>({index2 + 1})</div>
      </td>
    )
  }
  return (
    <td
      className={`p-2 text-center ${
        index2 > index ? 'bg-green-700' : index2 < index ? 'bg-red-700' : ''
      } ${
        absoluteDifference > 24
          ? 'bg-opacity-100'
          : absoluteDifference > 12
          ? 'bg-opacity-75'
          : absoluteDifference > 6
          ? 'bg-opacity-50'
          : 'bg-opacity-25'
      }`}
    >
      <div>{`${index2 > index ? '+' : ''}${difference}`}</div>
      <div>({index2 + 1})</div>
    </td>
  )
}

const ConfirmModal = ({
  isOpen,
  setIsOpen,
  confirmAction,
  title = 'are you sure?',
}: {
  isOpen: boolean
  setIsOpen: Dispatch<SetStateAction<boolean>>
  confirmAction: () => void
  title?: string
}) => (
  <Modal isOpen={isOpen} setIsOpen={setIsOpen} title={title}>
    <div className='flex space-x-4'>
      <Button
        onClick={() => {
          confirmAction()
          setIsOpen(false)
        }}
      >
        yes
      </Button>
      <Button
        onClick={() => {
          setIsOpen(false)
        }}
      >
        no
      </Button>
    </div>
  </Modal>
)

const EditItemModal = ({
  isOpen,
  setIsOpen,
  item: initialItem,
  updateItem,
}: {
  isOpen: boolean
  setIsOpen: Dispatch<SetStateAction<boolean>>
  item: string
  updateItem: (newItem: string) => void
}) => {
  const [item, setItem] = useState(initialItem)
  useEffect(() => {
    setItem(initialItem)
  }, [initialItem])
  return (
    <Modal isOpen={isOpen} setIsOpen={setIsOpen} title='edit item'>
      <div className='flex space-x-4'>
        <input
          value={item}
          onChange={e => {
            setItem(e.target.value)
          }}
          className='w-full bg-cb-blue p-2'
        />
        <Button
          onClick={() => {
            updateItem(item)
            setIsOpen(false)
          }}
        >
          save
        </Button>
      </div>
    </Modal>
  )
}

export default function DraftPage() {
  const [drafted, setDrafted] = useLocalStorage<string[]>('draft', [])
  const [queue, setQueue] = useLocalStorage<string[]>('queue', [])
  const [isEmptyDraftedModalOpen, setIsEmptyDraftedModalOpen] = useState(false)
  const [isEmptyQueueModalOpen, setIsEmptyQueueModalOpen] = useState(false)
  const [isSettingsModalOpen, setIsSettingsModalOpen] = useState(false)
  const [isEditItemModalOpen, setIsEditItemModalOpen] = useState(false)
  const [itemIndex, setItemIndex] = useState<number | null>(null)
  const editItem = typeof itemIndex === 'number' ? drafted[itemIndex] ?? '' : ''
  const [hideDrafted, setHideDrafted] = useState(true)
  const [filter, setFilter] = useState('')
  const [ranksList, setRanksList] = useState([...ranks])
  const filterRef = useRef(null)
  const [settings, setSettings] = useState<{ teams: number }>({
    teams: 12,
  })

  const unqueue = (name: string) => {
    const newQueue = queue.filter(p => p !== name)
    setQueue(newQueue)
  }
  const draft = (name: string) => {
    const newDrafted = [name, ...drafted]
    setDrafted(newDrafted)
    unqueue(name)
    setFilter('')
  }
  const undraft = (index: number) => {
    const newDrafted = [...drafted]
    newDrafted.splice(index, 1)
    setDrafted(newDrafted)
  }

  const compareRank = (rank: Rank) => {
    const newRanksList = [...ranksList]
    const selectedRanksListIndex = newRanksList.findIndex(
      r => r.title === rank.title
    )
    const selectedRank = newRanksList.splice(selectedRanksListIndex, 1)[0]
    if (selectedRank) newRanksList.unshift(selectedRank)
    setRanksList(newRanksList)
  }

  const available = projections.items.filter(
    p => !drafted?.some(d => d === p.name)
  )
  const commands = [
    ...available.map((p: Player) => {
      const position = p.position
      const team = p.team
      const playerPosition =
        typeof position === 'string' ? position : position.join(', ')
      const subtitle = team ? `${playerPosition} - ${p.team}` : playerPosition
      return {
        ...p,
        id: `Draft ${p.name}`,
        title: `Draft ${p.name}`,
        name: p.name,
        subtitle,
        action: () => draft(p.name),
      }
    }),
    {
      id: `Toggle Hide Drafted`,
      title: `${hideDrafted ? 'Show' : 'Hide'} Drafted`,
      action: () => setHideDrafted(!hideDrafted),
    },
  ]
  return (
    <Main className='space-y-2 px-2'>
      <div className='sticky top-0 z-10 flex items-center justify-between space-x-4 bg-cb-dark-blue'>
        <div className='flex space-x-4'>
          <label
            htmlFor='checked'
            className='inline-flex cursor-pointer items-center justify-center space-x-3'
          >
            <span className={!hideDrafted ? 'text-gray-500' : ''}>
              hide drafted <span className='hidden md:inline'>players</span>
            </span>
            <span className='relative'>
              <span className='block h-6 w-10 rounded-full bg-cb-yellow shadow-inner' />
              <span
                className={`focus-within:shadow-outline absolute inset-y-0 left-0 ml-1 mt-1 block h-4 w-4 rounded-full bg-cb-blue shadow transition-transform duration-300 ease-in-out ${
                  !hideDrafted ? 'translate-x-full transform' : ''
                }`}
              >
                <input
                  id='checked'
                  type='checkbox'
                  checked
                  onChange={() => setHideDrafted(!hideDrafted)}
                  className='absolute h-0 w-0 opacity-0'
                />
              </span>
            </span>
          </label>
          <input
            type='text'
            value={filter}
            onChange={e => setFilter(e.target.value)}
            placeholder='filter'
            ref={filterRef}
            className='bg-cb-blue p-2'
          />
          <button
            type='button'
            onClick={() => {
              setIsSettingsModalOpen(true)
            }}
          >
            <CogIcon className='h-6 w-6 text-cb-yellow' />
          </button>
          {/* <button type='button' onClick={() => setTeamsDialogIsOpen(true)}>
          <UserGroupIcon className='h-6 w-6' />
        </button>
        <button
          type='button'
          onClick={() => {
            setSaveDraftDialogIsOpen(true)
          }}
          disabled={drafted.length === 0}
          className='disabled:pointer-events-none disabled:opacity-25'
        >
          <SaveIcon className='h-6 w-6' />
        </button>
        <button
          type='button'
          onClick={() => {
            setLoadListDialogIsOpen(true)
          }}
        >
          <CloudDownloadIcon className='h-6 w-6' />
        </button> */}
        </div>
        <Link href='/' className='text-cb-pink hover:text-cb-pink/75'>
          <HomeIcon className='h-6 w-6' />
        </Link>
      </div>
      <div className='flex divide-x divide-cb-dusty-blue overflow-x-scroll'>
        <div className='sticky left-0 w-[350px] bg-cb-dark-blue'>
          <h2 className='flex justify-between space-x-4 p-2'>
            <span>queue</span>
            <button
              type='button'
              onClick={() => {
                setIsEmptyQueueModalOpen(true)
              }}
              disabled={queue?.length === 0}
              className='disabled:pointer-events-none disabled:opacity-25'
            >
              <TrashIcon className='h-6 w-6 text-cb-yellow' />
            </button>
          </h2>
          {queue?.length > 0 && (
            <DragDropList
              items={queue}
              renderItem={(item: string) => (
                <button
                  type='button'
                  onClick={() => draft(item)}
                  className='flex-grow truncate'
                >
                  {item}
                </button>
              )}
              reorderItems={newQueue => setQueue(newQueue)}
              itemContainerClassName='flex items-center space-x-4 p-2 odd:bg-cb-blue'
            />
          )}
          <h2 className='flex justify-between space-x-4 border-t-4 border-cb-dusty-blue p-2'>
            <span>draft</span>
            <div className='flex space-x-2'>
              <button
                type='button'
                onClick={() => {
                  draft('placeholder')
                }}
              >
                <PlusCircleIcon className='h-6 w-6 text-cb-yellow' />
              </button>
              <button
                type='button'
                onClick={() => {
                  setIsEmptyDraftedModalOpen(true)
                }}
                disabled={drafted?.length === 0}
                className='disabled:pointer-events-none disabled:opacity-25'
              >
                <TrashIcon className='h-6 w-6 text-cb-yellow' />
              </button>
            </div>
          </h2>
          <DragDropList
            items={drafted ?? []}
            renderItem={(item: string, index: number) => (
              <DraftListItem
                item={item}
                index={index}
                itemsLength={drafted.length}
                editItem={(index: number) => {
                  setIsEditItemModalOpen(true)
                  setItemIndex(index)
                  // setItemToBeEdited(idx)
                }}
                deleteItem={undraft}
                teams={settings.teams}
              />
            )}
            reorderItems={(newDrafted: string[]) => {
              setDrafted(newDrafted)
            }}
            itemContainerClassName='flex items-center space-x-4 p-2 odd:bg-cb-blue'
          />
        </div>
        {[projections, ...ranksList].map((rank, rankIndex) => (
          <div key={rank.title} className='w-[350px]'>
            <table className='w-full'>
              <thead>
                <tr>
                  <td className='p-2 text-center'>#</td>
                  <td className='p-2'>
                    {rankIndex > 1 ? (
                      <button
                        type='button'
                        className='block w-full rounded bg-cb-yellow px-2 text-cb-dark-blue'
                        onClick={() => {
                          compareRank(rank)
                        }}
                      >
                        {rank.title}
                      </button>
                    ) : (
                      rank.title
                    )}
                  </td>

                  <td className='p-2 text-center'>+/-</td>
                </tr>
              </thead>
              <tbody>
                {projections.items.map(({ name }, index) =>
                  ranksList[0] ? (
                    <tr
                      key={name}
                      className={classnames(
                        `border-b border-cb-dusty-blue`,
                        (drafted?.some(p => p === rank.items[index]?.name) &&
                          hideDrafted) ||
                          (filter &&
                            !rank.items[index]?.name
                              .toLowerCase()
                              .includes(filter.toLowerCase()))
                          ? 'hidden'
                          : ''
                      )}
                    >
                      <td className='p-2 text-center'>{index + 1}</td>
                      <td
                        className={classnames(
                          'p-2',
                          drafted?.some(p => p === rank.items[index]?.name)
                            ? 'opacity-25'
                            : ''
                        )}
                      >
                        <button
                          type='button'
                          className={classnames(
                            'truncate hover:text-cb-yellow disabled:pointer-events-none',
                            projections.items.findIndex(
                              p => p.name === rank.items[index]?.name
                            ) === -1
                              ? 'font-bold text-red-700'
                              : ''
                          )}
                          onClick={() => {
                            const player = rank.items[index]
                            if (player) {
                              if (rank.title === projections.title) {
                                draft(player.name)
                              } else {
                                setQueue([...queue, player.name])
                              }
                            }
                          }}
                          disabled={
                            drafted?.some(p => p === rank.items[index]?.name) ||
                            (rank.title !== projections.title &&
                              queue?.some(p => p === rank.items[index]?.name))
                          }
                        >
                          {rank.items[index]?.name}
                        </button>
                      </td>
                      {rankIndex === 0 ? (
                        <PlusMinus
                          index={index}
                          rank={projections.items}
                          compare={ranksList[0].items}
                          isProjections
                        />
                      ) : (
                        <PlusMinus
                          index={index}
                          rank={rank.items}
                          compare={projections.items}
                        />
                      )}
                    </tr>
                  ) : null
                )}
              </tbody>
            </table>
          </div>
        ))}
      </div>
      <ConfirmModal
        isOpen={isEmptyDraftedModalOpen}
        setIsOpen={setIsEmptyDraftedModalOpen}
        title='are you sure you want to clear the drafted list?'
        confirmAction={() => {
          setDrafted([])
        }}
      />
      <ConfirmModal
        isOpen={isEmptyQueueModalOpen}
        setIsOpen={setIsEmptyQueueModalOpen}
        title='are you sure you want to clear the queue?'
        confirmAction={() => {
          setQueue([])
        }}
      />
      <Modal
        isOpen={isSettingsModalOpen}
        setIsOpen={setIsSettingsModalOpen}
        title='settings'
      >
        <div className='flex space-x-4'>
          <input
            type='number'
            value={settings.teams}
            onChange={e => {
              const newSettings = {
                ...settings,
              }
              newSettings.teams = Number(e.target.value)
              setSettings(newSettings)
            }}
            className='w-full bg-cb-blue p-2'
          />
        </div>
      </Modal>
      <EditItemModal
        isOpen={isEditItemModalOpen}
        setIsOpen={setIsEditItemModalOpen}
        item={editItem}
        updateItem={newItem => {
          if (typeof itemIndex === 'number') {
            const newDrafted = [...drafted]
            newDrafted[itemIndex] = newItem
            setDrafted(newDrafted)
          }
        }}
      />
      <CommandPalette commands={commands} />
    </Main>
  )
}
