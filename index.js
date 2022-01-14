const express = require('express');
const dbData = require('./adatok/menetadatok.js');
const path = require('path');
const { render } = require('express/lib/response');
const port = 5555;

const app = express();

app.use(express.static(path.join(__dirname, "static")));

app.set('view engine', 'ejs');
app.get('/', (req, res) => {
    res.sendFile("index");
})

app.get('/lista', (req, res) => {
    
    dbData.vonatLista((err, vonat) => {
        if (err) throw err;
        dbData.allomasLista((err2, allomas) => {
            if (err2) throw err2;
            res.render('index2', {
                listak: [vonat, allomas]
            });
        })
    })
})

app.get('/menetrend', (req, res) =>{
    dbData.vonatEsemenyek( 7, (err, lista) =>{
        if(err) throw err;
        res.render( 'index3', {lista: lista})
    })
})

app.get("*", (req, res) => {
    res.redirect('/');
})

app.listen(port);