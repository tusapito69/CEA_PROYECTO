import { IPersona } from "./persona"
import { IRol } from "./rol"

export interface IUsuario{
    idUsuario?:number,
    nombreUsuario:string,
    contraseniaUsuario:string,
    estadoUsuario:number,
    persona:IPersona,
    rolId:number
}