# Luauth API Wrapper

## IMPORTANT!!!!!!
You need to open a ticket to get your private api key (too lazy to finish the profile page)

## Info
This project is an API Wrapper for [Luauth](https://luauth.io).


---
## Table of contents:
- [Setup Process](#Setup)
- [Functions](#Functions)
    - getApiKeyDetails
    - whitelistIdentifier
    - unwhitelistIdentifier
    - unbanIp
    - getDetails
    - getIdentifiers
    - createScript
    - updateScript
    - deleteScript
    - getLoader
---
## Setup 

```sh
npm i luauth-core
```
### Import the package
```js
const Luauth = require('luauth-core');
```

### Connect with API Key
```js
// Using Classes
const luauth = new Luauth("api_key"); // Your Luauth API Key comes here

// Using connect function
const luauth = Luauth.login("api_key"); // Your Luauth API Key comes here
```
---

# Functions

### luauth.getApiKeyDetails()
```js
luauth.getApiKeyDetails().then((res) => {
    console.log(res.data) // Will log the details about the API key in the console.
    // error status 401: invalid API key
})
```
### luauth.whitelistIdentifier(script_id, name, identifier, auth_expire) 
```js
luauth.whitelistIdentifier("YOUR SCRIPT ID", "konan", "IDENTIFIER OF USER (IPV4, IPV6, HWID)", 1662910175).then((res) => {
    console.log(res.data) // Will log the status of the action to the console. ({ "success": true, "message": "User has been whitelisted!" })
    // error status 400: { "success": false, "message": "Invalid script ID" }
})
```

### luauth.unwhitelistIdentifier(script_id, identifier)
```js
luauth.unwhitelistIdentifier("YOUR SCRIPT ID", "IDENTIFIER OF USER (IPV4, IPV6, HWID)").then((res) => {
    console.log(res.data) // Will log the status of the action to the console. (status: 200)
    // error status 400: { "success": false, "message": "Identifier not whitelisted" }
})
```

### luauth.unbanIp(script_id, identifier)
```js
luauth.unbanIp("YOUR SCRIPT ID", "IDENTIFIER OF USER (IPV4, IPV6, HWID)").then((res) => {
    console.log(res.data) // Will log the status of the action to the console. (User has been unbanned)
})
```

### luauth.getDetails(script_id, identifier)
```js
luauth.getDetails("YOUR SCRIPT ID", "IDENTIFIER OF USER (IPV4, IPV6, HWID)").then((res) => {
    console.log(res.data) // Will log details about users to the console
    // error status 400: Invalid Script ID or Identifier
})
```

### luauth.getIdentifiers(script_id)
```js
luauth.getIdentifiers("YOUR SCRIPT ID").then((res) => {
    console.log(res.data) // Will log every whitelisted user to the console
    // error status 400: Invalid Script ID
})
```

### luauth.createScript(script_name, script, logs_webhook, alerts_webhook, ffa, silent)
```js
luauth.createScript(
    "My Super Cool Script", // Enter a name you want the script to have
    "print('troll')", // Enter the actual script
    "https://discordwebhookblahblah", // Enter the webhook where you want logs to be sent to
    "https://discordwebhookblahblah", // Enter the webhook where you want alerts to be sent to
    true, // Define if free for all or not (free for all means the script is accessible for everyone and no one has to be whitelisted)
    true, // If true Luauth wont print debug messages to the console    
).then((res) => {
    console.log(res.data) // Will log the status of the action to the console.
    // error status 400: Missing parameters
    // error status 500: Something went wrong while obfuscating, syntax error?
})
```

### luauth.updateScript(script_id, script, logs_webhook, alerts_webhook, ffa, silent)
```js
luauth.updateScript(
    "YOUR SCRIPT ID" // Enter the ID Of your script her
    "print('troll')", // Enter the actual script
    "https://discordwebhookblahblah", // Enter the webhook where you want logs to be sent to
    "https://discordwebhookblahblah", // Enter the webhook where you want alerts to be sent to
    true, // Define if free for all or not (free for all means the script is accessible for everyone and no one has to be whitelisted)
    true, // If true Luauth wont print debug messages to the console    
).then((res) => {
    console.log(res.data) // Will log the status of the action to the console.
    // error status 400: Missing parameters
    // error status 500: Something went wrong while obfuscating, syntax error?
})
```

### luauth.deleteScript(script_id)
```js
luauth.deleteScript("YOUR SCRIPT ID").then((res) => {
    console.log(res.data) // Will log the status of the action to the console.
    // error status 400: Invalid Script ID
})
```

### luauth.getLoader(script_id)
```js
luauth.getLoader("YOUR SCRIPT ID").then((res) => {
    console.log(res.data) // Will log the script loader to the console.
    // error status 400: Invalid Script ID
})
```

## Authors

- [@konan](https://github.com/KKonaNN)

