import env from "react-dotenv";
export class nagesConfig {
  API_PATH: string
  constructor() {
    this.API_PATH = env?.REACT_APP_API_PATH || "Http://localhost:3001"
  } 
}
export class nagesConfig2 {
  API_PATH: string
  constructor() {
    this.API_PATH = env?.REACT_APP_API_PATH || "Http://localhost:3001"
  } 
}

export function fecha_grilla(fechaO: string, Hora: boolean) : string{
    if (fechaO === undefined) return ""
  let fecha = new Date(fechaO)
  let fecha_s=""
  fecha_s= fecha.getDay().toString().padStart(2,"0") + "/" + fecha.getMonth().toString().padStart(2,"0")  + "/" + fecha.getFullYear().toString().padStart(4,"0")
  if (Hora) {
    fecha_s+= " " + fecha.getHours().toString().padStart(2,"0")  + ":" + fecha.getMinutes().toString().padStart(2,"0") + ":" + fecha.getSeconds().toString().padStart(2,"0")
    } 
      console.log(fecha_s)
      return fecha_s
  }