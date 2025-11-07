'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { signIn } from '@/lib/supabase/auth'

export default function LoginPage() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      await signIn({ email, password })
      router.push('/dashboard')
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message)
      } else {
        setError('Une erreur est survenue lors de la connexion')
      }
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="w-[320px] bg-white rounded-lg shadow-lg p-6">
      {/* Titre */}
      <div className="text-center mb-5">
        <h2 className="text-lg font-bold text-gray-900">Login</h2>
      </div>

      {/* Formulaire */}
      <form onSubmit={handleSubmit} className="space-y-3">
        {error && (
          <div className="text-red-600 text-xs bg-red-50 px-3 py-2 rounded">
            {error}
          </div>
        )}

        {/* Email */}
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          required
          className="w-full px-3 py-2 text-sm bg-white border border-gray-300 rounded focus:outline-none focus:border-[#2C3E50] text-gray-900 placeholder:text-gray-400"
        />

        {/* Password */}
        <div className="relative">
          <input
            type={showPassword ? 'text' : 'password'}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            required
            className="w-full px-3 py-2 pr-9 text-sm bg-white border border-gray-300 rounded focus:outline-none focus:border-[#2C3E50] text-gray-900 placeholder:text-gray-400"
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600"
          >
            <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {showPassword ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
              ) : (
                <>
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </>
              )}
            </svg>
          </button>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-[#2C3E50] hover:bg-[#1a2633] text-white py-2 rounded text-sm font-medium transition disabled:opacity-50 mt-4"
        >
          {loading ? 'Login...' : 'Login'}
        </button>

        {/* Sign up link */}
        <div className="text-center text-xs text-gray-600 pt-2">
          Don't have an account?{' '}
          <Link href="/signup" className="text-[#2C3E50] font-semibold hover:text-[#E67E50]">
            Signup
          </Link>
        </div>
      </form>
    </div>
  )
}