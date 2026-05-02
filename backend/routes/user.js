import express from 'express'
import { verifyToken } from '../middleware/auth.js'
import { findUserById, updateCareerProfile, getCareerProfile, createLoan, getLoansByUserId } from '../utils/mockDb.js'

const router = express.Router()

router.get('/profile', verifyToken, (req, res) => {
  const user = findUserById(req.user.id)
  if (!user) return res.status(404).json({ error: 'User not found' })
  res.json({ id: user.id, name: user.name, email: user.email })
})

router.put('/profile', verifyToken, (req, res) => {
  const user = findUserById(req.user.id)
  if (!user) return res.status(404).json({ error: 'User not found' })
  // In production, validate and update DB
  user.name = req.body.name || user.name
  res.json({ user: { id: user.id, name: user.name, email: user.email } })
})

router.get('/career-profile', verifyToken, (req, res) => {
  const profile = getCareerProfile(req.user.id)
  res.json({ profile })
})

router.put('/career-profile', verifyToken, (req, res) => {
  const profile = updateCareerProfile(req.user.id, req.body)
  res.json({ profile })
})

router.get('/loans', verifyToken, (req, res) => {
  const loans = getLoansByUserId(req.user.id)
  res.json({ loans })
})

router.post('/loans', verifyToken, (req, res) => {
  const { amount, rate, tenure } = req.body
  const loan = createLoan(req.user.id, amount, rate, tenure)
  res.json({ loan })
})

export default router
