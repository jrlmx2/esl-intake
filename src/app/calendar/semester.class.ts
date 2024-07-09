import { Event } from "./calendar-datasource";
import { Dayjs } from "dayjs";

export class Semester {
  semesterYear: number;
  semesterHalf: string;
  events: Event[] = new Array<Event>();

  constructor(semesterHalf: string, semesterYear: number, events: Event[]) {
    this.semesterYear = semesterYear;
    this.events = events;
    this.semesterHalf = semesterHalf;
  }

  firstDate(): Dayjs | undefined {
    return this.events.at(0)?.date;
  }

  lastDate(): Dayjs | undefined {
    return this.events.at(-1)?.date;
  }

  eventAt(date: Dayjs): Event[] {
    return this.events.filter( (event: Event) => event.date.isSame(date) );
  }

  get semester(): string {
    return `${this.semesterHalf} ${this.semesterYear}`;
  }

}
