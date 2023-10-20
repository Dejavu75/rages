/* eslint-disable jsx-a11y/alt-text */
import "./framework/menu.css"

import React from "react";

export function Encabezado() {
    return (
        <header>
            <span>
                <a href="https://bo.solinges.com.ar" target="_blank" rel="noopener noreferrer">
                    <img className="Seal" src="images/solinges.png" />
                </a>
            </span>
            <span className="headicon">
                <span className="headicon" >
                    <span className="menuitem boxed"><a href="/sistemas">SISTEMAS</a></span>
                    <span className="menuitem boxed"><a href="/indices">ÍNDICES</a></span>
                    <span className="menuitem boxed"><a href="/analitycs/ingresos">INGRESOS</a></span>                    
                </span>
                <span className="headicon">
                    <span><a href="https://bo.solinges.com.ar" target="_blank" rel="noreferrer"><img className="logoicon" src="images/logo_nuevo_chico.ico" /></a></span>
                </span>
            </span>
        </header>
    )
}