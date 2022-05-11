import { productStore, Product } from "../product";


const ProductStore = new productStore();

describe("product model test for the storefront API", () => {
    it("create() should add a new product", async () => {
            const result = await ProductStore.create({
            name: "test",
            description: "test",
            price: 1,
            category: "test",
            created_at: new Date(),
            updated_at: new Date()
        });
        const testProduct = {
            name: result.name,
            description: result.description,
            price: result.price,
            category: result.category
        }
        expect(testProduct).toEqual({
            name: "test",
            description: "test",
            price: 1,
            category: "test"
        });
    });

    it("index() should return a list of all products", async () => {
        const result = await ProductStore.index();
        const testProduct = {
            name: result[0].name,
            description: result[0].description,
            price: result[0].price,
            category: result[0].category
        }
        expect(testProduct).toEqual({
            name: "test",
            description: "test",
            price: 1,
            category: "test"
        });
    });

    it("show() should return the correct product", async () => {
        const result = await ProductStore.show("1");
        const testProduct = {
            name: result.name,
            description: result.description,
            price: result.price,
            category: result.category
        }
        expect(testProduct).toEqual({
            name: "test",
            description: "test",
            price: 1,
            category: "test"
        });
    });

    it("getProductsByCategory() should return the correct products", async () => {
        const result = await ProductStore.getProductsByCategory("test");
        const testProduct = {
            category: result[0].category
        }
        expect(testProduct.category).toEqual("test");
    });

});

