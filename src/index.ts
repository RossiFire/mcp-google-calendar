import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import * as dotenv from "dotenv";
import { authorizeWithGoogle } from "./auth/googleAuth.js";
import server from "./mcp/server.js";
import { initGoogleCalendarApi } from "./util.js";
import { initalizeTools } from "./mcp/tools/index.js";
import { getAccessToken } from "./auth/token.js";
dotenv.config({ path: ".env" });


async function main() {

  initalizeTools();

  await authorizeWithGoogle()
  await initGoogleCalendarApi(getAccessToken()!)

  const transport = new StdioServerTransport();
  await server.connect(transport);
  console.error("Planner MCP Server running on stdio");
}

main().catch((error) => {
  console.error("Fatal error in main():", error);
  process.exit(1);
});