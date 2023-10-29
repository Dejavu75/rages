import { incoterm } from "./incoterms";

import { nagesConfig, nagesConfig2 } from "../../../funciones";
const nConf: nagesConfig = new nagesConfig()
export async function actualizarIncoterm(incoterm: incoterm) {
  console.log("creando config")
  const nConf: nagesConfig2 = new nagesConfig2()
  console.log("fin config", nConf)
  try {
    const response = await fetch(nConf.API_PATH + "/ages/tablas/incoterms/", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(incoterm)
    });
    const data = await response.json();
    console.log(data);
  } catch (error) {
    console.error(error);
  }
};
export async function borrarIncoterm(codigo: number) {
  console.log("Eliminando ", codigo)
  try {
    const response = await fetch(nConf.API_PATH + "/ages/tablas/incoterms/" + codigo.toString(), {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      },
    });
    console.log("Eliminando ", codigo)
    const data = await response.json();
    console.log("Respuesta",data);
  } catch (error) {
    console.error(error);
  }
};