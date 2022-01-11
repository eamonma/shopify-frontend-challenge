import { format, getDay, parseISO } from "date-fns"
import { NASAImage } from "./ImageCard"

interface APICacheLocalStorage {
    // Key in ISO format of yyyy-MM-dd
    [key: string]: NASAImage
}

/**
 * From https://stackoverflow.com/a/50398144
 * @param s starting date
 * @param e ending date
 * @returns list of days between
 */
const getDaysArray = (start: Date, end: Date): Array<Date> => {
    const arr = []

    for (let dt = new Date(start); dt <= end; dt.setDate(dt.getDate() + 1)) {
        arr.push(new Date(dt))
    }
    return arr
}

const getISODaysArray = (start: string, end: string) => {
    const startDate = parseISO(start)
    const endDate = parseISO(end)
    const array = getDaysArray(startDate, endDate)

    return array.map((day) => format(day, "yyyy-MM-dd"))
}

export const getISODateFromDate = (date: Date) => {
    return date.toISOString().split("T")[0]
}

/**
 *
 * @param startDate earliest image
 * @param endDate latest image
 * @returns array of images
 */
const fetchImages = async (
    startDate: string,
    endDate: string
): Promise<Array<NASAImage>> => {
    // Check if API response is cached
    const lsApiCache = localStorage.getItem("apiCache")
    let apiCache: APICacheLocalStorage | Object = JSON.parse(lsApiCache)
    // const startISODate = format(parseISO(startDate), "yyyy-MM-dd")
    // const endISODate = format(endDate, "yyyy-MM-dd")

    const ISODaysBetween = getISODaysArray(startDate, endDate)

    const everythingInRangeIsCached = ISODaysBetween.every(
        (day) => day in apiCache
    )

    if (apiCache && everythingInRangeIsCached) {
        return ISODaysBetween.map((day) => apiCache[day])
    }

    if (!apiCache) apiCache = {}

    // else query API and cache

    const apiUrl = `https://api.nasa.gov/planetary/apod?api_key=${process.env.NEXT_PUBLIC_NASA_API}&start_date=${startDate}&end_date=${endDate}`

    const response: Array<NASAImage> = await (await fetch(apiUrl)).json()

    // cache
    for (const image of response) {
        apiCache[image.date] = image
    }

    localStorage.setItem("apiCache", JSON.stringify(apiCache))

    return response
}

export default fetchImages
