import { IPersona } from "./persona"

export interface IUsuario{
    idUsuario?:number,
    nombreUsuario:string,
    contraseniaUsuario:string,
    estadoUsuario:number|null,
    persona:IPersona,
    RolId:number
}