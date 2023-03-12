import { IPersona } from "./persona"

export interface IUsuario{
    id?:number,
    nombreUsuario:string,
    contraseniaUsuario:string,
    estadoUsuario:number|null,
    persona:IPersona,
    RolId:number
}