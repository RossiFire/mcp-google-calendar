import { calendar, message } from "../../util.js";
import server from "../server.js";
import { getAccessToken } from "../../auth/token.js";


export function initGetCalendars(){
  server.tool(
    "get-calendars",
    "List all calendars for the user",
    async () => {
  
      if (!getAccessToken()) return message("The user seems not logged in");
  
      const res = await calendar.calendarList.list();
  
      if (!res.data.items) return message("No calendars found");
    
      const formattedCalendars = res.data.items.map(e=>[
          'Name: ' + e.summary,
          'Description: ' + e.description,
          'Type: ' + e.kind,
          'ID: ' + e.id,
          'ETag: ' + e.etag,
          'Background Color: ' + e.backgroundColor,
          'Hidden: ' + e.hidden,
          'Selected: ' + e.selected,
          '---'
        ].join("\n")
      )

      return message(formattedCalendars.join("\n"));
    },
  );
}
