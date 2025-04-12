import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import fs from 'fs'

// Create server instance
const server = new McpServer({
    name: "Google Calendar MCP Server",
    version: "1.0.0",
    capabilities: {
      resources: {},
      tools: {},
    },
});

export default server;
  