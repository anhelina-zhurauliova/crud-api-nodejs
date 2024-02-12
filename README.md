# CRUD api

App that creates REST api and uses in-memory database.

## App installation

```
npm i
```

## App start

To run app in the

- development mode

```
npm run start:dev
```

- production mode

```
npm run start:build
```

- with clusters

```
npm run start:multi
```

## App description

There are 2 available routes:

- `api/users`
  - GET - return list if all users, status code `200`
  - POST - adds user to the list, status code `201`
- `api/users/${userId}`
  - GET - returns user by id, status code `200`
  - PUT - updated user by id, status code `200`
  - DELETE - deletes user by id, status code `204`

NOTES:

- userId should be in the uuid format. you will see `400` status code if format is wrong
- if user is not found you will see `404` status code in the response
- you will see `500` status code if there was a server-side error
- you will see `405` status code if you're trying to access method that isn't allowed for the route
- POST and PUT expect request body to include

```
id — unique identifier (string, uuid) generated on server side
username — user's name (string, required)
age — user's age (number, required)
hobbies — user's hobbies (array of strings or empty array, required)
```

other fields will be ignored, you will see the validation error if one of the expected fields will be in the wrong format
