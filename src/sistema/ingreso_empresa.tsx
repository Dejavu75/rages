/* eslint-disable @typescript-eslint/no-unused-vars */
import { LineChart } from '@mui/x-charts/LineChart';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { nagesConfig } from '../funciones';
import SelectorEmpresas, { SelectorEmpresas2, SelectorEmpresas3, Sistema } from './sistemas/selector_empresas';
import { selectorProps } from './sistemas/selector_empresas';
import IngresoMenu from './ingreso_menu';
export interface Ingreso {
  Key_sistema: string;
  Hora: string;
  Cantidad: number;
  Usuario: number;
}

function GraficoIngresosPorEmpresa() {
  const [datas, setDatas] = useState<Ingreso[]>([]);
  const { key_sistema } = useParams<{ key_sistema: string }>();
  const [key_sistema2, setKeys2] = useState<string>("");

  let key_sistema_final = key_sistema ?? key_sistema2;

  const handlesetKeys2 = (Key_Sistema: string) => {
    setKeys2(Key_Sistema);
  };
  const nagesc: nagesConfig = new nagesConfig();
  useEffect(() => {
    let xpath = nagesc.API_PATH + `/ages/analitycs/inicios_por_empresa`;
    if (key_sistema_final) {
      xpath = nagesc.API_PATH + `/ages/analitycs/inicios_por_empresa/${key_sistema_final}`;
    }

    //console.log(xpath);
    fetch(xpath)
      .then((res) => res.json())
      .then((data) => {
        //let ingresos: Ingresos[] = [];
        // data.forEach((element: any) => {
        //   ingresos.push({
        //     Key_sistema: element.Key_sistema,
        //     Hora: element.Hora,
        //     Cantidad: element.Cantidad,
        //     Usuario: 0
        //   });
        // });
        setDatas(data);
      });

  }, [key_sistema, key_sistema2, key_sistema_final, nagesc.API_PATH]);

  if (datas.length === 0) return <></>;

  let xaxis = [{ data: datas.map((item) => item.Hora) }];
  const total = datas.reduce((acc, curr) => acc + curr.Cantidad, 0);
  let xseries = [{ data: datas.map((item) => (item.Cantidad / total) * 100) }];

  let ingresos: Ingreso[] = datas.reduce((acc: Ingreso[], curr: Ingreso) => {
    let existing = acc.find((item) => item.Key_sistema === curr.Key_sistema);
    if (existing) {
      existing.Cantidad += curr.Cantidad;
    } else {
      acc.push({
        Key_sistema: curr.Key_sistema,
        Hora: "",
        Cantidad: 0,
        Usuario: 0
      });
    }
    return acc;
  }, []);


  const oProps: selectorProps = {
    sistemas: ingresos.map((item) => (
      {
        Key_Sistema: item.Key_sistema,
        ID_Sistema: item.Key_sistema,
        Cantidad: 0,
        Usuario: 0
      }
    ))
    , handlesetKeys2: handlesetKeys2
  };

  return (
    <>
      <div>
        <div className="boxed">
          <div>
            <h2>Ingresos por empresa</h2>
          </div>
        </div>
        <IngresoMenu />
        <div><SelectorEmpresas3 sistemas={oProps.sistemas} onSistemaClick={function (Key_Sistema: string): void {
          oProps.handlesetKeys2(Key_Sistema);
        }} /></div>
        <div className="boxed">
          <LineChart xAxis={xaxis} series={xseries} width={500} height={300} />
        </div>
      </div >

    </>
  );
}

export default GraficoIngresosPorEmpresa;