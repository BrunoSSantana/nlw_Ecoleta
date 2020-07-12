//importar a dependência do sqlite
const sqlite3 = require("sqlite3").verbose()

//criar objeto que irá fazer operaçãoes no banco de dados
const db = new sqlite3.Database("./src/database/database.db")

module.exports = db

//utilizar o objeto do banco de dados, para nossas operações
db.serialize( () => {
    //Com comandos sql:

    //1 criar uma tabela
    /* db.run(`
        CREATE TABLE IF NOT EXISTS places (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            image TEXT,
            name TEXT,
            adress TEXT,
            adress2 TEXT,
            state TEXT,
            city TEXT,
            items TEXT
        );
    `) */

    //2 inserir dados na tabela
    /* const query = `
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
    "   ",
    "Papersider",
    "Guilherme Gemballa, Jardim América",
    "Nº 60",
    "Santa Catarina",
    "Rio do Sul",
    "Resíduos Eletrônicos, Lâmpadas"
    ]
 */
    /* function afterInsertData (err) {
        if(err) {
            return console.log(err)
        }

        console.log("Cadastrado com sucesso")
        console.log(this)
    } */

    //db.run(query, values, afterInsertData)
    
    //3 consultar os dados da tabela (o * quer dizer todos, img, name, cidade, etc...)
    //db.all(`SELECT * FROM places`, function(err, rows) {
    //    if(err) {
    //        console.log(err)
    //    }
    //
    //    console.log("Aqui estão seus registros: ")
    //    console.log(rows)
    //})

    //4 deletar um dado da tabela
    // db.run(`DELETE FROM places WHERE id = ?`, [20], function(err) {
    //    if(err) {
    //        console.log(err)
    //    }
    //
    //    console.log("Registro Deletado com sucesso!")
    //})



} )