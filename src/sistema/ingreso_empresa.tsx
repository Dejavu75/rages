import { LineChart } from '@mui/x-charts/LineChart';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

interface Ingresos {
  Key_sistema: string;
  Hora: string;
  Cantidad: number;
  Usuario: number;
}

function GraficoIngresosPorEmpresa() {
  const [datas, setDatas] = useState<Ingresos[]>([]);
  const { key_sistema } = useParams<{ key_sistema: string }>();
  useEffect(() => {
    let xpath = `http://localhost:3001/ages/analitycs/inicios_por_empresa`;
    if (key_sistema) {
      xpath = `http://localhost:3001/ages/analitycs/inicios_por_empresa/${key_sistema}`;
    }
    console.log(xpath);
    fetch(xpath)
      .then((res) => res.json())
      .then((data) => {
        let indices: Ingresos[] = [];
        data.forEach((element: any) => {
          indices.push({
            Key_sistema: element.Key_sistema,
            Hora: element.Hora,
            Cantidad: element.Cantidad,
            Usuario: 0
          });
        });
        setDatas(indices);
      });

  }, [key_sistema]);

  if (datas.length === 0) return <></>;

  let xaxis = [{ data: datas.map((item) => item.Hora) }];
  let xseries = [{ data: datas.map((item) => item.Cantidad) }];

  return (
    <div>
      <h1>Ingresos por empresa</h1>
      <LineChart xAxis={xaxis} series={xseries} width={500} height={300} />
    </div>
  );
}

export default GraficoIngresosPorEmpresa;