import { useEffect, useState } from 'react'
import { apiGet } from './api'

/**
 * Fetch `path` from the API with loading/error state.
 * `fallback` (e.g. local stub data) is used if the API is unreachable, so the
 * site still renders during development before the backend/DB is running.
 *
 * State is only updated inside async callbacks (never synchronously in the
 * effect body) to satisfy the react-hooks rules.
 */
export function useApi(path, fallback = null) {
  const [data, setData] = useState(fallback)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    let active = true
    apiGet(path)
      .then((d) => {
        if (!active) return
        setData(d)
        setError(null)
      })
      .catch((e) => {
        if (!active) return
        setError(e)
        if (fallback != null) setData(fallback)
      })
      .finally(() => {
        if (active) setLoading(false)
      })
    return () => {
      active = false
    }
    // `fallback` is intentionally excluded: stub fallbacks are recomputed each
    // render (new identity) and would otherwise cause a refetch loop. `path` is
    // the real input.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [path])

  return { data, loading, error }
}
