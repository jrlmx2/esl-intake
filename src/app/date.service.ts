import { Injectable } from '@angular/core'
import dayjs from 'dayjs'
import weekOfYear from 'dayjs/plugin/weekOfYear'
import advancedFormat from 'dayjs/plugin/advancedFormat'
import { environment } from './environment'
import 'dayjs/locale/es-us.js'

@Injectable({
    providedIn: 'root'
})
export class DateService {
    private readonly djs

    constructor() {
        dayjs.extend(advancedFormat)
        dayjs.extend(weekOfYear)

        dayjs.locale(environment.locale || 'en-US')

        this.djs = dayjs
    }
}
