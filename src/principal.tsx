import React from "react";
import TablaSistemas from "./sistema/sistemas/sistemas";
import './framework/estilos.css';
import './framework/principal.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { GraficoIngresosGeneral } from "./sistema/ingreso_general";
import GraficoIngresosPorEmpresa from "./sistema/ingreso_empresa";
import { GraficoIngresosPorUsuario } from "./sistema/ingreso_usuario";
import TablaIndices from "./sistema/indices/indices";
import { Ingresos } from "./sistema/ingresos";
import { Afip } from "./sistema/afip";

export function Principal() {
  return (

    <div className="principal" >
      <div className="enfiladoinfo"  >
        <BrowserRouter>
          <Routes>
            <Route path="/indices" element={<TablaIndices />} />
            <Route path="/sistemas" element={<TablaSistemas />} />
            <Route path="/analytics/ingresos" element={<Ingresos />} />
            <Route path="/analytics/ingresos_general" element={<GraficoIngresosGeneral />} />
            <Route path="/analytics/ingresos_por_empresa" element={<GraficoIngresosPorEmpresa />} />
            <Route path="/analytics/ingresos_por_empresa/:key_sistema" element={<GraficoIngresosPorEmpresa />} />
            <Route path="/analytics/ingresos_por_usuario" element={<GraficoIngresosPorUsuario />} />
            <Route path="/analytics/ingresos_por_usuario/:key_sistema" element={<GraficoIngresosPorUsuario />} />
            <Route path="/analytics/ingresos_por_usuario/:key_sistema/:user" element={<GraficoIngresosPorUsuario />} />
            <Route path="/analytics/afip" element={<Afip />} />
            <Route path="/" element={<Afip />} />
          </Routes>
        </BrowserRouter>
      </div>
    </div>
  )
}
