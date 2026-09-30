/** Логотип-надпись «science club». Цвет задаётся через `text-*` (text-brand на светлом фоне). */
export function LogoWordmark({ className = '' }: { className?: string }) {
  const url = 'url(/brand/logo-wordmark.png)'
  return (
    <span
      role="img"
      aria-label="Science Club"
      className={`inline-block shrink-0 bg-current ${className}`}
      style={{
        aspectRatio: '420 / 204',
        WebkitMaskImage: url,
        maskImage: url,
        WebkitMaskRepeat: 'no-repeat',
        maskRepeat: 'no-repeat',
        WebkitMaskPosition: 'center',
        maskPosition: 'center',
        WebkitMaskSize: 'contain',
        maskSize: 'contain',
      }}
    />
  )
}
