"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const book_1 = require("../book");
const store = new book_1.bookStore();
describe('book model for the library database', () => {
    it('should have a getAll method', () => {
        expect(store.getAllBooks).toBeDefined();
    });
});
