import { useEffect, useState } from 'react'
import { motion, useMotionValue, useReducedMotion, useSpring } from 'framer-motion'

/** Кольцо, которое плавно догоняет курсор и увеличивается над ссылками. Только для мыши. */
export function CursorRing() {
  const reduce = useReducedMotion()
  const [big, setBig] = useState(false)
  const [visible, setVisible] = useState(false)
  const x = useMotionValue(-100)
  const y = useMotionValue(-100)
  const sx = useSpring(x, { stiffness: 520, damping: 38, mass: 0.5 })
  const sy = useSpring(y, { stiffness: 520, damping: 38, mass: 0.5 })

  const fine = typeof window !== 'undefined' && window.matchMedia('(hover: hover) and (pointer: fine)').matches
  const enabled = fine && !reduce

  useEffect(() => {
    if (!enabled) return
    const move = (e: MouseEvent) => {
      x.set(e.clientX)
      y.set(e.clientY)
      setVisible(true)
      setBig(Boolean((e.target as Element | null)?.closest('a, button')))
    }
    const leave = () => setVisible(false)
    window.addEventListener('mousemove', move, { passive: true })
    document.documentElement.addEventListener('mouseleave', leave)
    return () => {
      window.removeEventListener('mousemove', move)
      document.documentElement.removeEventListener('mouseleave', leave)
    }
  }, [enabled, x, y])

  if (!enabled) return null
  return (
    <motion.div
      aria-hidden="true"
      className="pointer-events-none fixed top-0 left-0 z-[300] -mt-[17px] -ml-[17px] h-[34px] w-[34px] rounded-full border border-white mix-blend-difference"
      style={{ x: sx, y: sy }}
      animate={{ scale: big ? 1.9 : 1, opacity: visible ? 1 : 0 }}
      transition={{ type: 'spring', stiffness: 300, damping: 24 }}
    />
  )
}
