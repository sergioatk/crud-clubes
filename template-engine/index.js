const fs = require('fs');
const express = require('express');
const multer = require('multer');

const upload = multer( {dest: './upload/imagenes' });
const exphbs = require('express-handlebars');

const PUERTO = 8080;
const app = express();
const hbs = exphbs.create();

app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

app.get('/', (req, res) => {
    res.render('home', {
        layout: 'boiler',
        data: {
            titulo: 'Lista de Clubes de Inglaterra',
            subTitulo: 'Podes agregar o eliminar equipos'
        }
    })
})

app.get('/agregar-equipos', (req, res) => {
    console.log(req.files);
    res.render('form', {
        layout: 'boiler',
    })
})

app.listen(PUERTO);
console.log(`Escuchando en http://localhost:${PUERTO}`);


