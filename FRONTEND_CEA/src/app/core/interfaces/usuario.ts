import { IPersona } from "./persona"

export interface IUsuario{
    nombreUsuario:string,
    contraseniaUsuario:string,
    estadoUsuario:number|null,
    persona:IPersona,
    RolId:number
}