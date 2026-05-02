import React, { useEffect, useMemo, useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Bell,
  Briefcase,
  CalendarDays,
  ChevronLeft,
  ChevronRight,
  Clock3,
  FileText,
  GraduationCap,
  Landmark,
  LayoutDashboard,
  Link2,
  LogOut,
  Menu,
  Moon,
  Plane,
  PlayCircle,
  Quote,
  Search,
  Sparkles,
  Sun,
  Target,
  Trophy,
  WalletCards,
} from 'lucide-react'
import { useAuthStore, useThemeStore } from '../store'
import { userService } from '../services/api'
import { buildWorkspaceAlerts, getCurrentStage, getProfileGaps, getProfileStrength, getSmartSuggestion, journeyStages } from '../utils/workspace'

const stageIcons = {
  '01': Target,
  '02': FileText,
  '03': Sparkles,
  '04': Search,
  '05': Trophy,
  '06': Landmark,
  '07': Plane,
  '08': GraduationCap,
  '09': Briefcase,
  '10': WalletCards,
}

const aiSuggestions = [
  { label: 'Official links', detail: 'University pages, scholarship portals, and embassy resources.', icon: Link2 },
  { label: 'Video suggestions', detail: 'Short explainers for SOP writing, visa flow, and EMI tactics.', icon: PlayCircle },
  { label: 'Outside reviews', detail: 'Student voices, program sentiment, and experience summaries.', icon: Quote },
]

export default function AppSidebar() {
  const location = useLocation()
  const navigate = useNavigate()
  const { user, logout } = useAuthStore()
  const { isDarkMode, toggleDarkMode } = useThemeStore()
  const [collapsed, setCollapsed] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [profileCenter, setProfileCenter] = useState({ profile: null, documents: [] })
  const [alerts, setAlerts] = useState([])

  useEffect(() => {
    let mounted = true
    Promise.all([
      userService.getProfileCenter(),
      userService.syncAlerts().catch(() => userService.getAlerts()),
    ])
      .then(([profileResponse, alertResponse]) => {
        if (mounted) {
          setProfileCenter({ profile: profileResponse.data.profile, documents: profileResponse.data.documents || [] })
          setAlerts(alertResponse.data.alerts || [])
        }
      })
      .catch(() => {})
    return () => {
      mounted = false
    }
  }, [])

  const currentStage = useMemo(() => getCurrentStage(location.pathname), [location.pathname])
  const profileStrength = getProfileStrength(profileCenter.profile, profileCenter.documents)
  const nextGaps = getProfileGaps(profileCenter.profile, profileCenter.documents)
  const smartSuggestion = getSmartSuggestion(profileCenter.profile, profileCenter.documents, location.pathname)
  const sidebarAlerts = (alerts.length ? alerts : buildWorkspaceAlerts(profileCenter.profile, profileCenter.documents)).slice(0, 4)

  const handleLogout = () => {
    logout()
    navigate('/login')
  }

  const sidebarBody = (
    <div
      className={`flex h-full flex-col border-r border-slate-200/70 bg-[linear-gradient(180deg,rgba(247,250,255,0.92),rgba(240,246,255,0.88))] text-slate-900 shadow-[18px_0_50px_rgba(15,23,42,0.06)] backdrop-blur-2xl transition-[width] duration-300 dark:border-white/8 dark:bg-[linear-gradient(180deg,rgba(13,23,42,0.96),rgba(10,18,32,0.96))] dark:text-slate-100 ${
        collapsed ? 'w-[92px]' : 'w-[300px]'
      }`}
    >
      <div className="flex items-center justify-between border-b border-slate-200/70 px-4 py-4 dark:border-white/8">
        <Link to="/dashboard" className="flex min-w-0 items-center gap-3">
          <LogoBadge />
          {!collapsed && (
            <div className="min-w-0">
              <p className="truncate text-base font-semibold tracking-tight text-[#0a2540] dark:text-white">CareerCapital AI</p>
              <p className="truncate text-xs text-slate-500 dark:text-slate-400">Decision and execution workspace</p>
            </div>
          )}
        </Link>
        <button
          type="button"
          onClick={() => setCollapsed((value) => !value)}
          className="hidden rounded-lg p-2 text-slate-500 transition hover:bg-slate-900/5 hover:text-slate-900 lg:block dark:text-slate-400 dark:hover:bg-white/5 dark:hover:text-white"
          aria-label={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
        >
          {collapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
        </button>
      </div>

      <div className="flex-1 overflow-y-auto px-3 py-4">
        <Link
          to="/dashboard"
          onClick={() => setMobileOpen(false)}
          className={`mb-4 flex items-center rounded-2xl border transition ${
            collapsed ? 'justify-center px-2 py-3' : 'gap-3 px-3 py-3.5'
          } ${
            location.pathname === '/dashboard'
              ? 'border-teal-400/30 bg-[linear-gradient(135deg,rgba(17,128,125,0.18),rgba(13,148,136,0.1))] text-[#0a2540] shadow-[inset_0_0_0_1px_rgba(20,184,166,0.18)] dark:text-white'
              : 'border-slate-200/80 bg-white/70 text-slate-700 hover:border-teal-300/40 hover:bg-white dark:border-white/8 dark:bg-white/5 dark:text-slate-300 dark:hover:bg-white/7'
          }`}
          title={collapsed ? 'Dashboard' : undefined}
        >
          <div className="rounded-xl bg-teal-500/12 p-2 text-teal-600 dark:bg-white/8 dark:text-[#53d7ff]">
            <LayoutDashboard className="h-4 w-4" />
          </div>
          {!collapsed && (
            <div className="min-w-0">
              <p className="truncate text-sm font-semibold">Dashboard</p>
              <p className="truncate text-xs text-slate-500 dark:text-slate-400">Current stage, progress, and next actions</p>
            </div>
          )}
        </Link>

        {!collapsed && (
          <div className="mb-4 rounded-2xl border border-slate-200/80 bg-white/80 p-4 shadow-sm dark:border-white/8 dark:bg-white/5">
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="text-xs uppercase tracking-[0.18em] text-slate-400">Current stage</p>
                <p className="mt-2 text-sm font-semibold text-[#0a2540] dark:text-white">
                  Stage {currentStage.number} - {currentStage.label}
                </p>
              </div>
              <span className="rounded-full bg-teal-500/12 px-2.5 py-1 text-xs font-semibold text-teal-700 dark:bg-white/8 dark:text-[#7ce7ff]">
                {profileStrength}%
              </span>
            </div>
            <div className="mt-4 h-2 overflow-hidden rounded-full bg-slate-200 dark:bg-slate-800">
              <div className="h-full rounded-full bg-gradient-to-r from-sky-500 to-teal-400" style={{ width: `${profileStrength}%` }} />
            </div>
            <p className="mt-3 text-[11px] leading-5 text-slate-500 dark:text-slate-400">
              {nextGaps.length ? `${nextGaps.length} gap${nextGaps.length > 1 ? 's' : ''} remaining.` : 'Profile is decision-ready.'}
            </p>
          </div>
        )}

        <Link
          to="/ai-engine"
          onClick={() => setMobileOpen(false)}
          className="mb-4 block rounded-2xl border border-teal-300/20 bg-[linear-gradient(135deg,rgba(17,128,125,0.12),rgba(255,255,255,0.72))] p-3 shadow-sm transition hover:border-teal-400/35 hover:shadow-md dark:border-teal-400/14 dark:bg-[linear-gradient(135deg,rgba(18,93,101,0.42),rgba(255,255,255,0.04))]"
        >
          <div className={`flex items-start ${collapsed ? 'justify-center' : 'gap-3'}`}>
            <div className="rounded-xl bg-teal-500/12 p-2 text-teal-700 dark:bg-white/8 dark:text-[#7ce7ff]">
              <Sparkles className="h-4 w-4" />
            </div>
            {!collapsed && (
              <div className="min-w-0">
                <p className="text-sm font-semibold text-[#0a2540] dark:text-white">AI Engine</p>
                <p className="text-xs text-slate-500 dark:text-slate-400">Doubt solver with links, videos, and review signals.</p>
              </div>
            )}
          </div>

          {!collapsed && (
            <>
              <div className="mt-3 rounded-xl border border-teal-200/50 bg-white/80 px-3 py-2.5 text-xs leading-5 text-slate-600 dark:border-white/10 dark:bg-slate-950/45 dark:text-slate-300">
                {smartSuggestion}
              </div>
              <div className="mt-3 space-y-2">
                {aiSuggestions.map((item) => {
                  const Icon = item.icon
                  return (
                    <div key={item.label} className="rounded-xl bg-slate-50/90 px-3 py-2.5 dark:bg-slate-950/45">
                      <div className="flex items-start gap-2.5">
                        <Icon className="mt-0.5 h-3.5 w-3.5 flex-shrink-0 text-teal-700 dark:text-[#7ce7ff]" />
                        <div>
                          <p className="text-xs font-semibold text-[#0a2540] dark:text-white">{item.label}</p>
                          <p className="mt-1 text-[11px] leading-5 text-slate-500 dark:text-slate-400">{item.detail}</p>
                        </div>
                      </div>
                    </div>
                  )
                })}
              </div>
            </>
          )}
        </Link>

        <Link
          to="/alerts"
          onClick={() => setMobileOpen(false)}
          className="mb-4 block rounded-2xl border border-slate-200/80 bg-white/70 p-3 shadow-sm transition hover:border-sky-300/45 hover:shadow-md dark:border-white/8 dark:bg-white/5"
        >
          <div className={`flex items-start ${collapsed ? 'justify-center' : 'gap-3'}`}>
            <div className="rounded-xl bg-sky-500/12 p-2 text-sky-600 dark:bg-white/8 dark:text-[#53d7ff]">
              <Bell className="h-4 w-4" />
            </div>
            {!collapsed && (
              <div className="min-w-0">
                <p className="text-sm font-semibold text-[#0a2540] dark:text-white">Alerts</p>
                <p className="truncate text-xs text-slate-500 dark:text-slate-400">Chronological reminders and deadline pressure</p>
              </div>
            )}
          </div>

          {!collapsed && (
            <div className="mt-3 space-y-2">
              {sidebarAlerts.map((item) => {
                const Icon = alertIcon(item.type)
                return (
                  <div key={item.id} className="rounded-xl bg-slate-50/90 px-3 py-2.5 dark:bg-slate-950/45">
                    <div className="flex items-start gap-2.5">
                      <Icon className="mt-0.5 h-3.5 w-3.5 flex-shrink-0 text-sky-600 dark:text-[#53d7ff]" />
                      <div className="min-w-0">
                        <p className="text-xs font-semibold text-[#0a2540] dark:text-white">{item.title}</p>
                        <p className="mt-1 text-[11px] leading-5 text-slate-500 dark:text-slate-400">{item.dueDate}</p>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          )}
        </Link>

        {!collapsed && (
          <p className="mb-3 px-2 text-[11px] font-semibold uppercase tracking-[0.22em] text-slate-400 dark:text-slate-500">Journey stages</p>
        )}

        <nav className="space-y-1">
          {journeyStages.map((item) => {
            const Icon = stageIcons[item.number]
            const active = location.pathname === item.href
            return (
              <Link
                key={`${item.number}-${item.label}`}
                to={item.href}
                onClick={() => setMobileOpen(false)}
                className={`group relative rounded-2xl border transition ${
                  collapsed ? 'flex justify-center px-2 py-3.5' : 'block px-3 py-3.5'
                } ${
                  active
                    ? 'border-teal-400/30 bg-[linear-gradient(135deg,rgba(17,128,125,0.18),rgba(13,148,136,0.1))] text-[#0a2540] shadow-[inset_0_0_0_1px_rgba(20,184,166,0.16)] dark:border-teal-300/20 dark:bg-[linear-gradient(135deg,rgba(15,118,110,0.42),rgba(255,255,255,0.04))] dark:text-white'
                    : 'border-transparent text-slate-700 hover:border-slate-200/90 hover:bg-white/70 hover:text-[#0a2540] dark:text-slate-300 dark:hover:border-white/10 dark:hover:bg-white/5 dark:hover:text-white'
                }`}
                title={collapsed ? item.label : undefined}
              >
                {active && <span className="absolute inset-y-3 right-0 w-[3px] rounded-full bg-teal-500" />}
                {collapsed ? (
                  <Icon className={`h-4 w-4 flex-shrink-0 ${active ? 'text-teal-700 dark:text-[#7ce7ff]' : 'text-slate-500 group-hover:text-teal-700 dark:text-slate-400 dark:group-hover:text-slate-200'}`} />
                ) : (
                  <div className="flex items-start gap-3">
                    <div className={`mt-0.5 flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full border text-[11px] font-bold ${
                      active
                        ? 'border-teal-500/45 bg-teal-500/15 text-teal-700 dark:border-teal-300/35 dark:bg-white/8 dark:text-[#7ce7ff]'
                        : 'border-slate-300/80 bg-white text-slate-600 dark:border-white/12 dark:bg-white/6 dark:text-slate-300'
                    }`}>
                      {item.number}
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-2">
                        <Icon className={`h-4 w-4 flex-shrink-0 ${active ? 'text-teal-700 dark:text-[#7ce7ff]' : 'text-slate-500 dark:text-slate-400'}`} />
                        <p className="truncate text-sm font-semibold">{item.label}</p>
                      </div>
                      <p className="mt-1 line-clamp-2 text-[11px] leading-5 text-slate-500 dark:text-slate-400">{item.detail}</p>
                    </div>
                  </div>
                )}
              </Link>
            )
          })}
        </nav>
      </div>

      <div className="border-t border-slate-200/70 p-3 dark:border-white/8">
        {!collapsed && user && (
          <div className="mb-3 rounded-xl bg-white/70 px-3 py-2.5 shadow-sm dark:bg-white/5">
            <p className="truncate text-sm font-medium text-[#0a2540] dark:text-white">{user.name || 'Student'}</p>
            <p className="truncate text-xs text-slate-500 dark:text-slate-400">{user.email}</p>
          </div>
        )}

        <div className="space-y-2">
          <button
            type="button"
            onClick={toggleDarkMode}
            className={`flex w-full items-center rounded-xl px-3 py-3 text-sm font-medium text-slate-700 transition hover:bg-white/70 hover:text-[#0a2540] dark:text-slate-300 dark:hover:bg-white/5 dark:hover:text-white ${
              collapsed ? 'justify-center' : 'gap-3'
            }`}
            title={collapsed ? 'Toggle theme' : undefined}
          >
            {isDarkMode ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
            {!collapsed && <span>{isDarkMode ? 'Light mode' : 'Dark mode'}</span>}
          </button>

          <button
            type="button"
            onClick={handleLogout}
            className={`flex w-full items-center rounded-xl px-3 py-3 text-sm font-medium text-slate-700 transition hover:bg-white/70 hover:text-[#0a2540] dark:text-slate-300 dark:hover:bg-white/5 dark:hover:text-white ${
              collapsed ? 'justify-center' : 'gap-3'
            }`}
            title={collapsed ? 'Sign out' : undefined}
          >
            <LogOut className="h-4 w-4" />
            {!collapsed && <span>Sign Out</span>}
          </button>
        </div>
      </div>
    </div>
  )

  return (
    <>
      <button
        type="button"
        onClick={() => setMobileOpen(true)}
        className="fixed left-4 top-4 z-40 rounded-xl border border-slate-200/70 bg-white/90 p-3 text-slate-800 shadow-lg backdrop-blur lg:hidden dark:border-slate-800 dark:bg-slate-950/90 dark:text-white"
        aria-label="Open navigation"
      >
        <Menu className="h-5 w-5" />
      </button>

      <aside className="hidden lg:block">{sidebarBody}</aside>

      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.button
              type="button"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileOpen(false)}
              className="fixed inset-0 z-40 bg-slate-950/60 lg:hidden"
              aria-label="Close navigation"
            />
            <motion.aside
              initial={{ x: -320 }}
              animate={{ x: 0 }}
              exit={{ x: -320 }}
              transition={{ type: 'spring', damping: 24, stiffness: 220 }}
              className="fixed inset-y-0 left-0 z-50 lg:hidden"
            >
              <div className="h-full w-[300px]">{sidebarBody}</div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  )
}

function alertIcon(type) {
  if (type === 'Scholarship Deadline') return CalendarDays
  if (type === 'Exam Date') return Clock3
  if (type === 'Registration') return FileText
  return Bell
}

function LogoBadge() {
  return (
    <div className="relative flex h-11 w-11 flex-shrink-0 items-center justify-center overflow-hidden rounded-2xl bg-[radial-gradient(circle_at_30%_20%,rgba(125,211,252,0.9),rgba(14,165,233,0.85)_35%,rgba(12,34,67,0.95)_100%)] shadow-[0_10px_24px_rgba(14,165,233,0.18)] ring-1 ring-sky-500/20">
      <span className="absolute inset-[7px] rounded-full border-[3px] border-slate-100/90" />
      <span className="absolute left-[7px] top-[10px] h-[19px] w-[19px] rounded-full border-[3px] border-slate-100/90 border-r-transparent border-b-transparent rotate-[-18deg]" />
      <span className="absolute right-[6px] top-[17px] h-[15px] w-[15px] rounded-full border-[3px] border-slate-100/90 border-l-transparent border-t-transparent" />
      <span className="relative text-[10px] font-bold tracking-[0.18em] text-white">CC</span>
    </div>
  )
}
