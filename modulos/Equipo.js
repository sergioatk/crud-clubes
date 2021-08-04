class Equipo {

    constructor(nombre, idLista, pais, imagen = null) {
        this.nombre = nombre;
        this.idLista = idLista;
        this.pais = pais;
        this.imagen = imagen
    }
}

module.exports = Equipo;