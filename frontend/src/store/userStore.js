import { create } from 'zustand'

export const useUserStore = create((set) => ({
  user: null, // { id, username, email, avatarUrl? }
  setUser: (user) => set({ user }),
  logout: () => set({ user: null })
}))
