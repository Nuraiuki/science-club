import { motion, useReducedMotion } from 'framer-motion'
import { JOURNEY } from '../config/content'
import { Reveal } from './ui/Reveal'
import { RevealLines } from './ui/RevealLines'
import { ScrambleText } from './ui/ScrambleText'

export default function Journey() {
  const reduce = useReducedMotion()
  return (
    <section id="journey" className="pt-[90px] pb-[83px]">
      <div className="wrap-w">
        <RevealLines
          lines={['Your journey', 'starts here.']}
          className="display-b text-[clamp(42px,11vw,72px)] md:text-[72px]"
        />

        <div className="mt-[56px] grid border-[1.5px] border-ink md:mt-[63px] lg:grid-cols-5">
          {JOURNEY.map((s, i) => (
            <Reveal
              key={s.n}
              delay={i * 0.12}
              className="group relative border-b-[1.5px] border-ink px-[28px] py-[30px] last:border-b-0 lg:min-h-[149px] lg:border-r-[1.5px] lg:border-b-0 lg:px-[33px] lg:pt-[33px] lg:last:border-r-0"
            >
              <span
                aria-hidden="true"
                className="absolute inset-0 origin-left scale-x-0 bg-accent transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-x-100"
              />
              <div className="mono relative text-[20px] leading-none font-bold tracking-[0.07em] text-accent transition-colors duration-300 group-hover:text-white">
                <ScrambleText text={`${s.n} ${s.title.toUpperCase()}`} />
              </div>
              <p className="relative mt-[24px] max-w-[210px] font-inter text-[14.5px] leading-[1.38] text-[#626262] transition-colors duration-300 group-hover:text-white/85">
                {s.text}
              </p>
              {i < JOURNEY.length - 1 && (
                <motion.span
                  aria-hidden="true"
                  initial={reduce ? false : { scaleX: 0 }}
                  whileInView={{ scaleX: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.12 + 0.45, ease: 'easeOut' }}
                  className="pointer-events-none absolute top-1/2 right-0 z-10 hidden h-[1.5px] w-[40px] translate-x-1/2 bg-ink lg:block"
                />
              )}
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
