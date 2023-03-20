import { IPersona } from './persona';

export interface IVisita {
    id?: number;
    actividad: string;
    fecha?: Date;
    lugar: string;
    observaciones: string;
    tipo: string;
    email: string;
    estado?: number|null;
    persona?: IPersona;
    InstitucionId: number;
}
