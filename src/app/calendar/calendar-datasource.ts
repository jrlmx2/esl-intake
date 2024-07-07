import { DataSource } from '@angular/cdk/collections';
import { map } from 'rxjs/operators';
import { Observable, of as observableOf, merge } from 'rxjs';
import dayjs, { Dayjs } from "dayjs";
import { MatPaginator } from "@angular/material/paginator";
import {Calendar, CalendarRow, Month} from "./calendar.class";
import {Semester} from "./semester.class";

enum EventType {
  Class = 'Class',
  Social = 'Social',
  Orientation = 'Orientation',

}

export interface Event {
  type: EventType;
  date: Dayjs;
  desc?: string;
}

const semesters: Semester[] = [
  new Semester( 'Spring',2024,[
    { type: EventType.Class, date: dayjs('02/13/2024') },
    { type: EventType.Class, date: dayjs('02/20/2024') },
    { type: EventType.Class, date: dayjs('02/27/2024') },
    { type: EventType.Class, date: dayjs('03/05/2024') },
    { type: EventType.Class, date: dayjs('03/12/2024') },
    { type: EventType.Class, date: dayjs('03/19/2024') },
    { type: EventType.Class, date: dayjs('03/26/2024') },
    { type: EventType.Class, date: dayjs('04/02/2024') },
    { type: EventType.Class, date: dayjs('04/09/2024') },
    { type: EventType.Class, date: dayjs('04/16/2024') },
    { type: EventType.Class, date: dayjs('04/23/2024') },
    { type: EventType.Class, date: dayjs('04/30/2024') },
    { type: EventType.Class, date: dayjs('05/07/24') },
    { type: EventType.Class, date: dayjs('05/14/24') },
  ]),
  new Semester('Fall', 2024, [
    { type: EventType.Orientation, date: dayjs('08/29/2024') },
    { type: EventType.Orientation, date: dayjs('09/03/2024') },
    { type: EventType.Class, date: dayjs('09/10/2024') },
    { type: EventType.Class, date: dayjs('09/17/2024') },
    { type: EventType.Class, date: dayjs('09/24/2024') },
    { type: EventType.Class, date: dayjs('10/01/2024') },
    { type: EventType.Class, date: dayjs('10/08/2024') },
    { type: EventType.Class, date: dayjs('10/15/2024') },
    { type: EventType.Class, date: dayjs('10/22/2024') },
    { type: EventType.Class, date: dayjs('10/29/2024') },
    { type: EventType.Class, date: dayjs('11/05/2024') },
    { type: EventType.Class, date: dayjs('11/12/2024') },
    { type: EventType.Class, date: dayjs('11/19/2024') },
    { type: EventType.Class, date: dayjs('11/26/2024') },
  ])
];

/**
 * Data source for the Calendar view. This class should
 * encapsulate all logic for fetching and manipulating the displayed data
 * (including sorting, pagination, and filtering).
 */
export class CalendarDataSource extends DataSource<CalendarRow[]> {
  data: CalendarRow[][] = new Array<CalendarRow[]>();
  paginator: MatPaginator | undefined;

  constructor() {
    super();

    for ( const semester of semesters ) {
      this.data.push( [ ...new Calendar( enumerateSemesterCalender(semester)) ] );
    }
  }

  /**
   * Connect this data source to the table. The table will only update when
   * the returned stream emits new items.
   * @returns A stream of the items to be rendered.
   */
  connect(): Observable<CalendarRow[][]> {
    // Combine everything that affects the rendered data into one update
    // stream for the data-table to consume.
    if (!this.paginator) return observableOf( this.data );

    return merge(observableOf(this.data), this.paginator.page)
      .pipe(map(() => {
        return this.getPagedData([ ...this.data ]);
      }));
  }

  /**
   *  Called when the table is being destroyed. Use this function, to clean up
   * any open connections or free any held resources that were set up during connect.
   */
  disconnect(): void {
    return;
  }

  private getPagedData(data: CalendarRow[][]): CalendarRow[][] {
    if (this.paginator) {
      const startIndex = this.paginator.pageIndex * this.paginator.pageSize;
      return data.splice(startIndex, this.paginator.pageSize);
    } else {
      return data;
    }
  }
}

const enumerateSemesterCalender = (semester: Semester): Month[] => {
  const monthsInSemester = new Array<Month>();

  const start: Dayjs | undefined = semester.firstDate();
  const end: Dayjs | undefined = semester.lastDate();

  if ( !start || !end ) {
    console.error("failed to establish semester start and end.");
    throw Error("failed to establish semester end.");
  }

  const calendarStart = start.clone().add(-10, 'days');
  const calendarEnd = end.clone().add(10, 'days');

  let workingDate = calendarStart.clone();
  let month: Month = new Month(workingDate);
  while ( workingDate.isBefore(calendarEnd) ) {
    if ( !month.is(workingDate) ) {
      monthsInSemester.push(month);
      month = new Month(workingDate);
    }

    month.add(workingDate, start, end, semester.eventAt(workingDate));
    workingDate = workingDate.add(1, 'days');
  }

  return monthsInSemester;

}
