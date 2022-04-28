import client from "../database";

export class dashboardQueries {
    
    async findUsersWithOrders() : Promise<{name:string, id:string}[]> {
        try {
            const conn = await client.connect();
            const sql = 'SELECT DISTINCT users.id, username FROM users INNER JOIN orders ON users.id = orders.user_id';
            const result = await conn.query(sql);
            conn.release;
            return result.rows;
        } catch (error) {
            throw new Error(`Can not get all users: ${error}`);
        }
    }
}