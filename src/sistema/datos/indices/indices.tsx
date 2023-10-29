import { useEffect, useMemo, useState } from 'react';
import { MaterialReactTable, MRT_ColumnDef } from 'material-react-table'
import { nagesConfig } from '../../../funciones';


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
function TablaIndices() {
  return (
    <><div className="boxedfit" >
        <h3>Índices mensuales existentes</h3>
      </div>
      <div className="boxed" >
        <TablaIndices2 />
      </div>
    </>)
}
function TablaIndices2() {
  const [datas, setDatas] = useState<indices2[]>([]);
  useEffect(() => {
    const nConf: nagesConfig = new nagesConfig()
    let xpath = nConf.API_PATH + "/ages/tablas/indices/mensuales/";
    fetch(xpath)
      .then((res) => res.json())
      .then((data) => {
        let indices: indices2[] = [];
        data.forEach((element: indices) => {
          indices.push({
            fecha: element.fecha.toString().substring(0, 10),
            indice1: element.indice1,
            indice2: element.indice2,
            indice3: element.indice3,
            indice4: element.indice4,
            indice5: element.indice5,
            coef: element.coef,
            a: element.a,
            a1: element.a1,
          });
        });
        console.log(indices);
        setDatas(indices)
  });
  }, []); 

  const columns = useMemo<MRT_ColumnDef<indices2>[]>(
    () => [
      {
        accessorKey: 'fecha', //access nested data with dot notation
        header: 'Fecha',
        maxsize: 50,
        type: 'date',
      },
      {
        accessorKey: 'indice1',
        header: 'Coef',
        maxsize: 50,
      },
      {
        accessorKey: 'indice2', //normal accessorKey
        header: 'IPC',
        maxsize: 30,
      },
    ],
    [],
  );

  return <MaterialReactTable  columns={columns} data={datas} 
  initialState={{
    density: 'compact',
    sorting: [
      {
        id: 'fecha', //sort by age by default on page load
        desc: true,
      },
    ],
  }}
  />;
}

export default TablaIndices;

