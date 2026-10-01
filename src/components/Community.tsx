import { motion, useReducedMotion } from 'framer-motion'
import { COMMUNITY_TILES, MOMENTS } from '../config/content'
import { Placeholder } from './ui/Placeholder'
import { Reveal } from './ui/Reveal'
import { RevealLines } from './ui/RevealLines'

export default function Community() {
  const [big, ...small] = COMMUNITY_TILES
  return (
    <section id="community" className="bg-night pt-[64px] pb-[80px] text-white">
      <div className="wrap-n">
        <Reveal className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <RevealLines
            lines={['Meet the', 'community.']}
            className="display-a text-[clamp(44px,12vw,72px)] tracking-[-0.05em] md:text-[72px]"
          />
          <p className="max-w-[336px] pb-[8px] font-jakarta text-[13.6px] leading-[1.55] font-light text-[#b8b8b8]">
            The energy of Science Club is built on faces, hands, and shared screens. This is where you
            belong.
          </p>
        </Reveal>

        {/* Десктоп: бенто-сетка. Мобильный: горизонтальная лента. */}
        <div className="no-scrollbar -mx-5 mt-[54px] flex scroll-px-5 snap-x snap-mandatory gap-[13px] overflow-x-auto px-5 md:scroll-px-0 md:mx-0 md:grid md:h-[449px] md:grid-cols-[474fr_231fr_231fr] md:grid-rows-2 md:overflow-visible md:px-0">
          <Tile
            i={0}
            tile={big}
            className="h-[300px] w-[78vw] shrink-0 snap-start md:row-span-2 md:h-auto md:w-auto"
          />
          {small.map((t, i) => (
            <Tile
              key={t.label}
              i={i + 1}
              tile={t}
              className="h-[300px] w-[60vw] shrink-0 snap-start md:h-auto md:w-auto"
            />
          ))}
        </div>
      </div>

      <MomentsStrip />
    </section>
  )
}

function Tile({
  tile,
  i,
  className = '',
}: {
  tile: (typeof COMMUNITY_TILES)[number]
  i: number
  className?: string
}) {
  const reduce = useReducedMotion()
  return (
    <motion.div
      className={className}
      initial={reduce ? false : { opacity: 0, y: 40, scale: 0.96 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: '0px 0px -6% 0px' }}
      transition={{ duration: 0.85, delay: 0.08 + i * 0.1, ease: [0.22, 1, 0.36, 1] }}
    >
      <Placeholder
        src={tile.image}
        alt={tile.label}
        position={tile.pos}
        className="group flex h-full w-full items-center justify-center border border-white/[0.14] transition-transform duration-500 hover:-translate-y-[5px] hover:scale-[1.015]"
      >
        {tile.image ? (
          <>
            {/* Подложка под подпись и лёгкая виньетка */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-black/5 to-transparent opacity-90 transition-opacity duration-500 group-hover:opacity-100" />
            <span className="mono absolute bottom-[14px] left-[14px] text-[9.5px] tracking-[0.14em] text-white">
              {tile.label}
            </span>
            <span
              aria-hidden="true"
              className="mono absolute right-[14px] bottom-[14px] translate-y-1 text-[11px] text-white opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100"
            >
              ↗
            </span>
          </>
        ) : (
          <>
            <div
              className="absolute inset-0 transition-[filter] duration-500 group-hover:brightness-125"
              style={{ background: `linear-gradient(160deg, ${tile.bg}, ${tile.bg}ee)` }}
            />
            <span
              className="mono relative text-[9px] tracking-[0.02em] transition-all duration-500 group-hover:tracking-[0.16em]"
              style={{ color: tile.text }}
            >
              {tile.label}
            </span>
          </>
        )}
      </Placeholder>
    </motion.div>
  )
}

/** Бегущая лента «моментов» на всю ширину экрана. Останавливается при наведении. */
const STRIP_H = 240
function MomentsStrip() {
  if (MOMENTS.length === 0) return null
  // Повторяем набор, чтобы одна «половина» ленты всегда шире экрана и цикл был бесшовным.
  const unit = MOMENTS.reduce((w, m) => w + m.ratio * STRIP_H + 13, 0)
  const copies = Math.max(1, Math.ceil(2200 / unit))
  const items = Array.from({ length: copies }).flatMap(() => MOMENTS)

  const half = (key: string, hidden = false) => (
    <div key={key} className="flex shrink-0" aria-hidden={hidden || undefined}>
      {items.map((m, idx) => (
        <div
          key={idx}
          className="group relative mr-[13px] h-[180px] shrink-0 overflow-hidden border border-white/[0.14] md:h-[240px]"
          style={{ aspectRatio: m.ratio }}
        >
          <img
            src={m.src}
            alt={hidden ? '' : m.alt}
            loading="lazy"
            decoding="async"
            className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.06]"
          />
        </div>
      ))}
    </div>
  )

  return (
    <div className="marquee mt-[13px] overflow-hidden" aria-label="Science Club moments">
      <div className="marquee-track" style={{ animationDuration: `${Math.round(unit * copies * 0.028)}s` }}>
        {half('a')}
        {half('b', true)}
      </div>
    </div>
  )
}
