import express from 'express'
import { verifyToken } from '../middleware/auth.js'
import { calculateEMI, calculateEarlyPaymentBenefit } from '../controllers/financialController.js'

const router = express.Router()

router.post('/calculate-emi', (req, res) => {
  const { principal, rate, tenure } = req.body
  const result = calculateEMI(principal, rate, tenure)
  res.json({ emi: result })
})

router.post('/optimize', verifyToken, (req, res) => {
  const { principal, rate, tenure, extraPayment } = req.body
  const result = calculateEarlyPaymentBenefit(principal, rate, tenure, extraPayment)
  res.json({ result })
})

export default router
