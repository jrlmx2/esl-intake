import { Event } from './calendar-datasource'
import { Semester } from './semester.class'
import { Dayjs } from 'dayjs'
import { dateLib } from '../dayjs'
import { calendarIds } from './weekday-names'

const dayjs = dateLib()

export interface CalendarRow {
  sun?: Day;
  mon?: Day;
  tues?: Day;
  wed?: Day;
  thu?: Day;
  fri?: Day;
  sat?: Day;
}

export interface Symboler {
  id: symbol;
}

const calendarRowCreator = (date: Dayjs): CalendarRow & Symboler => {
  return { id: Symbol.for(`CalendarRow ${date.week()}`) }
}

class Week {
  num: number
  days: Day[] = new Array<Day>()

  constructor(num: number) {
    this.num = num
  }

  flatten(): CalendarRow & Symboler {
    const row: CalendarRow & Symboler = { id: this.symbolFor() }
    this.days.forEach(day => {
      row[calendarIds[day.date.day()].key] = day
    })

    return row
  }

  private symbolFor(): symbol {
    return Symbol.for(`Week ${this.num}`)
  }
}

export class Day {
  id: symbol
  date: Dayjs
  number: string
  events?: Event[]
  during?: boolean
  start: boolean
  today: boolean

  constructor(date: Dayjs, semesterStart: Dayjs, semesterEnd: Dayjs, start: boolean, events?: Event[]) {
    this.during = semesterStart.isSame(date) || semesterEnd.isSame(date) || (semesterStart.isBefore(date) && semesterEnd.isAfter(date))
    this.id = Symbol.for(date.format('x'))
    this.date = date
    this.number = date.format('D')
    this.events = events
    this.start = start
    this.today = date.isSame(dayjs())
  }
}

export class Month implements Iterable<CalendarRow> {
  private static singleton = new Map<symbol, Month>()
  readonly id: symbol
  month = ''
  year = '2024'
  private weeks: Week[] = new Array<Week>()

  constructor(date: Dayjs) {
    this.month = date.format('MMM')
    this.year = date.format('YYYY')
    this.id = this.key(date)

    this.addToSingleton()
  }

  get displayRepresentation(): string {
    return `${this.month}`
  }

  static from(date: Dayjs): Month {
    const key: symbol = Month.key(date)
    if (Month.singleton.has(key))
      return Month.singleton.get(key)!

    return new Month(date)
  }

  static key(date: Dayjs): symbol {
    const month: string = date.format('MMMM')
    const year: string = date.format('YYYY')
    return Symbol.for(`${month} ${year}`)
  }

  addToSingleton(): void {
    Month.singleton.set(this.id, this)
  }

  is(date: Dayjs): boolean {
    return date.format('MMM') === this.month && date.format('YYYY') === this.year
  }

  add(day: Day): void {
    const week: Week = this.getWeek(day.date)
    week.days.push(day)
  }

  key(date: Dayjs): symbol {
    return Symbol.for(`${this.month} ${this.year}`)
  }

  [Symbol.iterator](): Iterator<CalendarRow & Symboler> {
    let counter = 0
    return {
      next: (): IteratorResult<CalendarRow & Symboler> => {
        const week: Week | undefined = this.weeks.at(counter)
        const done = this.weeks.length === counter
        counter += 1
        if (!week)
          return { done: true, value: null }
        else
          return { value: week.flatten(), done }
      }
    }
  }

  private getWeek(date: Dayjs): Week {
    let week: Week | undefined
    if (date.day() !== 0)
      week = this.weeks.at(-1)

    if (!week) {
      week = new Week(date.week())
      this.weeks.push(week)
    }

    return week
  }
}

export class Calendar implements Iterable<CalendarRow> {
  months: Month[] = new Array<Month>()
  calendarRows: CalendarRow & Symboler[] = new Array<CalendarRow & Symboler>()
  semester: string
  readonly id: symbol

  constructor(semesterObj: Semester) {
    this.semester = semesterObj.semester
    this.id = Symbol.for(this.semester)
  }

  static from = (semester: Semester): Calendar => {
    const calendar = new Calendar(semester)

    const start: Dayjs | undefined = semester.firstDate()
    const end: Dayjs | undefined = semester.lastDate()

    if (!start || !end) {
      console.error('failed to establish semester start and end.')
      throw Error('failed to establish semester end.')
    }

    const calendarStart = start.clone().add(-5, 'days')
    const calendarEnd = end.clone().add(10, 'days')

    const classStart = semester.firstClass()!

    let workingDate = calendarStart.clone()
    let month: Month = Month.from(workingDate)
    let calendarRow: CalendarRow & Symboler = calendarRowCreator(workingDate)
    let day: Day
    while (workingDate.isBefore(calendarEnd)) {
      if (!month.is(workingDate)) {
        calendar.months.push(month)
        month = Month.from(workingDate)
      }

      const events = semester.eventAt(workingDate)
      day = new Day(workingDate, classStart, end, calendarStart.isSame(workingDate), events)
      calendarRow[calendarIds[workingDate.day()].key] = day
      month.add(day)
      workingDate = workingDate.add(1, 'days')

      if (workingDate.day() === 0) {
        calendar.calendarRows.push(calendarRow)
        calendarRow = calendarRowCreator(workingDate)
      }
    }

    calendar.calendarRows.push(calendarRow)

    return calendar
  }

  [Symbol.iterator](): Iterator<CalendarRow & Symboler> {
    return this.calendarRows[Symbol.iterator]()
  };
}


