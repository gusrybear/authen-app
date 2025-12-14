import { Elysia } from "elysia";
import { UserService } from "./service";

export const user = new Elysia({ prefix: "/users" })
  .post("", async ({ body }) => {
    console.log(body);
    const result = await UserService.createNewUser();
    return result;
  })
  .get("", async () => {
    const users = await UserService.getUsers();
    return users;
  })
  .get("/:id", ({ params: { id } }) => "Hello, User!" + id)
  .delete("/:id", ({ params: { id } }) => "User deleted" + id);
