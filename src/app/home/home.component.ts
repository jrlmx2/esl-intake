import { Component } from '@angular/core'
import { CalendarComponent } from '../calendar/calendar.component'
import { ContentComponent } from '../content/content.component'

import { dateLib } from '../dayjs'

const dayjs = dateLib()

@Component({
    selector: 'esl-home',
    imports: [CalendarComponent, ContentComponent],
    templateUrl: './home.component.html',
    styleUrl: './home.component.scss'
})
export class HomeComponent {
    startDay = dayjs('02/04/2025').format('MMMM Do')
}
