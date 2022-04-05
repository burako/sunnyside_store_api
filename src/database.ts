import dotenv from 'dotenv';
import { Pool } from 'pg';

dotenv.config;

const {
    pgHost,
    pgDatabase,
    pgDatabaseTest,
    pgUser,
    pgPassword,
    ENV
} = process.env

let client: Pool = new Pool();
console.log(ENV);

if (ENV === 'dev') {
    client = new Pool ({
        host: pgHost,
        database: pgDatabase,
        user: pgUser,
        password: pgPassword,
        port: 5432
    });
} else {
    client = new Pool ({
        host: pgHost,
        database: pgDatabaseTest,
        user: pgUser,
        password: pgPassword,
        port: 5432
    });
}

export default client