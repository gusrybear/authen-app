import { prisma } from "../../lib/prisma";

export abstract class UserService {
  static async getUsers() {
    return await prisma.user.findMany();
  }

  static async createNewUser() {
    const user = await prisma.user.create({
      data: {
        email: "petch@mail.com",
        password: "1234",
      },
    });
    return user;
  }
}
