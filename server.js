import Fastify from 'fastify'
import { Pool } from 'pg'

const sql = new Pool({
    user: "postgres",
    password: "senai",
    host: "localhost",
    port: 5432,
    database: "receitas"
})

const servidor = Fastify();

servidor.get('/usuarios', async () => {
    const resultado = await sql.query('select * from usuario')
    return resultado.rows
})

servidor.post('/usuarios', async (request, reply) => {
    const body = request.body

    if(!body || !body.nome || !body.senha) {
        return reply.status(400).send({message:"nome e senha obrigatórios"})
    }

    const resultado = await sql.query('insert into usuario (nome, senha) values ($1, $2)', [body.nome, body.senha])
    return 'USUARIO CADASTRADO'
})

servidor.put('/usuarios/:id', async (request, reply) => {
    const body = request.body
    const id = request.params.id

    if (!id || !body || !body.nome || !body.senha) {
        return reply.status(400).send({message:"nome e senha obrigatórios"})
    }

    const resultado = await sql.query('UPDATE usuario SET nome = $1, senha = $2 WHERE id = $3', [body.nome, body.senha, id])
    return "USUÁRIO ATUALIZADO"
})

servidor.delete('/usuarios/:id', async (request, reply) => {
    const id = request.params.id

    if (!id) {
        return reply.status(400).send({message:"id obrigatório"})
    }

    const resultado = await sql.query('DELETE FROM usuario WHERE id = $1', [id])
    console.log(resultado);

    reply.status(200).send({ message: 'USUÁRIO DELETADO' })
})

servidor.listen({
    port: 3000
})

