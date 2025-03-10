import dayjs, { Dayjs } from 'dayjs'
import { Calendar } from './calendar.class'
import { Semester } from './semester.class'

export enum EventType {
    class = 'class',
    social = 'social',
    orientation = 'orientation',
    graduation = 'graduation'
}

export const eventTypeTranslationsMap: Map<EventType, string> = new Map([
    [EventType.class, $localize`:event type class:class`],
    [EventType.social, $localize`:event type social:social`],
    [EventType.orientation, $localize`:event type orientation:orientation`],
    [EventType.graduation, $localize`:event type graduation:graduation`]
])

export const EventTypes: EventType[] = [
    EventType.class,
    EventType.social,
    EventType.orientation,
    EventType.graduation
]

export interface Event {
    id: symbol
    type: EventType
    date: Dayjs
    desc?: string
}

const semesters: Semester[] = [
    new Semester($localize`:semester Fall:Fall`, 2024, [
        {
            id: Symbol(),
            type: EventType.orientation,
            date: dayjs('09/03/2024')
        },
        {
            id: Symbol(),
            type: EventType.class,
            date: dayjs('09/10/2024'),
            desc: 'class'
        },
        { id: Symbol(), type: EventType.class, date: dayjs('09/17/2024') },
        { id: Symbol(), type: EventType.class, date: dayjs('09/24/2024') },
        { id: Symbol(), type: EventType.class, date: dayjs('10/01/2024') },
        { id: Symbol(), type: EventType.class, date: dayjs('10/08/2024') },
        { id: Symbol(), type: EventType.social, date: dayjs('10/15/2024') },
        { id: Symbol(), type: EventType.class, date: dayjs('10/15/2024') },
        { id: Symbol(), type: EventType.class, date: dayjs('10/22/2024') },
        { id: Symbol(), type: EventType.class, date: dayjs('10/29/2024') },
        { id: Symbol(), type: EventType.class, date: dayjs('11/05/2024') },
        { id: Symbol(), type: EventType.class, date: dayjs('11/12/2024') },
        { id: Symbol(), type: EventType.class, date: dayjs('11/19/2024') },
        { id: Symbol(), type: EventType.class, date: dayjs('11/26/2024') },
        { id: Symbol(), type: EventType.graduation, date: dayjs('11/26/2024') }
    ]),
    new Semester($localize`:semester Spring:Spring`, 2025, [
        {
            id: Symbol(),
            type: EventType.class,
            date: dayjs('02/04/2025')
        },
        {
            id: Symbol(),
            type: EventType.class,
            date: dayjs('02/11/2025'),
            desc: 'class'
        },
        { id: Symbol(), type: EventType.class, date: dayjs('02/18/2025') },
        { id: Symbol(), type: EventType.class, date: dayjs('02/25/2025') },
        { id: Symbol(), type: EventType.class, date: dayjs('03/04/2025') },
        { id: Symbol(), type: EventType.class, date: dayjs('03/11/2025') },
        { id: Symbol(), type: EventType.class, date: dayjs('03/18/2025') },
        { id: Symbol(), type: EventType.class, date: dayjs('03/25/2025') },
        { id: Symbol(), type: EventType.class, date: dayjs('04/01/2025') },
        { id: Symbol(), type: EventType.class, date: dayjs('04/08/2025') },
        { id: Symbol(), type: EventType.class, date: dayjs('04/15/2025') },
        { id: Symbol(), type: EventType.class, date: dayjs('04/22/2025') },
        { id: Symbol(), type: EventType.social, date: dayjs('04/29/2025') }
    ])
]

/**
 * Data source for the Calendar view. This class should
 * encapsulate all logic for fetching and manipulating the displayed data
 * (including sorting, pagination, and filtering).
 */
export class CalendarDataSource {
    data: Calendar[] = new Array<Calendar>()

    constructor() {
        for (const semester of semesters) {
            this.data.push(Calendar.from(semester))
        }
    }
}
