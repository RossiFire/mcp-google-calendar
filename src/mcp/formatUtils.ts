import { eachDayOfInterval, getDate, parse } from "date-fns";
import { calendar_v3 } from "googleapis";


export const formatEventForChat = (e: calendar_v3.Schema$Event) => [
    `Id: ${e.id}`,
    `Name: ${e.summary || "Unknown"}`,
    `Description: ${e.description || "Unknown"}`,
    `Location: ${e.location || "Unknown"}`,
    `Start: ${e.start?.dateTime || e.start?.date || "Unknown"}`,
    `End: ${e.end?.dateTime || e.end?.date || "Unknown"}`,
    //`Dates: ${getDaysBetweenDates(e.start?.dateTime || "", e.end?.dateTime || "").join(", ")}`,
    `Status: ${e.status || "Unknown"}`,
    `Organizer: ${e.organizer?.displayName || "Unknown"}`,
    `Attendees: ${e.attendees?.map(a => a.displayName).join(", ") || "Nobody"}`,
    `Type: ${e.eventType || "default"}`,
    "---",
].join("\n")




export function getDaysBetweenDates(start: string, end: string): string[] {
    const startDate = parse(start, 'dd-MM-yyyy', new Date());
    const endDate = parse(end, 'dd-MM-yyyy', new Date());
  
    // get dates in between
    const days = eachDayOfInterval({ start: startDate, end: endDate });
    return days.map((date)=> date.toISOString());
}