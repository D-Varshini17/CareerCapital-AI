import React from 'react'
import { motion } from 'framer-motion'
import { Star, MapPin, BookOpen, Video, Calendar } from 'lucide-react'
import { Card, Button, Badge } from '../components'

export default function MentorshipMarketplace() {
  const mentors = [
    {
      id: 1,
      name: 'Priya Sharma',
      title: 'Senior Software Engineer at Google',
      country: '🇺🇸 USA',
      specialization: 'Data Science & ML',
      rating: 4.9,
      reviews: 127,
      price: 1500,
      avatar: '👩‍💼',
      availability: 'Available',
      bio: 'MS from Stanford, 8+ years experience in AI/ML',
    },
    {
      id: 2,
      name: 'Arjun Patel',
      title: 'Product Manager at Microsoft',
      country: '🇨🇦 Canada',
      specialization: 'Career Strategy',
      rating: 4.8,
      reviews: 98,
      price: 1200,
      avatar: '👨‍💼',
      availability: 'Available',
      bio: 'IIT Delhi, MBA from UPenn, 6+ years in tech',
    },
    {
      id: 3,
      name: 'Anjali Verma',
      title: 'Finance Manager at JP Morgan',
      country: '🇬🇧 UK',
      specialization: 'Loan Strategy',
      rating: 4.7,
      reviews: 156,
      price: 1800,
      avatar: '👩‍💻',
      availability: 'Booked this week',
      bio: 'CFA, 10+ years in investment banking',
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
          <h1 className="text-4xl font-bold mb-2">👥 Mentorship Marketplace</h1>
          <p className="text-slate-600 dark:text-slate-400">
            Connect with experienced mentors for career & financial guidance
          </p>
        </motion.div>

        {/* Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-8 flex flex-wrap gap-4"
        >
          {['All', 'Career Strategy', 'Loan Planning', 'Technical Skills', 'Visa Help'].map((filter) => (
            <Button
              key={filter}
              variant={filter === 'All' ? 'primary' : 'outline'}
              size="sm"
            >
              {filter}
            </Button>
          ))}
        </motion.div>

        {/* Mentors Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-8">
          {mentors.map((mentor, idx) => (
            <motion.div
              key={mentor.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
            >
              <Card className="flex flex-col h-full">
                {/* Header */}
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="text-4xl">{mentor.avatar}</div>
                    <div>
                      <h3 className="font-bold">{mentor.name}</h3>
                      <p className="text-xs text-slate-600 dark:text-slate-400">{mentor.title}</p>
                    </div>
                  </div>
                  <Badge variant="success">★ {mentor.rating}</Badge>
                </div>

                {/* Info */}
                <div className="space-y-2 mb-4 flex-1">
                  <div className="flex items-center gap-2 text-sm">
                    <MapPin className="w-4 h-4 text-sky-600 dark:text-sky-400" />
                    <span>{mentor.country}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <BookOpen className="w-4 h-4 text-sky-600 dark:text-sky-400" />
                    <span>{mentor.specialization}</span>
                  </div>
                  <p className="text-sm text-slate-600 dark:text-slate-400">{mentor.bio}</p>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-2 gap-2 mb-4 p-3 bg-slate-50 dark:bg-slate-800 rounded-lg">
                  <div className="text-center">
                    <p className="text-xs text-slate-600 dark:text-slate-400">Rating</p>
                    <p className="font-bold text-yellow-500">⭐ {mentor.rating}</p>
                  </div>
                  <div className="text-center">
                    <p className="text-xs text-slate-600 dark:text-slate-400">Reviews</p>
                    <p className="font-bold">{mentor.reviews}</p>
                  </div>
                </div>

                {/* Availability */}
                <div className="mb-4 p-3 bg-sky-50 dark:bg-sky-900/20 border border-sky-200 dark:border-sky-800 rounded-lg">
                  <p className="text-sm font-medium text-sky-900 dark:text-sky-200">
                    {mentor.availability === 'Available' ? '✓' : '⏳'} {mentor.availability}
                  </p>
                </div>

                {/* CTA */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="font-bold">₹{mentor.price}/hour</span>
                    <div className="flex items-center gap-1 text-xs text-slate-600 dark:text-slate-400">
                      <Video className="w-4 h-4" />
                      <span>Video Call</span>
                    </div>
                  </div>
                  <Button className="w-full">Book Session</Button>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* How it Works */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <Card className="bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20">
            <h2 className="text-2xl font-bold mb-6">How It Works</h2>
            <div className="grid md:grid-cols-4 gap-6">
              {[
                { num: 1, title: 'Browse Mentors', desc: 'Find mentors by expertise' },
                { num: 2, title: 'Book Session', desc: 'Schedule a video call' },
                { num: 3, title: 'Connect', desc: 'Chat with your mentor' },
                { num: 4, title: 'Grow', desc: 'Get actionable insights' },
              ].map((step) => (
                <div key={step.num} className="text-center">
                  <div className="w-12 h-12 rounded-full bg-purple-600 text-white flex items-center justify-center font-bold text-lg mx-auto mb-3">
                    {step.num}
                  </div>
                  <h3 className="font-semibold mb-1">{step.title}</h3>
                  <p className="text-sm text-slate-600 dark:text-slate-400">{step.desc}</p>
                </div>
              ))}
            </div>
          </Card>
        </motion.div>
      </div>
    </div>
  )
}
