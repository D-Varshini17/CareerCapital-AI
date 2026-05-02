import { create } from 'zustand'
import { persist } from 'zustand/middleware'

// Auth store
export const useAuthStore = create(
  persist(
    (set) => ({
      user: null,
      token: null,
      isAuthenticated: false,
      login: (user, token) => set({ user, token, isAuthenticated: true }),
      logout: () => set({ user: null, token: null, isAuthenticated: false }),
      setUser: (user) => set({ user }),
    }),
    {
      name: 'auth-storage',
    }
  )
)

// Dashboard data store
export const useDashboardStore = create((set) => ({
  loanAmount: 0,
  interestRate: 0,
  tenure: 0,
  monthlyPayment: 0,
  setLoanData: (data) => set(data),
  careerProfile: null,
  setCareerProfile: (profile) => set({ careerProfile: profile }),
}))

// Theme store
export const useThemeStore = create(
  persist(
    (set) => ({
      isDarkMode: false,
      toggleDarkMode: () => set((state) => ({ isDarkMode: !state.isDarkMode })),
    }),
    {
      name: 'theme-storage',
    }
  )
)
