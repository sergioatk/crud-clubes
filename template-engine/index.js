const Equipo = require('../modulos/Equipo');
const validarEquipo = require('../modulos/funciones/validarEquipo')

const fs = require('fs');
const express = require('express');
const multer = require('multer');

const upload = multer( {dest: './upload/imagenes' });
const exphbs = require('express-handlebars');
const { send } = require('process');

const PUERTO = 8080;
const app = express();
const hbs = exphbs.create();

const equipos = [
    {
        nombre: 'boca',
        pais: 'argentina'
    },
    {
        nombre: 'river',
        pais: 'argentina'
    }
];

console.log(Equipo)

app.use(express.json());

app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');



app.get('/', (req, res) => {

    res.render('home', {
        layout: 'boiler',
        data: {
            titulo: 'Lista de Clubes de Inglaterra',
            subTitulo: 'Podes agregar o eliminar equipos',
            equipos
        }
    })
})


app.get('/equipos', (req, res) => {
    res.render('equipos', {
        layout: 'boiler',
        data: {
            equipos
        }
        
    })
    //res.send(equipos);
})

app.listen(PUERTO);
console.log(`Escuchando en http://localhost:${PUERTO}`);


