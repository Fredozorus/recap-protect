'use client'

import { Moon, Sun } from 'lucide-react'
import { useTheme } from './ThemeProvider'
import { motion } from 'framer-motion'
import { colors } from '@/app/styles/colors'

export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme()

  return (
    <button
      onClick={toggleTheme}
      style={{
        background: 'none',
        border: 'none',
        cursor: 'pointer',
        padding: '8px',
        borderRadius: '50%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: theme === 'light' ? colors.navy : colors.terracotta,
      }}
      aria-label="Toggle theme"
    >
      <motion.div
        initial={false}
        animate={{ rotate: theme === 'dark' ? 180 : 0 }}
        transition={{ duration: 0.3 }}
      >
        {theme === 'light' ? (
          <Sun size={24} />
        ) : (
          <Moon size={24} />
        )}
      </motion.div>
    </button>
  )
}
