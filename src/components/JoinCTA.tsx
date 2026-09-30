import { SITE } from '../config/site'
import { JoinLink } from './ui/JoinLink'
import { Reveal } from './ui/Reveal'
import { RevealLines } from './ui/RevealLines'
import { ScrambleText } from './ui/ScrambleText'

export default function JoinCTA() {
  return (
    <section
      id="join"
      className="relative overflow-hidden text-white"
      style={{
        background:
          'radial-gradient(ellipse 75% 65% at 50% 42%, #0a1226 0%, #070c19 45%, #030507 100%)',
      }}
    >
      {/* Медленно дрейфующее свечение */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        <div className="drift absolute top-[18%] -left-[8%] h-[520px] w-[520px] rounded-full bg-accent/[0.16] blur-[130px]" />
        <div
          className="drift absolute -right-[6%] bottom-[8%] h-[460px] w-[460px] rounded-full bg-accent-hero/[0.14] blur-[130px]"
          style={{ animationDelay: '-9s' }}
        />
      </div>

      <div className="relative mx-auto flex max-w-[1344px] flex-col items-center px-5 pt-[20px] pb-[96px] text-center">
        <Reveal>
          <div className="mono text-[13px] font-extrabold tracking-[0.3em] text-accent">
            <ScrambleText text="Ready to initialize?" />
          </div>
        </Reveal>

        <RevealLines
          lines={['Your next', 'project', 'starts here.']}
          delay={0.1}
          className="display-b mt-[40px] text-[clamp(52px,14vw,128px)] md:text-[128px]"
        />

        <Reveal delay={0.2}>
          <p className="mt-[49px] max-w-[680px] font-inter text-[17px] leading-[1.4] font-light text-[#b8bdc7] md:text-[20.3px]">
            Have an idea? Want to learn something new? Looking for teammates? Join the community building
            the future of campus.
          </p>
        </Reveal>

        <Reveal delay={0.3} className="mt-[52px] flex flex-col items-center gap-[24px] sm:flex-row">
          <JoinLink variant="light" className="!font-inter !font-extrabold !tracking-[-0.03em]">
            Join Science Club →
          </JoinLink>
          <JoinLink
            variant="outline-light"
            href={SITE.socials.telegram}
            className="!font-inter !font-extrabold !tracking-[-0.03em]"
          >
            Follow us
          </JoinLink>
        </Reveal>
      </div>
    </section>
  )
}
