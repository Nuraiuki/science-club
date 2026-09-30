import { useRef, type ReactNode } from 'react'
import { motion, useMotionValue, useReducedMotion, useSpring } from 'framer-motion'
import { SITE, isExternal } from '../../config/site'

type Variant = 'dark' | 'light' | 'outline-light' | 'nav'

const styles: Record<Variant, string> = {
  dark: 'bg-ink text-paper h-[51px] px-[29px] text-[14px] hover:bg-accent',
  light: 'bg-white text-ink h-[69px] px-[48.5px] text-[21px] hover:bg-accent hover:text-white',
  'outline-light':
    'border border-white/30 text-white h-[69px] px-[48.5px] text-[21px] hover:bg-white hover:text-ink',
  nav: 'bg-ink text-paper h-[32px] px-[16px] text-[10.5px] hover:bg-accent',
}

/** Любая кнопка «Join» ведёт на Google Form из config/site.ts. Кнопки слегка тянутся за курсором. */
export function JoinLink({
  variant = 'dark',
  children,
  href = SITE.formUrl,
  className = '',
}: {
  variant?: Variant
  children: ReactNode
  href?: string
  className?: string
}) {
  const ref = useRef<HTMLAnchorElement>(null)
  const reduce = useReducedMotion()
  const mx = useMotionValue(0)
  const my = useMotionValue(0)
  const x = useSpring(mx, { stiffness: 230, damping: 17, mass: 0.4 })
  const y = useSpring(my, { stiffness: 230, damping: 17, mass: 0.4 })
  const magnetic = variant !== 'nav' && !reduce
  const external = isExternal(href)

  return (
    <motion.a
      ref={ref}
      href={href}
      {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
      style={magnetic ? { x, y } : undefined}
      onMouseMove={(e) => {
        if (!magnetic || !ref.current) return
        const r = ref.current.getBoundingClientRect()
        mx.set((e.clientX - (r.left + r.width / 2)) * 0.28)
        my.set((e.clientY - (r.top + r.height / 2)) * 0.36)
      }}
      onMouseLeave={() => {
        mx.set(0)
        my.set(0)
      }}
      className={`inline-flex items-center justify-center rounded-full font-jakarta font-medium uppercase tracking-[-0.01em] whitespace-nowrap transition-colors duration-200 ${styles[variant]} ${className}`}
    >
      {children}
    </motion.a>
  )
}
