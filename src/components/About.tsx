import { PRINCIPLES } from '../config/content'
import { Reveal } from './ui/Reveal'
import { RevealLines } from './ui/RevealLines'

export default function About() {
  return (
    <section id="about" className="border-b border-ink pt-[74px] pb-[70px] md:pt-[74px] md:pb-[72px]">
      <div className="wrap-n">
        <Reveal className="grid gap-8 lg:grid-cols-[1fr_455px] lg:gap-6">
          <RevealLines
            lines={['More than', 'a student', 'club.']}
            className="display-a text-[clamp(48px,13vw,71.2px)] tracking-[-0.043em] md:text-[71.2px]"
          />
          <p className="font-jakarta text-[19px] leading-[1.15] tracking-[-0.02em] md:text-[23.5px]">
            Science Club is a student-led community built around learning, creating and taking
            action. We bring students together to learn from each other, meet professionals, build
            real projects, participate in competitions, create university experiences and explore
            opportunities beyond the classroom.
          </p>
        </Reveal>

        <div className="mt-[52px] grid border-t border-l border-ink sm:grid-cols-2 md:mt-[55px] lg:grid-cols-4">
          {PRINCIPLES.map((p, i) => (
            <Reveal
              key={p.n}
              delay={i * 0.08}
              className="group relative border-r border-b border-ink p-[28px] md:min-h-[175px] md:px-[31px] md:pt-[29px] md:pb-[30px]"
            >
              {/* Заливка выезжает снизу при наведении. */}
              <span
                aria-hidden="true"
                className="absolute inset-0 origin-bottom scale-y-0 bg-ink transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-y-100"
              />
              <div className="mono relative text-[11.7px] font-bold tracking-[0.1em] text-accent transition-colors duration-300 group-hover:text-accent-dark">
                {p.n} / {p.tag}
              </div>
              <h3 className="relative mt-[13px] font-jakarta text-[18.3px] leading-none font-bold tracking-[-0.02em] uppercase transition-colors duration-300 group-hover:text-paper">
                {p.title}
              </h3>
              <p className="relative mt-[10px] font-jakarta text-[13.3px] leading-[1.3] tracking-[-0.01em] text-[#535255] transition-colors duration-300 group-hover:text-white/70">
                {p.text}
              </p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
