# Authorization Code Flow
OAuth 2 is really dumb and annoying; especially when considering the need to do go through an Authorization Code Flow.

This document serves *mostly* as a point of reference for me, but may be of some use to others.

## What is Authorization Code Flow?
Authorization Code Flow is a 5 step process:

1. Our application reaches out to the Authorization Server using a Client ID and a Client Secret
2. The Auth. Server prompts the user to log into their account with that service (in this instance, that's Spotify, but could reasonably be anything). 
3. The user then indicates to the server, depending on the level of information that we're asking for (Or the *scope* of the Authorization), if they're happy to log in or not.
4. If they're happy, the Authorization Server provides us with an Authorization Code that we can then use to make calls to the resource on behalf of the user.
5. The Authorization Server redirects the user back to the application via a configured Callback URI.

## Spotify Authorisation Code Flow
https://developer.spotify.com/documentation/general/guides/authorization-guide/#authorization-code-flow

Spotify use this flow when we're only interested in having the user log in once, or when there's a good chance we'll be running the application for a long time, in this case, it's both.

The key difference here, is that Spotify return both an Access Token, and a Refresh Token.

### Spotify Access Token
The Access Token returned by Spotify is what enables us to make API calls on behalf of the user. The deliberately expire after 'a short time', likely for security reasons. 

### Refresh Token
The Refresh Token is a token that's sent to a specific Spotify endpoint asking for a new Access Token.

## So how the heck do we implement this?
Basically, we have to repeat the steps, but we get to *obfuscate* a little through the use of PassportJS, which enables us to skip some steps.

Here's the steps we'll undertake:

1. Frontend App passes a request to the backend via the /api reroute in webpack
2. Backend server will use Passport to initialize a connection to Spotify and provide the Client ID, Secret Key, and Scope of access that's request.
3. Spotify, after the user accepts or rejects, hands the request back to the Backend server via the Callback URI
    - This response includes the Access Token and Refresh Token that we're looking for. 
4. We'll put the Access Token and Refresh Token in the DB alongside that user (That's our *stampPassport* function).
5. Whenever we need to ask Spotify for something on behalf of the user, we'll do the following:
    1. Ask Spotify for our information using the stored Access Token associated to the user.
    2. If Spotify can't give us the information because the Access Token is expired, we'll use the refresh token to ask for a new Access Token, and then re-stamp the user in the db before making our query again. 


## Links:
https://www.codeproject.com/Articles/1171546/OAuth-Authorization-flows-explained-with-examples
https://developer.spotify.com/documentation/general/guides/authorization-guide/