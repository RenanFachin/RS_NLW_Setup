import Fastify from "fastify";

// Executando o fastify
const app = Fastify()


// Rota
app.get('/', () => {
    return 'Hello World'
})


// Deixar o app "ouvindo" na porta 3333
app.listen({
    port: 3333
}).then(() => {
    console.log('HTTP Server running!')
})