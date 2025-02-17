import { Component } from '@angular/core'
import { CalendarComponent } from '../calendar/component/calendar.component'
import { ContentComponent } from '../content/content.component'

import { dateLib } from '../dayjs'
import { CalendarService } from '../calendar/service/calendar.service'
import { DateService } from '../date.service'

const dayjs = dateLib()

@Component({
    selector: 'esl-home',
    imports: [CalendarComponent, ContentComponent],
    templateUrl: './home.component.html',
    styleUrl: './home.component.scss'
})
export class HomeComponent {
    startDay: string = ''
    startMonth: string = ''
    startYear: number = 0
    semester: string = ''
    setValues = false

    constructor(calendarService: CalendarService, dates: DateService) {
        calendarService.currentCalendarObservable.subscribe(calendar => {
            if (!calendar || this.setValues) return
            const day = calendar.semester.firstDate()!
            this.startMonth = day.format('MMMM')
            this.startDay = day.format('D')
            this.startYear = calendar.semester.semesterYear
            this.semester = calendar.semester.semesterHalf
            this.setValues = true
        })
    }
}
