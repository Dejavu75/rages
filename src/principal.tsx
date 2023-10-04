import React from "react";
import TablaSistemas from "./sistema/sistemas";
import './framework/estilos.css';
import './framework/principal.css';
import TablaIndices from "./sistema/indices/indices";
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { GraficoIngresosGeneral } from "./sistema/ingreso_general";
import GraficoIngresosPorEmpresa from "./sistema/ingreso_empresa";
import { GraficoIngresosPorUsuario } from "./sistema/ingreso_usuario";
export function Principal() {
  return (

    <div className="principal" >

      <div className="enfiladoinfo"  >

        <BrowserRouter>
          <Routes>
            <Route path="/indices" element={<TablaIndices />} />
            <Route path="/sistemas" element={<TablaSistemas />} />
            <Route path="/analitycs/ingresos_general" element={<GraficoIngresosGeneral />} />
            <Route path="/analitycs/ingresos_por_empresa" element={<GraficoIngresosPorEmpresa />} />
            <Route path="/analitycs/ingresos_por_empresa/:key_sistema" element={<GraficoIngresosPorEmpresa />} />
            <Route path="/analitycs/ingresos_por_usuario" element={<GraficoIngresosPorUsuario />} />
            <Route path="/analitycs/ingresos_por_usuario/:key_sistema" element={<GraficoIngresosPorUsuario />} />
            <Route path="/analitycs/ingresos_por_usuario/:key_sistema/:user" element={<GraficoIngresosPorUsuario />} />

            <Route path="*" element={<GraficoIngresosPorEmpresa />} >
            </Route>
          </Routes>
        </BrowserRouter>
      </div>
    </div>
  )
}
