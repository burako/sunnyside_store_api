import { Book, bookStore } from "../book";

const store = new bookStore();

describe('book model for the library database', () => {
    it('should have a getAll method', () => {
        expect(store.getAllBooks).toBeDefined();
    });
});