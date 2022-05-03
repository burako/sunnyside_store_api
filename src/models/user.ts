import client from "../database";
import bycrypt from "bcrypt";

const {bycript_password, salt_rounds} = process.env;
const pepper = bycript_password;
const saltRounds = salt_rounds; 

export type User = {
    id?: number;
    username: string;
    password_digest: string;
    first_name: string;
    last_name: string;
}

export class userClass {
    async create(user: User) : Promise<User> {
        try {
            const conn = await client.connect();
            const sql = 'INSERT INTO users (username, password_digest, first_name, last_name) VALUES($1, $2, $3, $4) RETURNING *';
            const hash = bycrypt.hashSync(user.password_digest + pepper, parseInt(saltRounds as string));

            const result = await conn.query(sql, [user.username, hash, user.first_name, user.last_name]);
            const userItem = result.rows[0];
            conn.release;
            return userItem;
        } catch (error) {
            throw new Error(`Can not create a new user: ${error}`);
        }
    }

    async destroy(id: string) : Promise<User> {
        try {
            const conn = await client.connect();
            const sql = 'DELETE FROM users WHERE id=($1) RETURNING *';
            const result = await conn.query(sql, [id]);
            const userItem = result.rows[0];
            conn.release;
            return userItem;
        } catch (error) {
            throw new Error(`Can not delete user: ${error}`);
        }
    }

    async index() : Promise<User[]> {
        try {
            const conn = await client.connect();
            const sql = 'SELECT * FROM users';
            const result = await conn.query(sql);
            conn.release;
            return result.rows;
        } catch (error) {
            throw new Error(`Can not get all users: ${error}`);
        }
    }

    async show(id: string): Promise<User> {
        try {
        const sql = 'SELECT * FROM users WHERE id=($1)';
        const conn = await client.connect();
        const result = await conn.query(sql, [id]);
        conn.release();
        return result.rows[0];
        } catch (err) {
            throw new Error(`Could not find user ${id}. Error: ${err}`);
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