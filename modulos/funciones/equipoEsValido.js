const condicionNombre = /[A-z]/;
const condicionNumero = /[0-9]/;

function equipoEsValido(objEquipo) {
    if (!condicionNombre.test(objEquipo.nombre)) {
        return false;
    };

    if (!condicionNumero.test(objEquipo.id)) {
        return false;
    };

    if (!condicionNombre.test(objEquipo.pais)) {
        return false;
    };

    return true;
};

module.exports = equipoEsValido;