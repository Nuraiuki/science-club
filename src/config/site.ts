// Единственное место для правок ссылок и контактов.
export const SITE = {
  name: 'Science Club',
  university: 'Coventry University Kazakhstan',
  city: 'Astana, Kazakhstan',

  // Все кнопки «Join» ведут на Google Form.
  formUrl:
    'https://docs.google.com/forms/d/e/1FAIpQLSdpOO4eTecJUV28irowdOgNFSU76nitlZrJ3H9blZdPkBZM4Q/viewform',

  // Пустая строка = ссылки нет, кружок в футере не показывается.
  socials: {
    instagram: 'https://www.instagram.com/science_club_covuni/',
    telegram: 'https://t.me/+2st98auIrFhhMWMy',
    linkedin: 'https://www.linkedin.com/company/science-club-cuk/',
    email: '',
  },

  nav: [
    { label: 'About', href: '#about' },
    { label: 'What We Do', href: '#what-we-do' },
    { label: 'Projects', href: '#projects' },
    { label: 'Events', href: '#events' },
    { label: 'Community', href: '#community' },
  ],
} as const

export const isExternal = (href: string) => /^https?:\/\//.test(href)

/** Атрибуты для ссылок: внешние открываем в новой вкладке. */
export const linkProps = (href: string) =>
  isExternal(href) ? ({ target: '_blank', rel: 'noopener noreferrer' } as const) : {}
