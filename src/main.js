const $listaEquipos = document.querySelector('#lista-equipos');

$listaEquipos.onclick = (e) => {
    const elemento = e.target;

    if (elemento.classList.contains('visibilidad')) {
        manejarVisibilidad(elemento.dataset.id);
    }

    if (elemento.classList.contains('eliminar')) {
        const idEquipoAEliminar = elemento.dataset.id;
        eliminarEquipo(idEquipoAEliminar);
    }

    if (elemento.classList.contains('enviar-edicion')) {
        const arrayData = obtenerNuevaData(elemento, elemento.dataset.id);
        editarNombreEquipo(arrayData)
    }
}

function obtenerNuevaData(botonEnviarEdicion, idEquipoAEditar) {
    const padre = botonEnviarEdicion.parentNode;
    const nuevoNombre = padre.querySelector(`input`).value;
    const nuevaData = [
        idEquipoAEditar, { 'nombre': nuevoNombre }
    ]

    return nuevaData;
}

function eliminarEquipo(idEquipoAEliminar) {
    
    fetch(`http://localhost:8080/borrarequipo/${idEquipoAEliminar}`, {
    method: 'DELETE'

})

    window.location.href = "http://localhost:8080/equipos";
}

function editarNombreEquipo(arrayData) {
    const [idEquipoAEditar, nuevoNombre] = arrayData;
    fetch(`http://localhost:8080/api/equipos/${idEquipoAEditar}`, {

        method: 'PUT',
        headers: {
            'Content-type': 'application/json; charset=UTF-8',
        },
        body: JSON.stringify(nuevoNombre)
    });

    window.location.href = "http://localhost:8080/equipos";
}





function manejarVisibilidad(idEquipo) {
    const idABuscar = `seccion-editar-${idEquipo}`
    const $seccionEditarEquipo = document.querySelector(`#${idABuscar}`)
    const $botonEditarEquipo = document.querySelector(`#boton-editar-${idEquipo}`);
    const $inputEditarEquipo = document.querySelector(`#input-editar-${idEquipo}`);

    if ($seccionEditarEquipo.classList.contains('oculto')) {
        $seccionEditarEquipo.classList.remove('oculto');
        $botonEditarEquipo.textContent = 'Cerrar';
    } else {
        $seccionEditarEquipo.classList.add('oculto');
        $botonEditarEquipo.textContent = 'Editar';
        $inputEditarEquipo.value = '';
    }
}