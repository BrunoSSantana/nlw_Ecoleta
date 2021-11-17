const express = require("express")
const path = require('path')
const server = express()

//pegar o banco de dados
//este "bancoDeDados" está recebendo o objeto e foi expotado no arquivo db.js, com "db"


//configurar pasa pública
server.use(express.static(path.join(__dirname, '..', 'Public')))
server.use('/static', express.static('public'))

//habilitar o uso do req.body na nossa aplicação

server.use(express.urlencoded( { extended: true } ))

//utilizando tampate engine
const nunjucks = require("nunjucks")
const routes = require("./routes.js")
nunjucks.configure("src/views", {
    express: server,
    noCache: true
})



//configurar caminhos
//caminho para home
//req: requisição
//res: resposta
server.use(routes)

//ligar o servidor
server.listen(3000)
