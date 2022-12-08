# ExpressServer

## Config
    Here you got your different configurations.
        - Cors, Origins, dbconn, roles_list
## Controllers
    Controllers to handle our data.
        - Auth, Employees, Logout, RefreshTokens, Register, Users
## Logs
    Logs, logging most of our stuff, errors and requests.
        - ErrLog, reqLog
## Middleware
    For handlers
        - Credentials, errors, logging events, JWT handling, role handling
## Model
    Mogoose Data structures
        - Employees, Users
## Public
    Our css and test content such as images
        - css, img
## Routes
    Routes handling the data transportation & site changes
        - API, auth, logout, refresh, register, root
## Views
    Was purely for testing purposes to see if routes were working
    Most of the other views are deleted since I didn't need further testing.
        - index, 404
## .env
    Things others should not see
        - ACCESS_TOKEN_SECRET, REFRESH_TOKEN_SECRET, DATABASE_URI
## server.js
    The main server file
        - The coold guy  that runs the show.