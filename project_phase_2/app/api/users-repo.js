import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

const dataPath = "data/users2.json"

async function getUsers() {
    const users = await prisma.user.findMany()
    return users
}

export const login = async (email, password) => {
  const users = await getUsers()
  const user = users.find((u) => u.email == email && u.password == password)
  if (!user) throw new Error("Login Failed. Invalid email or password")
  delete user.password
  return user
}