import { useEffect, useState } from 'react';
import { LineChart } from '@mui/x-charts/LineChart';
import { nagesConfig } from '../funciones';
import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';
import Alert from '@mui/material/Alert';

export interface FCEAct {
  intervalo: string
  date: string
  date2: Date
  cantidad1: number
  cantidad2: number
  timestamp: number
}
export function Afip() {
  return (
    <>
      <div className="boxedfit" >
        <h3>Actividad sobre la AFIP</h3>
      </div>
      <div className="boxed" >
        <GraficoActividad />
      </div>
    </>)
}

function GraficoActividad() {
  const [datas, setDatas] = useState<FCEAct[]>([]);
  const [minutos, setMinutos] = useState<number>(10);  
  const nagesc: nagesConfig = new nagesConfig();
  useEffect(() => {
    let xpath = nagesc.API_PATH + `/ages/analitycs/facturacion/actividad/2`;
    fetch(xpath)
      .then((res) => res.json())
      .then((data) => {
        setDatas(data)
      });
  }, [nagesc.API_PATH]);
  if (datas.length === 0) {
    return <></>
  }


  // console.log("datas axis")
  let xdAxis: Date[] = []
  let xdSeries1: number[] = []
  let xdSeries2: number[] = []
  
  datas.forEach((item) => {
    item.date2=new Date(item.date)
    xdAxis.push(item.date2)
    let cantidad1:any=item.cantidad1
    let cantidad2:any=item.cantidad2
    item.cantidad1=parseInt(cantidad1)
    item.cantidad2=parseInt(cantidad2)
    xdSeries1.push((item.cantidad1 / (item.cantidad1+item.cantidad2) * 100))
    xdSeries2.push((item.cantidad2 / (item.cantidad1+item.cantidad2) * 100))
  })

  const valueFormatter = (date: Date) => {
    return date.toLocaleDateString('es-AR', {
      hour: 'numeric',
      minute: 'numeric'
    }).slice(10)
    
  }
    
    const percentFormater = (value: number) =>
    (value/100).toLocaleString('es-AR', {
      style: 'percent',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    });
  let xseries = [{ data: xdSeries1, label: "Ok", color: "green", showMark: false,valueFormatter: percentFormater }, { data: xdSeries2, label: "Error", color: "#D00000" , showMark: false, valueFormatter: percentFormater }]

  //  console.log("end datas")
  //let xaxis = [{data: [1,2,3,4,5]}]

  const minimo = datas.reduce((acc, curr) => {
    if (acc.date2.getTime()< curr.date2.getTime()){
      return acc
    } else {
      return curr
    }
  });
  const maximo = datas.reduce((acc, curr) => {
    if (acc.date2.getTime()> curr.date2.getTime()){
      return acc
    } else {
      return curr
    }
  });


  //let xseries=[{data:[2, 3, 5.5, 8.5, 1.5, 5, 1, 4, 3, 8]}]

  minimo.date2.setMinutes(maximo.date2.getMinutes() - minutos)
  const cambioMinutos = (
    event: Event,
    newValue: number | number[],
    activeThumb: number,
  ) => {
    let xnum: any=newValue
        setMinutos(xnum)
  }
  return (
    <Box sx={{ width: '100%' }} >
     <Alert severity="error">¡Atención! - Hubo problemas en la AFIP en los últimos 60 minutos. </Alert>
     <Alert severity="success">No se encontraron problemas en los últimos 60 minutos </Alert>
     <LineChart sx={{ width: "100%" }}
    xAxis={[
      {
        data: xdAxis,
        id: 'bottomAxis',
        scaleType: 'time',
        valueFormatter,
        label: 'Hora',
        min: minimo.date2,
        max: maximo.date2,      
      }
    ]}
    yAxis={[
      { id: 'linearAxis', scaleType: 'linear',  }
    ]}
    leftAxis="linearAxis"
    series={xseries}
    height={400}
    width={600}
  />
   <Slider
        value={minutos}
        valueLabelDisplay="auto"
        onChange={cambioMinutos}
        min={1}
        max={60*12}
        sx={{ mt: 1 }}
      />
  </Box>)
}

//export default  GraficoIngresosGeneral
