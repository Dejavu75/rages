import { useEffect, useState } from 'react';
import { LineChart } from '@mui/x-charts/LineChart';
import { nagesConfig } from '../funciones';
import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';
import Alert, { AlertColor } from '@mui/material/Alert';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import 'dayjs/locale/es-mx';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import dayjs from 'dayjs';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';

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
        <h3>Actividad registrada del GES sobre la AFIP</h3>
      </div>
      <div className="boxed" >
        <GraficoActividad />
      </div>
    </>)
}
const ejemplo: Date = new Date(2023, 8, 1, 10, 16, 0)

function GraficoActividad() {
  const [datas, setDatas] = useState<FCEAct[]>([]);
  const [minutos, setMinutos] = useState<number>(120);
  const [agrupado, setAgrupado] = useState<number>(2);
  const [hasta, setHasta] = useState<Date>(new Date());
  const nagesc: nagesConfig = new nagesConfig();
  useEffect(() => {
    let xpath = nagesc.API_PATH + `/ages/analitycs/facturacion/actividad/` + agrupado.toString() + "/" + minutos.toString() + "/" + hasta.toISOString();
   // console.log(xpath)
    fetch(xpath)
      .then((res) => res.json())
      .then((data) => {
        // console.log(data)
        setDatas(data)
      });
  }, [agrupado, hasta, minutos, nagesc.API_PATH]);
  let xdAxis: Date[] = []
  let xdSeries1: number[] = []
  let xdSeries2: number[] = []
  let maximo: FCEAct = { intervalo: "", date: "", date2: new Date(), cantidad1: 0, cantidad2: 0, timestamp: 0 }
  let minimo: FCEAct = { intervalo: "", date: "", date2: new Date(), cantidad1: 0, cantidad2: 0, timestamp: 0 }
  let AlertaSeveridad: AlertColor = "success"
  let AlertaTexto: string = "No hay inestabilidad en el período mostrado"

  let hasta2 = dayjs(hasta)
  let total: number=0

  if (datas.length > 0) {

    datas.forEach((item) => {
      item.date2 = new Date(item.date)
      xdAxis.push(item.date2)
      let cantidad1: any = item.cantidad1
      let cantidad2: any = item.cantidad2
      item.cantidad1 = parseInt(cantidad1)
      item.cantidad2 = parseInt(cantidad2)
      total+=item.cantidad1+item.cantidad2
      xdSeries1.push((item.cantidad1 / (item.cantidad1 + item.cantidad2) * 100))
      xdSeries2.push((item.cantidad2 / (item.cantidad1 + item.cantidad2) * 100))
      if ((item.cantidad2 / (item.cantidad1 + item.cantidad2) * 100) > 15) {
        AlertaSeveridad = 'error'
        AlertaTexto = "Hubo inestabilidad en el servicio en el período mostrado"
      }

    })
    AlertaTexto += " sobre "+(total).toString() + " operaciones"

    maximo = datas.reduce((acc, curr) => {
      if (acc.date2.getTime() > curr.date2.getTime()) {
        return acc
      } else {
        return curr
      }
    });

    minimo = datas.reduce((acc, curr) => {
      if (acc.date2.getTime() < curr.date2.getTime()) {
        return acc
      } else {
        return curr
      }
    });
  } else {
    AlertaSeveridad = 'info'
    AlertaTexto = "No hay datos en el período dado"
    xdAxis.push(new Date())
    xdSeries1.push(0)
    xdSeries2.push(0)
  }


  const valueFormatter = (date: Date) => {
    return date.toLocaleDateString('es-AR', {
      hour: 'numeric',
      minute: 'numeric'
    }).slice(10)

  }
  const labelFormatter = (value: number) => {
    return `${value}%`
    }
  const percentFormater = (value: number) =>
    (value / 100).toLocaleString('es-AR', {
      style: 'percent',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    });
  let xseries = [{ data: xdSeries1, label: "Ok", color: "green", showMark: false, valueFormatter: percentFormater }, { data: xdSeries2, label: "Error", color: "#D00000", showMark: false, valueFormatter: percentFormater }]

  minimo.date2.setMinutes(maximo.date2.getMinutes() - minutos)
  const cambioMinutos = (
    event: Event,
    newValue: number | number[],
    activeThumb: number,
  ) => {
    let xnum: any = newValue
    setMinutos(xnum)
  }
  const cambioAgrupado = (
    event: Event,
    newValue: number | number[],
    activeThumb: number,
  ) => {
    let xnum: any = newValue
    setAgrupado(xnum)
  }
  return (
    <Box sx={{ width: '100%' }} >
      <Alertar severidad={AlertaSeveridad} texto={AlertaTexto} />
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
          { 
            id: 'linearAxis', 
            scaleType: 'linear', 
            max: 105 ,
        }
          
        ]}
        leftAxis="linearAxis"
        series={xseries}
        height={400}
        width={600}
      />

      <div id="sell" style={{ display: 'flex', justifyContent: 'space-between', verticalAlign: 'middle' }}>
        <div style={{ width: '47%' }}>
          <Stack direction="row">
            <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="es-mx">
              <DateTimePicker
                label="Hasta cuando se muestra"
                value={hasta2}
                onChange={(newValue) => {
                  //console.log(newValue)
                  setHasta(newValue ? newValue.toDate() : new Date())
                }}
              />

            </LocalizationProvider>
            <Stack  direction="column" >
              <Button size="small" variant="contained" onClick={() => { setHasta(ejemplo) }}>Ejemplo</Button>
              <Button size="small" variant="contained" onClick={() => { setHasta(new Date()) }}>Ahora</Button>
            </Stack>
          </Stack>
        </div>
        <div style={{ width: '5%' }}></div>
        <div style={{ width: '47%' }}>
          <div>Agrupado cada {agrupado} minutos</div>
          <div>
            <Slider
              value={agrupado}
              valueLabelDisplay="auto"
              onChange={cambioAgrupado}
              min={2}
              max={60}
              sx={{ mt: 1 }}
            />
          </div></div>
      </div>
      <div>
        <div>Mostrando {minutos} minutos previos</div>
        <div>
          <Slider
            value={minutos}
            valueLabelDisplay="auto"
            onChange={cambioMinutos}
            min={2}
            max={60 * 12}
            sx={{ mt: 1 }}
          />
        </div>

      </div>
    </Box>

  )
}
type AlertaProp = {
  severidad: AlertColor
  texto: string
}
function Alertar(propiedades: AlertaProp) {
  if (propiedades.texto) {
    return <Alert severity={propiedades.severidad}>{propiedades.texto}</Alert>
  } else {
    return <></>
  }
}

