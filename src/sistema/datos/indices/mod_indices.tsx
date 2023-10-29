import { indices } from "./indices";

import { nagesConfig} from "../../../funciones";
const nConf: nagesConfig = new nagesConfig()

export async function actualizarIncoterm(indice: indices) {

  try {
    const response = await fetch(nConf.API_PATH + "/ages/tablas/incoterms/", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(indice)
    });
    const data = await response.json();
    console.log(data);
  } catch (error) {
    console.error(error);
  }
};
export async function borrarIncoterm(fecha: Date) {
  console.log("Eliminando ", fecha)
  try {
    const response = await fetch(nConf.API_PATH + "/ages/tablas/incoterms/" + fecha.toString(), {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      },
    });
    console.log("Eliminando ", fecha)
    const data = await response.json();
    console.log("Respuesta",data);
  } catch (error) {
    console.error(error);
  }
};