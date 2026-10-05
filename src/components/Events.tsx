import { EVENTS, isUpcoming, startMs, type EventItem } from '../config/events'
import { linkProps } from '../config/site'
import { useNow } from '../hooks/useNow'
import { JoinLink } from './ui/JoinLink'
import { Placeholder } from './ui/Placeholder'
import { Reveal } from './ui/Reveal'
import { RevealLines } from './ui/RevealLines'

const pad = (n: number) => String(n).padStart(2, '0')

function Countdown({ target }: { target: number }) {
  const now = useNow(1000)
  const left = Math.max(0, target - now)
  const d = Math.floor(left / 86_400_000)
  const h = Math.floor((left % 86_400_000) / 3_600_000)
  const m = Math.floor((left % 3_600_000) / 60_000)
  const s = Math.floor((left % 60_000) / 1000)
  const cells: [string, string][] = [
    [pad(d), 'Days'],
    [pad(h), 'Hrs'],
    [pad(m), 'Min'],
    [pad(s), 'Sec'],
  ]
  return (
    <div role="timer" aria-label={`Starts in ${d} days ${h} hours ${m} minutes`} className="flex gap-[8px] sm:gap-[10px]">
      {cells.map(([v, label]) => (
        <div
          key={label}
          className="flex w-[58px] flex-col items-center border-[1.5px] border-ink bg-paper py-[8px] sm:w-[66px]"
        >
          <span className="mono text-[22px] leading-none font-bold tabular-nums sm:text-[26px]">{v}</span>
          <span className="mono mt-[5px] text-[9px] tracking-[0.14em] text-[#787876]">{label}</span>
        </div>
      ))}
    </div>
  )
}

function Meta({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <div className="mono text-[10px] tracking-[0.14em] text-[#787876]">{label}</div>
      <div className="mt-[8px] font-jakarta text-[16px] leading-[1.25] font-bold tracking-[-0.02em]">
        {children}
      </div>
    </div>
  )
}

function EventCard({ e, now }: { e: EventItem; now: number }) {
  const upcoming = isUpcoming(e, now)
  return (
    <Reveal>
      <article className="group grid border-[1.5px] border-ink bg-white lg:grid-cols-[minmax(0,400px)_1fr]">
        <div className="relative border-b-[1.5px] border-ink lg:border-r-[1.5px] lg:border-b-0">
          <Placeholder
            src={e.poster}
            alt={`${e.title} poster`}
            className="aspect-[4/5] w-full bg-[#2a3fdc] [&_img]:duration-[900ms]"
          />
        </div>

        <div className="flex flex-col p-[24px] sm:p-[32px] lg:px-[44px] lg:py-[38px]">
          <div className="flex flex-wrap items-center gap-[10px]">
            <span className="mono rounded-full border-[1.5px] border-ink px-[12px] py-[6px] text-[10px] leading-none tracking-[0.08em]">
              {e.tag}
            </span>
            <span
              className={`mono inline-flex items-center gap-[7px] text-[10px] tracking-[0.14em] ${
                upcoming ? 'text-accent' : 'text-[#787876]'
              }`}
            >
              <span className={`h-[7px] w-[7px] rounded-full ${upcoming ? 'animate-pulse bg-accent' : 'bg-[#b5b5b3]'}`} />
              {upcoming ? 'Upcoming' : 'Past event'}
            </span>
          </div>

          <div className="mt-[22px] flex flex-wrap items-end gap-x-[28px] gap-y-[14px]">
            <h3 className="display-b text-[clamp(40px,9vw,64px)] leading-[0.92]">
              {(e.titleLines ?? [e.title]).map((line) => (
                <span key={line} className="block">
                  {line}
                </span>
              ))}
            </h3>
            <div className="flex items-end gap-[10px] pb-[4px] leading-none">
              <span className="display-b text-[clamp(48px,10vw,76px)] leading-[0.82] text-accent">{e.day}</span>
              <span className="mono pb-[2px] text-[13px] font-bold tracking-[0.12em]">
                {e.month}
                <span className="block text-[10px] font-medium tracking-[0.14em] text-[#787876]">
                  {e.weekday}
                </span>
              </span>
            </div>
          </div>

          <div className="mt-[28px] grid gap-x-[32px] gap-y-[20px] border-t border-ink/15 pt-[24px] sm:grid-cols-3">
            <Meta label="Time">
              {e.time}
              <span className="block text-[13px] font-medium text-[#626262]">{e.timeNote}</span>
            </Meta>
            <Meta label="Place">
              {e.place}
              {e.placeNote && <span className="block text-[13px] font-medium text-[#626262]">{e.placeNote}</span>}
            </Meta>
            <Meta label="Speakers">
              {e.speakers.map((s) => (
                <span key={s} className="block">
                  {s}
                </span>
              ))}
            </Meta>
          </div>

          <div className="mt-[30px] flex flex-wrap items-center gap-x-[28px] gap-y-[20px] lg:mt-auto lg:pt-[30px]">
            {upcoming ? (
              <>
                <JoinLink variant="dark" href={e.registerUrl} className="h-[54px] px-[34px] text-[15px]">
                  Register →
                </JoinLink>
                <Countdown target={startMs(e)} />
              </>
            ) : (
              <span className="mono text-[11px] tracking-[0.14em] text-[#787876]">
                This event has ended. Follow our{' '}
                <a
                  href="https://t.me/+2st98auIrFhhMWMy"
                  {...linkProps('https://t.me/+2st98auIrFhhMWMy')}
                  className="text-ink underline underline-offset-[3px]"
                >
                  Telegram
                </a>{' '}
                for the next one.
              </span>
            )}
          </div>
        </div>
      </article>
    </Reveal>
  )
}

export default function Events() {
  const now = useNow(30_000)
  const list = [...EVENTS].sort((a, b) => {
    const ua = isUpcoming(a, now)
    const ub = isUpcoming(b, now)
    if (ua !== ub) return ua ? -1 : 1
    return ua ? startMs(a) - startMs(b) : startMs(b) - startMs(a)
  })
  const upcomingCount = list.filter((e) => isUpcoming(e, now)).length

  return (
    <section id="events" className="bg-paper pt-[72px] pb-[88px]">
      <div className="wrap-m">
        <Reveal className="flex items-end justify-between gap-6">
          <RevealLines
            lines={upcomingCount > 0 ? ["What's happening", 'at Science Club?'] : ['Past', 'events.']}
            className="display-b text-[clamp(40px,10vw,55px)] md:text-[55px]"
          />
          <span className="mono hidden pb-[4px] text-[12px] tracking-[0.12em] text-[#787876] sm:block">
            {upcomingCount > 0 ? `${pad(upcomingCount)} Upcoming` : 'Archive'}
          </span>
        </Reveal>

        <div className="mt-[44px] flex flex-col gap-[28px] md:mt-[54px]">
          {list.map((e) => (
            <EventCard key={e.id} e={e} now={now} />
          ))}
        </div>
      </div>
    </section>
  )
}
