export class Alumno {
    constructor(
        public id?: number,
        public nombres?: string,
        public apellidos?: string,
        public edad?: number,
        public f_nacimiento?: Date,
        public cedula?: number,
        public telefono?: number,
        public genero_id?: number,
        public estado?: boolean
    ) {}
}