import dayjs from 'dayjs'
import weekOfYear from 'dayjs/plugin/weekOfYear'
import advancedFormat from 'dayjs/plugin/advancedFormat'
import { environment } from './environment'
import 'dayjs/locale/es-us.js'

dayjs.extend(advancedFormat)
dayjs.extend(weekOfYear)

dayjs.locale(environment.locale || 'en-US')

export const dateLib = () => dayjs
