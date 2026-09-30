/** Серая заглушка под фото. Путь к картинке кладётся в config/content.ts. */
export function Placeholder({
  src,
  alt = '',
  className = '',
  children,
}: {
  src?: string
  alt?: string
  className?: string
  children?: React.ReactNode
}) {
  return (
    <div className={`relative overflow-hidden ${className}`}>
      {src && (
        <img src={src} alt={alt} loading="lazy" className="absolute inset-0 h-full w-full object-cover" />
      )}
      {children}
    </div>
  )
}
