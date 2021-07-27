class Equipo {

    constructor(nombre, id, pais, imagen = null) {
        this.nombre = nombre;
        this.id = id;
        this.pais = pais;
        this.imagen = imagen
    }
}

module.exports = Equipo;