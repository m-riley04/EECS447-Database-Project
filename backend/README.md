# backend
This directory is for storing the backend server of the web-app. This is requried so we can access the MariaDB database through the SSH tunnel.

# Building and Running
Firstly, you need to create the `.env` file that stores your credentials to both the EECS database and the EECS cycle server(s). See [this section](#environment-variables).

From the root repo directory, run the following commands:
```bash
cd backend
npm install
node src/server.js
```

> NOTE: The project utilizes a frontend and a backend. Please note that running this backend does NOT start the frontend. To do that, view the [frontend documentation](frontend/README.md).

# Environment Variables
In this directory, you need a `.env` file to store credentials. Here are the following entries that are needed in that `.env` file:
- DB_USERNAME
    - The username received from the TA for the EECS MariaDB database
- DB_PASSWORD
    - The password received from the TA for the EECS MariaDB database
- DB_HOST
    - Should be "mysql.eecs.ku.edu"
- DB_PORT
    - Should be 3306
- DB_NAME
    - Should be the same as the DB_USERNAME
- SSH_USERNAME
    - Should be your normal KU credentials
- SSH_PASSWORD
    - Should be your normal KU credentials
- SSH_HOST
    - Should be one of the EECS cycle servers. Preferred is "cycle3.eecs.ku.edu".
- SSH_PORT
    - Should be 22
- SERVER_PORT
    - Optional, but default is 3301
- SERVER_HOST
    - Optional, but default is "localhost"