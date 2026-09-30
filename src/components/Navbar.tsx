import { useEffect, useState } from 'react'
import { SITE } from '../config/site'
import { JoinLink } from './ui/JoinLink'
import { ScrollProgress } from './ui/ScrollProgress'
import { LogoMark } from './ui/LogoMark'

export default function Navbar() {
  const [open, setOpen] = useState(false)

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [open])

  return (
    <>
      <header
        className="sticky top-0 z-50 border-b border-ink/70 bg-paper/85 backdrop-blur-md"
        style={{ height: 'var(--nav-h)' }}
      >
        <div className="flex h-full items-center px-5 md:px-9">
          <a
            href="#top"
            aria-label="Science Club, to top"
            className="flex items-center gap-[7px] font-jakarta text-[15.3px] leading-none font-extrabold tracking-[-0.05em] uppercase"
          >
            <LogoMark bold className="h-[27px] text-brand" />
            Science Club
          </a>

          <nav className="ml-[23px] hidden items-center gap-[18px] md:flex">
            {SITE.nav.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="font-jakarta text-[10.5px] font-medium tracking-[-0.01em] uppercase transition-opacity hover:opacity-50"
              >
                {item.label}
              </a>
            ))}
          </nav>

          <JoinLink variant="nav" className="ml-auto">
            Join Us →
          </JoinLink>

          <button
            type="button"
            aria-label={open ? 'Close menu' : 'Open menu'}
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
            className="ml-2 flex h-10 w-10 flex-col items-end justify-center gap-[6px] md:hidden"
          >
            <span
              className={`block h-[2px] w-6 bg-ink transition-transform ${open ? 'translate-y-[4px] rotate-45' : ''}`}
            />
            <span
              className={`block h-[2px] bg-ink transition-all ${open ? 'w-6 -translate-y-[4px] -rotate-45' : 'w-4'}`}
            />
          </button>
        </div>
        <ScrollProgress />
      </header>

      {/* Панель вынесена из <header>: backdrop-filter у шапки ломает position:fixed у потомков. */}
      {open && (
        <div className="fixed inset-x-0 top-[var(--nav-h)] bottom-0 z-40 flex flex-col bg-paper px-5 pt-8 pb-8 md:hidden">
          <nav className="flex flex-col">
            {SITE.nav.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className="display-b border-b border-ink/15 py-5 text-[40px]"
              >
                {item.label}
              </a>
            ))}
          </nav>
          <JoinLink variant="dark" className="mt-auto h-[60px] w-full text-[16px]">
            Join Science Club →
          </JoinLink>
        </div>
      )}
    </>
  )
}
