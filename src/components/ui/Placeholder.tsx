/** Серая заглушка под фото. Путь к картинке кладётся в config/content.ts. */
export function Placeholder({
  src,
  alt = '',
  position = '50% 50%',
  className = '',
  children,
}: {
  src?: string
  alt?: string
  position?: string
  className?: string
  children?: React.ReactNode
}) {
  return (
    <div className={`relative overflow-hidden ${className}`}>
      {src && (
        <img
          src={src}
          alt={alt}
          loading="lazy"
          decoding="async"
          style={{ objectPosition: position }}
          className="absolute inset-0 h-full w-full object-cover transition-transform duration-[900ms] ease-out group-hover:scale-[1.06]"
        />
      )}
      {children}
    </div>
  )
}
