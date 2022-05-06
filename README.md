# Storefront Backend Project

## Instructions for running the project

1. Create a postgres database. In the project, database info is received from .env file, which is not pushed to git. Find the contents of .env file below.
2. Start the server with > npm run start.
3. Test endpoints with postman or thunder client.
4. Run jasmine tests with > npm run test
    4.1. Note on jasmine tests: I have had an issue with jasmine when running multiple spec files. There are 3 specs under models folder, per each model. When run individually (by commenting out the contents of other files) every test in each spec files pass. But when I run them all, I receive a timeout error. I raised this issue here: https://knowledge.udacity.com/questions/841229 but unfortunately mentors were not able to resolve the issue neither.

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