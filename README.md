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

`GET /users/{id}`

Gets one user.

Requested body should include the following fields:
	--user id

`PUT /user/{id}/edit`

Updates the user municipality and barrio properties. 

Requested body should include the following fields:
	-- municipality
	-- barrio 

`PUT /user/{id}/editsafety`

Updates the user safety. It takes a boolean value to indicate safety.

Requested body should include the following fields:
	-- safety

`DELETE /user/{id} --`

Deletes the user.

Request body should include the following fields: 
	-- id

`GET /resources`

Gets list of all resources.

Request body should include the following fields:
	--none

`Get /resources/{id}`

Gets one specific resource.

Request body should include the following fields:
	-- id

`POST/resources/new`

Creates a new resource.

Requested body should include the following fields:
	-- type
	-- description

`PUT /resources/{id}/update`

Updates the resource description,

Requested body should include the following fields:
	-- id

`DELETE /resources/{id}`

Deletes resource by id.

Requested body should include the following fields:
	--id

### Models

In this API we have two models, the User and the Resource. The resources created by the user are attached to it, by referencing the Resource model in the User model. 

-- User 
	```{
		  username: String,
		  password: String,
		  name: String,
		  municipality: String,
		  barrio: String,
		  safety: Boolean
		  resources: [{
		type: mongoose.Schema.Types.ObjectId,
		ref: 'Resources'
	}]
		}```
-- Resources 
	``` {
		  type: String,
		  description: String
		}```













