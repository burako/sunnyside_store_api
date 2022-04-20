import client from "../database";
import bycrypt from "bcrypt";

const {bycript_password, salt_rounds} = process.env;
const pepper = bycript_password;
const saltRounds = salt_rounds; 

export type User = {
    id?: number;
    username: string;
    password_digest: string;
}

export class userClass {
    async create(user: User) : Promise<User> {
        try {
            const conn = await client.connect();
            const sql = 'INSERT INTO users (username, password_digest) VALUES($1, $2) RETURNING *';
            const hash = bycrypt.hashSync(user.password_digest + pepper, parseInt(saltRounds as string));

            const result = await conn.query(sql, [user.username, hash]);
            const userItem = result.rows[0];
            conn.release;
            return userItem;
        } catch (error) {
            throw new Error(`Can not create a new user: ${error}`);
        }
    }

    async authenticate (username: string, password: string) : Promise<User | null> {
        try {
            const conn = await client.connect();
            const sql = 'SELECT * FROM users WHERE username=($1)';
            const result = await conn.query(sql, [username]);
            if (result.rows.length) {
                const user = result.rows[0];
                if (bycrypt.compareSync(password + pepper, user.password_digest)) {
                    conn.release;
                    return user;
                }
            }

            return null;

        } catch (err) {
            throw new Error(`Could not find user ${username}. Error: ${err}`);
        }
    }
}