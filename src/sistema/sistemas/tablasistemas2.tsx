import { useEffect, useState } from 'react';
import MaterialReactTable, { MRT_ColumnDef } from 'material-react-table';
import env from "react-dotenv";
import { fecha_grilla } from '../../funciones';
import { estado_general } from '../../schemas/sch_estados';

interface TablaSistemas2Props {
    onSistemaSelect: (id: string) => void;
}
function distintos(data: any[]) {
  const uniqueDates = Array.from(new Set(data.map((item) => item.exe_ges_FECHA)));
  const filteredData = uniqueDates.map((date) => data.find((item) => item.exe_ges_FECHA === date));
  return filteredData;
}
function TablaSistemas2({ onSistemaSelect }: TablaSistemas2Props) {
    const [datas, setDatas] = useState<estado_general[]>([]);

    useEffect(() => {
        const xpath = env.API_PATH + "/ages/sistema/obtener";
        fetch(xpath)
            .then((res) => res.json())
            .then((data) => {
                data = distintos(data);
                setDatas(data);
            });
    }, []);

    const columns: MRT_ColumnDef<estado_general>[] = [
        {
            accessorKey: 'exe_ges_FECHA', //access nested data with dot notation
            header: 'GES',
            minSize: 30, //min size enforced during resizing
            maxSize: 60, //max size enforced during resizing
            size:30,       
            Cell: ({ cell }) => (
              <span onClick={() => onSistemaSelect(cell.getValue<string>())}>{fecha_grilla(cell.getValue<string>(),true)}</span>
            ),        
          },  
    ];

    return (
        <MaterialReactTable
            columns={columns}
            data={datas}
            initialState={{
                density: 'compact',
                sorting: [
                    {
                        id: 'exe_ges_FECHA',
                        desc: false,
                    },
                ],
            }}
        />
    );
}

export default TablaSistemas2;