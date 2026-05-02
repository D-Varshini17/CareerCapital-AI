import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Briefcase, Check, Globe, GraduationCap, Lightbulb, Zap } from 'lucide-react'
import { Badge, Button, Card, PageHeader, ProgressBar } from '../components'

export default function CareerDiscovery() {
  const [profile, setProfile] = useState({
    gpa: 3.8,
    skills: 'Python, Java, Machine Learning',
    budget: 40,
  })

  const universities = [
    { rank: 1, name: 'Stanford University', country: 'USA', program: 'MS Computer Science', costYear: 75000, roi: 9.2, match: 95, placement: 98 },
    { rank: 2, name: 'UC Berkeley', country: 'USA', program: 'MS EECS', costYear: 68000, roi: 9.0, match: 92, placement: 97 },
    { rank: 3, name: 'University of Toronto', country: 'Canada', program: 'MASc Computer Engineering', costYear: 32000, roi: 8.8, match: 89, placement: 95 },
    { rank: 4, name: 'ETH Zurich', country: 'Switzerland', program: 'MSc Computer Science', costYear: 20000, roi: 8.9, match: 87, placement: 96 },
  ]

  const careers = [
    { title: 'Software Engineer', match: 96, salary: '$150K-200K', icon: Briefcase },
    { title: 'Data Scientist', match: 94, salary: '$130K-180K', icon: Globe },
    { title: 'ML Engineer', match: 93, salary: '$140K-210K', icon: Zap },
    { title: 'Product Manager', match: 85, salary: '$120K-160K', icon: GraduationCap },
  ]

  const handleProfileChange = (e) => {
    const { name, value } = e.target
    setProfile((prev) => ({ ...prev, [name]: Number.isNaN(Number(value)) ? value : Number(value) }))
  }

  return (
    <div className="min-h-screen py-8 pb-20">
      <div className="page-shell max-w-6xl">
        <PageHeader
          eyebrow="Career discovery"
          title="Find career and university options that match your profile."
          description="Use GPA, skills, budget, and target outcomes to compare career paths and program options in a structured way."
        />

        <div className="grid gap-8 lg:grid-cols-3">
          <motion.div initial={{ opacity: 0, x: -16 }} animate={{ opacity: 1, x: 0 }} className="lg:col-span-1">
            <Card hover={false}>
              <h2 className="mb-6 text-xl font-bold">Profile inputs</h2>
              <div className="space-y-5">
                <div>
                  <label className="mb-2 block text-sm font-semibold">GPA</label>
                  <div className="flex items-center gap-3">
                    <input type="range" name="gpa" value={profile.gpa} onChange={handleProfileChange} min="2" max="4" step="0.1" className="flex-1" />
                    <span className="w-10 text-right text-lg font-bold">{profile.gpa}</span>
                  </div>
                </div>
                <div>
                  <label className="mb-2 block text-sm font-semibold">Budget in lakhs</label>
                  <input name="budget" type="number" value={profile.budget} onChange={handleProfileChange} className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2.5 text-sm dark:border-slate-700 dark:bg-slate-900" />
                </div>
                <div>
                  <label className="mb-2 block text-sm font-semibold">Key skills</label>
                  <textarea name="skills" value={profile.skills} onChange={handleProfileChange} rows="4" className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2.5 text-sm dark:border-slate-700 dark:bg-slate-900" />
                </div>
                <Button className="w-full">Analyze profile</Button>
              </div>

              <div className="mt-8 border-t border-slate-200 pt-6 dark:border-slate-800">
                <h3 className="mb-4 font-bold">Strength signals</h3>
                <ul className="space-y-2">
                  {['High academic score', 'Technical skill base', 'Clear technology focus'].map((item) => (
                    <li key={item} className="flex items-center gap-2 text-sm">
                      <Check className="h-4 w-4 text-emerald-600" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </Card>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} className="space-y-8 lg:col-span-2">
            <Card hover={false}>
              <div className="mb-6 flex items-center justify-between">
                <h2 className="text-2xl font-bold">Career matches</h2>
                <Badge variant="success">Top picks</Badge>
              </div>
              <div className="space-y-4">
                {careers.map((career, idx) => {
                  const Icon = career.icon
                  return (
                    <div key={career.title} className="rounded-lg border border-slate-200 p-4 dark:border-slate-800">
                      <div className="mb-3 flex items-start justify-between gap-4">
                        <div className="flex items-center gap-3">
                          <div className="rounded-lg bg-slate-100 p-2 dark:bg-slate-800">
                            <Icon className="h-5 w-5 text-sky-600" />
                          </div>
                          <div>
                            <h3 className="font-bold">{career.title}</h3>
                            <p className="text-sm text-slate-500 dark:text-slate-400">Average salary: {career.salary}</p>
                          </div>
                        </div>
                        <Badge>{career.match}% match</Badge>
                      </div>
                      <ProgressBar value={career.match} max={100} animated={false} />
                    </div>
                  )
                })}
              </div>
            </Card>

            <Card hover={false}>
              <div className="mb-6 flex items-center justify-between">
                <h2 className="text-2xl font-bold">University shortlist</h2>
                <Globe className="h-6 w-6 text-sky-600" />
              </div>
              <div className="space-y-4">
                {universities.map((uni) => (
                  <div key={uni.name} className="rounded-lg border border-slate-200 bg-slate-50 p-4 dark:border-slate-800 dark:bg-slate-900">
                    <div className="mb-4 flex items-start justify-between gap-4">
                      <div>
                        <p className="text-sm font-semibold text-sky-600">Rank #{uni.rank}</p>
                        <h3 className="text-lg font-bold">{uni.name}</h3>
                        <p className="text-sm text-slate-500 dark:text-slate-400">{uni.country} - {uni.program}</p>
                      </div>
                      <Badge variant="success">{uni.match}% fit</Badge>
                    </div>
                    <div className="grid grid-cols-3 gap-3 text-center text-sm">
                      <div className="rounded-lg bg-white p-3 dark:bg-slate-950"><p className="text-xs text-slate-500">Cost/year</p><p className="font-bold">${uni.costYear / 1000}K</p></div>
                      <div className="rounded-lg bg-white p-3 dark:bg-slate-950"><p className="text-xs text-slate-500">ROI score</p><p className="font-bold">{uni.roi}/10</p></div>
                      <div className="rounded-lg bg-white p-3 dark:bg-slate-950"><p className="text-xs text-slate-500">Placement</p><p className="font-bold">{uni.placement}%</p></div>
                    </div>
                  </div>
                ))}
              </div>
            </Card>

            <Card hover={false} className="border-sky-200 bg-sky-50 dark:border-sky-900 dark:bg-sky-950/30">
              <h2 className="mb-4 flex items-center gap-2 text-xl font-bold"><Lightbulb className="h-5 w-5 text-sky-600" /> Recommendations</h2>
              <ul className="space-y-2 text-sm text-slate-700 dark:text-slate-300">
                <li>Build a project portfolio for technical roles.</li>
                <li>Compare Canada programs for ROI and work-permit flexibility.</li>
                <li>Plan for Rs 35-40L total education and living costs.</li>
              </ul>
            </Card>
          </motion.div>
        </div>
      </div>
    </div>
  )
}
