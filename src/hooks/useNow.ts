import { useEffect, useState } from 'react'

/** Текущее время в мс, обновляется каждые `every` мс. */
export function useNow(every = 1000) {
  const [now, setNow] = useState(() => Date.now())
  useEffect(() => {
    const t = setInterval(() => setNow(Date.now()), every)
    return () => clearInterval(t)
  }, [every])
  return now
}
