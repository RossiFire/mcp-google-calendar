import { calendar, message } from "../../util.js";
import server from "../server.js";
import { z } from "zod";
import { endOfDay } from "date-fns";
import { formatEventForChat } from "../formatUtils.js";
import { getAccessToken } from "../../auth/token.js";


export function initGetAllEvents(){
    server.tool(
        "get-events",
        "Get Events from all calendars for a specific period or for the current day if no end period is provided",
        {
            startDateString: z.string(),
            endDateString: z.string().optional(),
        },
        async ({ startDateString, endDateString }) => {
            
            if (!getAccessToken()) return message("The user seems not logged in");

            const startDate = new Date(startDateString);
            let endDate: Date;
            // If endDate is not provided, set it to the end of the day
            if (!endDateString) endDate = endOfDay(startDate)
            else endDate = new Date(endDateString)
    

            const calendars = await calendar.calendarList.list(); 

            const calendarIds = (calendars.data?.items || []).map(cal => cal.id).filter((id): id is string => !!id);
            const result = await Promise.all(calendarIds.map(id => calendar.events.list({
                calendarId: id,
                singleEvents: true,
                timeMin: startDate.toISOString(),
                timeMax: endOfDay(endDate).toISOString(),
            })));

            const events = result.flatMap(e => e.data.items || []);

            if (events.length <= 0) return message("No events found in the current period");
      
            const formattedEvents = events.map(formatEventForChat);
        
            return message(formattedEvents.join("\n"));
        },
    );
}
