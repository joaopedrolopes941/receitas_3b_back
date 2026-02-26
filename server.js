import Fastify from 'fastify'

const servidor = Fastify();

servidor.get('/usuarios', ()=>{
    return 'funcionando'
})

servidor.listen({
    port: 3000
})