import { z } from "zod";
import server from "../server.js";
import { calendar, message } from "../../util.js";
import { getAccessToken } from "../../auth/token.js";


export function initDeleteEvent(){
    server.tool(
        "delete-event",
        "Delete an event from a calendar",
        {
            eventId: z.string(),
            calendarId: z.string().default("primary"),
        },
            async ({ eventId, calendarId }) => {

                if (!getAccessToken()) return message("The user seems not logged in");

                try{
                    await calendar.events.delete({ eventId, calendarId });
                }catch(e){
                    return message("Error deleting event");
                }

                return message("Event deleted successfully");
        }
    );
}