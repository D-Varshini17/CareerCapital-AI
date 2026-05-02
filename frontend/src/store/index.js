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

// College finder store
export const useCollegeStore = create(
  persist(
    (set, get) => ({
      savedCollegeIds: [],
      compareCollegeIds: [],
      recentlyViewedIds: [],
      toggleSavedCollege: (id) =>
        set((state) => ({
          savedCollegeIds: state.savedCollegeIds.includes(id)
            ? state.savedCollegeIds.filter((collegeId) => collegeId !== id)
            : [...state.savedCollegeIds, id],
        })),
      toggleCompareCollege: (id) =>
        set((state) => {
          if (state.compareCollegeIds.includes(id)) {
            return { compareCollegeIds: state.compareCollegeIds.filter((collegeId) => collegeId !== id) }
          }
          if (state.compareCollegeIds.length >= 4) return state
          return { compareCollegeIds: [...state.compareCollegeIds, id] }
        }),
      clearCompare: () => set({ compareCollegeIds: [] }),
      addRecentlyViewed: (id) =>
        set((state) => ({
          recentlyViewedIds: [id, ...state.recentlyViewedIds.filter((collegeId) => collegeId !== id)].slice(0, 6),
        })),
    }),
    {
      name: 'college-finder-storage',
    }
  )
)

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
