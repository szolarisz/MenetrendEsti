const mysql = require("mysql")
const configDb = require('../config/connectDb.json')

const connection = mysql.createConnection({
    host: configDb.host,
    port: configDb.port,
    database: configDb.dbname,
    user: configDb.user,
    password: configDb.passwd
})

/*
async await promise

module.exports.vonatLista = function() {
    myQuery = "SELECT vId, vNev FROM vonat";
    connection.query(myQuery, (err, result, fields) => {
        return JSON.parse(JSON.stringify(result));
    })
}
*/

module.exports.vonatLista = function( callback ) {
    const myQuery = "SELECT vId, vNev FROM vonat";
    connection.query(myQuery, (err, result, fields) => {
        if(err){
            callback(err, null);
        }else{
            callback(null, JSON.parse(JSON.stringify(result)))
        }
    })
}

module.exports.allomasLista = function( callback ) {
    const myQuery = "SELECT aId, aNev FROM allomas";
    connection.query(myQuery, (err, result, fields) => {
        if(err){
            callback(err, null);
        }else{
            callback(null, JSON.parse(JSON.stringify(result)))
        }
    })
}

module.exports.vonatEsemenyek = function( vonat, callback) {
    const myQuery = `SELECT vNev, aNev, ora, perc, esemeny FROM allomas INNER JOIN idopontok ON allomas.aID= idopontok.aID INNER JOIN vonat ON vonat.vID=idopontok.vID WHERE vonat.vId=${vonat} ORDER BY ora, perc;`;
    connection.query(myQuery, (err, result, fields) => {
        if( err ){
            callback(err, null)
        }else{
            callback(null, JSON.parse(JSON.stringify(result)))
        }
    })
}