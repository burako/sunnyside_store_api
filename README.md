# Storefront Backend Project

## Instructions for running the project

### Port numbers
    db:     5432
    server: 3000

### Create a postgres database 
1. Install docker desktop
2. Run this command in the terminal once docker has been installed: docker run --name postgres-db -e POSTGRES_PASSWORD=docker -p 5432:5432 -d postgres
3. Docker container running postgres server with the following information
        Host: localhost
        Port: 5432
        User: postgres
        Password: docker
4. Connect to postgres and create databases in the terminal with the following commands:
        su postgres
        psql postgres
        create database library;
        create database library_test;

### Install packages and dependencies
    Run 'npm install' in the terminal

### Start the server 
    The server runs on port 3000.
    Run 'npm run start' to start the server

4. Run jasmine tests with > npm run test
    4.1. Note on jasmine tests: I have had an issue with jasmine when running multiple spec files. There are 3 specs under models folder, per each model. When run individually (by commenting out the contents of other files) every test in each spec files pass. But when I run them all, I receive a timeout error. I raised this issue here: https://knowledge.udacity.com/questions/841229 but unfortunately mentors were not able to resolve the issue neither.

### content of .env
.env

    pgHost=localhost
    pgDatabase=library
    pgDatabaseTest=library_test
    pgUser=postgres
    pgPassword=docker
    ENV=dev
    bycrypt_password=agack4k4n
    salt_rounds=10
    jwtSecret= kawabanga