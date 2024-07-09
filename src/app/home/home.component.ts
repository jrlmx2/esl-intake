import { Component } from '@angular/core';
import { MatGridList, MatGridTile } from "@angular/material/grid-list";
import { CalendarComponent } from "../calendar/calendar.component";
import { MatTab, MatTabGroup } from "@angular/material/tabs";

@Component({
  selector: 'esl-home',
  standalone: true,
  imports: [
    MatGridTile,
    MatGridList,
    CalendarComponent,
    MatTabGroup,
    MatTab
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {}
