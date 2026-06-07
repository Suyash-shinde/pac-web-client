import { useEffect, useRef } from 'react'
import { useAuth } from '../../lib/auth'

const CLIENT_ID = import.meta.env.VITE_GOOGLE_CLIENT_ID || ''
const GSI_SRC = 'https://accounts.google.com/gsi/client'

// Lazily load the Google Identity Services script once.
let gsiPromise = null
function loadGsi() {
  if (gsiPromise) return gsiPromise
  gsiPromise = new Promise((resolve, reject) => {
    if (window.google?.accounts?.id) return resolve()
    const s = document.createElement('script')
    s.src = GSI_SRC
    s.async = true
    s.defer = true
    s.onload = resolve
    s.onerror = () => reject(new Error('Failed to load Google sign-in'))
    document.head.appendChild(s)
  })
  return gsiPromise
}

/**
 * Renders the official "Sign in with Google" button. Hidden entirely when no
 * client ID is configured (email/password still works). On success it posts the
 * Google credential to the backend via loginWithGoogle and calls onSuccess.
 */
export default function GoogleButton({ onSuccess, onError }) {
  const ref = useRef(null)
  const { loginWithGoogle } = useAuth()

  useEffect(() => {
    if (!CLIENT_ID) return
    let cancelled = false
    loadGsi()
      .then(() => {
        if (cancelled || !ref.current) return
        window.google.accounts.id.initialize({
          client_id: CLIENT_ID,
          callback: async ({ credential }) => {
            try {
              await loginWithGoogle(credential)
              onSuccess?.()
            } catch (e) {
              onError?.(e.message || 'Google sign-in failed')
            }
          },
        })
        window.google.accounts.id.renderButton(ref.current, {
          theme: 'outline',
          size: 'large',
          width: 320,
          text: 'continue_with',
        })
      })
      .catch((e) => onError?.(e.message))
    return () => {
      cancelled = true
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  if (!CLIENT_ID) return null
  return <div ref={ref} className="google-btn" />
}
