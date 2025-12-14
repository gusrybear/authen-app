import { Elysia, t } from "elysia";

import { Auth } from "./service";
import { AuthModel } from "./model";
import jwt, { JWTPayloadSpec } from "@elysiajs/jwt";

export const auth = new Elysia()
  .use(
    jwt({
      name: "myJWTNamespace",
      secret: process.env.JWT_SECRET!,
    }),
  )
  .get(
    "/sign/:name",
    async ({ myJWTNamespace, params: { name }, cookie: { auth } }) => {
      const value = await myJWTNamespace.sign({ name });

      auth.set({
        value,
        httpOnly: true,
        path: "/profile",
        maxAge: 7 * 24 * 60 * 60,
      });

      return `Sign in as ${value}`;
    },
  )
  .get(
    "/profile",
    async ({ myJWTNamespace, status, cookie: { auth } }) => {
      const profile = await myJWTNamespace.verify(auth.value);

      if (!profile) return status(401, "Unauthorized");

      return `Hello ${profile.name}`;
    },
    {
      cookie: t.Cookie({
        auth: t.String(),
      }),
    },
  );
