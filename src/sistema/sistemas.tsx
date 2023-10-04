import { useEffect, useMemo, useState } from 'react';
import MaterialReactTable, { MRT_ColumnDef } from 'material-react-table';
import { estado_general } from '../schemas/sch_estados';
import env from "react-dotenv";

export interface estado_general2 {
  exe_ges_fecha: string
  fecha: string
  id_sistema: string
  nombre: string
}
function TablaSistemas() {
  return (
    <><div className="boxedfit" >
      <h3>Sistemas del conocidos</h3>
    </div>
      <div className="boxed" >
        <TablaSistemas2 />
      </div>
    </>)
}
function TablaSistemas2() {
  const [datas, setDatas] = useState<estado_general[]>([]);
  useEffect(() => {
    if (env.API_PATH === undefined) {
console.log("env.API_PATH undefined")
      env.API_PATH = "http://localhost:3001"
    }
    console.log("env.API_PATH not undefined")
    let xpath = env.API_PATH + "/ages/sistema/obtener";

    fetch(xpath)
      .then((res) => res.json())
      .then((data) => {
        let indices: estado_general2[] = [];
        data.forEach((element: any) => {
          indices.push({
            fecha: element.Fecha,
            exe_ges_fecha: element.exe_ges_FECHA,
            id_sistema: element.id_sistema,
            nombre: element.nombre
          });

        })

        setDatas(data)
      });
  }, []);

  const columns = useMemo<MRT_ColumnDef<estado_general>[]>(
    () => [
      {
        accessorKey: 'Fecha', //access nested data with dot notation
        header: 'Fecha',
        maxsize: 50,
      },
      {
        accessorKey: 'ID_Sistema', //access nested data with dot notation
        header: 'Sistema',
        maxsize: 50,
      },
      {
        accessorKey: 'Nombre',
        header: 'Nombre',
        maxsize: 50,
      },
      {
        accessorKey: 'exe_ges_FECHA', //normal accessorKey
        header: 'GES',
        maxsize: 30,
      },
    ],
    [],
  );
 
  return <MaterialReactTable columns={columns} data={datas}
    initialState={{
      density: 'compact',
      sorting: [
        {
          id: 'ID_Sistema', //sort by age by default on page load
          desc: false,
        },
      ],
    }} />;
}

export default TablaSistemas;

