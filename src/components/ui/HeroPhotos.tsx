import { useEffect, useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { HERO_PHOTOS } from '../../config/content'

/** Слайдшоу фото клуба: плавное наплывание с лёгким зумом. */
export function HeroPhotos() {
  const reduce = useReducedMotion()
  const [i, setI] = useState(0)

  useEffect(() => {
    // Подгружаем остальные кадры заранее, чтобы смена была без мигания.
    HERO_PHOTOS.slice(1).forEach((p) => {
      const img = new Image()
      img.src = p.src
    })
  }, [])

  useEffect(() => {
    if (reduce || HERO_PHOTOS.length < 2) return
    const t = setInterval(() => setI((v) => (v + 1) % HERO_PHOTOS.length), 4400)
    return () => clearInterval(t)
  }, [reduce])

  const photo = HERO_PHOTOS[i]
  return (
    <div className="absolute inset-0 overflow-hidden">
      <AnimatePresence initial={false}>
        <motion.img
          key={photo.src}
          src={photo.src}
          alt={photo.alt}
          decoding="async"
          style={{ objectPosition: photo.pos }}
          className="absolute inset-0 h-full w-full object-cover"
          initial={reduce ? false : { opacity: 0, scale: 1.1 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.3, ease: [0.22, 1, 0.36, 1] }}
        />
      </AnimatePresence>
    </div>
  )
}
