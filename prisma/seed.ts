import { PrismaClient } from "@prisma/client";
import {hash} from 'bcrypt'
const prisma = new PrismaClient()

async function main() {
  const password = await hash('banana',12)
  const Rob = await prisma.user.upsert({
    where: {email: "rob@gmail.com"},
    update:{},
    create: {
      email: "rob@gmail.com",
      username: "robertsafin",
      password : password
    }
  })
  console.log('created user:', Rob);

}
