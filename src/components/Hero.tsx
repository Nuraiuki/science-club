import { useEffect, useState } from 'react'
import {
  AnimatePresence,
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
  type MotionValue,
} from 'framer-motion'
import { JoinLink } from './ui/JoinLink'
import { HERO_PILLS, HERO_PHOTOS } from '../config/content'
import { HeroPhotos } from './ui/HeroPhotos'

const EASE = [0.22, 1, 0.36, 1] as const

// LEARN → BUILD → CREATE → CONNECT при загрузке, затем остаёмся на CREATE (как в дизайне).
const SEQUENCE = ['LEARN', 'BUILD', 'CREATE', 'CONNECT', 'CREATE']

function useWordSequence() {
  const reduce = useReducedMotion()
  const [i, setI] = useState(reduce ? SEQUENCE.length - 1 : 0)
  useEffect(() => {
    if (reduce || i >= SEQUENCE.length - 1) return
    // Первая пауза длиннее: сначала отыгрывает входная анимация заголовка.
    const t = setTimeout(() => setI((v) => v + 1), i === 0 ? 1500 : 750)
    return () => clearTimeout(t)
  }, [i, reduce])
  return SEQUENCE[i]
}

/** Строка заголовка выезжает из-под маски при загрузке. */
function Line({ children, index }: { children: React.ReactNode; index: number }) {
  const reduce = useReducedMotion()
  return (
    <span className="-my-[0.08em] block overflow-hidden py-[0.08em]">
      <motion.span
        className="block"
        initial={reduce ? false : { y: '115%' }}
        animate={{ y: 0 }}
        transition={{ duration: 0.95, delay: 0.15 + index * 0.1, ease: EASE }}
      >
        {children}
      </motion.span>
    </span>
  )
}

function Pill({
  p,
  idx,
  sx,
  sy,
}: {
  p: (typeof HERO_PILLS)[number]
  idx: number
  sx: MotionValue<number>
  sy: MotionValue<number>
}) {
  const reduce = useReducedMotion()
  const depth = 18 + (idx % 3) * 14
  const x = useTransform(sx, (v) => v * depth)
  const y = useTransform(sy, (v) => v * depth)
  return (
    <motion.div
      className="absolute top-[var(--tm)] left-[min(var(--lm),calc(100%_-_92px))] md:top-[var(--t)] md:left-[var(--l)]"
      style={{
        x,
        y,
        ...({
          '--l': p.left,
          '--lm': 'leftMobile' in p ? p.leftMobile : p.left,
          '--t': p.top,
          '--tm': 'topMobile' in p ? p.topMobile : p.top,
        } as React.CSSProperties),
      }}
    >
      <motion.div
        initial={reduce ? false : { scale: 0, opacity: 0, rotate: -12 }}
        animate={{ scale: 1, opacity: 1, rotate: 0 }}
        transition={{ type: 'spring', stiffness: 240, damping: 15, delay: 1 + idx * 0.1 }}
      >
        <span
          className="floaty block rounded-full border-[1.5px] border-ink bg-white px-[11px] py-[7px] font-jakarta text-[9.5px] leading-none font-bold tracking-[-0.01em] uppercase shadow-[2px_3px_0_0_#030303] md:px-[11px] md:py-[9px] md:text-[9.6px]"
          style={
            {
              '--r': `${p.rotate}deg`,
              transform: `rotate(${p.rotate}deg)`,
              animationDelay: `${idx * 0.55}s`,
            } as React.CSSProperties
          }
        >
          {p.label}
        </span>
      </motion.div>
    </motion.div>
  )
}

export default function Hero() {
  const word = useWordSequence()
  const reduce = useReducedMotion()

  // Плашки слегка следуют за курсором (параллакс с разной глубиной).
  const mx = useMotionValue(0)
  const my = useMotionValue(0)
  const sx = useSpring(mx, { stiffness: 80, damping: 16 })
  const sy = useSpring(my, { stiffness: 80, damping: 16 })

  const fadeUp = (delay: number) =>
    reduce
      ? {}
      : {
          initial: { opacity: 0, y: 30 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.9, delay, ease: EASE },
        }

  return (
    <section id="top" className="pt-[14px] pb-[50px]">
      <div className="wrap-n">
        <h1
          aria-label="Where students turn create into reality."
          className="display-a flex flex-col text-[clamp(46px,13vw,108px)] leading-[0.9] md:text-[clamp(72px,7.5vw,108px)]"
        >
          <Line index={0}>Where students</Line>
          <Line index={1}>Turn</Line>
          <Line index={2}>
            <span className="relative inline-block overflow-hidden py-[0.06em] -my-[0.06em] align-bottom text-accent-hero">
              <AnimatePresence mode="popLayout" initial={false}>
                <motion.span
                  key={word}
                  className="inline-block"
                  initial={{ y: '105%' }}
                  animate={{ y: 0 }}
                  exit={{ y: '-105%' }}
                  transition={{ duration: 0.38, ease: EASE }}
                >
                  {word}
                </motion.span>
              </AnimatePresence>
            </span>{' '}
            into
          </Line>
          <Line index={3}>Reality.</Line>
        </h1>

        <div className="mt-8 grid items-end gap-10 md:mt-[28px] lg:grid-cols-[1fr_462px] lg:gap-6">
          <div className="max-w-[420px]">
            <motion.p
              {...fadeUp(0.7)}
              className="font-jakarta text-[17px] leading-[1.285] font-medium tracking-[-0.02em] md:text-[18.7px]"
            >
              A student-led community where you can learn from peers and professionals, build real
              projects, participate in hackathons, develop your public speaking skills and gain
              experience with startups.
            </motion.p>
            <motion.div {...fadeUp(0.85)} className="mt-[27px] flex flex-wrap items-stretch gap-x-3 gap-y-3">
              <JoinLink variant="dark">Join Science Club →</JoinLink>
              <a
                href="#what-we-do"
                className="group flex h-[51px] items-center gap-1 border-b-[1.5px] border-ink font-jakarta text-[10.8px] font-medium tracking-[-0.01em] whitespace-nowrap uppercase"
              >
                Explore what we do
                <span className="inline-block transition-transform duration-300 group-hover:translate-y-[3px]">
                  ↓
                </span>
              </a>
            </motion.div>
          </div>

          <motion.div
            onMouseMove={(e) => {
              if (reduce) return
              const r = e.currentTarget.getBoundingClientRect()
              mx.set((e.clientX - r.left) / r.width - 0.5)
              my.set((e.clientY - r.top) / r.height - 0.5)
            }}
            onMouseLeave={() => {
              mx.set(0)
              my.set(0)
            }}
            initial={reduce ? false : { opacity: 0, scale: 0.94, y: 40 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.55, ease: EASE }}
            className="relative aspect-[462/299] border-[1.5px] border-ink bg-[#d5d4d9]"
          >
            {HERO_PHOTOS.length > 0 ? (
              <HeroPhotos />
            ) : (
              <svg
                className="absolute top-1/2 left-1/2 h-8 w-8 -translate-x-1/2 -translate-y-1/2 opacity-30"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
              >
                <rect x="3" y="4" width="18" height="16" rx="3" />
                <circle cx="9" cy="10" r="1.6" />
                <path d="M4 18l5-5 4 4 3-3 4 4" />
              </svg>
            )}
            {HERO_PILLS.map((p, idx) => (
              <Pill key={p.label} p={p} idx={idx} sx={sx} sy={sy} />
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  )
}
