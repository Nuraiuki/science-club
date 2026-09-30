import { ROLES } from '../config/content'

/** Бегущая строка ролей. dots=true — с точками-разделителями (после hero), false — без (над футером). */
export default function Marquee({
  dots = true,
  reverse = false,
  className = '',
}: {
  dots?: boolean
  reverse?: boolean
  className?: string
}) {
  const items = [...ROLES, ...ROLES]
  const track = (
    <div className="flex shrink-0 items-center" aria-hidden="true">
      {items.map((role, i) => (
        <span key={i} className="flex items-center">
          <span
            className={`font-jakarta text-[17.6px] leading-none font-bold tracking-[-0.035em] whitespace-nowrap uppercase ${dots ? '' : 'px-[28px]'}`}
          >
            {role}
          </span>
          {dots && <span className="mx-[25px] text-[9px] leading-none">●</span>}
        </span>
      ))}
    </div>
  )
  return (
    <div
      className={`marquee overflow-hidden bg-ink text-paper ${className}`}
      role="marquee"
      aria-label={ROLES.join(', ')}
    >
      <div className="marquee-track py-[13px]" style={reverse ? { animationDirection: 'reverse' } : undefined}>
        {track}
        {track}
      </div>
    </div>
  )
}
