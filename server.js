import Fastify from 'fastify'
import{Pool} from  'pg'

const sql = new Pool({
    user:"postgres",
    password:"senai",
    host:"localhost",
    port:5432,
    database:"receitas"
})

const servidor = Fastify();

servidor.get('/usuarios',async()=>{
    const resultado = await sql.query('select * from usuario')
    return resultado.rows
})

servidor.post('/usuarios', async (request, reply) => {
    const body = request.body
    const resultado = await sql.query('insert into usuario (nome, senha) values ($1, $2)',[body.nome,body.senha])
    return 'USUARIO CADASTRADO'
})

servidor.listen({
    port: 3000
})
 
