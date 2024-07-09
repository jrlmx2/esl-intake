import { Component } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import {CalendarDataSource, EventTypes} from './calendar-datasource';
import { calenderIds } from "./calendar.class";
import { CalendarEventComponent } from "./calendar-event/calendar-event.component";
import {JsonPipe, TitleCasePipe, UpperCasePipe} from "@angular/common";
import {MatIcon} from "@angular/material/icon";

@Component({
  selector: 'esl-calendar',
  templateUrl: './calendar.component.html',
  styleUrl: './calendar.component.scss',
  standalone: true,
  imports: [
    MatPaginatorModule,
    MatTableModule,
    CalendarEventComponent,
    TitleCasePipe,
    UpperCasePipe,
    MatIcon,
    JsonPipe,
  ]
})
export class CalendarComponent {
  private readonly dataSource= new CalendarDataSource();
  protected readonly calenderIds = calenderIds;
  private currentCalendarIndex = this.dataSource.data.length-1;
  protected currentCalendar = this.dataSource.data.at(-1)!;

  get hasPrevious(): boolean {
    return this.currentCalendarIndex > 0;
  }

  get hasNext(): boolean {
    return this.currentCalendarIndex < this.dataSource.data.length - 1;
  }

  nextCalendar() {
    if (this.currentCalendarIndex === this.dataSource.data.length-1) {
      return;
    }
    this.currentCalendarIndex += 1;
    this.updateCalendar(this.currentCalendarIndex);
  }

  previousCalendar() {
    if (this.currentCalendarIndex === 0) {
      return;
    }
    this.currentCalendarIndex += -1;
    this.updateCalendar(this.currentCalendarIndex);
  }

  updateCalendar(index: number): void {
    this.currentCalendar = this.dataSource.data[index];
  }

  protected readonly EventTypes = EventTypes;
}
