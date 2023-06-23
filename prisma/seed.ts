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
      name: "robertsafin",
      password : password
    }
  })
  console.log('created user:', Rob);

}
main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })
