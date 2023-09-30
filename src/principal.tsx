import React from "react";
import TablaSistemas from "./sistema/sistemas";
import './framework/estilos.css';
import './framework/principal.css';
import TablaIndices from "./sistema/indices/indices";
import { BrowserRouter, Routes, Route } from 'react-router-dom';
export function Principal() {
  return (

    <div className="principal" >

      <div className="enfiladoinfo"  >

          <BrowserRouter>
            <Routes>
              <Route path="/">
                <Route path="/indices" element={<TablaIndices />} />
                <Route path="/sistemas" element={<TablaSistemas />} />
              </Route>
            </Routes>
          </BrowserRouter>
      </div>
    </div>
  )
}
