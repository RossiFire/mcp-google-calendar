# 🗓️ Google Calendar MCP Server
A Model Context Protocol (MCP) server made with Typescript and nodejs that allows Claude Desktop to connect and interact with Google Calendar.


## 📕Table of contents
- [Features](#features)
- [Requirements](#requirements)
- [Getting Started](#getting-started)
  - [1. Create new project](#1-create-new-project)
  - [2. Google Cloud OAuth](#2-google-cloud-oauth)
- [Installation](#installation)
  - [1. Clone the repository](#1-clone-the-repository)
  - [2. Install dependencies](#2-install-dependencies)
  - [3. Configure environment variables](#3-configure-environment-variables)
  - [4. Build the project](#4-build-the-project)
- [Configuring Claude Desktop](#configuring-claude-desktop)
  - [Prerequisites](#prerequisites)
- [First run](#first-run)
- [Verify Connection](#verify-connection)
- [Security Considerations](#security-considerations)
- [Contributing](#contributing)
- [License](#license)


## Features

- Connect Claude Desktop AI to your Google account
- Retrieve calendar lists and events
- Create, update, and delete events
- Automatic Token management


## Requirements

- Node.js (v16 or higher)
- npm or yarn
- Google account with Calendar access
- Google OAuth2 credentials
- Claude Desktop

## Getting Started
Since this is a local server, you'll need to set up google cloud project to use it. Here's a detailed guide on how to get your tokens.

### 1. Create new project
Access to the [google cloud console](https://console.cloud.google.com), then create a new project.
### 2. Google Cloud OAuth
1. Go to the [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project
3. Go to **APIs and Services** > **Credentials** tab > click on **Create new credentials**.
4. Select _OAuth Client ID_ as type of credential and _Web Application_ as application type. Then set a name for the credentials and add authorized redirect URIs as shown below:

<p align="center">
  <img src="https://github.com/RossiFire/mcp-google-calendar/blob/master/public/assets/urls-config.png" alt="logo" />
</p>

Once finished, you should have the **Client ID** and **Client Secret**.

## Installation

### 1. Clone the repository

```bash
git clone https://github.com/RossiFire/mcp-google-calendar
cd mcp-google-calendar
```

### 2. Install dependencies

```bash
npm install
# or
yarn install
```

### 3. Configure environment variables

Create a `.env` file based on the `.env.example`:

```bash
cp .env.example .env
```

Then edit the `.env` file with your configuration:

```
CLIENT_ID=your_cliend_id
CLIENT_SECRET=your_client_secret

# This is random string rapresenting the secret for the express session. 
EXPRESS_SECRET=your_express_secret
```
### 4. Build the project
You need to build the MCP server **before** asking Claude to connect to it, so Claude Desktop will be able to consume it.

```bash
npm run build
```

### Configuring Claude Desktop

### Prerequisites

1. You must have Claude Desktop installed on your computer
3. Your version of Claude Desktop must support MCP connections

Claude Desktop needs to be configured to access your MCP server:

1. **Locate your Claude Desktop settings file:**
   - On macOS: `~/Library/Application Support/Claude/claude_desktop_config.json`
   - On Windows: `%APPDATA%\Claude\claude_desktop_config.json`

2. **Add the MCP server configuration to the settings file:**
   - Open the settings.json file in a text editor
   - Find or create the `mcpServers` section
   - Add the following configuration:


   ```json
    {
      "mcpServers": {
          "GoogleMCPCalendar": {
              "command": "node",
              "args": [
                  "/path/to/project/folder/mcp-google-calendar/build/index.js"
              ],
              "env": {
                  "CLIENT_ID": your_client_id,
                  "CLIENT_SECRET": your_client_secret,
                  "EXPRESS_SECRET": express_secret
              }
          }
      }
    }
   ```
   


3. **Save the file and restart Claude Desktop**

## First run
After the installation, when you open Claude, you will be asked to select and log in with a Google account. After logging in, you're ready to use it! Next times you open Claude, you won't be asked to log in since the token is automatically saved and managed.

## Verify Connection
Once connected, you can test Claude AI asking for simple questions like:
```
What events do I have today?
What's on my calendar for next week?
etc...
```

## Security Considerations

- This MCP server stores authentication tokens locally in files, so there are no data exposed online. Make sure these files are not committed to version control.

## Contributing

Feel free to submit a Pull Request.

## License

This project is licensed under the MIT License - see the LICENSE file for details.
  