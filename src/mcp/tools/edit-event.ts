import { z } from "zod";
import server from "../server.js";
import { calendar, message } from "../../util.js";
import { calendar_v3 } from "googleapis";
import { formatEventForChat } from "../formatUtils.js";
import { getAccessToken } from "../../auth/token.js";

export function initEditEvent(){

    server.tool(
        "edit-event",
        "Edit an event from a calendar",
        {
            calendarId: z.string().default("primary"),
            eventId: z.string(),
            startDate: z.string(),
            endDate: z.string(),
            title: z.string(),
            description: z.string().optional(),
            location: z.string().optional(),
            remindersInMinutes: z.number().optional().default(60),
            isRecurring: z.boolean().optional().default(false),
            recurrenceType: z.enum(["daily", "weekly", "monthly", "yearly"]).optional().default("weekly"),
            attendees: z.array(z.string().email()).optional(),
            withReminders: z.boolean().optional().default(false),
        },
            async ({ 
                eventId,
                startDate, 
                endDate, 
                title, 
                description, 
                location, 
                remindersInMinutes, 
                isRecurring, 
                recurrenceType,
                attendees,
                withReminders,
                calendarId
            }) => {

                if (!getAccessToken()) return message("The user seems not logged in");

                const originalEvent = await calendar.events.get({ eventId, calendarId });


                const requestBody: calendar_v3.Schema$Event = {
                    ...originalEvent.data,
                    summary: title,
                    description: description,
                    start: { dateTime: startDate },
                    end: { dateTime: endDate },
                    location: location,
                    attendees: attendees?.map(attendee => ({ email: attendee })),
                }

                if(withReminders){
                    requestBody.reminders = {
                        useDefault: false,
                        overrides: [
                            { method: "popup", minutes: remindersInMinutes },
                        ],
                    }
                }

                if(isRecurring){
                    const recurrenceRule = `RRULE:FREQ=${recurrenceType?.toUpperCase()};UNTIL=${new Date(endDate).toUTCString()}`;
                    requestBody.recurrence = [recurrenceRule];
                }
                

                try{
                    const event = await calendar.events.patch({ 
                        calendarId, 
                        eventId, 
                        requestBody 
                    });
    
                    const formattedEvent = formatEventForChat(event.data);
                    return message("Event added successfully, here is the event:\n" + formattedEvent);
                }catch(e){
                    return message("Error: " + e);
                }
        }
    );
}