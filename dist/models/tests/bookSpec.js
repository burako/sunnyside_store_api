"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const book_1 = require("../book");
const store = new book_1.bookStore();
describe('book model for the library database', () => {
    it('should have a getAll method', () => {
        expect(store.getAllBooks).toBeDefined();
    });
    it('create method should add a book', async () => {
        const result = await store.addNewBook({
            title: 'Bridge to Terabithia',
            total_pages: 250,
            author: 'Katherine Paterson',
            type: 'Childrens',
            summary: 'Adventures of a young kid'
        });
        expect(result).toEqual({
            id: 1,
            title: 'Bridge to Terabithia',
            total_pages: 250,
            author: 'Katherine Paterson',
            type: 'Childrens',
            summary: 'Adventures of a young kid'
        });
    });
});
