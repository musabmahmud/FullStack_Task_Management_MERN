import type { RootState } from '@/lib/store'
import { createSlice } from '@reduxjs/toolkit'

export type TUser = {
  userId: string
  role: string
  iat: number
  exp: number
  expiry_date: string
  balance: string
  name: string
  owner_id: string
  renewal_date: string
  status: string
  warning_date: string
  user_id: string
}

export type SubMenuItem = {
  title: string
  path: string
  icon: string
}

export type MenuItem = {
  title?: string
  path?: string
  icon: string
  element?: string
  submenu?: SubMenuItem[]
}

export type Sidebar = MenuItem[][]

type TAuthState = {
  user: null | TUser
  token: null | string
  hasBusiness: null | boolean
  userProfile?: {
    public_id: string
    optimizeUrl: string
    secure_url: string
  }
  sidebar: Sidebar
}

const initialState: TAuthState = {
  user: null,
  token: null,
  hasBusiness: null,
  sidebar: [],
}

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUser: (state, action) => {
      const { user, token, hasBusiness, userProfile } = action.payload
      state.user = user
      state.token = token
      state.hasBusiness = hasBusiness
      state.userProfile = userProfile
    },
    setSidebar: (state, action) => {
      state.sidebar = action.payload
    },

    logout: (state) => {
      state.user = null
      state.token = null
      state.hasBusiness = null
      state.sidebar = initialState.sidebar

      // Clear storages
      localStorage.clear()
      sessionStorage.clear()

      // Clear cookies
      document.cookie.split(';').forEach((cookie) => {
        document.cookie =
          cookie.trim().split('=')[0] +
          '=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;'
      })

      // Clear IndexedDB
      window.indexedDB.databases().then((dbs) => {
        dbs.forEach((db) => {
          if (db.name) window.indexedDB.deleteDatabase(db.name)
        })
      })

      // Clear Cache Storage
      if ('caches' in window) {
        caches.keys().then((names) => {
          names.forEach((name) => {
            caches.delete(name)
          })
        })
      }

      // Unregister Service Workers
      if ('serviceWorker' in navigator) {
        navigator.serviceWorker.getRegistrations().then((registrations) => {
          registrations.forEach((registration) => {
            registration.unregister()
          })
        })
      }
    },
  },
})

export const { setUser, logout, setSidebar } = authSlice.actions
export default authSlice.reducer

export const selectCurrentToken = (state: RootState) => state.auth.token
export const selectCurrentUser = (state: RootState) => state.auth.user
export const selectUserProfile = (state: RootState) => state.auth.userProfile
export const selectUserHasBusiness = (state: RootState) =>
  state.auth.hasBusiness
export const selectIsLoggedIn = (state: RootState) => {
  return !!state.auth.token && !!state.auth.user
}
export const selectSidebar = (state: RootState) => state.auth.sidebar

export const selectSubscriptionExpired = (state: RootState) => {
  const user = state.auth.user
  if (!user || !user.expiry_date) return false
  const expiryDate = new Date(user.expiry_date).getTime()
  const now = Date.now()
  return now > expiryDate
}
