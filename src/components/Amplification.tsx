import { useRef, useState } from 'react'
import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion'
import { AMPLIFY_ITEMS, AMPLIFY_TAGS } from '../config/content'
import { Reveal } from './ui/Reveal'
import { RevealLines } from './ui/RevealLines'
import { ScrambleText } from './ui/ScrambleText'

const TILES = [
  { bg: '#282828', offset: false, col: 0 },
  { bg: '#424242', offset: true, col: 1 },
  { bg: '#1a1a1a', offset: false, col: 0 },
  { bg: '#282828', offset: true, col: 1 },
]

export default function Amplification() {
  const [active, setActive] = useState(0)
  const [touched, setTouched] = useState(false)
  const pick = (i: number) => {
    setActive(i)
    setTouched(true)
  }

  // Параллакс: колонки плиток едут в разные стороны при прокрутке.
  const reduce = useReducedMotion()
  const gridRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: gridRef, offset: ['start end', 'end start'] })
  const yLeft = useTransform(scrollYProgress, [0, 1], reduce ? [0, 0] : [60, -60])
  const yRight = useTransform(scrollYProgress, [0, 1], reduce ? [0, 0] : [-40, 40])

  return (
    <section className="bg-night pt-[51px] pb-[64px] text-white">
      <div className="wrap-m grid gap-12 lg:grid-cols-2 lg:gap-[55px]">
        <Reveal>
          <div className="mono text-[10px] tracking-[0.1em] text-accent-dark">
            <ScrambleText text="Amplification" />
          </div>
          <RevealLines
            lines={['Create.', 'Communicate.', 'Amplify.']}
            className="display-a mt-[17px] text-[clamp(44px,12vw,61.5px)] lg:text-[61.5px]"
          />
          <p className="mt-[34px] max-w-[376px] font-jakarta text-[17.35px] leading-[1.31] font-light tracking-[-0.01em] text-[#ababab]">
            Great projects deserve to be seen. Join our media squad to shape how student innovation is
            presented.
          </p>

          <ul className="mt-[21px]">
            {AMPLIFY_ITEMS.map((item, i) => (
              <li key={item.label}>
                <button
                  type="button"
                  onMouseEnter={() => pick(i)}
                  onFocus={() => pick(i)}
                  onClick={() => pick(i)}
                  className="group flex h-[40.5px] items-center gap-[14px] text-left"
                >
                  <span
                    className={`block h-[13px] w-[13px] rounded-full transition-all duration-300 group-hover:scale-125 ${
                      active === i ? 'bg-accent-dark' : 'bg-white'
                    }`}
                  />
                  <span className="font-jakarta text-[21px] leading-none font-bold tracking-[-0.035em] uppercase transition-transform duration-300 group-hover:translate-x-[8px]">
                    {item.label}
                  </span>
                </button>
              </li>
            ))}
          </ul>

          <div className="mt-[52px] rounded-[17px] border-[1.5px] border-white/20 bg-[#161616] p-[22px] transition-colors duration-500 hover:border-accent-dark/60">
            <div className="mono text-[10px] tracking-[0.1em] text-accent-dark">Notice —</div>
            <p className="mt-[18px] font-jakarta text-[16px] leading-[1.3] font-medium tracking-[-0.02em]">
              "Not a developer? You can still build with us."
            </p>
            <div className="mt-[18px] flex flex-wrap gap-[9px]">
              {AMPLIFY_TAGS.map((t) => (
                <span
                  key={t}
                  className="rounded-[3px] bg-[#292929] px-[9px] py-[3.5px] font-jakarta text-[11.5px] font-medium text-white/90 transition-colors duration-300 hover:bg-accent-dark hover:text-white"
                >
                  {t}
                </span>
              ))}
            </div>
          </div>
        </Reveal>

        <Reveal
          delay={0.1}
          className="grid grid-cols-2 gap-x-[13.7px] gap-y-[13.7px] self-start lg:gap-y-[41px] lg:pt-[35px]"
        >
          <div ref={gridRef} className="contents">
            {TILES.map((t, i) => {
              const item = AMPLIFY_ITEMS[i]
              const on = active === i
              return (
                <motion.div
                  key={item.tile}
                  style={{ y: t.col === 0 ? yLeft : yRight }}
                  className={`relative aspect-square ${t.offset ? 'lg:translate-y-[27px]' : ''}`}
                >
                  <div
                    className="absolute inset-0 overflow-hidden rounded-[28px] transition-[filter,transform] duration-500"
                    style={{
                      background: t.bg,
                      filter: touched && on ? 'brightness(1.3)' : 'none',
                      transform: touched && on ? 'scale(1.03)' : 'none',
                    }}
                  >
                    <div className="absolute inset-0 bg-gradient-to-br from-white/[0.04] to-transparent" />
                    <span
                      className={`mono absolute bottom-[22px] left-[14px] text-[10px] tracking-[0.1em] text-white transition-all duration-500 ${
                        on ? 'translate-y-0 opacity-100' : 'translate-y-2 opacity-0'
                      }`}
                    >
                      {item.tile}
                    </span>
                  </div>
                </motion.div>
              )
            })}
          </div>
        </Reveal>
      </div>
    </section>
  )
}
