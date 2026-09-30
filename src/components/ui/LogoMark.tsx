/**
 * Знак Science Club (атом + мозг). Рисуется маской, поэтому цвет задаётся через `text-*`:
 * text-brand на светлом фоне, text-white на тёмном. bold — утолщённая линия для мелких размеров.
 */
export function LogoMark({ className = '', bold = false }: { className?: string; bold?: boolean }) {
  const url = `url(${bold ? '/brand/logo-mark-bold.png' : '/brand/logo-mark.png'})`
  return (
    <span
      aria-hidden="true"
      className={`inline-block shrink-0 bg-current ${className}`}
      style={{
        aspectRatio: '208 / 200',
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
