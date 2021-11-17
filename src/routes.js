const { Router } = require('express')

const bancoDeDados = require("./database/db.js")

const routes = Router()

routes.get("/", function (req, res) {
  return res.render("index.html")
})

//esta rota tbm está recebendo os dados do formulário
routes.get("/create-point", function (req, res) {

  //req.query: Querry Strings na nossa url
  //console.log(req.query)

  return res.render("create-point.html")
})

routes.post("/save-point", (req, res) => {

  //req.body: o corpo do nosso formulário
  //console.log(req.body)

  //inserir dados no banco de dados

  const query = `
  INSERT INTO places (
      image,
      name,
      adress,
      adress2,
      state,
      city,
      items
  ) VALUES(?,?,?,?,?,?,?);
  `

  const values = [
    req.body.image,
    req.body.name,
    req.body.adress,
    req.body.adress2,
    req.body.state,
    req.body.city,
    req.body.items
  ]

  function afterInsertData(err) {
    if (err) {
      console.log(err)
      return Response.send("Erro no cadastro!")
    }

    console.log("Cadastrado com sucesso")
    console.log(this)

    return res.render('create-point.html', { saved: true })
  }

  //callback
  bancoDeDados.run(query, values, afterInsertData)

})


routes.get("/search", function (req, res) {

  const search = req.query.search

  if (search == "") {
    //pesquisa vazia
    return res.render("search-results.html", { total: 0 })
  }

  //pegar os dados no banco de dados

  bancoDeDados.all(`SELECT * FROM places WHERE city LIKE '%${search}%'`, function (err, rows) {
    if (err) {
      console.log(err)
    }

    const total = rows.length

    //mostrar a página html com os dados do banco de dados 
    return res.render("search-results.html", { places: rows, total: total })
  })

})

module.exports = routes