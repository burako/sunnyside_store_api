"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
const pg_1 = require("pg");
dotenv_1.default.config();
const { pgHost, pgDatabase, pgDatabaseTest, pgUser, pgPassword, ENV } = process.env;
let client = new pg_1.Pool();
console.log(ENV);
console.log(pgPassword, pgUser);
if (ENV === 'dev') {
    client = new pg_1.Pool({
        host: pgHost,
        database: pgDatabase,
        user: pgUser,
        password: pgPassword,
        port: 5432
    });
}
else {
    client = new pg_1.Pool({
        host: pgHost,
        database: pgDatabaseTest,
        user: pgUser,
        password: pgPassword,
        port: 5432
    });
}
exports.default = client;
