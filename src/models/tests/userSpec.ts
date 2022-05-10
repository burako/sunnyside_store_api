import { userClass, User } from "../user";
import supertest from "supertest";
import app from "../../server";

const userStore = new userClass();

describe("user model test for the storefront API", () => {
    
    it("create() should add a new user", async () => {
        const result = await userStore.create({
        username: "usertest1",
        password_digest: "usertest1",
        first_name: "test",
        last_name: "test"
        });
        const testUser = {
            username: result.username,
            first_name: result.first_name,
            last_name: result.last_name
        }
        expect(testUser).toEqual({
        username: "usertest1",
        first_name: "test",
        last_name: "test"
        });
    });
    
    it("index() should return a list of all users", async () => {
        const result = await userStore.index();
        const testUser = {
            username: result[0].username,
            first_name: result[0].first_name,
            last_name: result[0].last_name
        }
        expect(testUser).toEqual({
        username: "usertest1",
        first_name: "test",
        last_name: "test"
        });
    });
    
    it("show() should return the correct user", async () => {
        const result = await userStore.show("1");
        const testUser = {
            username: result.username,
            first_name: result.first_name,
            last_name: result.last_name
        }
        expect(testUser).toEqual({
        username: "usertest1",
        first_name: "test",
        last_name: "test"
        });
    });
    
});

describe("user endpoint test for the storefront API", () => {
    const request = supertest(app);
    let token : string;

    it("should create a new user on -> POST /users", async () => {
        const response = await request.post("/users").send({
            username: "usertest2",
            password_digest: "usertest2",
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
        expect(response.body.username).toEqual("usertest2");
    });

    it("should authenticate a user on -> POST /users/auth", async () => {
        const response = await request.post("/users/auth").send({
            username: "test",
            password_digest: "usertest2"
        }).set("Accept", "application/json");
        expect(response.status).toBe(200);
    });

});