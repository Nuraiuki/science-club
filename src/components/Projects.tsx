import { PROJECTS } from '../config/content'
import { linkProps } from '../config/site'
import { Placeholder } from './ui/Placeholder'
import { Reveal } from './ui/Reveal'
import { RevealLines } from './ui/RevealLines'

export default function Projects() {
  return (
    <section id="projects" className="bg-soft pt-[64px] pb-[80px]">
      <div className="wrap-w">
        <RevealLines
          lines={['Built by', 'students.']}
          className="display-b text-[clamp(42px,11vw,72px)] md:text-[72px]"
        />

        <div className="no-scrollbar -mx-5 mt-[56px] flex snap-x snap-mandatory gap-5 overflow-x-auto px-5 pb-2 lg:mx-0 lg:mt-[66px] lg:grid lg:grid-cols-3 lg:gap-[32px] lg:overflow-visible lg:px-0 lg:pb-0">
          {PROJECTS.map((p, i) => (
            <Reveal
              key={p.name}
              delay={i * 0.1}
              className="group w-[86vw] max-w-[420px] shrink-0 snap-start lg:w-auto lg:max-w-none"
            >
              <Placeholder
                src={p.image}
                alt={p.name}
                className="flex aspect-[426/239] items-center justify-center rounded-[17px] border border-black/[0.06] bg-[#f3f3f3] transition-transform duration-500 group-hover:-translate-y-[6px]"
              >
                {!p.image && (
                  <span className="relative font-inter text-[16px] font-light text-[#9a9a9a] italic">
                    Project Preview
                  </span>
                )}
              </Placeholder>

              <div className="mt-[24px] flex items-center justify-between gap-3">
                <h3 className="display-b text-[21px] tracking-[-0.03em] md:text-[25px]">{p.name}</h3>
                <span className="mono shrink-0 rounded-full border-[1.5px] border-ink px-[10px] py-[5.5px] text-[9px] leading-none tracking-[0.05em] md:px-[12.5px] md:text-[10px]">
                  {p.category}
                </span>
              </div>
              <p className="mt-[14px] min-h-[40px] font-inter text-[13.3px] leading-[1.5] text-[#626262]">
                {p.text}
              </p>
              <div className="mt-[14px] flex items-center justify-between">
                <span className="mono text-[10px] tracking-[0.05em]">Team: {p.team} Students</span>
                <a
                  href={p.href}
                  {...linkProps(p.href)}
                  className="group/link font-inter text-[14.5px] font-bold underline decoration-[1.5px] underline-offset-[3px]"
                >
                  View Project{' '}
                  <span className="inline-block transition-transform duration-300 group-hover/link:translate-x-[5px]">
                    →
                  </span>
                </a>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
