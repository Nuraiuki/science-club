import { useEffect, useRef, useState } from 'react'
import { useInView, useReducedMotion } from 'framer-motion'

const GLYPHS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789/<>—'

/** Моно-лейбл «расшифровывается» при появлении. Ширина не прыгает: шрифт моноширинный. */
export function ScrambleText({ text, className = '' }: { text: string; className?: string }) {
  const ref = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: true, margin: '0px 0px -5% 0px' })
  const reduce = useReducedMotion()
  const [shown, setShown] = useState(text)

  useEffect(() => {
    if (!inView || reduce) return
    const total = 24
    let frame = 0
    const id = setInterval(() => {
      frame += 1
      const reveal = Math.floor((text.length * frame) / total)
      setShown(
        text
          .split('')
          .map((c, i) => (c === ' ' || i < reveal ? c : GLYPHS[Math.floor(Math.random() * GLYPHS.length)]))
          .join(''),
      )
      if (frame >= total) {
        clearInterval(id)
        setShown(text)
      }
    }, 34)
    return () => clearInterval(id)
  }, [inView, reduce, text])

  return (
    <span ref={ref} className={className} aria-label={text}>
      <span aria-hidden="true">{shown}</span>
    </span>
  )
}
