'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { signIn, signUp } from '@/lib/supabase/auth'
import { colors } from '@/app/styles/colors'
import { motion, AnimatePresence } from 'framer-motion'

export default function AuthForm() {
  const router = useRouter()
  const [isLogin, setIsLogin] = useState(true)
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
  })
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [success, setSuccess] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      if (isLogin) {
        await signIn({ email: formData.email, password: formData.password })
        router.push('/dashboard')
      } else {
        if (formData.password !== formData.confirmPassword) {
          setError('Les mots de passe ne correspondent pas')
          setLoading(false)
          return
        }
        if (formData.password.length < 8) {
          setError('Le mot de passe doit contenir au moins 8 caractères')
          setLoading(false)
          return
        }
        await signUp({
          email: formData.email,
          password: formData.password,
          firstName: formData.firstName,
          lastName: formData.lastName,
        })
        setSuccess(true)
      }
    } catch (err) {
      if (err instanceof Error && err.message.includes('Email not confirmed')) {
        setError('Veuillez confirmer votre email avant de vous connecter')
      } else {
        setError(err instanceof Error ? err.message : 'Une erreur est survenue')
      }
    } finally {
      setLoading(false)
    }
  }

  if (success) {
    return (
      <div className="auth-form-container">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3 }}
        >
          <div className="auth-form-header">
            <h3 className="auth-form-title" style={{ color: colors.navy }}>
              Compte créé !
            </h3>
            <p className="auth-form-subtitle">
              Veuillez vérifier votre email pour confirmer votre compte.
            </p>
          </div>
          <div style={{ textAlign: 'center', marginTop: '20px' }}>
            <button
              onClick={() => {
                setSuccess(false)
                setIsLogin(true)
              }}
              style={{
                padding: '12px 24px',
                backgroundColor: colors.navy,
                color: 'white',
                border: 'none',
                borderRadius: '12px',
                fontSize: '14px',
                fontWeight: 600,
                cursor: 'pointer',
              }}
            >
              Retour à la connexion
            </button>
          </div>
        </motion.div>
      </div>
    )
  }

  return (
    <div className="auth-form-container" style={{ overflow: 'hidden' }}>
      <AnimatePresence mode="wait" initial={false}>
        <motion.div
          key={isLogin ? 'login' : 'signup'}
          initial={{ opacity: 0, x: isLogin ? -20 : 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: isLogin ? 20 : -20 }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
          style={{ width: '100%' }}
        >
          {/* Header */}
          <div className="auth-form-header">
            <h3 className="auth-form-title">
              {isLogin ? 'Connexion' : 'Créer un compte'}
            </h3>
            <p className="auth-form-subtitle">
              {isLogin ? 'Accédez à votre espace' : 'Rejoignez RecapProtec'}
            </p>
          </div>

          {/* Form */}
          <form
            onSubmit={handleSubmit}
            style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}
          >
            {error && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                style={{
                  backgroundColor: colors.paperLight,
                  borderLeft: `4px solid ${colors.terracotta}`,
                  padding: '12px 16px',
                  borderRadius: '8px',
                  fontSize: '14px',
                  color: colors.warmBlack,
                }}
              >
                {error}
              </motion.div>
            )}

            {/* Prénom et Nom (signup only) */}
            {!isLogin && (
              <div className="auth-form-grid">
                <div>
                  <label
                    htmlFor="firstName"
                    style={{
                      display: 'block',
                      marginBottom: '8px',
                      fontSize: '14px',
                      fontWeight: 600,
                      color: colors.warmBlack,
                    }}
                  >
                    Prénom
                  </label>
                  <input
                    id="firstName"
                    name="firstName"
                    type="text"
                    value={formData.firstName}
                    onChange={handleChange}
                    required={!isLogin}
                    style={{
                      width: '100%',
                      padding: '12px',
                      backgroundColor: colors.paperLight,
                      border: `1px solid ${colors.paperDark}`,
                      borderRadius: '12px',
                      fontSize: '14px',
                      color: colors.warmBlack,
                      outline: 'none',
                    }}
                    onFocus={(e) => {
                      e.target.style.borderColor = colors.navy
                      e.target.style.boxShadow = `0 0 0 3px ${colors.navy}22`
                    }}
                    onBlur={(e) => {
                      e.target.style.borderColor = colors.paperDark
                      e.target.style.boxShadow = 'none'
                    }}
                  />
                </div>
                <div>
                  <label
                    htmlFor="lastName"
                    style={{
                      display: 'block',
                      marginBottom: '8px',
                      fontSize: '14px',
                      fontWeight: 600,
                      color: colors.warmBlack,
                    }}
                  >
                    Nom
                  </label>
                  <input
                    id="lastName"
                    name="lastName"
                    type="text"
                    value={formData.lastName}
                    onChange={handleChange}
                    required={!isLogin}
                    style={{
                      width: '100%',
                      padding: '12px',
                      backgroundColor: colors.paperLight,
                      border: `1px solid ${colors.paperDark}`,
                      borderRadius: '12px',
                      fontSize: '14px',
                      color: colors.warmBlack,
                      outline: 'none',
                    }}
                    onFocus={(e) => {
                      e.target.style.borderColor = colors.navy
                      e.target.style.boxShadow = `0 0 0 3px ${colors.navy}22`
                    }}
                    onBlur={(e) => {
                      e.target.style.borderColor = colors.paperDark
                      e.target.style.boxShadow = 'none'
                    }}
                  />
                </div>
              </div>
            )}

            {/* Email */}
            <div>
              <label
                htmlFor="email"
                style={{
                  display: 'block',
                  marginBottom: '8px',
                  fontSize: '14px',
                  fontWeight: 600,
                  color: colors.warmBlack,
                }}
              >
                Email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                placeholder=""
                required
                style={{
                  width: '100%',
                  padding: '12px',
                  backgroundColor: colors.paperLight,
                  border: `1px solid ${colors.paperDark}`,
                  borderRadius: '12px',
                  fontSize: '14px',
                  color: colors.warmBlack,
                  outline: 'none',
                }}
                onFocus={(e) => {
                  e.target.style.borderColor = colors.navy
                  e.target.style.boxShadow = `0 0 0 3px ${colors.navy}22`
                }}
                onBlur={(e) => {
                  e.target.style.borderColor = colors.paperDark
                  e.target.style.boxShadow = 'none'
                }}
              />
            </div>

            {/* Password */}
            <div>
              <label
                htmlFor="password"
                style={{
                  display: 'block',
                  marginBottom: '8px',
                  fontSize: '14px',
                  fontWeight: 600,
                  color: colors.warmBlack,
                }}
              >
                Mot de passe
              </label>
              <div style={{ position: 'relative' }}>
                <input
                  id="password"
                  name="password"
                  type={showPassword ? 'text' : 'password'}
                  value={formData.password}
                  onChange={handleChange}
                  placeholder=""
                  required
                  style={{
                    width: '100%',
                    padding: '12px',
                    paddingRight: '44px',
                    backgroundColor: colors.paperLight,
                    border: `1px solid ${colors.paperDark}`,
                    borderRadius: '12px',
                    fontSize: '14px',
                    color: colors.warmBlack,
                    outline: 'none',
                  }}
                  onFocus={(e) => {
                    e.target.style.borderColor = colors.navy
                    e.target.style.boxShadow = `0 0 0 3px ${colors.navy}22`
                  }}
                  onBlur={(e) => {
                    e.target.style.borderColor = colors.paperDark
                    e.target.style.boxShadow = 'none'
                  }}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  style={{
                    position: 'absolute',
                    right: '12px',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    background: 'none',
                    border: 'none',
                    cursor: 'pointer',
                    color: colors.neutralGray,
                    padding: '4px',
                  }}
                >
                  <svg
                    width="20"
                    height="20"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    {showPassword ? (
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21"
                      />
                    ) : (
                      <>
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                        />
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                        />
                      </>
                    )}
                  </svg>
                </button>
              </div>
            </div>

            {/* Confirm Password (signup only) */}
            {!isLogin && (
              <div>
                <label
                  htmlFor="confirmPassword"
                  style={{
                    display: 'block',
                    marginBottom: '8px',
                    fontSize: '14px',
                    fontWeight: 600,
                    color: colors.warmBlack,
                  }}
                >
                  Confirmer le mot de passe
                </label>
                <div style={{ position: 'relative' }}>
                  <input
                    id="confirmPassword"
                    name="confirmPassword"
                    type={showConfirmPassword ? 'text' : 'password'}
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    placeholder=""
                    required={!isLogin}
                    style={{
                      width: '100%',
                      padding: '12px',
                      paddingRight: '44px',
                      backgroundColor: colors.paperLight,
                      border: `1px solid ${colors.paperDark}`,
                      borderRadius: '12px',
                      fontSize: '14px',
                      color: colors.warmBlack,
                      outline: 'none',
                    }}
                    onFocus={(e) => {
                      e.target.style.borderColor = colors.navy
                      e.target.style.boxShadow = `0 0 0 3px ${colors.navy}22`
                    }}
                    onBlur={(e) => {
                      e.target.style.borderColor = colors.paperDark
                      e.target.style.boxShadow = 'none'
                    }}
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    style={{
                      position: 'absolute',
                      right: '12px',
                      top: '50%',
                      transform: 'translateY(-50%)',
                      background: 'none',
                      border: 'none',
                      cursor: 'pointer',
                      color: colors.neutralGray,
                      padding: '4px',
                    }}
                  >
                    <svg
                      width="20"
                      height="20"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      {showConfirmPassword ? (
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21"
                        />
                      ) : (
                        <>
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                          />
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                          />
                        </>
                      )}
                    </svg>
                  </button>
                </div>
              </div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              style={{
                width: '100%',
                padding: '14px',
                backgroundColor: colors.navy,
                color: 'white',
                border: 'none',
                borderRadius: '12px',
                fontSize: '16px',
                fontWeight: 600,
                cursor: 'pointer',
                marginTop: '8px',
                transition: 'all 0.2s',
                opacity: loading ? 0.6 : 1,
              }}
              onMouseEnter={(e) => {
                if (!loading) e.currentTarget.style.backgroundColor = colors.navyDark
              }}
              onMouseLeave={(e) => {
                if (!loading) e.currentTarget.style.backgroundColor = colors.navy
              }}
            >
              {loading
                ? 'Chargement...'
                : isLogin
                  ? 'Se connecter'
                  : 'Créer mon compte'}
            </button>

            {/* Toggle Login/Signup */}
            <p
              style={{
                textAlign: 'center',
                fontSize: '14px',
                color: colors.neutralGray,
                marginTop: '8px',
              }}
            >
              {isLogin ? "Pas encore de compte ?" : "Déjà un compte ?"}{' '}
              <span
                onClick={() => {
                  setIsLogin(!isLogin)
                  setError('')
                  setFormData({
                    firstName: '',
                    lastName: '',
                    email: '',
                    password: '',
                    confirmPassword: '',
                  })
                }}
                style={{
                  color: colors.navy,
                  fontWeight: 600,
                  cursor: 'pointer',
                  textDecoration: 'underline',
                }}
              >
                {isLogin ? 'Créer un compte' : 'Se connecter'}
              </span>
            </p>
          </form>
        </motion.div>
      </AnimatePresence>
    </div>
  )
}