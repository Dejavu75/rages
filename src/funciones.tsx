export class nagesConfig {
  API_PATH = "https://nages.solinges.com.ar:444";  
}

export function fecha_grilla(fechaO: string, Hora: boolean) : string{
    if (fechaO === undefined) return ""
  let fecha = new Date(fechaO)
  let fecha_s=""
  console.log(fecha, fechaO)
  fecha_s= fecha.getDay().toString().padStart(2,"0") + "/" + fecha.getMonth().toString().padStart(2,"0")  + "/" + fecha.getFullYear().toString().padStart(4,"0")
  if (Hora) {
    fecha_s+= " " + fecha.getHours().toString().padStart(2,"0")  + ":" + fecha.getMinutes().toString().padStart(2,"0") + ":" + fecha.getSeconds().toString().padStart(2,"0")
    } 
      console.log(fecha_s)
      return fecha_s
  }