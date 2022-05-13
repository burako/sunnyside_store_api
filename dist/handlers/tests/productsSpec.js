"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const supertest_1 = __importDefault(require("supertest"));
const server_1 = __importDefault(require("../../server"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const user_1 = require("../../models/user");
const UserStore = new user_1.userClass();
describe("products spec endpoint test for the storefront API", () => {
    const request = (0, supertest_1.default)(server_1.default);
    let productToken;
    let userId;
    beforeAll(async () => {
        const newUser = await request.post("/users").send({
            username: "producttest",
            password_digest: "producttest1",
            first_name: "test",
            last_name: "test"
        }).set("Accept", "application/json");
        console.log("hello");
        productToken = newUser.body;
        const decoded = jsonwebtoken_1.default.verify(productToken, process.env.jwtSecret);
        userId = decoded.user.id.toString();
        //console.log(userId);
    });
    it("should create a new product on -> POST /products", async () => {
        const response = await request.post("/products").send({
            name: "test",
            description: "test",
            price: 1,
            category: "test"
        }).set("Accept", "application/json").set("Authorization", `Bearer ${productToken}`);
        expect(response.body.price).toEqual(1);
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
        const response = await request.get("/products/1").set("Authorization", `Bearer ${productToken}`);
        expect(response.body.name).toEqual("test");
    });
    afterAll(async () => {
        const result = await UserStore.destroy(userId);
    });
});
