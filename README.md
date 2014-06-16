
# server-gateway

This project is the gateway that offers a REST API for other integrated services.


## Installation

```bash

PROJECT_PATH="/var/www/server-gateway"; # Make sure to set correct path;

sudo apt-get install mongodb-server nodejs;

cd "$PROJECT_PATH";
npm install;
```


## Bootup

```bash

PROJECT_PATH="/var/www/server-gateway"; # Make sure to set correct path;

sudo service mongodb stop;
sudo mongod --dbpath="$PROJECT_PATH/database";

cd "$PROJECT_PATH";
nodejs app.js;
```

