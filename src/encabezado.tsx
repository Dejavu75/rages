/* eslint-disable jsx-a11y/alt-text */
import "./framework/menu.css"

import React from "react";

export function Encabezado() {
    return (
        <header>
            <span>
                <a href="https://nages.solinges.com.ar" target="_blank" rel="noopener noreferrer">
                    <img className="Seal" src="/images/solinges.png" />
                </a>
            </span>
            <span className="headicon">
                <span className="headicon" >
                    <span className="menuitem boxed"><a href="/sistemas">SISTEMAS</a></span>
                    <span className="menuitem boxed"><a href="/indices">ÍNDICES</a></span>
                    <span className="menuitem boxed"><a href="/analytics/ingresos">INGRESOS</a></span>                    
                    <span className="menuitem boxed"><a href="/datos/incoterms">INCOTERMS</a></span>                         
                    <span className="menuitem boxed"><a href="/analytics/afip">AFIP</a></span>                         
                </span>
                <span className="headicon">
                    <span><a href="https://nages.solinges.com.ar" target="_blank" rel="noreferrer"><img className="logoicon" src="/images/logo_nuevo_chico.ico" /></a></span>
                </span>
            </span>
        </header>
    )
}