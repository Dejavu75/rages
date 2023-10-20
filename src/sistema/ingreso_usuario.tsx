import { useEffect, useState } from 'react';
import { LineChart } from '@mui/x-charts/LineChart';
import { useParams } from 'react-router-dom';
import { nagesConfig } from '../funciones';
import IngresoMenu from './ingreso_menu';
export interface Ingresos {
  Key_sistema: string
  Hora: number
  Cantidad: number
  Usuario: number
}
export function GraficoIngresosPorUsuario() {
  return (
    <>
    <div className="boxedfit" >
      <h3>Ingresos por usuario</h3>
    </div>
      <IngresoMenu />
      <div className="boxed" >
        <GraficoIngresosPorUsuario2 />
      </div>
    </>)
}

function GraficoIngresosPorUsuario2() {
  const [datas, setDatas] = useState<Ingresos[]>([]);
  const { key_sistema } = useParams<{ key_sistema: string }>();
  const { user } = useParams<{ user: string }>();
  const nagesc: nagesConfig = new nagesConfig();
  useEffect(() => {
    console.log("useEffect")
    let xpath = nagesc.API_PATH + `/ages/analitycs/inicios_por_usuario`
    if (key_sistema) {
      xpath = nagesc.API_PATH + `/ages/analitycs/inicios_por_usuario/${key_sistema}`;
    }
    if (user) {
      xpath = nagesc.API_PATH + `/ages/analitycs/inicios_por_usuario/${key_sistema}/${user}`;
    }
    console.log(xpath);
    fetch(xpath)
      .then((res) => res.json())
      .then((data) => {
        let indices: Ingresos[] = [];
        console.log("data")
        console.log(data)

        data.forEach((element: any) => {
          indices.push({
            Key_sistema: element.Key_sistema,
            Hora: element.Hora,
            Cantidad: element.Cantidad,
            Usuario: element.Usuario
          });
        }
        )
        console.log("setdatas")
        setDatas(indices)
      });
  }, [key_sistema, user, nagesc.API_PATH]);
  if (datas.length === 0) return <></>
  console.log("datas")
  console.log(datas)
  let xaxis = [{ data: datas.map((item) => item.Hora) }];
  const total = datas.reduce((acc, curr) => acc + curr.Cantidad, 0);
  let xseries = [{ data: datas.map((item) => (item.Cantidad / total) * 100) }];


  //let xaxis=[{ data: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10] }]
  //let xseries=[{data:[2, 3, 5.5, 8.5, 1.5, 5, 1, 4, 3, 8]}]


  return <LineChart
    xAxis={xaxis}
    series={xseries}
    width={500}
    height={300}
  />
}

//export default  GraficoIngresosGeneral