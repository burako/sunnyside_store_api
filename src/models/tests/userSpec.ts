import { userClass, User } from "../user";


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
