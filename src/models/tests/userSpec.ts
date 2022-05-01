import { userClass, User } from "../user";
import supertest from "supertest";

const userStore = new userClass();

describe("user model for the storefront API", () => {
    
    it("should add a user", async () => {
        const result = await userStore.create({
        username: "test",
        password_digest: "test",
        first_name: "test",
        last_name: "test"
        });
        expect(result).toEqual({
        id: 1,
        username: "test",
        password_digest: "test",
        first_name: "test",
        last_name: "test"
        });
    });
    
    it("should return a list of users", async () => {
        const result = await userStore.index();
        expect(result).toEqual([
        {
            id: 1,
            username: "test",
            password_digest: "test",
            first_name: "test",
            last_name: "test"
        }
        ]);
    });
    
    it("should return the correct user", async () => {
        const result = await userStore.show("1");
        expect(result).toEqual({
        id: 1,
        username: "test",
        password_digest: "test",
        first_name: "test",
        last_name: "test"
        });
    });
    
    });