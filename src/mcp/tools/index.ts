import { initGetCalendars } from "./get-calendars.js";
import { initGetAllEvents } from "./get-events.js";
import { initGetEventsFromCalendar } from "./get-events-from-calendar.js";
import { initAddEvent } from "./add-event.js";
import { initEditEvent } from "./edit-event.js";
import { initDeleteEvent } from "./delete-event.js";


export async function initalizeTools() {
    initGetCalendars()
    initGetAllEvents()
    initGetEventsFromCalendar()
    initAddEvent()
    initEditEvent()
    initDeleteEvent()
}