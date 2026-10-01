import { useEffect, useRef, useState } from 'react'
import { motion, useInView, useReducedMotion } from 'framer-motion'
import { AMPLIFY_ITEMS, AMPLIFY_TAGS } from '../config/content'
import { Reveal } from './ui/Reveal'
import { RevealLines } from './ui/RevealLines'
import { ScrambleText } from './ui/ScrambleText'

/** Видео в плитке: играет, только пока плитка в экране; при «уменьшить движение» остаётся кадр-постер. */
function TileVideo({ src, poster }: { src: string; poster?: string }) {
  const ref = useRef<HTMLVideoElement>(null)
  const inView = useInView(ref, { margin: '0px 0px -10% 0px' })
  const reduce = useReducedMotion()
  useEffect(() => {
    const v = ref.current
    if (!v) return
    if (inView && !reduce) v.play().catch(() => {})
    else v.pause()
  }, [inView, reduce])
  return (
    <video
      ref={ref}
      src={src}
      poster={poster}
      muted
      loop
      playsInline
      preload="metadata"
      aria-hidden="true"
      className="absolute inset-0 h-full w-full object-cover"
    />
  )
}

/**
 * Раскладка без смещений и параллакса, одна на все экраны:
 *  - до 1280px текст идёт сверху, фото ниже: 2×2 на телефоне, 4 в ряд на планшете;
 *  - от 1280px фото сеткой 2×2 справа от текста.
 */
export default function Amplification() {
  const [active, setActive] = useState(0)
  const [touched, setTouched] = useState(false)
  const reduce = useReducedMotion()
  const pick = (i: number) => {
    setActive(i)
    setTouched(true)
  }

  return (
    <section className="bg-night pt-[51px] pb-[64px] text-white">
      <div className="wrap-m grid xl:grid-cols-2 xl:gap-x-[55px]">
        <Reveal className="xl:col-start-1 xl:row-start-1">
          <div className="mono text-[10px] tracking-[0.1em] text-accent-dark">
            <ScrambleText text="Amplification" />
          </div>
          <RevealLines
            lines={['Create.', 'Communicate.', 'Amplify.']}
            className="display-a mt-[17px] text-[clamp(40px,11vw,61.5px)]"
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
        </Reveal>

        {/* Фото: ровная сетка, подписи переключаются вместе со списком. */}
        <div className="mt-[40px] grid grid-cols-2 gap-[10px] md:grid-cols-4 md:gap-[13px] xl:col-start-2 xl:row-span-2 xl:row-start-1 xl:mt-[35px] xl:grid-cols-2 xl:self-start">
          {AMPLIFY_ITEMS.map((item, i) => {
            const on = active === i
            return (
              <motion.div
                key={item.tile}
                aria-hidden="true"
                onMouseEnter={() => pick(i)}
                onClick={() => pick(i)}
                initial={reduce ? false : { opacity: 0, y: 36, scale: 0.96 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true, margin: '0px 0px -6% 0px' }}
                transition={{ duration: 0.8, delay: i * 0.09, ease: [0.22, 1, 0.36, 1] }}
                className="relative aspect-square cursor-pointer"
              >
                <div
                  className="absolute inset-0 overflow-hidden rounded-[18px] bg-[#1a1a1a] transition-[filter,transform] duration-500 md:rounded-[24px] xl:rounded-[28px]"
                  style={{
                    filter: touched && on ? 'brightness(1.3)' : 'none',
                    transform: touched && on ? 'scale(1.03)' : 'none',
                  }}
                >
                  {item.media?.video ? (
                    <TileVideo src={item.media.video} poster={item.media.poster} />
                  ) : item.media?.image ? (
                    <img
                      src={item.media.image}
                      alt=""
                      loading="lazy"
                      decoding="async"
                      className="absolute inset-0 h-full w-full object-cover"
                    />
                  ) : null}
                  <div
                    className={`absolute inset-0 ${
                      item.media
                        ? 'bg-gradient-to-t from-black/60 via-transparent to-transparent'
                        : 'bg-gradient-to-br from-white/[0.04] to-transparent'
                    }`}
                  />
                  <span
                    className={`mono absolute bottom-[12px] left-[12px] text-[9px] tracking-[0.1em] text-white transition-all duration-500 md:bottom-[16px] md:left-[14px] md:text-[10px] ${
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

        <Reveal className="mt-[40px] xl:col-start-1 xl:row-start-2 xl:mt-[52px]">
          <div className="max-w-[516px] rounded-[17px] border-[1.5px] border-white/20 bg-[#161616] p-[22px] transition-colors duration-500 hover:border-accent-dark/60">
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
      </div>
    </section>
  )
}
