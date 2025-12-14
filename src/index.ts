import { Elysia } from "elysia";
import { auth } from "./modules/auth";
import { user } from "./modules/user";

const app = new Elysia().use(auth).use(user).listen(3000);

console.log(
  `Hello 🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`,
);
