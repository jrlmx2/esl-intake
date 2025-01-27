import { Component, Input } from '@angular/core'
import { LowerCasePipe, TitleCasePipe } from '@angular/common'
import { EventType } from '../calendar-datasource'

@Component({
    selector: 'esl-calendar-event',
    imports: [
        TitleCasePipe,
        LowerCasePipe
    ],
    templateUrl: './calendar-event.component.html',
    styleUrl: './calendar-event.component.scss'
})
export class CalendarEventComponent {
  @Input() eventType!: EventType
  @Input() displayText!: string
}
