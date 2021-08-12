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

app.use(express.static(path.join(__dirname, '/uploads/images')));

let storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, `${__dirname}/uploads/images`)
    },
    filename: (req, file, cb) => {
      
      cb(null, `${Date.now()}--${file.originalname}`)
    }
})

const upload = multer({ storage });
const { send } = require('process');
let equipos = [];
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

app.get('/', (req, res) => {
    res.render('home', {
        layout: 'boiler',
        data: {
            titulo: 'Lista de Clubes de Inglaterra',
            subTitulo: 'Lista actual',
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


app.post('/api/equipos', upload.single('imagen'), (req, res) => {
    
    const urlImg = req.file.filename;
    const { nombre, pais } = req.body;
    const nuevoEquipo = new Equipo(nombre, pais, urlImg);
    equipos.push(nuevoEquipo);
    res.send('Equipo cargado correctamente');
})


app.get('/api/equipos/:nombreEquipo', (req, res) => {
    
    const { nombreEquipo } = req.params;

    const index = equipos.findIndex(e => e.nombre === nombreEquipo);
  

    if (index < 0) {
        res.status(404).send(`no encontramos a ${nombreEquipo} en nuestra base de datos`)
        return;
    } else {
        res.status(200).json(equipos[index]);
    }
});

app.get('/api/lista-equipos', (req, res) => {
    if (!equipos[0]) {
        res.status(404).send(`No existen equipos para enviar, crealos desde la seccion de equipos!`);
        return;
    }
    res.status(200).json(equipos);
})

app.put('/api/equipos/:nombreEquipo', (req, res) => {

    const { nombreEquipo } = req.params;
    const index = equipos.findIndex(e => e.nombre === nombreEquipo);
    const nuevoNombre = req.body.nombre;
    const nuevoPais = req.body.pais;

    console.log(`entramos a put`)

    if (index < 0) {
        res.status(404).send(`no encontramos a ${nombreEquipo} en nuestra base de datos, intente con un equipo registrado`);
        return;
    }

    equipos[index].nombre = nuevoNombre;
    equipos[index].pais = nuevoPais;
    res.status(202).send(`el equipo ${nombreEquipo}, paso a llamarse ${nuevoNombre} correctamente, gracias por usar nuestro servicio.`)
    
})

function removerUnItemDeArray(array, indexARemover) {
    array.splice(indexARemover, 1)
}

app.delete('/borrarequipo/:equipoABorrar', (req, res) => {
    const { equipoABorrar } = req.params;
    const index = equipos.findIndex(e => e.nombre === equipoABorrar);

    if (index < 0) {
        res.status(404).send(`El equipo ${equipoABorrar}, no se encuentra en nuestra base de datos`);
        return;
    }

    res.status(200);
    removerUnItemDeArray(equipos, index)
    res.send(`Se elimino ${equipoABorrar} correctamente`)

    
})

app.listen(PUERTO);



