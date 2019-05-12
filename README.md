README.md

#Yucaju-App

## API Doc

This API Doc includes all the resources that make up the official Yucaju App REST API

#### Current Version:

By default, all requests to https://"------"/api/v1/Yucaju receive the v1 version of the REST API. 

All API access is over HTTPS. All data is sent and received as JSON.


#### Routes:

`POST /auth/register`

Creates the user registration session.

Requested body should include the following fields:
	-- username
	-- password
	-- name
	-- municipality
	-- barrio

`POST /auth/login`

Creates the registered user session.

Requested body should include the following fields:
	-- username
	-- password

`GET /users`

Gets list of all users.

Requested body should include the following fields:
	--None

`GET /users/:id`

Gets one user.

Requested body should include the following fields:
	--user id

`PUT /user/:id/edit`

Updates the user municipality and barrio properties. 

Requested body should include the following fields:
	-- municipality
	-- barrio 

`PUT /user/:id/editsafety`

Updates the user safety. It takes a boolean value to indicate safety.

Requested body should include the following fields:
	-- safety

`DELETE /user/:id --`

Deletes the user.

Request body should include the following fields: 
	-- user ID

`GET /weather-alerts --`

Gets weather alerts by location based on town location through 3rd party API. 
 Request body should include the following fields:
	-- zipcode 


### Models

-- User Model
	```{
		  username: String,
		  password: String,
		  name: String,
		  municipality: String,
		  barrio: String,
		  safety: Boolean
		}```
		













