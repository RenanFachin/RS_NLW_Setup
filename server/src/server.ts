import Fastify from "fastify";
import cors from '@fastify/cors'
import { PrismaClient } from '@prisma/client'

// Executando o fastify
const app = Fastify()
// Executando o prismaClient
const prisma = new PrismaClient()

// Habilitando o Cross-Origin-Resource-Sharing
app.register(cors)

// Rota
app.get('/', async () => {
    const habits = await prisma.habit.findMany({
        where: {
            title: {
                startsWith: 'Beber'
            }
        }
    })
    return habits
})


// Deixar o app "ouvindo" na porta 3333
app.listen({
    port: 3333
}).then(() => {
    console.log('HTTP Server running!')
})