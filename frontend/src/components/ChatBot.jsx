import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Send, X, MessageCircle, Minimize2 } from 'lucide-react'

export default function ChatBot() {
  const [isOpen, setIsOpen] = useState(false)
  const [isMinimized, setIsMinimized] = useState(false)
  const [messages, setMessages] = useState([
    {
      id: 1,
      type: 'bot',
      text: 'Hello! 👋 I\'m your AI mentor. Ask me anything about career planning, loans, or finances!',
    },
  ])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSend = async () => {
    if (!input.trim()) return

    // Add user message
    const userMessage = {
      id: messages.length + 1,
      type: 'user',
      text: input,
    }
    setMessages([...messages, userMessage])
    setInput('')
    setLoading(true)

    // Simulate AI response (mock)
    setTimeout(() => {
      const botResponses = [
        'Great question! Have you considered starting with the Career Discovery tool to find the best path for you?',
        'The EMI Calculator can help you understand your loan repayment better. Would you like to try it?',
        'Based on your profile, I\'d recommend exploring universities in countries that match your budget.',
        'Did you know that extra payments can significantly reduce your loan tenure? Let me show you how!',
        'Building your profile now will help you get better recommendations. Let\'s start with your skills!',
      ]

      const botMessage = {
        id: messages.length + 2,
        type: 'bot',
        text: botResponses[Math.floor(Math.random() * botResponses.length)],
      }
      setMessages((prev) => [...prev, botMessage])
      setLoading(false)
    }, 800)
  }

  return (
    <>
      {/* Chat Widget */}
      <AnimatePresence>
        {isOpen && !isMinimized && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            className="fixed bottom-24 right-6 w-96 h-96 bg-white dark:bg-slate-800 rounded-2xl shadow-2xl flex flex-col overflow-hidden z-40 border border-slate-200 dark:border-slate-700"
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-sky-500 to-cyan-500 p-4 text-white flex justify-between items-center">
              <div>
                <h3 className="font-bold">CareerCapital AI</h3>
                <p className="text-xs opacity-90">Always here to help</p>
              </div>
              <div className="flex gap-2">
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setIsMinimized(true)}
                  className="p-1 hover:bg-white/20 rounded-lg transition-colors"
                >
                  <Minimize2 className="w-4 h-4" />
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setIsOpen(false)}
                  className="p-1 hover:bg-white/20 rounded-lg transition-colors"
                >
                  <X className="w-4 h-4" />
                </motion.button>
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages.map((msg, index) => (
                <motion.div
                  key={msg.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`flex ${msg.type === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-xs px-4 py-2 rounded-lg ${
                      msg.type === 'user'
                        ? 'bg-sky-500 text-white rounded-br-none'
                        : 'bg-slate-100 dark:bg-slate-700 text-slate-900 dark:text-white rounded-bl-none'
                    }`}
                  >
                    <p className="text-sm">{msg.text}</p>
                  </div>
                </motion.div>
              ))}
              {loading && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex gap-2 justify-start"
                >
                  <div className="bg-slate-100 dark:bg-slate-700 px-4 py-2 rounded-lg rounded-bl-none">
                    <div className="flex gap-1">
                      {[0, 1, 2].map((i) => (
                        <motion.div
                          key={i}
                          animate={{ scale: [1, 1.3, 1] }}
                          transition={{ delay: i * 0.1, repeat: Infinity, duration: 0.6 }}
                          className="w-2 h-2 bg-slate-400 rounded-full"
                        />
                      ))}
                    </div>
                  </div>
                </motion.div>
              )}
            </div>

            {/* Input */}
            <div className="border-t border-slate-200 dark:border-slate-700 p-3 flex gap-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                placeholder="Ask anything..."
                className="flex-1 bg-slate-100 dark:bg-slate-700 border-0 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-sky-500 outline-none"
              />
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleSend}
                disabled={!input.trim() || loading}
                className="p-2 bg-sky-500 text-white rounded-lg hover:bg-sky-600 disabled:opacity-50 transition-colors"
              >
                <Send className="w-4 h-4" />
              </motion.button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Minimized View */}
      <AnimatePresence>
        {isMinimized && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            className="fixed bottom-6 right-6 z-40"
          >
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setIsMinimized(false)}
              className="w-14 h-14 bg-gradient-to-br from-sky-500 to-cyan-500 text-white rounded-full shadow-lg flex items-center justify-center hover:shadow-xl transition-shadow"
            >
              <MessageCircle className="w-6 h-6" />
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Button */}
      <AnimatePresence>
        {!isOpen && (
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setIsOpen(true)}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            className="fixed bottom-6 right-6 w-14 h-14 bg-gradient-to-br from-sky-500 to-cyan-500 text-white rounded-full shadow-lg flex items-center justify-center hover:shadow-xl transition-all z-40"
          >
            <MessageCircle className="w-6 h-6" />
          </motion.button>
        )}
      </AnimatePresence>
    </>
  )
}
