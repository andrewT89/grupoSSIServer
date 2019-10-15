"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Profesor {
    constructor(id, nombres, apellidos, edad, cedula, telefono, genero_id, estado) {
        this.id = id;
        this.nombres = nombres;
        this.apellidos = apellidos;
        this.edad = edad;
        this.cedula = cedula;
        this.telefono = telefono;
        this.genero_id = genero_id;
        this.estado = estado;
    }
}
exports.Profesor = Profesor;
