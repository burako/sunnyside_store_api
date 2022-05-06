import { productStore, Product } from "../product";
import supertest from "supertest";
import app from "../../server";
/*
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

describe("product endpoint test for the storefront API", () => {
    const request = supertest(app);
    let productToken : string;

    beforeAll(async () => {
        const newUser = await request.post("/users").send({
            username: "producttest",
            password_digest: "producttest1",
            first_name: "test",
            last_name: "test"
        }).set("Accept", "application/json");
        productToken = newUser.body;
    });

    it("should create a new product on -> POST /products", async () => {
        const response = await request.post("/products").send({
            name: "test2",
            description: "test2",
            price: 12,
            category: "test2"
        }).set("Accept", "application/json").set("Authorization", `Bearer ${productToken}`);
        expect(response.body.price).toEqual(12);
    });

    it("should return a list of all products on -> GET /products", async () => {
        const response = await request.get("/products").set("Authorization", `Bearer ${productToken}`);
        expect(response.status).toBe(200);
    });

    it("should return a list of products in a category on -> GET /products/category/test2", async () => {
        const response = await request.get("/products/category/test2").set("Authorization", `Bearer ${productToken}`);
        expect(response.status).toBe(200);
    });

    it("should return the correct product on -> GET /products/:id", async () => {
        const response = await request.get("/products/2").set("Authorization", `Bearer ${productToken}`);
        expect(response.body.name).toEqual("test2");
    });

});
*/