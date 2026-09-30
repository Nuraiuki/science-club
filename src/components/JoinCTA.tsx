import { useReducedMotion } from 'framer-motion'
import { SITE } from '../config/site'
import { JoinLink } from './ui/JoinLink'
import { LogoMark } from './ui/LogoMark'
import { Reveal } from './ui/Reveal'
import { RevealLines } from './ui/RevealLines'
import { ScrambleText } from './ui/ScrambleText'

const orbit = (rx: number, ry: number) =>
  `M ${-rx} 0 a ${rx} ${ry} 0 1 0 ${2 * rx} 0 a ${rx} ${ry} 0 1 0 ${-2 * rx} 0`

/** Орбиты как в логотипе клуба: тонкие эллипсы и «электроны», бегущие по ним. */
function OrbitArt() {
  const reduce = useReducedMotion()
  return (
    <svg
      aria-hidden="true"
      viewBox="-720 -400 1440 800"
      preserveAspectRatio="xMidYMid slice"
      fill="none"
      className="absolute inset-0 h-full w-full"
    >
      <g transform="rotate(-22)">
        <path d={orbit(660, 240)} stroke="white" strokeOpacity="0.17" strokeWidth="1.4" />
        {reduce ? (
          <circle cx="660" cy="0" r="7" fill="white" fillOpacity="0.85" />
        ) : (
          <circle r="7" fill="white" fillOpacity="0.9">
            <animateMotion dur="28s" repeatCount="indefinite" path={orbit(660, 240)} />
          </circle>
        )}
      </g>
      <g transform="rotate(19)">
        <path d={orbit(590, 200)} stroke="white" strokeOpacity="0.12" strokeWidth="1.2" />
        {reduce ? (
          <circle cx="-590" cy="0" r="5" fill="white" fillOpacity="0.7" />
        ) : (
          <circle r="5" fill="white" fillOpacity="0.75">
            <animateMotion dur="37s" repeatCount="indefinite" path={orbit(590, 200)} />
          </circle>
        )}
      </g>
    </svg>
  )
}

export default function JoinCTA() {
  return (
    <section
      id="join"
      className="relative overflow-hidden text-white"
      style={{
        background:
          'radial-gradient(ellipse 85% 75% at 50% 38%, #3a3a96 0%, #27286a 34%, #1d1f55 62%, #12143c 100%)',
      }}
    >
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        <OrbitArt />
        <div className="drift absolute top-[18%] -left-[8%] h-[520px] w-[520px] rounded-full bg-[#6f6bff]/[0.16] blur-[130px]" />
        <div
          className="drift absolute -right-[6%] bottom-[8%] h-[460px] w-[460px] rounded-full bg-[#9ea8ff]/[0.10] blur-[130px]"
          style={{ animationDelay: '-9s' }}
        />
      </div>

      <div className="relative mx-auto flex max-w-[1344px] flex-col items-center px-5 pt-[34px] pb-[96px] text-center">
        <Reveal className="flex flex-col items-center">
          <LogoMark bold className="mb-[16px] h-[54px] text-white" />
          <div className="mono text-[13px] font-extrabold tracking-[0.3em] text-lilac">
            <ScrambleText text="Ready to initialize?" />
          </div>
        </Reveal>

        <RevealLines
          lines={['Your next', 'project', 'starts here.']}
          delay={0.1}
          className="display-b mt-[40px] text-[clamp(52px,14vw,128px)] md:text-[128px]"
        />

        <Reveal delay={0.2}>
          <p className="mt-[49px] max-w-[680px] font-inter text-[17px] leading-[1.4] font-light text-[#c4c9e6] md:text-[20.3px]">
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
