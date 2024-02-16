# twitter-app

`twitter-app` is a simple twitter-like application written using [JavaScript](https://developer.mozilla.org/en-US/docs/Web/JavaScript) on both backend (with [Express.js](https://expressjs.com/)) and frontend (with [Vue.js](https://vuejs.org/)).

## Features

- registering new and logging in to an exsiting account
- editing profile data (profile picture, name and surname, description)
- searching other users by username and seeing their posts, likes, followings and followers
- following and unfollowing users
- adding posts:
  - as the beginning of new thread
  - as the comment to a post
  - quoting a post (also begins new thread)
- liking posts
- editing own posts (with the ability for everyone to see original content after edition)
- deleting own posts
- browsing all or only following's posts
- real-time notifications about new posts or comments in the currently browsed thread

## Running app

In order to run this app, you ought to have installed [Docker](https://www.docker.com/) (and [Docker Compose](https://docs.docker.com/compose/)). You also need to prepare `.env` file inside [`server`](./server) directory according to `.env.example` and provide valid SSL/TLS certificate and key in [this](./server/src/certificate) directory.
You can start the app with the following command:

```
$ docker compose up
```

It will start [`MongoDB`](https://www.mongodb.com/) database and `server` application in separate containers. The frontend app will be available at `https://localhost:8080` and the REST API at `https://localhost:8080/api`.
