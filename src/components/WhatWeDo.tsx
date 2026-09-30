import { ACTIVITIES, type Activity } from '../config/content'
import { Reveal } from './ui/Reveal'
import { RevealLines } from './ui/RevealLines'

function Card({ a, index }: { a: Activity; index: number }) {
  const row = Math.floor(index / 3)
  const minH = row === 1 ? 'lg:min-h-[288px]' : row === 2 ? 'lg:min-h-[267px]' : 'lg:min-h-[263px]'
  const photo = Boolean(a.image)
  return (
    <Reveal
      delay={(index % 3) * 0.07}
      className={`group relative flex flex-col overflow-hidden border-r-[1.5px] border-b-[1.5px] border-ink transition-colors duration-300 ${minH} ${
        a.accent ? 'bg-accent text-white' : photo ? 'hover:text-white' : 'hover:bg-white'
      }`}
    >
      {/* Фото проявляется при наведении (только на устройствах с hover). */}
      {photo && (
        <>
          <img
            src={a.image}
            alt=""
            loading="lazy"
            className="pointer-events-none absolute inset-0 h-full w-full scale-[1.06] object-cover opacity-0 transition-all duration-500 ease-out group-hover:scale-100 group-hover:opacity-100"
          />
          <div
            className={`pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100 ${
              a.accent ? 'bg-accent/70' : 'bg-ink/60'
            }`}
          />
        </>
      )}

      <div className="relative z-10 flex flex-1 flex-col pl-[28px] pr-[20px] pt-[30px] pb-[30px] md:pl-[36px] md:pr-[24px] md:pt-[36px] md:pb-[36px]">
        <div
          className={`mono text-[12px] tracking-[0.15em] transition-colors duration-300 ${
            a.accent ? 'text-white/55' : photo ? 'text-[#787876] group-hover:text-white/70' : 'text-[#787876]'
          }`}
        >
          {a.n} — {a.tag}
        </div>
        <h3 className="display-b mt-[29px] text-[24px] leading-[0.96] tracking-[-0.03em] transition-transform duration-300 group-hover:translate-x-[3px]">
          {a.title.split('\n').map((line, i) => (
            <span key={i} className="block">
              {line}
            </span>
          ))}
        </h3>
        <p
          className={`mt-[15px] font-inter text-[13.7px] leading-[1.42] transition-colors duration-300 ${
            a.accent ? 'text-white/80' : photo ? 'text-[#464644] group-hover:text-white/85' : 'text-[#464644]'
          }`}
        >
          {a.text}
        </p>

        <div className="mt-auto pt-[26px]">
          {a.flow && (
            <div
              className="mono flex flex-wrap items-center gap-y-1 text-[12.5px] tracking-[0.1em]"
              style={{ columnGap: a.flowGap ?? 14 }}
            >
              {a.flow.map((f, i) => (
                <span key={f} className="flex items-center" style={{ columnGap: a.flowGap ?? 14 }}>
                  {i > 0 && <span className="text-[11px]">{a.flowSep}</span>}
                  {f}
                </span>
              ))}
            </div>
          )}
          {a.button && (
            <a
              href={a.button.href}
              className={`mono inline-flex h-[29px] items-center rounded-full border-[1.5px] border-ink px-[14px] text-[11px] tracking-[0.1em] transition-colors hover:bg-ink hover:text-paper ${
                photo ? 'group-hover:border-white' : ''
              }`}
            >
              {a.button.label}
            </a>
          )}
          {a.accent && (
            <div className="mono flex items-center gap-[10px] text-[12.5px] tracking-[0.1em]">
              <span className="bg-white px-[9px] py-[4px] text-accent">Student</span>
              <span className="text-[10px] opacity-80">→</span>
              <span>Startup</span>
            </div>
          )}
        </div>
      </div>
    </Reveal>
  )
}

export default function WhatWeDo() {
  return (
    <section id="what-we-do" className="pt-[80px] pb-[83px]">
      <div className="wrap-m">
        <Reveal className="flex items-end justify-between gap-6">
          <RevealLines
            lines={['From learning', 'to doing.']}
            className="display-b text-[clamp(40px,10vw,55px)] md:text-[55px]"
          />
          <span className="mono hidden pb-[4px] text-[12px] tracking-[0.12em] text-[#787876] sm:block">
            07 Core Activities
          </span>
        </Reveal>

        <div className="mt-[50px] grid border-t-[1.5px] border-l-[1.5px] border-ink md:grid-cols-2 lg:grid-cols-3">
          {ACTIVITIES.map((a, i) => (
            <Card key={a.n} a={a} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}
