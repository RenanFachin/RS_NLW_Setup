import Fastify from "fastify";
import cors from '@fastify/cors'
import { appRoutes } from "./routes";


// Executando o fastify
const app = Fastify()


// Habilitando o Cross-Origin-Resource-Sharing
app.register(cors)

app.register(appRoutes)


// Deixar o app "ouvindo" na porta 3333
app.listen({
    port: 3333
}).then(() => {
    console.log('HTTP Server running!')
})