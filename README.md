## The `wheater-ui` demo application

### Description

The entire application is written by an AI assistant (Copilot) using an auxiliary, previously created HTTP SSE MCP server
using
the library [McpEndpointsTools](https://github.com/DED-Zlodey/McpEndpontsTools "McpEndpointsTools")
The application demonstrates the ease of UI development using a ready-made external API in conjunction with the MCP server, which
is automatically
created by the `McpEndpointsTools` library with a detailed description of all API endpoints.

### Prompting

The following `prompt` was used to create the application:

```
Write an application using Next.js 15.3.2 MUI v7
The application must receive through an external API, the endpoints of which can be obtained by polling the MCP server - (API-Helper)
The MCP server will return the tools to you, the addresses of the endpoints will be indicated there, you must bind 
these endpoints to the buttons that you create in the project. You must use the format of the tools received from the 
MCP server to display the information on the page.

Make three buttons:

1. Get the weather forecast for the next few days.
2. Get the wind speed at a given altitude (find out what parameters the endpoint takes on the MCP server)
3. Get the probability of precipitation (find out what parameters the endpoint on the MCP server accepts)
```

### `MCP` settings for `VS Code`

```json
{
  "servers": {
    "API-Helper": {
      "url": "http://localhost:5258/mcp"
    },
    "Context7": {
      "type": "stdio",
      "command": "npx",
      "args": [
        "-y",
        "@upstash/context7-mcp@latest"
      ]
    }
  }
}
```

- `Context7` was used to improve working with the codebase
- `API-Helper` is an MCP server that provides all the information about the endpoints known to it in the API (learn more about
  the automatic creation of an MCP server on `ASP.Net Core`
  read [here](https://github.com/DED-Zlodey/McpEndpontsTools "McpEndpointsTools") and thus speeds
  up UI development.

Initially, a file was created in the project.vscode/mcp.json` Everything else is created by the assistant. During the creation
of the application, no errors were found in the code base, but the assistant was unable to install some dependencies. After
When errors occurred when launching the application related to not installing the necessary dependencies, the errors were copied to the
chat and the assistant corrected them independently.
The chat history is shown in the screenshots below:

![1](https://github.com/user-attachments/assets/5c291384-192b-46fd-b50a-4a6f76bf3ed8)
![2](https://github.com/user-attachments/assets/d5693478-6446-434f-b5d8-50c4bccac13f)
