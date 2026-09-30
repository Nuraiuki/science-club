import { useRef } from 'react'
import { motion, useInView, useReducedMotion } from 'framer-motion'
import type { ElementType } from 'react'

type Props = {
  lines: string[]
  as?: ElementType
  className?: string
  delay?: number
  stagger?: number
}

/**
 * Заголовок, который выезжает построчно из-под маски при появлении в экране.
 * Наблюдаем за самим заголовком: строка внутри маски полностью скрыта overflow,
 * и IntersectionObserver считал бы её невидимой навсегда.
 */
export function RevealLines({ lines, as: Tag = 'h2', className = '', delay = 0, stagger = 0.09 }: Props) {
  const reduce = useReducedMotion()
  const ref = useRef<HTMLElement>(null)
  const inView = useInView(ref, { once: true, margin: '0px 0px -8% 0px' })
  return (
    <Tag ref={ref} className={`flex flex-col ${className}`} aria-label={lines.join(' ')}>
      {lines.map((line, i) => (
        <span key={i} aria-hidden="true" className="-my-[0.06em] block overflow-hidden py-[0.06em]">
          <motion.span
            className="block"
            initial={reduce ? false : { y: '112%' }}
            animate={{ y: inView || reduce ? 0 : '112%' }}
            transition={{ duration: 0.85, delay: delay + i * stagger, ease: [0.22, 1, 0.36, 1] }}
          >
            {line}
          </motion.span>
        </span>
      ))}
    </Tag>
  )
}
