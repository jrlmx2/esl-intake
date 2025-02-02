import { Component, Signal } from '@angular/core'
import { MatTableModule } from '@angular/material/table'
import { MatPaginatorModule } from '@angular/material/paginator'
import { eventTypeTranslationsMap } from '../calendar-datasource'
import { calendarIds } from '../weekday-names'
import { CalendarEventComponent } from '../calendar-event/calendar-event.component'
import { TitleCasePipe } from '@angular/common'
import { MatIcon } from '@angular/material/icon'
import { CalendarService } from '../service/calendar.service'
import { toSignal } from '@angular/core/rxjs-interop'
import { Calendar } from '../calendar.class'

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
    scheduleLink: Signal<string | undefined>
    infoLink: Signal<string | undefined>
    currentCalendar: Signal<Calendar | undefined>
    protected readonly calenderIds = calendarIds
    protected readonly eventTypeTranslationsMap = eventTypeTranslationsMap

    constructor(protected readonly calendarService: CalendarService) {
        this.scheduleLink = toSignal<string>(calendarService.scheduleLink)
        this.infoLink = toSignal<string>(calendarService.infoLink)
        this.currentCalendar = toSignal<Calendar>(
            calendarService.currentCalendarObservable
        )
    }
}
