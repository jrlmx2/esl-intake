import { Component } from '@angular/core'
import { MatTableModule } from '@angular/material/table'
import { MatPaginatorModule } from '@angular/material/paginator'
import {
    CalendarDataSource,
    eventTypeTranslationsMap
} from './calendar-datasource'
import { calendarIds } from './weekday-names'
import { CalendarEventComponent } from './calendar-event/calendar-event.component'
import { TitleCasePipe } from '@angular/common'
import { MatIcon } from '@angular/material/icon'
import { Calendar } from './calendar.class'

@Component({
    selector: 'esl-calendar',
    templateUrl: './calendar.component.html',
    styleUrl: './calendar.component.scss',
    imports: [
        MatPaginatorModule,
        MatTableModule,
        CalendarEventComponent,
        TitleCasePipe,
        MatIcon
    ]
})
export class CalendarComponent {
    detailsLink?: string
    infoLink?: string
    protected readonly calenderIds = calendarIds
    protected readonly eventTypeTranslationsMap = eventTypeTranslationsMap
    protected currentCalendar: Calendar
    private readonly dataSource = new CalendarDataSource()
    private currentCalendarIndex = this.dataSource.data.length - 1

    constructor() {
        this.currentCalendar = this.dataSource.data.at(-1)!

        this.detailsLink = this.calendarDocLink(
            this.currentCalendar,
            'schedule'
        )
        this.infoLink = this.calendarDocLink(this.currentCalendar, 'info')
    }

    get hasPrevious(): boolean {
        return this.currentCalendarIndex > 0
    }

    get hasNext(): boolean {
        return this.currentCalendarIndex < this.dataSource.data.length - 1
    }

    nextCalendar() {
        if (this.currentCalendarIndex === this.dataSource.data.length - 1)
            return

        this.currentCalendarIndex += 1
        this.updateCalendar(this.currentCalendarIndex)
    }

    previousCalendar() {
        if (this.currentCalendarIndex === 0) return

        this.currentCalendarIndex += -1
        this.updateCalendar(this.currentCalendarIndex)
    }

    updateCalendar(index: number): void {
        this.currentCalendar = this.dataSource.data[index]

        this.detailsLink = this.calendarDocLink(
            this.currentCalendar,
            'schedule'
        )
        this.infoLink = this.calendarDocLink(this.currentCalendar, 'info')
    }

    calendarDocLink(calender: Calendar, type: string) {
        const { semesterYear, semesterHalf } = calender.semester
        return this.doclink(semesterYear, semesterHalf?.toLowerCase(), type)
    }

    doclink(year: number, semester: string, type: string) {
        console.log(`/${year}/${semester}-${type}.pdf`)
        return `/${year}/${semester}-${type}.pdf`
    }
}
