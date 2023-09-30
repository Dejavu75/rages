import React from "react";

export function Encabezado() {
    return (
        <header>
            <span>
                <a href="https://bo.solinges.com.ar" target="_blank">
                    <img className="Seal" src="images/solinges.png" />
                </a>
            </span>
            <span className="headicon">
                <span className="headicon" >
                    <span className="headtext boxed"><a href="/sistemas">SISTEMAS</a></span>
                    <span className="headtext boxed"><a href="/indices">ÍNDICES</a></span>
                </span>
                <span className="headicon">
                    <span><a href="https://bo.solinges.com.ar" target="_blank"><img className="logoicon" src="images/logo_nuevo_chico.ico" /></a></span>
                </span>
            </span>
        </header>
    )
}