import { motion, useScroll, useSpring } from 'framer-motion'

/** Тонкая синяя полоса прогресса прокрутки под навбаром. */
export function ScrollProgress() {
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, { stiffness: 140, damping: 30, mass: 0.3 })
  return (
    <motion.div
      aria-hidden="true"
      className="absolute bottom-[-1px] left-0 h-[2px] w-full origin-left bg-accent"
      style={{ scaleX }}
    />
  )
}
