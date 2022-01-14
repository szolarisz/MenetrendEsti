const express = require('express');
const dbData = require('./adatok/menetadatok.js');
const path = require('path');
const port = 5555;

const app = express();

app.use(express.static(path.join(__dirname, 'static')));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, "/static/index.html"));
})

app.get('/list', (req, res) => {
    dbData.vonatLista((err, vonat) => {
        if (err) throw err;
        dbData.allomasLista((err2, allomas) =>{
            if(err2) throw err2;
            res.render('index.ejs', {listak: [vonat, allomas]});
        })
    })
})

app.get("*", (req, res) => {
    res.redirect('/');
})

app.listen(port);