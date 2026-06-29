'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

const ROLE_REDIRECT: Record<string, string> = {
  STUDENT: '/student',
  TEACHER: '/teacher',
  HOMEROOM: '/homeroom',
  ADMIN: '/admin',
}

export default function LoginPage() {
  const router = useRouter()
  const [showPassword, setShowPassword] = useState(false)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  async function handleLogin() {
    setError('')

    if (!username || !password) {
      setError('Username dan password tidak boleh kosong.')
      return
    }

    setLoading(true)
    try {
      const res = await fetch('http://localhost:8000/api/v1/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ username, password }),
      })

      const data = await res.json()

      if (!res.ok) {
        setError(data.detail || 'Login gagal.')
        return
      }

      sessionStorage.setItem('access_token', data.access_token)
      sessionStorage.setItem('role', data.role)
      router.push(ROLE_REDIRECT[data.role] ?? '/')
    } catch {
      setError('Tidak bisa terhubung ke server.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex">

      {/* Panel Kiri — Branding */}
      <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-teal-400 to-teal-600 flex-col items-center justify-center gap-6">
        <div className="bg-white rounded-full p-4">
          <svg width="40" height="40" viewBox="0 0 24 24" fill="none">
            <path d="M12 3L4 7V13C4 17.4 7.4 21.5 12 22C16.6 21.5 20 17.4 20 13V7L12 3Z"
              fill="#0D9488"/>
            <path d="M9 12L11 14L15 10" stroke="white" strokeWidth="2"
              strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>
        <div className="text-center">
          <p className="text-white text-sm font-medium tracking-widest uppercase">LMS</p>
          <h1 className="text-white text-3xl font-bold mt-1">MindLeap LMS</h1>
        </div>
      </div>

      {/* Panel Kanan — Form Area */}
      <div className="w-full lg:w-1/2 flex items-center justify-center px-8">
        <div className="w-full max-w-md">

          {/* Judul */}
          <h2 className="text-2xl font-bold text-gray-800">
            Welcome Back to <span className="text-teal-600">MindLeap LMS</span>
          </h2>
          <p className="text-gray-500 mt-1 mb-8">Sign in to continue your learning journey</p>

          {/* Error Message */}
          {error && (
            <div className="bg-red-50 text-red-600 text-sm px-4 py-2 rounded-lg mb-4">
              {error}
            </div>
          )}

          {/* Input Username */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Username
            </label>
            <input
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
            />
          </div>

          {/* Input Password */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleLogin()}
                className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm"
              >
                {showPassword ? 'Hide' : 'Show'}
              </button>
            </div>
          </div>

          {/* Remember Me + Forgot Password */}
          <div className="flex items-center justify-between mb-6">
            <label className="flex items-center gap-2 text-sm text-gray-600 cursor-pointer">
              <input type="checkbox" className="w-4 h-4 accent-teal-500" />
              Remember Me
            </label>
            <a href="#" className="text-sm text-teal-600 hover:underline">
              Forgot Password?
            </a>
          </div>

          {/* Tombol Sign In */}
          <button
            type="button"
            onClick={handleLogin}
            disabled={loading}
            className="w-full bg-teal-600 hover:bg-teal-700 disabled:opacity-50 text-white font-semibold py-2.5 rounded-lg transition-colors"
          >
            {loading ? 'Memproses...' : 'Sign In'}
          </button>

          {/* Divider */}
          <div className="flex items-center gap-3 my-6">
            <div className="flex-1 h-px bg-gray-200" />
            <span className="text-sm text-gray-400">Or sign in with</span>
            <div className="flex-1 h-px bg-gray-200" />
          </div>

          {/* OAuth Buttons */}
          <div className="flex gap-3">
            <button
              type="button"
              className="flex-1 flex items-center justify-center gap-2 border border-gray-300 rounded-lg py-2.5 hover:bg-gray-50 transition-colors"
            >
              <svg width="18" height="18" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z"/>
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
              </svg>
              <span className="text-sm text-gray-600 font-medium">Google</span>
            </button>

            <button
              type="button"
              className="flex-1 flex items-center justify-center gap-2 border border-gray-300 rounded-lg py-2.5 hover:bg-gray-50 transition-colors"
            >
              <svg width="18" height="18" viewBox="0 0 24 24">
                <path fill="#F25022" d="M1 1h10v10H1z"/>
                <path fill="#7FBA00" d="M13 1h10v10H13z"/>
                <path fill="#00A4EF" d="M1 13h10v10H1z"/>
                <path fill="#FFB900" d="M13 13h10v10H13z"/>
              </svg>
              <span className="text-sm text-gray-600 font-medium">Microsoft</span>
            </button>
          </div>

          {/* Footer Links */}
          <div className="flex items-center justify-between mt-8">
            <p className="text-sm text-gray-500">
              Don't have an account?{' '}
              <a href="#" className="text-teal-600 font-medium hover:underline">
                Sign Up
              </a>
            </p>
            <a href="#" className="text-sm text-teal-600 font-medium hover:underline">
              Need Help?
            </a>
          </div>

        </div>
      </div>

    </div>
  )
}