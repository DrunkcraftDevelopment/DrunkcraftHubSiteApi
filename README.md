##### Drunkcraft Restful API #####

[![Build Status](https://travis-ci.org/DrunkcraftDevelopment/DrunkcraftHubSiteApi.svg?branch=master)](https://travis-ci.org/DrunkcraftDevelopment/DrunkcraftHubSiteApi)
[![devDependencies Status](https://david-dm.org/DrunkcraftDevelopment/DrunkcraftHubSiteAPI/dev-status.svg)](https://david-dm.org/DrunkcraftDevelopment/DrunkcraftHubSiteAPI?type=dev)
This application is to provide a server for the drunkcraft hub site to access the backend database for any information needing to be stored.

In order to run this application npm, mysql, gulp and nodejs are required.

Commands to run server
```
cd /path/to/clone/repo
npm install
npm install -g gulp
gulp
node dist/server.js
```

You will need to adjust the configuration values in config/config.json to match your local mysql server instance as well.
