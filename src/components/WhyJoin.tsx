import { WHY_JOIN } from '../config/content'
import { Reveal } from './ui/Reveal'
import { RevealLines } from './ui/RevealLines'

export default function WhyJoin() {
  return (
    <section id="why" className="bg-[#f9f9f9] pt-[96px] pb-[96px]">
      <div className="wrap-w">
        <RevealLines
          lines={['What can you', 'build here?']}
          className="display-b text-[clamp(42px,11vw,72px)] md:text-[72px]"
        />

        <div className="mt-[56px] grid border-t border-l border-ink sm:grid-cols-2 md:mt-[62px] lg:grid-cols-4">
          {WHY_JOIN.map((c, i) => (
            <Reveal
              key={c.title}
              delay={(i % 4) * 0.06}
              className="group relative border-r border-b border-ink px-[28px] pt-[30px] pb-[30px] lg:min-h-[141px] lg:px-[32px] lg:pt-[36px]"
            >
              <span
                aria-hidden="true"
                className="absolute inset-0 origin-bottom scale-y-0 bg-ink transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-y-100"
              />
              <h3 className="relative font-inter text-[20px] leading-none font-black tracking-[-0.02em] uppercase italic transition-all duration-300 group-hover:translate-x-[4px] group-hover:text-paper">
                {c.title}
              </h3>
              <p className="relative mt-[19px] max-w-[250px] font-inter text-[12.2px] leading-[1.3] text-[#666] transition-colors duration-300 group-hover:text-white/65">
                {c.text}
              </p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
