# Science Club — лендинг

Студенческий клуб Coventry University Kazakhstan. Vite + React + TypeScript + Tailwind CSS v4 + Framer Motion.

## Запуск

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # сборка в dist/
npm run preview  # проверить сборку локально
```

## Что править

| Что | Где |
|-----|-----|
| Ссылка на Google Form (все кнопки Join), соцсети, email, пункты меню | `src/config/site.ts` |
| Тексты секций, проекты, достижения, шаги | `src/config/content.ts` |
| Цвета, шрифты, зерно | `src/index.css` (блок `@theme`) |
| SEO, title, description | `index.html` |
| Публичный адрес сайта для og:image | переменная `VITE_SITE_URL` (`.env` или Vercel) |

### Фото вместо серых заглушек

Положи файлы в `public/images/` и впиши путь в поле `image` в `src/config/content.ts`
(например `image: '/images/campus-quest.jpg'`) для `PROJECTS` и `COMMUNITY_TILES`.
Пустое поле оставляет серую заглушку из дизайна.

### Фото при наведении на карточки «From learning to doing»

Поле `image` у записей в `ACTIVITIES` (`src/config/content.ts`), например `image: '/images/activities/workshops.jpg'`.
При наведении фото плавно проявляется под тёмной подложкой, текст белеет. Без `image` карточка ведёт себя как раньше. На телефонах (нет hover) эффект не включается.
Лучше брать горизонтальные фото от 900 px шириной, сжатые до 150–300 KB.

## Деплой на Vercel

1. Залей проект в GitHub-репозиторий.
2. Vercel → **Add New… → Project** → выбери репозиторий. Vercel сам определит Vite:
   Build Command `npm run build`, Output Directory `dist`.
3. **Settings → Environment Variables**: добавь `VITE_SITE_URL` = `https://твой-домен` и сделай Redeploy.
4. **Settings → Domains → Add**: впиши домен. У регистратора пропиши записи, которые покажет Vercel
   (обычно `A 76.76.21.21` для корня и `CNAME cname.vercel-dns.com` для `www`). HTTPS выдаётся автоматически.

## Дизайн

Вёрстка сверена по скриншотам на эталонной ширине 1440 px. Секции Events в дизайне нет, поэтому её нет и в меню.
