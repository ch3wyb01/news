# News API

## Project Summary
- An API to retrieve, post, update and delete news-related data such as articles and comments from a PSQL database using node-postgres.
- link to hosted version : https://becca-news.herokuapp.com/api

## Instructions

## Step 1 - initial set-up
Clone this repo by using this command `git clone https://github.com/ch3wyb01/be-nc-news.git` in your terminal.
Use the command `npm i` to install all dependencies.

## Step 2 - connecting to the correct database
Create a `.env.test` file and add `PGDATABASE=nc_news_test`
Create a `.env.development` file and add `PGDATABASE=nc_news`
These files will ensure you are connected to the correct database depending on the environment.

## Step 3 - seeding the databases
To seed the local database, first run the command `npm run setup-dbs` to create the database and `npm run seed` to populate it with the development data.

The test database will be seeded upon running the test file with the command `npm t`
