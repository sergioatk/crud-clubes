function eliminarEquipo(equipoABorrar) {
    
    fetch(`http://localhost:8080/borrarequipo/${equipoABorrar}`, {
    method: 'DELETE',
    
})
.then(res => res.text()) // or res.json()
.then(res => console.log(`res es ${res}`))

window.location.href = "http://localhost:8080/equipos";
}

function editarNombreEquipo(equipoAEditar, nuevaData) {
    fetch(`http://localhost:8080/api/equipos/${equipoAEditar}`, {
    
    method: 'PUT', // Method itself
    headers: {
        'Content-type': 'application/json; charset=UTF-8', // Indicates the content 
    },
    body: JSON.stringify(nuevaData) // We send data in JSON format
    });

    window.location.href = "http://localhost:8080/equipos";
}

const $botonEliminar = document.querySelectorAll('.boton-eliminar');

$botonEliminar.forEach(equipo => {
    equipo.onclick = function() {
        eliminarEquipo(equipo.dataset.nombre)
    }
    
})

const $botonEditar = document.querySelectorAll('.boton-editar');

$botonEditar.forEach(botonEditar => {
    botonEditar.onclick = () => {

        const $camposNuevaData = crearCamposParaEditar(botonEditar.dataset.nombre)
        const $nodoEquipo = botonEditar.parentNode.parentNode;
        $nodoEquipo.appendChild($camposNuevaData);


        // const $botonEnviarCambios = document.querySelector(`#enviar-cambios-${equipo.dataset.nombre}`)


        // $botonEnviarCambios.onclick = enviarCambios(equipo.dataset.nombre);
        

        
    }
})


function crearCamposParaEditar(equipo) {

    if (document.querySelector(`.contenedor-editar-${equipo}`)) {
        return;
    }

    const $contenedor = document.createElement('div');
    $contenedor.className = `contenedor-editar-${equipo}`

    const $labelNuevoNombre = document.createElement('label');
    $labelNuevoNombre.textContent = 'Nuevo nombre de equipo'
    $labelNuevoNombre.setAttribute('for', `editar-${equipo}`)

    const $nuevoNombre = document.createElement('input')
    $nuevoNombre.setAttribute('type', 'text');
    $nuevoNombre.classList.add('editar')
    $nuevoNombre.id = `editar-${equipo}`;

    $botonEnviarCambios = document.createElement('button');
    $botonEnviarCambios.dataset.nombre = equipo;
    $botonEnviarCambios.id = `enviar-cambios-${equipo}`
    $botonEnviarCambios.className = 'btn btn-danger'
    $botonEnviarCambios.textContent = 'enviar datos!';
    

    $botonEnviarCambios.addEventListener("click", enviarCambios);

    $contenedor.appendChild($labelNuevoNombre);
    $contenedor.appendChild($nuevoNombre);
    $contenedor.appendChild($botonEnviarCambios);

    return $contenedor;

    
}




function enviarCambios() {
    const nombreActual = this.dataset.nombre;
    const nuevoNombre = this.parentNode.querySelector('input').value
    ;

    const nuevaData = {
        'nombre': nuevoNombre
    }
    console.log(`el nombre actual es ${nombreActual} y el nuevo nombre sera ${nuevoNombre}`)

    editarNombreEquipo(nombreActual, nuevaData)
 }
