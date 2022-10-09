# MovieRama

## Description

MovieRama is a social web app addressed to movie enthusiasts of all genres!

Current user actions are

- creating an account
- see movies list
- visit user's profile
- posting your movie description and review
- rate other people's posts

The app follows the MVC architectural pattern and is written in Node.js, utilising Expess framework,
for the server implementation, the session handling and the views rendering.

## How to run the app

One can run the test instance of the app by visiting https://movierama-mvc-application.herokuapp.com .
To run the app locally

- clone the repository
- run npm install
- provide your DATABASE_URL environmental variable in .env file, the value could be a remote or local DB
- open index page with your browser eg http://localhost:3000

## Things to improve

Future enhancements are

- unit testing
- JWT user authentication
- integration of documentation generation
- better UI error logging
- search bar
- pagination
