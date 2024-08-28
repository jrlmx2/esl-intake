import { Component } from '@angular/core'
import { MatGridList, MatGridTile } from '@angular/material/grid-list'
import { CalendarComponent } from '../calendar/calendar.component'
import { MatTab, MatTabGroup } from '@angular/material/tabs'
import { ContentComponent } from '../content/content.component'

import { dateLib } from '../dayjs'

const dayjs = dateLib()


@Component({
  selector: 'esl-home',
  standalone: true,
  imports: [
    MatGridTile,
    MatGridList,
    CalendarComponent,
    MatTabGroup,
    MatTab,
    ContentComponent
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  startDay = dayjs('09/10/2024').format('MMMM Do')
}
