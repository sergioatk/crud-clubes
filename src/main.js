const $listaEquipos = document.querySelector('#lista-equipos');

$listaEquipos.onclick = (e) => {
    const elemento = e.target;

    if (elemento.classList.contains('visibilidad')) {
        manejarVisibilidad(elemento.dataset.nombre);
    }

    if (elemento.classList.contains('eliminar')) {
        const equipoAEliminar = elemento.dataset.nombre;
        eliminarEquipo(equipoAEliminar);
    }

    if (elemento.classList.contains('enviar-edicion')) {
        const arrayData = obtenerNuevaData(elemento);
        editarNombreEquipo(arrayData)
    }

    

}

function eliminarEquipo(equipoAEliminar) {
    
    fetch(`http://localhost:8080/borrarequipo/${equipoAEliminar}`, {
    method: 'DELETE'

})

    window.location.href = "http://localhost:8080/equipos";
}

function editarNombreEquipo(arrayData) {
    const [equipo, nuevoNombre] = arrayData;
    fetch(`http://localhost:8080/api/equipos/${equipo}`, {

        method: 'PUT',
        headers: {
            'Content-type': 'application/json; charset=UTF-8',
        },
        body: JSON.stringify(nuevoNombre)
    });

    window.location.href = "http://localhost:8080/equipos";
}

function obtenerNuevaData(botonEnviarEdicion) {
    const padre = botonEnviarEdicion.parentNode;
    const nombreEquipo = padre.dataset.nombre;
    const nuevoNombre = padre.querySelector(`input`).value;
    const nuevaData = [
        nombreEquipo, { 'nombre': nuevoNombre }
    ]

    return nuevaData;
}

// function manejarBorrar(nombreEquipo) {
//     console.log(nombreEquipo);
// }


// function manejarEditar(nombreEquipo) {




//     const nuevoNombre = document.querySelector(`#input-editar-${nombreEquipo}`).value

//     const nuevaData = {
//         'nombre': nuevoNombre
//     }

//     const $botonEnviarEdicion = document.querySelector(`#enviar-edicion-${nombreEquipo}`);

//     //$botonEnviarEdicion.onclick = editarNombreEquipo(nombreEquipo, nuevaData);

//     return nuevaData;



// }



function manejarVisibilidad(nombreEquipo) {
    const idABuscar = `seccion-editar-${nombreEquipo}`
    const $seccionEditarEquipo = document.querySelector(`#${idABuscar}`)
    const $botonEditarEquipo = document.querySelector(`#boton-editar-${nombreEquipo}`);
    const $inputEditarEquipo = document.querySelector(`#input-editar-${nombreEquipo}`);

    if ($seccionEditarEquipo.classList.contains('oculto')) {
        $seccionEditarEquipo.classList.remove('oculto');
        $botonEditarEquipo.textContent = 'Cerrar';
    } else {
        $seccionEditarEquipo.classList.add('oculto');
        $botonEditarEquipo.textContent = 'Editar';
        $inputEditarEquipo.value = '';
    }
}