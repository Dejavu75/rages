import { useEffect, useMemo, useState } from 'react';
import MaterialReactTable, { MRT_ColumnDef } from 'material-react-table';
import env from "react-dotenv";
import { fecha_grilla } from '../../funciones';
import { estado_general } from '../../schemas/sch_estados';


function BoxSistemas() {
    return (
      <><div className="boxedfit" >
        <h3>Sistemas del conocidos</h3>
      </div>
        <div className="boxed" >
          <TablaSistemas />
        </div>
        <div className="boxed" >
          
        </div>
      </>)
  }

function TablaSistemas() {
    const [datas, setDatas] = useState<estado_general[]>([]);
    useEffect(() => {
      let xpath = env.API_PATH + "/ages/sistema/obtener";
      fetch(xpath)
        .then((res) => res.json())
        .then((data) => {
          setDatas(data)
        });
    }, []);
  
    const columns = useMemo<MRT_ColumnDef<estado_general>[]>(
      () => [
        {
          accessorKey: 'Fecha', //access nested data with dot notation
          header: 'Fecha',
          minSize: 70, //min size enforced during resizing
          maxSize: 100, //max size enforced during resizing
          size: 80, //medium column        
          Cell: ({ cell }) => (
            <span>{fecha_grilla(cell.getValue<string>(), true)}</span>
          ),
          enableGrouping: false
        },
  
        {
          accessorKey: 'ID_Sistema', //access nested data with dot notation
          header: 'SIS',
          enableGrouping: false,
          minSize: 30, //min size enforced during resizing
          maxSize: 60, //max size enforced during resizing
        },
        {
          accessorKey: 'Nombre',
          header: 'Nombre',
          maxsize: 50,
          enableGrouping: false,
        },
        {
          accessorKey: 'version_system',
          header: 'VER',
          minSize: 30, //min size enforced during resizing
          maxSize: 60, //max size enforced during resizing
          size: 30
  
        },
  
        {
          accessorKey: 'exe_ges_FECHA', //access nested data with dot notation
          header: 'GES',
          maxsize: 50,
          Cell: ({ cell }) => (
            <span>{fecha_grilla(cell.getValue<string>(), true)}</span>
          ),
        },
      ],
      [],
    );
  
    return <MaterialReactTable
      columns={columns}
      data={datas}
      enableGrouping
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
  
  export default BoxSistemas;