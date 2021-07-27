function equipoExiste(nombreEquipo, arrEquipos) {
    if (arrEquipos.find(nombreEquipo)) {
        return true;
    } else {
        return false;
    }
}

module.exports = equipoExiste;