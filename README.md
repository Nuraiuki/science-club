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

### Анонсы мероприятий

Все анонсы лежат в `src/config/events.ts` (массив `EVENTS`): название, дата и время со смещением часового пояса, спикеры, постер, ссылка регистрации (`registerUrl`).
Из этих данных строятся секция «Events» (с обратным отсчётом и кнопкой Register) и плашка над шапкой со ссылкой на секцию.
После старта мероприятия плашка и кнопка исчезают сами, карточка получает пометку «Past event». Постеры кладём в `public/images/`.

### Фото при наведении на карточки «From learning to doing»

Поле `image` у записей в `ACTIVITIES` (`src/config/content.ts`), например `image: '/images/activities/workshops.jpg'`.
При наведении фото плавно проявляется под тёмной подложкой, текст белеет. Без `image` карточка ведёт себя как раньше. На телефонах (нет hover) эффект не включается.
Лучше брать горизонтальные фото от 900 px шириной, сжатые до 150–300 KB.

### Видео и фото в блоке «Create. Communicate. Amplify.»

Плитки справа привязаны к пунктам списка: поле `media` у записей в `AMPLIFY_ITEMS` (`src/config/content.ts`).
Видео: `media: { video: '/videos/имя.mp4', poster: '/videos/имя.webp' }`. Ролик квадратный, H.264, без звука, 5–8 секунд, до 1 МБ
(тяжёлые исходники не кладём: рилс на 60 МБ превращается в клип на 0,5 МБ). Играет только пока плитка в экране.
Фото: `media: { image: '/images/имя.webp' }` (сейчас во всех четырёх плитках фото).
Фото при наведении на достижения: поле `image` у записей `ACHIEVEMENTS`.

## Логотип и брендовые файлы

Лежат в `public/brand/`: `logo-mark.png` (знак, белый на прозрачном), `logo-mark-bold.png` (утолщённая линия для мелких размеров),
`logo-square.png` (оригинал на индиго для соцсетей). Цвет знака задаётся в коде компонентом `LogoMark`
(`text-brand` на светлом, `text-white` на тёмном), индиго бренда: `--color-brand` в `src/index.css`. Акцент сайта (`--color-accent`, `--color-accent-hero`, `--color-accent-dark`) тоже в индиго логотипа: чтобы сделать темнее или фиолетовее, меняй эти три значения.
Иконки вкладки: `public/favicon.png`, `public/apple-touch-icon.png`. Превью в соцсетях: `public/og-image.png`.

## Деплой на Vercel

1. Залей проект в GitHub-репозиторий.
2. Vercel → **Add New… → Project** → выбери репозиторий. Vercel сам определит Vite:
   Build Command `npm run build`, Output Directory `dist`.
3. **Settings → Environment Variables**: добавь `VITE_SITE_URL` = `https://твой-домен` и сделай Redeploy.
4. **Settings → Domains → Add**: впиши домен. У регистратора пропиши записи, которые покажет Vercel
   (обычно `A 76.76.21.21` для корня и `CNAME cname.vercel-dns.com` для `www`). HTTPS выдаётся автоматически.

## Дизайн

Вёрстка сверена по скриншотам на эталонной ширине 1440 px. Секции Events в дизайне нет, поэтому её нет и в меню.
