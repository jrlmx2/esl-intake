import { Component, Input } from '@angular/core'
import { LowerCasePipe } from '@angular/common'
import { EventType } from '../calendar-datasource'

@Component({
    selector: 'esl-calendar-event',
    imports: [LowerCasePipe],
    templateUrl: './calendar-event.component.html',
    styleUrl: './calendar-event.component.scss'
})
export class CalendarEventComponent {
    @Input() eventType!: EventType
    @Input() displayText!: string
}
