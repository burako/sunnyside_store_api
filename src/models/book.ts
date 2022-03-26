import client from "../database";

export type Book = {
    id: number;
    title: string;
    total_pages: number;
    author: string;
    type: string;
    summary: string;
}

export class bookStore {
    async getAllBooks() : Promise<Book[]> {
        try {
            const conn = await client.connect();
            const sql = 'SELECT * FROM books';
            const result = await conn.query(sql);
            conn.release;
            return result.rows;
        } catch (error) {
            throw new Error(`Can not get all books: ${error}`);
        }
        
    }

    async show(id: string): Promise<Book> {
        try {
        const sql = 'SELECT * FROM books WHERE id=($1)';
        const conn = await client.connect();
        const result = await conn.query(sql, [id]);
        conn.release();
        return result.rows[0];
        } catch (err) {
            throw new Error(`Could not find book ${id}. Error: ${err}`);
        }
      }

    async addNewBook(book: Book) : Promise<Book> {
        try {
            const conn = await client.connect();
            const sql = `INSERT INTO books (title, total_pages, author, type, summary) VALUES (${book.title}, ${book.total_pages}, ${book.author}, ${book.type}, ${book.summary})`;
            const result = await conn.query(sql);
            conn.release;
            return result.rows[0];
        } catch (error) {
            throw new Error(`Can not add a new book: ${error}`);
        }
    }
}