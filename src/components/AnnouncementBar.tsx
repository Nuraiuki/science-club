import { useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { nextEvent } from '../config/events'
import { useNow } from '../hooks/useNow'

const KEY = 'sc-announce-dismissed'

const readDismissed = () => {
  try {
    return sessionStorage.getItem(KEY)
  } catch {
    return null
  }
}

/**
 * Тонкая плашка над шапкой с анонсом ближайшего мероприятия и ссылкой-крючком на секцию Events.
 * Пропадает сама после старта события, посетитель может закрыть её крестиком (до конца сессии).
 */
export default function AnnouncementBar() {
  const now = useNow(30_000)
  const reduce = useReducedMotion()
  const event = nextEvent(now)
  const [dismissed, setDismissed] = useState(() => readDismissed())

  const visible = Boolean(event) && dismissed !== event?.id
  const colon = event?.teaser.indexOf(': ') ?? -1
  const lead = event ? (colon > -1 ? event.teaser.slice(0, colon) : event.teaser) : ''
  const rest = event && colon > -1 ? event.teaser.slice(colon + 2) : ''

  const close = () => {
    if (!event) return
    setDismissed(event.id)
    try {
      sessionStorage.setItem(KEY, event.id)
    } catch {
      /* без sessionStorage просто закрываем на время визита */
    }
  }

  return (
    <AnimatePresence initial={!reduce}>
      {visible && event && (
        <motion.div
          key={event.id}
          role="region"
          aria-label="Upcoming event"
          initial={reduce ? false : { height: 0, opacity: 0 }}
          animate={{ height: 'auto', opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
          className="relative z-[60] overflow-hidden bg-indigo-deep text-white"
        >
          <div className="flex min-h-[38px] items-center justify-center gap-[10px] px-[44px] py-[7px] text-center">
            <span aria-hidden="true" className="relative flex h-[8px] w-[8px] shrink-0">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-lilac opacity-70" />
              <span className="relative inline-flex h-[8px] w-[8px] rounded-full bg-lilac" />
            </span>
            <a href="#events" className="group block text-center">
              <span className="block font-jakarta text-[12px] leading-[1.4] font-bold tracking-[-0.01em] sm:inline sm:text-[13px]">
                {lead}
                {rest ? ':' : ''}
              </span>{' '}
              <span className="inline-block whitespace-nowrap leading-[1.4]">
                {rest && (
                  <span className="font-jakarta text-[12px] font-bold tracking-[-0.01em] sm:text-[13px]">{rest}</span>
                )}
                {' '}
                <span className="mono ml-[10px] text-[10.5px] tracking-[0.08em] text-lilac">
                  {event.day} {event.month}, {event.time}
                </span>
                {' '}
                <span className="mono ml-[10px] text-[10.5px] tracking-[0.08em] text-white sm:underline sm:decoration-white/40 sm:underline-offset-[3px] sm:transition-colors sm:group-hover:decoration-white">
                  <span className="hidden sm:inline">Details </span>→
                </span>
              </span>
            </a>
          </div>
          <button
            type="button"
            aria-label="Close announcement"
            onClick={close}
            className="absolute top-1/2 right-[8px] flex h-[30px] w-[30px] -translate-y-1/2 items-center justify-center rounded-full text-[16px] leading-none text-white/70 transition-colors hover:bg-white/10 hover:text-white sm:right-[14px]"
          >
            ×
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
