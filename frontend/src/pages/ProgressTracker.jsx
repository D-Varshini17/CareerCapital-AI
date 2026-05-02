import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { CheckCircle, Circle, Lock, BookOpen, Zap } from 'lucide-react'
import { Card, Badge, ProgressBar } from '../components'

export default function ProgressTracker() {
  const stages = [
    {
      id: 1,
      title: 'Career Discovery',
      description: 'Explore careers matching your profile & interests',
      emoji: '🎯',
      status: 'completed',
      progress: 100,
      details: 'Identified: Software Engineer, Data Scientist',
      icon: CheckCircle,
      color: 'text-green-600 dark:text-green-400',
    },
    {
      id: 2,
      title: 'Admission Planning',
      description: 'Research universities & programs',
      emoji: '📚',
      status: 'completed',
      progress: 100,
      details: 'Applied to 8 universities in US & Canada',
      icon: CheckCircle,
      color: 'text-green-600 dark:text-green-400',
    },
    {
      id: 3,
      title: 'Profile Enhancement',
      description: 'Strengthen your application',
      emoji: '💪',
      status: 'in-progress',
      progress: 65,
      details: 'TOEFL: 110/120, Working on portfolio',
      icon: Zap,
      color: 'text-yellow-600 dark:text-yellow-400',
    },
    {
      id: 4,
      title: 'Cost Planning',
      description: 'Estimate education & living costs',
      emoji: '💰',
      status: 'in-progress',
      progress: 45,
      details: 'Target Budget: ₹35-45L',
      icon: Circle,
      color: 'text-slate-600 dark:text-slate-400',
    },
    {
      id: 5,
      title: 'Loan Intelligence',
      description: 'Understand loan terms & options',
      emoji: '🏦',
      status: 'not-started',
      progress: 0,
      details: 'Research different loan providers',
      icon: Circle,
      color: 'text-slate-600 dark:text-slate-400',
    },
    {
      id: 6,
      title: 'Smart Repayment',
      description: 'Plan your EMI & repayment strategy',
      emoji: '📊',
      status: 'not-started',
      progress: 0,
      details: 'Optimize tenure and interest savings',
      icon: Lock,
      color: 'text-slate-400 dark:text-slate-600',
    },
    {
      id: 7,
      title: 'Visa Planning',
      description: 'Prepare visa applications',
      emoji: '🛂',
      status: 'not-started',
      progress: 0,
      details: 'Gather documents & prepare for interview',
      icon: Lock,
      color: 'text-slate-400 dark:text-slate-600',
    },
    {
      id: 8,
      title: 'Mentorship',
      description: 'Connect with mentors in your field',
      emoji: '👥',
      status: 'not-started',
      progress: 0,
      details: 'Get guidance from alumni & professionals',
      icon: Lock,
      color: 'text-slate-400 dark:text-slate-600',
    },
    {
      id: 9,
      title: 'Living Setup',
      description: 'Arrange accommodation & logistics',
      emoji: '🏠',
      status: 'not-started',
      progress: 0,
      details: 'Find housing and settle in your city',
      icon: Lock,
      color: 'text-slate-400 dark:text-slate-600',
    },
    {
      id: 10,
      title: 'Success Tracking',
      description: 'Track finances & career progress',
      emoji: '✅',
      status: 'not-started',
      progress: 0,
      details: 'Monitor investments & career milestones',
      icon: Lock,
      color: 'text-slate-400 dark:text-slate-600',
    },
  ]

  const [selectedStage, setSelectedStage] = useState(1)
  const [expandedStages, setExpandedStages] = useState([1, 2, 3])

  const toggleExpand = (id) => {
    setExpandedStages((prev) =>
      prev.includes(id) ? prev.filter((s) => s !== id) : [...prev, id]
    )
  }

  const completedCount = stages.filter((s) => s.status === 'completed').length
  const inProgressCount = stages.filter((s) => s.status === 'in-progress').length
  const totalProgress = Math.round((completedCount / stages.length) * 100)

  return (
    <div className="min-h-screen pt-8 pb-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-4xl font-bold mb-2">🗺️ Your 10-Stage Journey</h1>
          <p className="text-slate-600 dark:text-slate-400">
            Track your progress from career discovery to financial success
          </p>
        </motion.div>

        {/* Overview Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="grid md:grid-cols-4 gap-6 mb-8"
        >
          <Card>
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm text-slate-600 dark:text-slate-400 mb-1">Total Progress</p>
                <p className="text-3xl font-bold">{totalProgress}%</p>
              </div>
              <Badge variant="success">{completedCount}/10 Stages</Badge>
            </div>
          </Card>

          <Card>
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm text-slate-600 dark:text-slate-400 mb-1">Completed</p>
                <p className="text-3xl font-bold text-green-600 dark:text-green-400">{completedCount}</p>
              </div>
              <CheckCircle className="w-8 h-8 text-green-600 dark:text-green-400" />
            </div>
          </Card>

          <Card>
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm text-slate-600 dark:text-slate-400 mb-1">In Progress</p>
                <p className="text-3xl font-bold text-yellow-600 dark:text-yellow-400">{inProgressCount}</p>
              </div>
              <Zap className="w-8 h-8 text-yellow-600 dark:text-yellow-400" />
            </div>
          </Card>

          <Card>
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm text-slate-600 dark:text-slate-400 mb-1">Next Step</p>
                <p className="text-lg font-bold">Stage 4</p>
              </div>
              <BookOpen className="w-8 h-8 text-sky-600 dark:text-sky-400" />
            </div>
          </Card>
        </motion.div>

        {/* Main Progress Bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mb-8"
        >
          <ProgressBar
            label="Overall Journey Progress"
            value={totalProgress}
            max={100}
            animated={false}
          />
        </motion.div>

        {/* Journey Timeline */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="space-y-4"
        >
          {stages.map((stage, index) => {
            const Icon = stage.icon
            const isExpanded = expandedStages.includes(stage.id)

            return (
              <motion.div
                key={stage.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.05 + index * 0.03 }}
              >
                <Card
                  hover={false}
                  className={`cursor-pointer transition-all ${
                    stage.status === 'completed'
                      ? 'border-green-200 dark:border-green-800 bg-green-50 dark:bg-green-900/10'
                      : stage.status === 'in-progress'
                        ? 'border-yellow-200 dark:border-yellow-800 bg-yellow-50 dark:bg-yellow-900/10'
                        : 'border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/50'
                  }`}
                  onClick={() => toggleExpand(stage.id)}
                >
                  <div className="flex items-start gap-4">
                    {/* Stage Number & Icon */}
                    <div className="flex-shrink-0">
                      <div className={`w-12 h-12 rounded-full flex items-center justify-center font-bold text-lg ${
                        stage.status === 'completed'
                          ? 'bg-green-200 dark:bg-green-900/50 text-green-700 dark:text-green-300'
                          : stage.status === 'in-progress'
                            ? 'bg-yellow-200 dark:bg-yellow-900/50 text-yellow-700 dark:text-yellow-300'
                            : 'bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-300'
                      }`}>
                        {stage.id}
                      </div>
                    </div>

                    {/* Content */}
                    <div className="flex-1">
                      <div className="flex items-start justify-between mb-2">
                        <div className="flex items-center gap-3">
                          <span className="text-2xl">{stage.emoji}</span>
                          <div>
                            <h3 className="text-lg font-bold">{stage.title}</h3>
                            <p className="text-sm text-slate-600 dark:text-slate-400">
                              {stage.description}
                            </p>
                          </div>
                        </div>

                        <Badge
                          variant={
                            stage.status === 'completed'
                              ? 'success'
                              : stage.status === 'in-progress'
                                ? 'warning'
                                : 'primary'
                          }
                        >
                          {stage.status === 'completed'
                            ? '✓ Done'
                            : stage.status === 'in-progress'
                              ? '⏳ In Progress'
                              : '⬜ Locked'}
                        </Badge>
                      </div>

                      {/* Progress Bar */}
                      {stage.progress > 0 && (
                        <div className="mb-4">
                          <ProgressBar
                            value={stage.progress}
                            max={100}
                            animated={false}
                          />
                        </div>
                      )}

                      {/* Expandable Details */}
                      {isExpanded && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          exit={{ opacity: 0, height: 0 }}
                          className="mt-4 pt-4 border-t border-slate-200 dark:border-slate-700"
                        >
                          <div className="bg-white dark:bg-slate-800 p-4 rounded-lg">
                            <p className="text-sm font-medium mb-2">Current Status:</p>
                            <p className="text-sm text-slate-700 dark:text-slate-300 mb-4">
                              {stage.details}
                            </p>

                            <div className="space-y-2">
                              {stage.status === 'not-started' && (
                                <p className="text-xs text-slate-600 dark:text-slate-400">
                                  Complete previous stages to unlock this step
                                </p>
                              )}
                              {stage.status === 'in-progress' && (
                                <button className="w-full px-3 py-2 bg-yellow-500 text-white rounded-lg font-medium text-sm hover:bg-yellow-600 transition-colors">
                                  Continue This Stage
                                </button>
                              )}
                              {stage.status === 'completed' && (
                                <p className="text-xs text-green-600 dark:text-green-400 font-medium">
                                  ✓ This stage is complete. Great work!
                                </p>
                              )}
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </div>
                  </div>
                </Card>
              </motion.div>
            )
          })}
        </motion.div>

        {/* Milestone Rewards */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="mt-12"
        >
          <Card className="bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 border-purple-200 dark:border-purple-800">
            <h2 className="text-2xl font-bold mb-4">🏆 Milestone Rewards</h2>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="text-4xl mb-2">🎖️</div>
                <p className="font-semibold">50% Complete</p>
                <p className="text-xs text-slate-600 dark:text-slate-400">Unlock premium insights</p>
              </div>
              <div className="text-center opacity-50">
                <div className="text-4xl mb-2">🏅</div>
                <p className="font-semibold">75% Complete</p>
                <p className="text-xs text-slate-600 dark:text-slate-400">Free mentorship session</p>
              </div>
              <div className="text-center opacity-50">
                <div className="text-4xl mb-2">👑</div>
                <p className="font-semibold">100% Complete</p>
                <p className="text-xs text-slate-600 dark:text-slate-400">Lifetime support access</p>
              </div>
            </div>
          </Card>
        </motion.div>
      </div>
    </div>
  )
}
