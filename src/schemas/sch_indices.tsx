import { useState, useEffect } from 'react';

export type indices = {
    fecha: Date
    indice1?: number
    indice2?: number
    indice3?: number
    indice4?: number
    indice5?: number
    coef?: number
    a?:number
    a1?:number
}
export type indices2 = {
    fecha?: Date | string
    indice1?: number
    indice2?: number
    indice3?: number
    indice4?: number
    indice5?: number
    coef?: number
    a?:number
    a1?:number
}
export function Indices_Datos() {
    return ("")
}
function Resultados_Data() {
    const [datos, setData] = useState<Array<indices>>([]);
    console.log("Obtener3.5")
    useEffect(() => {
        const obtenerDatos = async () => {
            console.log("Obtener4")
            const response = await obtener_sistemas();
            console.log("Obtener5")
            const jsonData = await response.json();
            setData(jsonData);
        };
        console.log("Obtener6")
        obtenerDatos();
    }, []);

    return (
        principal_divisor(datos)
    );
}
function principal_divisor(indices: Array<indices>) {
    if (indices.length == 0) {
        console.log("Obtener3")
        return ("")
    } else {
        console.log("Obtener4")
        return (principal_data(indices))
    }
}

function principal_data_vacio(Indices: indices) {
    return (
        <main key="main" className='cuerpo'>
           <p>Obteniendo</p>
        </main>
    )
}



function principal_data(Indices: Array<indices>) { 
    console.log("Obtener1")
    return Indices
}
export function obtener_sistemas() {
    console.log("Obtener")
    const result = fetch(base(true)+'/ages/sistema/obtener', { mode: 'no-cors' });
    return result
}
  
  export function base(produccion: boolean) {
    if (produccion) {
      return 'http://localhost:80'  
    }
  }  
  


  // function Crear_Tabla() {
  //   const Indices_Tabla = () => {
  //     //should be memoized or stable
  //     const columns = useMemo<MRT_ColumnDef<indices2>[]>(
  //       () => [
  //         {
  //           accessorKey: 'fecha', //access nested data with dot notation
  //           header: 'fecha',
  //           size: 150,
  //         },
  //         {
  //           accessorKey: 'indice1',
  //           header: 'Coef',
  //           size: 150,
  //         },
  //         {
  //           accessorKey: 'indice2', //normal accessorKey
  //           header: 'IPC',
  //           size: 200,
  //         },
  //       ],
  //       [],
  //     );
  //     return <MaterialReactTable columns={columns} data={data} />;
  //   };
  //   return <Indices_Tabla />;
  // }