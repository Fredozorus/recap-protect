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
    <div className="bg-white rounded-2xl shadow-lg p-8">
      {/* Logo */}
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold">
          <span className="text-[#2C3E50]">Recap</span>
          <span className="text-[#E67E50]">Protec</span>
        </h1>
        <p className="text-gray-600 mt-2">Connectez-vous à votre compte</p>
      </div>

      {/* Formulaire */}
      <form onSubmit={handleSubmit} className="space-y-6">
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">
            {error}
          </div>
        )}

        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
            Email
          </label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="votre.email@e-protect.fr"
            required
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2C3E50] focus:border-transparent outline-none transition"
          />
        </div>

        <div>
          <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
            Mot de passe
          </label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder=""
            required
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2C3E50] focus:border-transparent outline-none transition"
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-[#2C3E50] text-white py-3 rounded-lg font-medium hover:bg-[#1a2633] transition disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? 'Connexion...' : 'Se connecter'}
        </button>
      </form>

      {/* Lien inscription */}
      <div className="mt-6 text-center">
        <p className="text-gray-600 text-sm">
          Pas encore de compte ?{' '}
          <Link href="/signup" className="text-[#E67E50] font-medium hover:underline">
            Créer un compte
          </Link>
        </p>
      </div>
    </div>
  )
}