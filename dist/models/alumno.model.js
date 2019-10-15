"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Alumno {
    constructor(id, nombres, apellidos, edad, f_nacimiento, cedula, telefono, genero_id, estado) {
        this.id = id;
        this.nombres = nombres;
        this.apellidos = apellidos;
        this.edad = edad;
        this.f_nacimiento = f_nacimiento;
        this.cedula = cedula;
        this.telefono = telefono;
        this.genero_id = genero_id;
        this.estado = estado;
    }
}
exports.Alumno = Alumno;
