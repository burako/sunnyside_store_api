"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const supertest_1 = __importDefault(require("supertest"));
const server_1 = __importDefault(require("../../server"));
describe("user endpoint test for the storefront API", () => {
    const request = (0, supertest_1.default)(server_1.default);
    let token;
    it("should create a new user on -> POST /users", async () => {
        const response = await request.post("/users").send({
            username: "usertest",
            password_digest: "usertest",
            first_name: "test",
            last_name: "test"
        }).set("Accept", "application/json");
        expect(response.status).toBe(200);
        token = response.body;
    });
    it("should return a list of all users on -> GET /users", async () => {
        const response = await request.get("/users").set("Authorization", `Bearer ${token}`);
        expect(response.status).toBe(200);
    });
    it("should return the correct user on -> GET /users/:id", async () => {
        const response = await request.get("/users/2").set("Authorization", `Bearer ${token}`);
        expect(response.body.username).toEqual("usertest");
    });
    it("should authenticate a user on -> POST /users/auth", async () => {
        const response = await request.post("/users/auth").send({
            username: "usertest",
            password_digest: "usertest"
        }).set("Accept", "application/json");
        expect(response.status).toBe(200);
    });
});
