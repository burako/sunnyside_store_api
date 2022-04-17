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

export class user {
    async create(user: User) : Promise<User> {
        try {
            const conn = await client.connect();
            const sql = 'INSERT INTO users (username, password_digest) VALUES($1, $2) RETURNING *';
            const hash = bycrypt.hashSync(user.password_digest + pepper, parseInt(saltRounds as string));

            const result = await conn.query(sql, [user.username, user.password_digest]);
            const userItem = result.rows[0]
            conn.release;
            return userItem;
        } catch (error) {
            throw new Error(`Can not create a new user: ${error}`);
        }
    }
}