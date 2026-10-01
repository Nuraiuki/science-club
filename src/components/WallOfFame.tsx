import { useEffect, useRef, useState } from 'react'
import { animate, motion, useInView, useReducedMotion } from 'framer-motion'
import { ACHIEVEMENTS } from '../config/content'
import { Reveal } from './ui/Reveal'
import { RevealLines } from './ui/RevealLines'
import { ScrambleText } from './ui/ScrambleText'

/** Числа в значении (7, 3, 3rd) считаются от 0 при появлении. */
function CountValue({ value }: { value: string }) {
  const ref = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: true, margin: '0px 0px -10% 0px' })
  const reduce = useReducedMotion()
  const m = /^(\d+)(\D*)$/.exec(value)
  const [shown, setShown] = useState(m && !reduce ? '0' : m ? m[1] : '')

  useEffect(() => {
    if (!m || reduce || !inView) return
    const controls = animate(0, parseInt(m[1], 10), {
      duration: 1.1,
      ease: 'easeOut',
      onUpdate: (v) => setShown(String(Math.round(v))),
    })
    return () => controls.stop()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inView, reduce, value])

  return <span ref={ref}>{m ? shown + m[2] : value}</span>
}

/** Тонкая линия, которая «рисуется» слева направо. */
function DrawLine({ delay = 0, className = '' }: { delay?: number; className?: string }) {
  const reduce = useReducedMotion()
  return (
    <motion.span
      aria-hidden="true"
      initial={reduce ? false : { scaleX: 0 }}
      whileInView={{ scaleX: 1 }}
      viewport={{ once: true, margin: '0px 0px -8% 0px' }}
      transition={{ duration: 0.9, delay, ease: [0.22, 1, 0.36, 1] }}
      className={`absolute h-px w-full origin-left bg-ink ${className}`}
    />
  )
}

export default function WallOfFame() {
  return (
    <section id="achievements" className="bg-[#f9f9f9] pt-[64px] pb-[73px]">
      <div className="wrap-m">
        <Reveal>
          <div className="mono text-[10px] tracking-[0.12em] text-accent">
            <ScrambleText text="Wall of Fame" />
          </div>
        </Reveal>
        <RevealLines
          lines={["We don't just", 'participate. We build.']}
          className="display-a mt-[11px] text-[clamp(38px,10vw,61.5px)] lg:text-[61.5px]"
        />

        <div className="relative mt-[60px] grid pt-px sm:grid-cols-2 lg:grid-cols-3 lg:gap-x-[3.6px]">
          <DrawLine className="top-0 left-0" />
          {ACHIEVEMENTS.map((a, i) => (
            <Reveal
              key={a.name}
              delay={(i % 3) * 0.08}
              className={`group relative flex h-[146px] flex-col justify-between px-[27px] pt-[29px] pb-[27px] transition-colors duration-300 ${
                a.image ? 'overflow-hidden hover:text-white' : 'hover:bg-white'
              } ${a.wide ? 'sm:col-span-2 lg:col-span-3' : ''}`}
            >
              {/* Фото проявляется при наведении (на устройствах с hover). */}
              {a.image && (
                <>
                  <img
                    src={a.image}
                    alt=""
                    loading="lazy"
                    decoding="async"
                    className="pointer-events-none absolute inset-0 h-full w-full scale-[1.06] object-cover opacity-0 transition-all duration-500 ease-out group-hover:scale-100 group-hover:opacity-100"
                  />
                  <div className="pointer-events-none absolute inset-0 bg-ink/55 opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                </>
              )}
              <div className="relative font-jakarta text-[26.5px] leading-none font-bold tracking-[-0.03em]">
                {a.name}
              </div>
              <div className={`relative flex items-baseline ${a.wide ? 'gap-[16px]' : 'justify-between'}`}>
                <span className="font-jakarta text-[32px] leading-none font-extrabold tracking-[-0.03em] transition-transform duration-300 group-hover:translate-x-[3px]">
                  <CountValue value={a.value} />
                </span>
                <span
                  className={`mono text-[10px] tracking-[0.12em] text-[#7d7d7d] transition-colors duration-300 ${
                    a.image ? 'group-hover:text-white/75' : ''
                  }`}
                >
                  {a.caption}
                </span>
              </div>
              <DrawLine delay={0.15 + (i % 3) * 0.1} className="bottom-0 left-0" />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
