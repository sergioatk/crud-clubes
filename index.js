const Equipo = require('./src/Equipo'); //nombre, id, pais, url img
const { v4: uuidv4 } = require('uuid');
const express = require('express');
const multer = require('multer');
const fs = require('fs');
const path = require('path');
const PUERTO = process.env.PORT || 8080;
const app = express();
const exphbs = require('express-handlebars');
const hbs = exphbs.create();

console.log(uuidv4());

app.use(express.static(path.join(__dirname, '/uploads')));
app.use(express.static(path.join(__dirname, '/src')));
let storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, `${__dirname}/uploads`)
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



function equipoExiste(nombre, listaEquipos) {
    const existe = listaEquipos.some(equipo => equipo.nombre === nombre);
    
    return existe;
}

app.post('/api/equipos', upload.single('imagen'), (req, res) => {
    
    
    const urlImg = req.file.filename;
    const { nombre, pais } = req.body;
    const idEquipo = uuidv4();
    const nuevoEquipo = new Equipo(nombre, pais, urlImg, idEquipo);
    
    if (!equipoExiste(nombre, equipos)) {
        res.status(200);
        equipos.push(nuevoEquipo);
        res.redirect('http://localhost:8080/equipos');  
    }
    res.status(400);
    
    res.send(`El equipo ${nombre} ya existe, por lo que no podes agregarlo nuevamente`)
    
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

app.put('/api/equipos/:idEquipo', (req, res) => {

    const { idEquipo } = req.params;
    const index = equipos.findIndex(e => e.id === idEquipo);
    const nuevoNombre = req.body.nombre;

    if (index < 0) {
        res.status(404).send(`No encontramos a ${nuevoNombre} en nuestra base de datos, intent?? con un equipo registrado.`);
        return;
    }

    res.status(202).send(`El equipo ${equipos[index]}, pas?? a llamarse ${nuevoNombre} correctamente, ??gracias por usar nuestro servicio!`)

    
    equipos[index].nombre = nuevoNombre;
    
    
})

function removerUnItemDeArray(array, indexARemover) {
    array.splice(indexARemover, 1)
}

function buscarEquipo(id, array) {
    const existe = array.findIndex(equipo => equipo.id === id);
    return existe;
} 

app.delete('/borrarequipo/:idEquipoABorrar', (req, res) => {
    const { idEquipoABorrar } = req.params;
    
    const index = buscarEquipo(idEquipoABorrar, equipos);
    const nombreEquipo = equipos[index].nombre;

    if (equipoExiste < 0) {
        res.status(404).send(`El equipo ${nombreEquipo} no se encuentra en nuestra base de datos, por lo que no puede ser eliminado.`);
        return;
    }

    
    

    res.status(200);
    removerUnItemDeArray(equipos, index)
    res.send(`Se elimino ${nombreEquipo} correctamente`)

    
})

app.listen(PUERTO);



