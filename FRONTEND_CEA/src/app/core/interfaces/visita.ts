import { Institucion } from './institucion';
import { IPersona } from './persona';
export interface Visita {
    id: number;
    actividad: string;
    fecha: Date;
    lugar: string;
    observaciones: string;
    tipo: string;
    estado: string;
    Institucion: Institucion;
    Persona: IPersona;
}
