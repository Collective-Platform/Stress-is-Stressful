'use client'

import {
  getAnonymousId,
  presenceCountryCodeToFlag,
  presenceUserAnimal,
} from '@/lib/presence.utils'
import { createClient } from '@/lib/supabase/client'
import { RealtimeChannel } from '@supabase/supabase-js'
import { useEffect, useState } from 'react'

interface GeoIPData {
  city: null | string
  countryCode: null | string
  region: null | string
}

type Presence = {
  online_at: string
  user_id: string
} & Partial<GeoIPData>

export default function Presence() {
  const [onlineUsers, setOnlineUsers] = useState<Map<string, Presence>>(
    new Map(),
  )
  const [hoveredUserId, setHoveredUserId] = useState<null | string>(null)

  useEffect(() => {
    const supabase = createClient()
    const clientId = getAnonymousId()
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
    let channel: RealtimeChannel

    const setupPresence = async () => {
      let locationData: Partial<GeoIPData> = {}
      try {
        if (supabaseUrl) {
          const response = await fetch(
            `${supabaseUrl}/functions/v1/get-user-location`,
          )
          console.log(
            'GeoIP Fetch Response:',
            response.status,
            response.statusText,
          )
          if (response.ok) {
            locationData = (await response.json()) as Partial<GeoIPData>
            console.log('Received Location Data:', locationData)
          }
        }
      } catch (error) {
        console.error('Could not fetch geoip data:', error)
      }

      channel = supabase.channel('online-users', {
        config: {
          presence: {
            key: clientId,
          },
        },
      })

      channel.on('presence', { event: 'sync' }, () => {
        const presenceState = channel.presenceState<Presence>()
        const users = new Map<string, Presence>()
        for (const id in presenceState) {
          if (presenceState[id].length > 0) {
            users.set(id, presenceState[id][0])
          }
        }
        setOnlineUsers(users)
      })

      channel.on('presence', { event: 'join' }, ({ key, newPresences }) => {
        setOnlineUsers((prevUsers) => {
          const newUsers = new Map(prevUsers)
          if (newPresences.length > 0) {
            newUsers.set(key, newPresences[0] as unknown as Presence)
          }
          return newUsers
        })
      })

      channel.on('presence', { event: 'leave' }, ({ key }) => {
        setOnlineUsers((prevUsers) => {
          const newUsers = new Map(prevUsers)
          newUsers.delete(key)
          return newUsers
        })
      })

      channel.subscribe((status) => {
        if (status === 'SUBSCRIBED') {
          void channel.track({
            online_at: new Date().toISOString(),
            user_id: clientId,
            ...locationData,
          })
        }
      })
    }

    void setupPresence()

    return () => {
      console.log('Unsubscribing from channel.')
      void supabase.removeChannel(channel)
    }
  }, [])

  const usersToRender = [...onlineUsers.values()]

  const MAX_VISIBLE_USERS = 6
  const totalUsers = usersToRender.length
  const remainingUsersCount = totalUsers - MAX_VISIBLE_USERS
  const visibleUsers =
    totalUsers > MAX_VISIBLE_USERS + 1
      ? usersToRender.slice(0, MAX_VISIBLE_USERS)
      : usersToRender

  return (
    <div className="fixed right-6 top-4 ml-2">
      <ul className="m-0 flex list-none flex-row-reverse flex-wrap-reverse p-0">
        {totalUsers > MAX_VISIBLE_USERS + 1 && (
          <li
            className="relative -ml-3 h-12 w-12"
            key="plus-n-icon"
            style={{ zIndex: 0 }}
          >
            <div className="absolute left-0 top-0 flex h-12 w-12 items-center justify-center rounded-full border-4 border-white bg-gray-300 text-lg font-bold dark:border-gray-900 dark:bg-gray-600">
              +{remainingUsersCount}
            </div>
          </li>
        )}
        {visibleUsers
          .map((presence, index) => {
            const [animalEmoji] = presenceUserAnimal(presence.user_id)
            const flagEmoji = presenceCountryCodeToFlag(presence.countryCode)

            const zIndex = totalUsers - index
            const isHovered = hoveredUserId === presence.user_id

            return (
              <li
                className="relative -ml-3 h-12 w-12 transition-all duration-300 ease-in-out hover:z-50"
                key={presence.user_id}
                onMouseEnter={() => {
                  setHoveredUserId(presence.user_id)
                }}
                onMouseLeave={() => {
                  setHoveredUserId(null)
                }}
                style={{ zIndex: isHovered ? 99 : zIndex }}
              >
                <div className="absolute left-0 top-0 flex h-12 w-12 items-center justify-center rounded-full border-4 border-white bg-gray-200 text-4xl dark:border-gray-900 dark:bg-gray-700">
                  <span className="absolute -top-1 select-none">
                    {animalEmoji}
                  </span>
                  {flagEmoji && (
                    <span className="absolute -bottom-4 select-none p-0.5 text-2xl dark:bg-black/50">
                      {flagEmoji}
                    </span>
                  )}
                </div>
              </li>
            )
          })
          .reverse()}
      </ul>
    </div>
  )
}
