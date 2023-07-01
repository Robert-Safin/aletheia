import { PrismaClient } from "@prisma/client";

const getCurrentUserModel = async (id:number) => {
  const prisma = new PrismaClient();
  const currentUser = await prisma.user.findUnique({
    where: {
      id: id
    }
  })
  await prisma.$disconnect()
return currentUser
}

export default getCurrentUserModel
