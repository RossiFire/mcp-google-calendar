import { z } from "zod";
import server from "../server.js";
import { calendar, message } from "../../util.js";
import { endOfDay } from "date-fns";
import { formatEventForChat } from "../formatUtils.js";
import { getAccessToken } from "../../auth/token.js";

export function initGetEventsFromCalendar(){

    server.tool(
        "get-events-from-calendar",
        "Get Events from a specific calendar for a specific period or for the current day if no end period is provided",
        {
            calendarId: z.string(),
            startDate: z.string(),
            endDate: z.string().optional(),
        },  
        async ({ calendarId, startDate, endDate }) => {
            
            if (!getAccessToken()) return message("The user seems not logged in");
           
            // If endDate is not provided, set it to the end of the day
            if (!endDate) endDate = endOfDay(new Date(startDate)).toISOString()
            else endDate = new Date(endDate).toISOString()
            
            try{
                const res = await calendar.events.list({
                    calendarId: calendarId,
                    singleEvents: false,
                });
    
                const events = res.data.items || [];

                // We're filtering client side to include also events in between the start and end date
                // Otherwise the API only returns events that start or end in the given period
                const filteredEvents = events.filter(e => {
                    const start = e.start?.dateTime || e.start?.date;
                    const end = e.end?.dateTime || e.end?.date;
                    return start && end && start >= startDate && end <= endDate;
                });
    
    
                if (!filteredEvents.length) return message("No events found in the current period");
    
                const formattedEvents = events.map(formatEventForChat);
    
                return message(formattedEvents.join("\n"));

            } catch (error) {
                return message("An error occurred for the calendar " + calendarId + ":\n" + error);
            }

        },
    );
}