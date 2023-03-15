import { IPersona } from './persona';

export interface IVisita {
    id?: number;
    actividad: string;
    fecha?: Date;
    lugar: string;
    observaciones: string;
    tipo: string;
    estado?: number|null;
    InstitucionId?: number;
    persona?: IPersona;
}
