import { AsyncStorage } from 'react-native'
import { CALENDAR_STORAGE_KEY, formatCalendarResults } from './_calender'

export function fetchCalandarResults (){
    return AsyncStorage.getItem(CALENDAR_STORAGE_KEY)
        .then(formatCalendarResults)
}

export function submitEntry({ entry, key }) {
    return AsyncStorage.mergeItem(CALENDAR_STORAGE_KEY, JSON.stringify({
        [key]: entry,
    }))
}

export function removeEntry(key){
    return AsyncStorage.getItem(CALENDAR_STORAGE_KEY)
        .then((result) =>{
            const data= JSON.parse(results)
            data[key] = undefined
            delete data[key]
            AsyncStorage.setItem(CALENDAR_STORAGE_KEY,JSON.stringify(data))
        })
}