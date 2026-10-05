import { SITE } from './site'

export type EventItem = {
  id: string
  /** Серия или формат: показывается тегом над названием. */
  tag: string
  title: string
  /** Разбивка заголовка по строкам для крупной карточки (необязательно). */
  titleLines?: string[]
  /** Старт с часовым поясом: по нему считаются обратный отсчёт и «прошло / предстоит». */
  start: string
  day: string
  month: string
  weekday: string
  time: string
  timeNote: string
  place: string
  placeNote?: string
  speakers: string[]
  /** Необязательный постер: если задан, карточка делится на две колонки (постер слева). */
  poster?: string
  /** Короткий текст для плашки над шапкой (регистр как в тексте, плашка его не меняет). */
  teaser: string
  /** Ссылка на регистрацию. */
  registerUrl: string
}

/**
 * Анонсы мероприятий. Новый анонс добавляется сюда. Секция «Events» и плашка над шапкой подхватят его сами,
 * а когда событие пройдёт, плашка исчезнет, а карточка получит пометку «Past event».
 */
export const EVENTS: EventItem[] = [
  {
    id: 'from-idea-to-sales',
    tag: 'nFactorial 2026 Alumni Talk',
    title: 'From Idea to Sales',
    titleLines: ['From idea', 'to sales.'],
    start: '2026-10-08T15:00:00+05:00',
    day: '08',
    month: 'Oct',
    weekday: 'Thursday',
    time: '15:00',
    timeNote: 'Astana time',
    place: 'Coventry University Kazakhstan',
    placeNote: 'Room TBA',
    speakers: ['Diyar Amanzholov', 'Damira Bukeyeva'],
    teaser: 'nFACTORIAL ALUMNI TALK: FROM IDEA TO SALES',
    // TODO: заменить на ссылку регистрации именно на это мероприятие.
    // Пока кнопка ведёт на общую форму клуба.
    registerUrl: SITE.formUrl,
  },
]

export const startMs = (e: EventItem) => new Date(e.start).getTime()

export const isUpcoming = (e: EventItem, now: number) => startMs(e) > now

/** Ближайшее будущее событие или undefined. */
export const nextEvent = (now: number) =>
  EVENTS.filter((e) => isUpcoming(e, now)).sort((a, b) => startMs(a) - startMs(b))[0]
