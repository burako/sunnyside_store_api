import { orderStore, Order } from "../order";
import supertest from "supertest";
import app from "../../server";
import jwt, { Secret } from "jsonwebtoken";
import { userClass } from "../../models/user";
import { productStore } from "../product";

const UserStore = new userClass();
const ProductStore = new productStore();
const OrderStore = new orderStore();
const request = supertest(app);
let orderToken : string;
let userId: string;
let productId: string;

describe("order model test for the storefront API", () => {

    //beforeAll create a new user and product
    beforeAll(async () => {
        const newUser = await request.post("/users").send({
            username: "ordertest",
            password_digest: "ordertest1",
            first_name: "test",
            last_name: "test"
        }).set("Accept", "application/json");
        orderToken = newUser.body;

        const decoded : {user: {id: number, username: string, password: string, firstname: string, lastname: string}, iat: number} = jwt.verify(orderToken, <Secret> process.env.jwtSecret) as {user: {id: number, username: string, password: string, firstname: string, lastname: string}, iat: number};
        userId = decoded.user.id.toString();

        const newProduct = await request.post("/products").send({
            name: "ordertest",
            description: "testing orders",
            price: 12,
            category: "ordertest"
        }).set("Accept", "application/json").set("Authorization", `Bearer ${orderToken}`);
        productId = newProduct.body.id;
    });

    it("create() should add a new order", async () => {
        const result = await OrderStore.create({
            user_id: 1,
            created_at: new Date(),
            updated_at: new Date(),
            order_status: "open"
        });
        const testOrder = {
            user_id: result.user_id,
            order_status: result.order_status
        }
        expect(testOrder).toEqual({
            user_id: 1,
            order_status: "open"
        });
    });

    it("index() should return a list of all orders", async () => {
        const result = await OrderStore.index();
        const testOrder = {
            user_id: result[0].user_id,
            order_status: result[0].order_status
        }
        expect(testOrder).toEqual({
            user_id: 1,
            order_status: "open"
        });
    });

    it("show() should return the correct order", async () => {
        const result = await OrderStore.show("1");
        const testOrder = {
            user_id: result.user_id,
            order_status: result.order_status
        }
        expect(testOrder).toEqual({
            user_id: 1,
            order_status: "open"
        });
    });

    it("addProduct() should add a new product to the order", async () => {
        const result = await OrderStore.addProduct("1", "1", 8);
        const testOrderProduct = {
            order_id: result.order_id,
            product_id: result.product_id,
            quantity: result.quantity
        }
        expect(testOrderProduct).toEqual({
            order_id: 1,
            product_id: 1,
            quantity: 8
        });
    });

    it("openOrdersByUser() should return open orders", async () => {
        const result = await OrderStore.openOrdersByUser("1");
        const testOrder = {
            order_status: result[0].order_status
        }
        expect(testOrder).toEqual({
            order_status: "open"
        });
    });
});

describe("order endpoint test for the storefront API", () => {
    it("/orders/user/:id/open should return open orders for a specific user", async () => {
        const result = await request.get("/orders/user/1/open").set("Accept", "application/json").set("Authorization", `Bearer ${orderToken}`);
        expect(result.status).toBe(200);
    });

    afterAll(async () => {
        const deleteUser = await UserStore.destroy(userId);
        const deleteProduct = await ProductStore.destroy(productId);
    });
});
