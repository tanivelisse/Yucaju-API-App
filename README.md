README.md

## API

This describes the resources that make up the official Yucaju App REST API

#### Current Version:

By default, all requests to https://"------"/api/v1/Yucaju receive the v1 version of the REST API. 

All API access is over HTTPS. All data is sent and received as JSON.


#### Routes:

`POST /auth/register -- `

Creates the user session with user town and barrio location.

Request body should include the following fields:
	-- username
	-- password
	-- name
	-- town
	-- location(town/barrio)

`GET /resources -- `

Gets resources for user.

Request body should include the following fields:
	-- location {town/city}{barrio}
	-- type
	-- description
	-- directions


`GET /weather-alerts --`

Gets weather alerts by location based on town location through 3rd party API. 
 Request body should include the following fields:
	-- location{town/city}

`POST /resource --`

Creates the resource.

Request body should include the following fields:
	-- location{town/city}{barrio}
	-- description
	-- type
	-- directions

`PUT /resource --`

Updates the resource.

Request body should include the following fields:
	-- description
	-- type
	-- directions

`DELETE /resource --`

Deletes the resource.

Request body should include the following fields: 
	-- None

### Models

-- User Model
	- username
	- password
	- name
	- location
		- town/city
		- barrio
-- Resource Model
	- type
	- description
	- directions
	- location
		- town/city
		- barrio












