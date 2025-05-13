# NodeMesh
Implemetation of a Social Networking Website

### Task List
- [X] Create Project Structure
- [X] Implement Authentication
- [X] Implement Get all Users
- [X] Implement Friends
- [X] Find Immediate Friends
- [X] Find Mutual Friends
- [X] Make Relationship Graph
- [X] Add Redis 
  - [X] Jaccard Coefficient from all Users
  - [X] Shortest Path from all Users
  - [X] Store Friends 
- [X] Recommend Friends
- [X] Implement Posts
- [X] Display Public Posts
- [X] Display Friend Posts
- [X] Display Posts of Friend of Friends
- [X] Implement Image Upload
- [X] Implement Get Single Post
- [X] Implement Likes on Posts
- [X] Implement Comments on Posts
- [X] Implement User Profiles

### Databases
- Mysql
  - Database dump in ./static/documentation
- Redis
  
### Environment Variables
- PORT - Server Port
- SALT_ROUNDS - Bcrypt
- DB_HOST - Mysql Host
- DB_USER - Mysql user
- DB_PASSWORD - Mysql password
- DB_NAME - Mysql Database name
- DB_PORT - Mysql port
- SIGN_SECRET - JWT Sign Secret
- EXPIRY - Redis Cache Expiry
- FILE_PATH - Multer File Uploads

### Folder Structure
```js
├── README.md
├── .env 
├── .gitignore
├── config
│   └── db.js // Connect to MYSQL Database
├── controllers 
│   ├── friends_controller.js // /friends Controllers 
│   ├── graphs_controller.js // /graphs Controllers
│   ├── index_controller.js // / Controllers
│   ├── posts_controller.js // /posts Controllers
│   └── users_controller.js // /users Controllers
├── middleware
│   ├── graph_middlewares.js // Middleware to Load Graph for friends and extended_friends
│   ├── middleware_utils.js // Graph Middleware Utils
│   └── upload_middleware.js // Multer
├── models
│   ├── friend.js // Friend Model
│   ├── graph.js // Graph Model
│   ├── post.js // Post Model
│   └── user.js // User Model
├── package-lock.json
├── package.json
├── routes
│   ├── friends.js // /friends
│   ├── graphs.js // /graphs
│   ├── index.js // /
│   ├── posts.js // /posts
│   └── users.js // /users
├── server.js // Main App Entry Point
├── static
│   ├── documentation
│   │   ├── NodeMesh.md
│   │   ├── NodeMesh.postman_collection.json
│   │   ├── NodeMesh_dev_data_dump_2022-02-12_222010.sql
│   │   └── NodeMesh_dev_db_struct_2022-02-12_221900.sql
│   └── uploads
│       └── 1udo61a7du80ab8f3l9pxysilicate-structures.jpg
└── utils 
    ├── DataStructures.js // Graph,PriorityQueue
    ├── get_friendship_data.js // Helpers for friends SQL
    ├── graph_utils.js // Build Graph Utils
    ├── redis_utils.js // Redis Setup and Helpers
    ├── uid.js // Generate Unique ID
    ├── validate.js // Get Unique Username
    ├── validate_username.js // Login Helper
    └── verify_token.js // JWT Helper
```

# Project: NodeMesh
### Implementation of a Social Networking Website with RDBMS and caching

## End-point: create_user
##### Create a new User
### Method: POST
>```
>localhost:8000/users/signUp
>```
### Body (**raw**)

```json
{
    "username":"name12",
    "email":"name12@gmail.com",
    "password":"12"
}
```

### Response: 200
```json
{
    "success": true,
    "error": null,
    "results": "Account Created"
}
```


⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃

## End-point: login_user
##### Login User
### Method: POST
>```
>localhost:8000/users/login
>```
### Body (**raw**)

```json
{
    "username":"name7",
    "password":"7"
}
```

### Response: 200
```json
{
    "success": true,
    "error": null,
    "results": {
        "username": "name7",
        "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6Im5hbWU3IiwiaWF0IjoxNjQ0NjgwNDI3LCJleHAiOjE2NDQ3NjY4Mjd9.9CWbZnqlUY4omKgl2gLHlM5vOJ8PPfPdUOeCeCsA5HM"
    }
}
```


⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃

## End-point: get_user_details
##### Get User Details
### Method: GET
>```
>localhost:8000/users/getUser/name2
>```
### Headers

| Content-Type | Value                                                                                                                                                     |
| ------------ | --------------------------------------------------------------------------------------------------------------------------------------------------------- |
| access_token | eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6Im5hbWU3IiwiaWF0IjoxNjQ2NzM5OTM0LCJleHAiOjE2NDY4MjYzMzR9.LaitqwKImOzGbmML_ShT09Ogapje5r6NAUOXarOD4ns |


### Response: 200
```json
{
    "success": true,
    "error": null,
    "results": {
        "username": "name2",
        "email": "name2@gmail.com",
        "create_time": "2022-02-03T12:01:16.000Z"
    }
}
```


⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃

## End-point: get_all_users
##### Get all Users
### Method: GET
>```
>localhost:8000/users/getAllUsers
>```
### Response: 200
```json
{
    "success": true,
    "error": null,
    "results": [
        {
            "username": "name1"
        },
        {
            "username": "name10"
        },
        {
            "username": "name11"
        },
        {
            "username": "name2"
        },
        {
            "username": "name3"
        },
        {
            "username": "name4"
        },
        {
            "username": "name5"
        },
        {
            "username": "name6"
        },
        {
            "username": "name7"
        },
        {
            "username": "name8"
        },
        {
            "username": "name9"
        }
    ]
}
```


⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃

## End-point: send_friend_request
##### Send a Friend Request
### Method: POST
>```
>localhost:8000/friends/sendRequest
>```
### Headers

| Content-Type | Value                                                                                                                                                     |
| ------------ | --------------------------------------------------------------------------------------------------------------------------------------------------------- |
| access_token | eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6Im5hbWU3IiwiaWF0IjoxNjQ2NzM5OTM0LCJleHAiOjE2NDY4MjYzMzR9.LaitqwKImOzGbmML_ShT09Ogapje5r6NAUOXarOD4ns |


### Body (**raw**)

```json
{
    "to_user":"name12"
}
```

### Response: 200
```json
{
    "success": true,
    "error": null,
    "results": "FriendRequest Sent"
}
```


⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃

## End-point: Accept Request
##### Accept a Friend Request
### Method: POST
>```
>localhost:8000/friends/acceptRequest
>```
### Headers

| Content-Type | Value                                                                                                                                                     |
| ------------ | --------------------------------------------------------------------------------------------------------------------------------------------------------- |
| access_token | eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6Im5hbWU3IiwiaWF0IjoxNjQ2NzM5OTM0LCJleHAiOjE2NDY4MjYzMzR9.LaitqwKImOzGbmML_ShT09Ogapje5r6NAUOXarOD4ns |


### Body (**raw**)

```json
{
    "request_id":"2tgqfyx2h3d0h4vjc5k18s"
}
```

### Response: 200
```json
{
    "success": true,
    "error": null,
    "results": {
        "fieldCount": 0,
        "affectedRows": 0,
        "insertId": 0,
        "serverStatus": 2,
        "warningCount": 0,
        "message": "",
        "protocol41": true,
        "changedRows": 0
    }
}
```


⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃

## End-point: Get all friends
##### SQL Get all friends of username
### Method: POST
>```
>localhost:8000/friends/getAllFriends
>```
### Headers

| Content-Type | Value                                                                                                                                                     |
| ------------ | --------------------------------------------------------------------------------------------------------------------------------------------------------- |
| access_token | eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6Im5hbWU3IiwiaWF0IjoxNjQ2NzM5OTM0LCJleHAiOjE2NDY4MjYzMzR9.LaitqwKImOzGbmML_ShT09Ogapje5r6NAUOXarOD4ns |


### Body (**raw**)

```json
{}
```

### Response: 200
```json
{
    "success": true,
    "error": null,
    "results": [
        {
            "username": "name3",
            "email": "name3@gmail.com",
            "create_time": "2022-02-03T12:01:29.000Z"
        },
        {
            "username": "name6",
            "email": "name6@gmail.com",
            "create_time": "2022-02-03T19:02:04.000Z"
        },
        {
            "username": "name8",
            "email": "name8@gmail.com",
            "create_time": "2022-02-04T08:39:01.000Z"
        },
        {
            "username": "name9",
            "email": "name9@gmail.com",
            "create_time": "2022-02-04T08:39:09.000Z"
        }
    ]
}
```


⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃

## End-point: mutual friends
##### SQL get mutual friends with username
### Method: POST
>```
>localhost:8000/friends/getMutualFriends
>```
### Headers

| Content-Type | Value                                                                                                                                                     |
| ------------ | --------------------------------------------------------------------------------------------------------------------------------------------------------- |
| access_token | eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6Im5hbWU3IiwiaWF0IjoxNjQ2NzM5OTM0LCJleHAiOjE2NDY4MjYzMzR9.LaitqwKImOzGbmML_ShT09Ogapje5r6NAUOXarOD4ns |


### Body (**raw**)

```json
{
    "with_username":"name1"
}
```

### Response: 200
```json
{
    "success": true,
    "error": null,
    "results": [
        {
            "username": "name3"
        }
    ]
}
```


⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃

## End-point: getFriends
##### Graphs get all friends of username
### Method: GET
>```
>localhost:8000/graphs/getFriends
>```
### Headers

| Content-Type | Value                                                                                                                                                     |
| ------------ | --------------------------------------------------------------------------------------------------------------------------------------------------------- |
| access_token | eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6Im5hbWU3IiwiaWF0IjoxNjQ2NzM5OTM0LCJleHAiOjE2NDY4MjYzMzR9.LaitqwKImOzGbmML_ShT09Ogapje5r6NAUOXarOD4ns |


### Response: 200
```json
{
    "success": true,
    "error": null,
    "results": {
        "friends": [
            "name3",
            "name6",
            "name8",
            "name9"
        ]
    }
}
```


⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃

## End-point: getExtendedFriends
##### Graphs Get all Extended friends within 2 <= friend_distance < 5
### Method: GET
>```
>localhost:8000/graphs/getExtendedFriends
>```
### Headers

| Content-Type | Value                                                                                                                                                     |
| ------------ | --------------------------------------------------------------------------------------------------------------------------------------------------------- |
| access_token | eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6Im5hbWU3IiwiaWF0IjoxNjQ2NzM5OTM0LCJleHAiOjE2NDY4MjYzMzR9.LaitqwKImOzGbmML_ShT09Ogapje5r6NAUOXarOD4ns |


### Response: 200
```json
{
    "success": true,
    "error": null,
    "results": {
        "extended_friends": [
            "name1",
            "name10",
            "name2",
            "name4",
            "name5"
        ]
    }
}
```


⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃

## End-point: createPost
##### Create a post with image upload
### Method: POST
>```
>localhost:8000/posts/createPost
>```
### Headers

| Content-Type | Value                                                                                                                                                     |
| ------------ | --------------------------------------------------------------------------------------------------------------------------------------------------------- |
| access_token | eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6Im5hbWU3IiwiaWF0IjoxNjQ2NzM5OTM0LCJleHAiOjE2NDY4MjYzMzR9.LaitqwKImOzGbmML_ShT09Ogapje5r6NAUOXarOD4ns |


### Body formdata

| Param      | value                             | Type |
| ---------- | --------------------------------- | ---- |
| visibility | 2                                 | text |
| img_src    | 5i9TjHK0S/silicate-structures.jpg | file |
| content    | This is a new post                | text |


### Response: 200
```json
{
    "success": true,
    "error": null
}
```


⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃

## End-point: getAllPublicPosts
##### Get all public Posts
### Method: GET
>```
>localhost:8000/posts/getAllPublicPosts
>```
### Headers

| Content-Type | Value                                                                                                                                                     |
| ------------ | --------------------------------------------------------------------------------------------------------------------------------------------------------- |
| access_token | eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6Im5hbWUxIiwiaWF0IjoxNjQ0NjY2NzQyLCJleHAiOjE2NDQ3NTMxNDJ9.yVAfzNysgpiuriVa-UurvLB9Bt2teapQBT3uBlawUFE |


### Response: 200
```json
{
    "success": true,
    "error": null,
    "results": [
        {
            "post_id": "1ueti9ar8q20f6r7ymm7izv",
            "content": "This is an image upload by name7",
            "visibility": "0",
            "username": "name7",
            "create_time": "2022-02-12T15:44:39.000Z",
            "img_src": "static/uploads/1udo61a7du80ab8f3l9pxysilicate-structures.jpg"
        },
        {
            "post_id": "2eufvri9hwa0c8d9au5cjtv",
            "content": "This is an image upload",
            "visibility": "0",
            "username": "name1",
            "create_time": "2022-02-12T15:12:07.000Z",
            "img_src": "static/uploads/2dd7z8vrymk0x3blp4l55bgsilicate-structures.jpg"
        },
        {
            "post_id": "2k6xgkf2pa30pe63evdk8us",
            "content": "This is an image upload by name7",
            "visibility": "0",
            "username": "name7",
            "create_time": "2022-02-12T15:20:35.000Z",
            "img_src": "static/uploads/2j74fi00qtw0xj9vj1fpx3gsilicate-structures.jpg"
        },
        {
            "post_id": "3jwu5u5beje0kxbdowuespj",
            "content": "This is an image upload by name7",
            "visibility": "0",
            "username": "name1",
            "create_time": "2022-02-12T15:15:17.000Z",
            "img_src": "static/uploads/3jv7z1xnb070qq5438p066silicate-structures.jpg"
        },
        {
            "post_id": "45rg7l2p5t806rtlh5u2qkr",
            "content": "This is an image upload by name7",
            "visibility": "0",
            "username": "name7",
            "create_time": "2022-02-12T15:15:45.000Z",
            "img_src": "static/uploads/45q74ijjrob0zb86r44myysilicate-structures.jpg"
        },
        {
            "post_id": "elevzp4uf1d0wkd7kcylxym",
            "content": "This is name1 first post",
            "visibility": "0",
            "username": "name1",
            "create_time": "2022-02-12T11:59:21.000Z",
            "img_src": null
        }
    ]
}
```


⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃

## End-point: getAllFriendsPosts
##### Graphs Get all posts of Friends
### Method: GET
>```
>localhost:8000/posts/getAllFriendsPosts
>```
### Headers

| Content-Type | Value                                                                                                                                                     |
| ------------ | --------------------------------------------------------------------------------------------------------------------------------------------------------- |
| access_token | eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6Im5hbWU3IiwiaWF0IjoxNjQ0Njc4ODMzLCJleHAiOjE2NDQ3NjUyMzN9.Z29Qi-w6fGzNAFI-LHAR7pYsnsil7CcWzYpdkCqULFg |


### Response: 200
```json
{
    "success": true,
    "error": null,
    "results": []
}
```


⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃

## End-point: getAllExtendedFriendsPosts
##### Graphs Get all friends posts
### Method: GET
>```
>localhost:8000/posts/getAllExtendedFriendsPosts
>```
### Headers

| Content-Type | Value                                                                                                                                                     |
| ------------ | --------------------------------------------------------------------------------------------------------------------------------------------------------- |
| access_token | eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6Im5hbWU3IiwiaWF0IjoxNjQ0Njc4ODMzLCJleHAiOjE2NDQ3NjUyMzN9.Z29Qi-w6fGzNAFI-LHAR7pYsnsil7CcWzYpdkCqULFg |


### Response: 200
```json
{
    "success": true,
    "error": null,
    "results": [
        {
            "post_id": "1r09inox2xp0vk6l97rp1oo",
            "content": "This is name1 third post visibile to friends_of_friends",
            "visibility": "2",
            "username": "name1",
            "create_time": "2022-02-12T12:00:24.000Z",
            "img_src": null
        }
    ]
}
```


⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃

## End-point: getImage
##### Get Image from static
### Method: GET
>```
>localhost:8000/static/uploads/2j74fi00qtw0xj9vj1fpx3gsilicate-structures.jpg
>```

⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃

## End-point: getRecommendations
### Method: GET
>```
>localhost:8000/graphs/getRecommendations
>```
### Headers

| Content-Type | Value                                                                                                                                                     |
| ------------ | --------------------------------------------------------------------------------------------------------------------------------------------------------- |
| access_token | eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6Im5hbWU3IiwiaWF0IjoxNjQ2NzM5OTM0LCJleHAiOjE2NDY4MjYzMzR9.LaitqwKImOzGbmML_ShT09Ogapje5r6NAUOXarOD4ns |


### Response: 200
```json
{
    "success": true,
    "error": null,
    "results": {
        "friend_recommendations": [
            {
                "friend": "name4",
                "probability": 0.5
            },
            {
                "friend": "name10",
                "probability": 0.25
            },
            {
                "friend": "name6",
                "probability": 0.25
            },
            {
                "friend": "name2",
                "probability": 0.2
            },
            {
                "friend": "name8",
                "probability": 0.2
            },
            {
                "friend": "name9",
                "probability": 0.17
            },
            {
                "friend": "name1",
                "probability": 0.14
            },
            {
                "friend": "name3",
                "probability": 0.14
            },
            {
                "friend": "name11",
                "probability": 0
            },
            {
                "friend": "name5",
                "probability": 0
            },
            {
                "friend": "name7",
                "probability": 0
            }
        ]
    }
}
```


⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃

## End-point: getSinglePublicPost
### Method: GET
>```
>localhost:8000/posts/getSinglePublicPost
>```
### Headers

| Content-Type | Value                                                                                                                                                     |
| ------------ | --------------------------------------------------------------------------------------------------------------------------------------------------------- |
| access_token | eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6Im5hbWU3IiwiaWF0IjoxNjQ2NzM5OTM0LCJleHAiOjE2NDY4MjYzMzR9.LaitqwKImOzGbmML_ShT09Ogapje5r6NAUOXarOD4ns |


### Body (**raw**)

```json
{
    "post_id": "1ueti9ar8q20f6r7ymm7izv"
}
```

### Response: 200
```json
{
    "success": true,
    "error": null,
    "results": {
        "post_id": "1ueti9ar8q20f6r7ymm7izv",
        "content": "This is an image upload by name7",
        "visibility": "0",
        "username": "name7",
        "create_time": "2022-02-12T15:44:39.000Z",
        "img_src": "static/uploads/1udo61a7du80ab8f3l9pxysilicate-structures.jpg"
    }
}
```


⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃

## End-point: getSingleFriendsPost
### Method: GET
>```
>localhost:8000/posts/getSingleFriendsPost
>```
### Headers

| Content-Type | Value                                                                                                                                                     |
| ------------ | --------------------------------------------------------------------------------------------------------------------------------------------------------- |
| access_token | eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6Im5hbWU3IiwiaWF0IjoxNjQ2NzMzNTgyLCJleHAiOjE2NDY4MTk5ODJ9.yTvii8BRjyP69-Tef-sa4qa-UMG7bYzDly6JwomeiME |


### Body (**raw**)

```json
{
    "post_id":"1ahgdicyy9d0bxkdswbonv4"
}
```

### Response: 200
```json
{
    "success": true,
    "error": null,
    "results": [
        {
            "post_id": "1ahgdicyy9d0bxkdswbonv4",
            "content": "This is name1 second post only visibile to friends",
            "visibility": "1",
            "username": "name1",
            "create_time": "2022-02-12T12:00:02.000Z",
            "img_src": null
        }
    ]
}
```


⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃

## End-point: getSingleExtendedFriendsPost
### Method: GET
>```
>localhost:8000/posts/getSingleExtendedFriendsPost
>```
### Headers

| Content-Type | Value                                                                                                                                                     |
| ------------ | --------------------------------------------------------------------------------------------------------------------------------------------------------- |
| access_token | eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6Im5hbWU3IiwiaWF0IjoxNjQ2NzMzNTgyLCJleHAiOjE2NDY4MTk5ODJ9.yTvii8BRjyP69-Tef-sa4qa-UMG7bYzDly6JwomeiME |


### Body (**raw**)

```json
{
    "post_id":"elevzp4uf1d0wkd7kcylxym"
}
```

### Response: 200
```json
{
    "success": true,
    "error": null,
    "results": [
        {
            "post_id": "elevzp4uf1d0wkd7kcylxym",
            "content": "This is name1 first post",
            "visibility": "2",
            "username": "name5",
            "create_time": "2022-02-12T11:59:21.000Z",
            "img_src": null
        }
    ]
}
```
