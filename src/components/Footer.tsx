import { SITE, linkProps } from '../config/site'
import Marquee from './Marquee'

const YEAR = new Date().getFullYear()

const SOCIALS = [
  { label: 'IG', name: 'Instagram', href: SITE.socials.instagram },
  { label: 'TG', name: 'Telegram', href: SITE.socials.telegram },
  { label: 'LN', name: 'LinkedIn', href: SITE.socials.linkedin },
  { label: '@', name: 'Email', href: SITE.socials.email },
].filter((s) => s.href)

export default function Footer() {
  return (
    <footer className="bg-soft">
      <Marquee dots={false} reverse />
      <div className="wrap-m pt-[83px] pb-[60px]">
        <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-[minmax(0,570px)_286px_232px] lg:gap-0">
          <div className="sm:col-span-2 lg:col-span-1">
            <div className="font-jakarta text-[26px] leading-none font-extrabold tracking-[-0.05em] uppercase">
              Science Club
            </div>
            <p className="mt-[23px] max-w-[300px] font-jakarta text-[14.1px] leading-[1.42] tracking-[-0.01em] text-[#707070]">
              The innovation hub for students at Coventry University Kazakhstan. Learn. Build. Create.
              Connect.
            </p>
            <div className="mt-[28px] flex gap-[13.7px]">
              {SOCIALS.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  {...linkProps(s.href)}
                  aria-label={s.name}
                  className="flex h-[34.5px] w-[34.5px] items-center justify-center rounded-full bg-ink font-jakarta text-[13px] font-medium text-white transition-colors hover:bg-accent"
                >
                  {s.label}
                </a>
              ))}
            </div>
          </div>

          <div>
            <div className="mono text-[11px] font-extrabold tracking-[0.13em]">Navigation</div>
            <nav className="mt-[21px] flex flex-col gap-[16px]">
              {SITE.nav.map((n) => (
                <a
                  key={n.href}
                  href={n.href}
                  className="w-fit font-jakarta text-[12.5px] leading-[14px] font-medium tracking-[-0.01em] uppercase transition-opacity hover:opacity-50"
                >
                  {n.label}
                </a>
              ))}
            </nav>
          </div>

          <div>
            <div className="mono text-[11px] font-extrabold tracking-[0.13em]">University</div>
            <div className="mt-[21px] font-jakarta text-[12.1px] leading-[1.2] font-medium">
              {SITE.university}
            </div>
            <div className="mt-[6px] font-jakarta text-[10.2px] text-[#a0a0a0]">{SITE.city}</div>
            <a
              href={SITE.formUrl}
              {...linkProps(SITE.formUrl)}
              className="mt-[28px] inline-block font-jakarta text-[13.8px] leading-none font-semibold text-accent underline decoration-[1.5px] underline-offset-[3px] transition-opacity hover:opacity-70"
            >
              Join the Squad →
            </a>
          </div>
        </div>

        <div className="mt-[64px] flex flex-col justify-between gap-3 border-t border-black/[0.07] pt-[27px] md:flex-row">
          <span className="mono text-[9px] tracking-[0.1em] text-[#999]">
            © {SITE.name} — {SITE.university} {YEAR}
          </span>
          <span className="mono text-[9px] tracking-[0.1em] text-[#999]">
            Designed by students for students
          </span>
        </div>
      </div>
    </footer>
  )
}
