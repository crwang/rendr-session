[![Build Status](https://travis-ci.org/crwang/rendr-session.svg?branch=master)](https://travis-ci.org/crwang/rendr-session) 
[![Code Climate](https://codeclimate.com/github/crwang/rendr-session/badges/gpa.svg)](https://codeclimate.com/github/crwang/rendr-session)
[![Dependency Status](https://david-dm.org/crwang/rendr-session.png)](https://david-dm.org/crwang/rendr-session)

Provides sessions for Rendr that are accessible from both the server and the client.

## How it Works

Adds methods to app.js

## Setup

### Set up the server and middleware for the sessions.

index.js

```js

// Add the require
var express = require('express'),
    rendrSession = require('rendr-session'),
    customApiProxy = require('rendr-api-proxy-optionable'),
    session = require('express-session'),
    cookieParser = require('cookie-parser'),
    ...

// Add the express session
app.use(session({
    secret: "This should be a secret in config",
    resave: false,
    saveUninitialized: true
}));

// Add the cookie parser
app.use(cookieParser("This should be a secret in config"));

var dataAdapterConfig = {
    default: {
        host: 'localhost:3000', // put your default here
        protocol: 'http'
    },
    session: {
        host: 'localhost:3030', // an example of local here
        protocol: 'http',
        headerPassthrough: { // pass through cookies for session purposes
            request: [
                'cookie'
            ]
        }
    }
};

// Use the custom api proxy or some other rest adapter to make sure the cookies get passed in
var server = rendr.createServer({
    dataAdapterConfig: dataAdapterConfig,
    apiProxy: customApiProxy
});

// Add the rendrSession middleware
server.configure(function(rendrExpressApp) {

    // Set the config into the app
    rendrSession(rendrExpressApp);
    ...
```


### Subclass from the rendrSession App

app/app.js

```js
var BaseApp = require('rendr-session/shared/app'),
    ...
    handlebarsHelpers = require('./lib/handlebarsHelpers');

```

## Usage

### New App Methods

#### app.getSessionModel()

Retrieves the session information in a backbone model.

#### app.getSessionValue(key)

Retrieves the value of a session attribute by key.

#### app.saveSession(newSessionData, callback)

Saves the new session data into a session.  newSessionData should be a json object.

### Example: Call from view or other code.

```js
// Save the data
this.app.saveSession({testText: text});
```

```js
var testText = this.app.getSessionValue('testText');
var sessionModel = this.app.getSessionModel();
```


## Tests

To run the tests, run `npm test` from the command-line.
