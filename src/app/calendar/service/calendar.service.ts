import { Injectable } from '@angular/core'
import { Calendar } from '../calendar.class'
import { CalendarDataSource } from '../calendar-datasource'
import { BehaviorSubject, Observable } from 'rxjs'

@Injectable({
    providedIn: 'root'
})
export class CalendarService {
    protected currentCalendar$: BehaviorSubject<Calendar> =
        new BehaviorSubject<Calendar>({} as Calendar)
    protected currentCalendar!: Calendar
    private readonly dataSource = new CalendarDataSource()
    private currentCalendarIndex = this.dataSource.data.length - 1
    private scheduleLink$: BehaviorSubject<string>
    private infoLink$: BehaviorSubject<string>

    constructor() {
        this.currentCalendar = this.dataSource.data.at(-1)!
        this.currentCalendar$.next(this.currentCalendar)
        this.scheduleLink$ = new BehaviorSubject(this.link('schedule'))
        this.infoLink$ = new BehaviorSubject(this.link('info'))
    }

    get currentCalendarObservable(): Observable<Calendar> {
        return this.currentCalendar$.asObservable()
    }

    get scheduleLink(): Observable<string> {
        return this.scheduleLink$.asObservable()
    }

    get infoLink(): Observable<string> {
        return this.infoLink$.asObservable()
    }

    get semester(): string {
        return this.currentCalendar.semester.semester
    }

    get hasPrevious(): boolean {
        return this.currentCalendarIndex > 0
    }

    get hasNext(): boolean {
        return this.currentCalendarIndex < this.dataSource.data.length - 1
    }

    previous(): void {
        this.hasPrevious && this.updateCalendar(this.currentCalendarIndex - 1)
    }

    next(): void {
        this.hasNext && this.updateCalendar(this.currentCalendarIndex + 1)
    }

    updateCalendar(index: number): void {
        this.currentCalendar = this.dataSource.data[index]
        this.updateLinks()
    }

    public updateLinks() {
        this.scheduleLink$ = new BehaviorSubject(this.link('schedule'))
        this.infoLink$ = new BehaviorSubject(this.link('info'))
    }

    private link(type: string) {
        return this.calendarDocLink(this.currentCalendar, type)
    }

    private calendarDocLink(calender: Calendar, type: string) {
        const { semesterYear, semesterHalf } = calender.semester
        return this.doclink(semesterYear, semesterHalf?.toLowerCase(), type)
    }

    private doclink(year: number, semester: string, type: string) {
        console.log(`/${year}/${semester}-${type}.pdf`)
        return `/${year}/${semester}-${type}.pdf`
    }
}
