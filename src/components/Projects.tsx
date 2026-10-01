import { useCallback, useEffect, useRef, useState } from 'react'
import { PROJECTS } from '../config/content'
import { linkProps } from '../config/site'
import { Placeholder } from './ui/Placeholder'
import { Reveal } from './ui/Reveal'
import { RevealLines } from './ui/RevealLines'

const GAP = 32

function ArrowButton({ dir, disabled, onClick }: { dir: 'prev' | 'next'; disabled: boolean; onClick: () => void }) {
  return (
    <button
      type="button"
      aria-label={dir === 'prev' ? 'Previous projects' : 'Next projects'}
      disabled={disabled}
      onClick={onClick}
      className="flex h-[46px] w-[46px] items-center justify-center rounded-full border-[1.5px] border-ink font-jakarta text-[18px] leading-none transition-colors duration-200 hover:bg-ink hover:text-paper disabled:pointer-events-none disabled:opacity-25"
    >
      {dir === 'prev' ? '←' : '→'}
    </button>
  )
}

/**
 * Проекты лежат в горизонтальной ленте: на широком экране видны три карточки,
 * остальные листаются стрелками, на телефоне и планшете свайпом. Новые проекты добавляются в config/content.ts.
 */
export default function Projects() {
  const track = useRef<HTMLDivElement>(null)
  const [edge, setEdge] = useState({ overflow: false, start: true, end: true })

  const update = useCallback(() => {
    const el = track.current
    if (!el) return
    setEdge({
      overflow: el.scrollWidth > el.clientWidth + 4,
      start: el.scrollLeft <= 4,
      end: el.scrollLeft + el.clientWidth >= el.scrollWidth - 4,
    })
  }, [])

  useEffect(() => {
    const el = track.current
    if (!el) return
    update()
    el.addEventListener('scroll', update, { passive: true })
    const ro = new ResizeObserver(update)
    ro.observe(el)
    return () => {
      el.removeEventListener('scroll', update)
      ro.disconnect()
    }
  }, [update])

  const go = (dir: 1 | -1) => {
    const el = track.current
    if (!el) return
    const card = el.querySelector<HTMLElement>('[data-card]')
    el.scrollBy({ left: dir * ((card?.offsetWidth ?? 400) + GAP), behavior: 'smooth' })
  }

  return (
    <section id="projects" className="bg-soft pt-[64px] pb-[80px]">
      <div className="wrap-w">
        <div className="flex items-end justify-between gap-6">
          <RevealLines
            lines={['Built by', 'students.']}
            className="display-b text-[clamp(42px,11vw,72px)] md:text-[72px]"
          />
          {edge.overflow && (
            <div className="mb-[6px] hidden gap-[10px] md:flex">
              <ArrowButton dir="prev" disabled={edge.start} onClick={() => go(-1)} />
              <ArrowButton dir="next" disabled={edge.end} onClick={() => go(1)} />
            </div>
          )}
        </div>

        <div
          ref={track}
          className="no-scrollbar -mx-5 mt-[44px] flex scroll-px-5 snap-x snap-mandatory gap-5 overflow-x-auto px-5 pt-3 pb-2 md:mx-0 md:mt-[54px] md:scroll-px-0 md:gap-[32px] md:px-0"
        >
          {PROJECTS.map((p, i) => (
            <div
              key={p.name}
              data-card
              className="w-[86vw] max-w-[420px] shrink-0 snap-start md:w-[calc((100%-32px)/2)] md:max-w-none lg:w-[calc((100%-64px)/3)]"
            >
              <Reveal delay={Math.min(i, 2) * 0.1} className="group">
                <Placeholder
                  src={p.image}
                  alt={p.name}
                  position={p.pos}
                  className="flex aspect-[426/239] items-center justify-center rounded-[17px] border border-black/[0.06] bg-[#f3f3f3] transition-transform duration-500 group-hover:-translate-y-[6px]"
                >
                  {!p.image && (
                    <span className="relative font-inter text-[16px] font-light text-[#9a9a9a] italic">
                      Project Preview
                    </span>
                  )}
                </Placeholder>

                <div className="mt-[24px] flex items-center justify-between gap-3">
                  <h3 className="display-b text-[21px] tracking-[-0.03em] md:text-[25px]">{p.name}</h3>
                  <span className="mono shrink-0 rounded-full border-[1.5px] border-ink px-[10px] py-[5.5px] text-[9px] leading-none tracking-[0.05em] md:px-[12.5px] md:text-[10px]">
                    {p.category}
                  </span>
                </div>
                <p className="mt-[14px] min-h-[40px] font-inter text-[13.3px] leading-[1.5] text-[#626262]">
                  {p.text}
                </p>
                {(p.team || p.href) && (
                  <div className="mt-[14px] flex min-h-[19px] items-center justify-between">
                    {p.team ? (
                      <span className="mono text-[10px] tracking-[0.05em]">Team: {p.team} Students</span>
                    ) : (
                      <span />
                    )}
                    {p.href && (
                      <a
                        href={p.href}
                        {...linkProps(p.href)}
                        className="group/link font-inter text-[14.5px] font-bold underline decoration-[1.5px] underline-offset-[3px]"
                      >
                        View Project{' '}
                        <span className="inline-block transition-transform duration-300 group-hover/link:translate-x-[5px]">
                          →
                        </span>
                      </a>
                    )}
                  </div>
                )}
              </Reveal>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
