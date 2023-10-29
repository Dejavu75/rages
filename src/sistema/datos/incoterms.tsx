import { useEffect, useMemo, useState } from 'react';
import MaterialReactTable, { MRT_ColumnDef } from 'material-react-table';
import env from "react-dotenv";
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

export type incoterm = {
  codigo: number
  incoterm: string
  descr: string
}
function TablaIncoterms() {
  return (
    <><div className="boxedfit" >
      <h3>Incoterms definidos en el sistema</h3>
    </div>
      <div className="boxed" >
        <TablaIndices2 />
      </div>
    </>)
}
function TablaIndices2() {
  const [datas, setDatas] = useState<incoterm[]>([]);
  useEffect(() => {
    let xpath = env.API_PATH + "/ages/tablas/incoterms/";
    fetch(xpath)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setDatas(data)
      });
  }, []);

  const columns = useMemo<MRT_ColumnDef<incoterm>[]>(
    () => [
      {
        accessorKey: 'codigo', //access nested data with dot notation
        header: 'Cód',
        maxsize: 50,
        size: 6,
      },
      {
        accessorKey: 'incoterm', //access nested data with dot notation
        header: 'Incoterm',
        maxsize: 50,
        size: 30,
      },
      {
        accessorKey: 'descr',
        header: 'Descripción',
        maxsize: 400,
      },
    ],
    [],
  );
  let props: propsBotonera = {
    abm: 0,
    incoterm: {
      codigo: 0,
      incoterm: '',
      descr: '',
    },
  }

  return <><MaterialReactTable columns={columns} data={datas}
    initialState={{
      density: 'compact',
      sorting: [
        {
          id: 'incoterm', //sort by age by default on page load
          desc: false,
        },
      ],
    }}
  />
    <ABMZone abm={props.abm} incoterm={props.incoterm} />
  </>
}
interface propsBotonera {
  abm: number
  incoterm: incoterm
}

function FormularioABM(props: propsBotonera) {
  return <>
    <Stack direction="row" spacing={1} >
      <Button size="small" variant="contained" onClick={() => { }}>Grabar</Button>
      <Button size="small" variant="contained" onClick={() => { }}>Cancelar</Button>
    </Stack>
  </>
}
function BotoneraABM(props: propsBotonera) {
  return <>
    <Stack direction="row" spacing={1} >
      <Button size="small" variant="contained" onClick={() => { }}>Agregar</Button>
    </Stack>
  </>
}
function ABMZone(props: propsBotonera) {
  switch (props.abm) {
    case 1:
      return <FormularioABM abm={props.abm} incoterm={props.incoterm} />
    case 2:
      return <FormularioABM abm={props.abm} incoterm={props.incoterm} />
    case 3:
      return <FormularioABM abm={props.abm} incoterm={props.incoterm} />
    default:

      return <BotoneraABM abm={props.abm} incoterm={props.incoterm} />
  }
}
export default TablaIncoterms;

