import { dateLib } from '../dayjs'
import { CalendarRow } from './calendar.class'

const dayjs = dateLib()

type DayId = {
  key: DayIds;
  displayText: string;
}

export const calendarIds: DayId[] = []

export type DayIds = keyof CalendarRow;

const dayIdList: DayIds[] = [
  'sun', 'mon', 'tues', 'wed', 'thu', 'fri', 'sat'
]

let beginningOfWeek = dayjs().startOf('week')

dayIdList.forEach(dayKey => {
  calendarIds.push({ key: dayKey, displayText: beginningOfWeek.format('ddd') })
  beginningOfWeek = beginningOfWeek.add(1, 'day')
})
