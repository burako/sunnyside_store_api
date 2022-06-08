# Storefront Backend API on node, express and postgres

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

### Run jasmine tests 
    run 'npm run test'
