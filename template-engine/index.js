const Equipo = require('../modulos/Equipo'); //nombre, id, pais, url img
const equipoEsValido = require('../modulos/funciones/equipoEsValido')
const express = require('express');
const multer = require('multer');
const fs = require('fs');
const path = require('path');
const PUERTO = 8080;
const app = express();
const exphbs = require('express-handlebars');
const hbs = exphbs.create();

//const static = path.join(__dirname, '/uploads/imagenes')

app.use(express.static(__dirname));

let storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, `${__dirname}/template-engine/uploads/images`)
    },
    filename: (req, file, cb) => {
      
      cb(null, file.originalname)
    }
})

const upload = multer({ storage });




const { send } = require('process');




const equipos = [];


app.use(express.json());

app.use(express.urlencoded({ extended: true }));




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
        
    });
    
});


app.post('/equipos', upload.single('imagen'), (req, res) => {
    
    const { nombre, id, pais, urlImg } = req.body

    const nuevoEquipo = new Equipo(nombre, id, pais, urlImg);


    console.log(nuevoEquipo);
    console.log(req.file);
 
    res.send('Equipo agregado exitosamente')
})

app.listen(PUERTO);



