import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Card, Button, Badge } from '../components'
import { MapPin, DollarSign, Home, Users, TrendingUp } from 'lucide-react'

export default function SmartLivingAssistant() {
  const [selectedCity, setSelectedCity] = useState(null)

  const cities = [
    {
      id: 1,
      name: 'Toronto',
      country: '🇨🇦 Canada',
      costOfLiving: 1800,
      rent: 800,
      food: 400,
      transport: 100,
      quality: 9,
      safety: 9,
      studentComm: 8,
      jobOpportunities: 9,
      climate: 'Cold',
      bestFor: 'Tech, Finance, Quality of Life',
    },
    {
      id: 2,
      name: 'Bangalore',
      country: '🇮🇳 India',
      costOfLiving: 600,
      rent: 250,
      food: 150,
      transport: 50,
      quality: 7,
      safety: 7,
      studentComm: 9,
      jobOpportunities: 8,
      climate: 'Tropical',
      bestFor: 'Tech Jobs, Startup Culture',
    },
    {
      id: 3,
      name: 'Sydney',
      country: '🇦🇺 Australia',
      costOfLiving: 2100,
      rent: 900,
      food: 450,
      transport: 150,
      quality: 9,
      safety: 9,
      studentComm: 8,
      jobOpportunities: 8,
      climate: 'Temperate',
      bestFor: 'Beach Life, Work-Life Balance',
    },
    {
      id: 4,
      name: 'Berlin',
      country: '🇩🇪 Germany',
      costOfLiving: 1200,
      rent: 500,
      food: 300,
      transport: 86,
      quality: 9,
      safety: 9,
      studentComm: 8,
      jobOpportunities: 7,
      climate: 'Temperate',
      bestFor: 'Tech, Art, Low Cost',
    },
  ]

  return (
    <div className="min-h-screen pt-8 pb-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-4xl font-bold mb-2">🏠 Smart Living Assistant</h1>
          <p className="text-slate-600 dark:text-slate-400">
            Compare cities and plan your living strategy
          </p>
        </motion.div>

        {/* Cities Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-8 mb-8">
          {cities.map((city, idx) => (
            <motion.div
              key={city.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              onClick={() => setSelectedCity(selectedCity === city.id ? null : city.id)}
              className="cursor-pointer"
            >
              <Card className="h-full hover:shadow-xl transition-shadow">
                {/* Header */}
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="text-2xl font-bold">{city.name}</h3>
                    <p className="text-slate-600 dark:text-slate-400 flex items-center gap-1">
                      <MapPin className="w-4 h-4" /> {city.country}
                    </p>
                  </div>
                  <Badge variant="primary">🌡️ {city.climate}</Badge>
                </div>

                {/* Cost Breakdown */}
                <div className="grid grid-cols-4 gap-2 mb-6 p-4 bg-slate-50 dark:bg-slate-800 rounded-lg">
                  <div className="text-center">
                    <p className="text-xs text-slate-600 dark:text-slate-400">Monthly</p>
                    <p className="font-bold">₹{city.costOfLiving}K</p>
                  </div>
                  <div className="text-center">
                    <p className="text-xs text-slate-600 dark:text-slate-400">Rent</p>
                    <p className="font-bold">₹{city.rent}K</p>
                  </div>
                  <div className="text-center">
                    <p className="text-xs text-slate-600 dark:text-slate-400">Food</p>
                    <p className="font-bold">₹{city.food}K</p>
                  </div>
                  <div className="text-center">
                    <p className="text-xs text-slate-600 dark:text-slate-400">Transport</p>
                    <p className="font-bold">₹{city.transport}K</p>
                  </div>
                </div>

                {/* Quality Scores */}
                <div className="space-y-2 mb-4">
                  {[
                    { label: 'Quality of Life', value: city.quality },
                    { label: 'Safety', value: city.safety },
                    { label: 'Student Community', value: city.studentComm },
                    { label: 'Job Opportunities', value: city.jobOpportunities },
                  ].map((metric) => (
                    <div key={metric.label} className="flex items-center gap-2">
                      <span className="text-sm flex-1">{metric.label}</span>
                      <div className="w-20 h-2 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: `${(metric.value / 10) * 100}%` }}
                          transition={{ duration: 0.5, delay: idx * 0.1 }}
                          className="h-full bg-gradient-to-r from-sky-500 to-cyan-500"
                        />
                      </div>
                      <span className="text-xs font-bold w-6 text-right">{metric.value}/10</span>
                    </div>
                  ))}
                </div>

                {/* Expandable Info */}
                {selectedCity === city.id && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="pt-4 border-t border-slate-200 dark:border-slate-700"
                  >
                    <p className="text-sm font-medium mb-2">Best For:</p>
                    <p className="text-sm text-slate-600 dark:text-slate-400 mb-4">
                      {city.bestFor}
                    </p>
                    <Button className="w-full">Explore Housing Options</Button>
                  </motion.div>
                )}
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Comparison Tool */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <Card className="bg-gradient-to-r from-sky-50 to-cyan-50 dark:from-sky-900/20 dark:to-cyan-900/20">
            <h2 className="text-2xl font-bold mb-6">💡 Smart Living Tips</h2>
            <div className="grid md:grid-cols-3 gap-6">
              {[
                {
                  icon: '🏠',
                  title: 'Find Housing',
                  desc: 'Use Airbnb, Zillow, or local portals to find affordable housing',
                },
                {
                  icon: '🍽️',
                  title: 'Manage Food Costs',
                  desc: 'Cook at home, use meal prep services to save 30-40%',
                },
                {
                  icon: '🚌',
                  title: 'Transportation',
                  desc: 'Get student passes for public transport to save money',
                },
              ].map((tip, idx) => (
                <div key={idx} className="p-4 bg-white dark:bg-slate-800 rounded-lg">
                  <p className="text-3xl mb-2">{tip.icon}</p>
                  <h3 className="font-semibold mb-2">{tip.title}</h3>
                  <p className="text-sm text-slate-600 dark:text-slate-400">{tip.desc}</p>
                </div>
              ))}
            </div>
          </Card>
        </motion.div>
      </div>
    </div>
  )
}
