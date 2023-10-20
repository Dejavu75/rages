/* eslint-disable @typescript-eslint/no-unused-vars */
import { Listbox } from "@headlessui/react";
import { useState } from "react";
import Combobox from "react-widgets/Combobox";
import './selector_empresas.css';

export interface Sistema {
    Key_Sistema: string;
    ID_Sistema: string;
    Cantidad: number;
    Usuario: number;
}


export interface selectorProps {
    sistemas: Sistema[];
    handlesetKeys2: (Key_Sistema: string) => void;
}
export function SelectorEmpresas3({ sistemas, onSistemaClick }: { sistemas: Sistema[]; onSistemaClick: (Key_Sistema: string) => void }) {
    const [selectedSistema, setSelectedPerson] = useState(sistemas[0])
    const select2 = (sistema: Sistema) => {
        setSelectedPerson(sistema)
        onSistemaClick(sistema.Key_Sistema)
    }
    if (sistemas.length > 1) {
        return <>


            <div className="encolumnado flex_centrado">
                <div className="encolumnado flex_centrado boxed">
                    <div>Seleccione la empresa: </div>
                    <div style={{ width: "10px" }}></div>
                    <div>
                        <Listbox value={selectedSistema} onChange={select2}>
                            <Listbox.Button>{selectedSistema.Key_Sistema}</Listbox.Button>
                            <Listbox.Options>
                                {sistemas.map((sistema) => (
                                    <Listbox.Option key={sistema.Key_Sistema} value={sistema}>
                                        {sistema.Key_Sistema}
                                    </Listbox.Option>
                                ))}
                            </Listbox.Options>
                        </Listbox>
                    </div>
                </div>
                <div className="boxed menuitem" onClick={() => onSistemaClick("")} >Todas las empresas</div>
            </div>
        </>
    } else {
        let Key_Sistema = sistemas[0].Key_Sistema
        return (
            <>
                <div className="encolumnado flex_centrado">
                    <div className="encolumnado flex_centrado boxed">
                    <div>Datos de la empresa: {Key_Sistema}</div>
                        <div style={{ width: "10px" }}></div>
                        <div>
                        </div>
                    </div>
                    <div className="boxed menuitem" onClick={() => onSistemaClick("")} >Todas las empresas</div>
                </div>
            </>

        )
    }
}
export function SelectorEnSi({ sistemas, onSistemaClick }: { sistemas: Sistema[]; onSistemaClick: (Key_Sistema: string) => void }) {
}
export function SelectorEmpresas2({ sistemas, onSistemaClick }: { sistemas: Sistema[]; onSistemaClick: (Key_Sistema: string) => void }) {
    const [selectedSistema, setSelectedPerson] = useState(sistemas[0])
    const select2 = (sistema: Sistema) => {
        setSelectedPerson(sistema)
        onSistemaClick(sistema.Key_Sistema)
    }
    
    if (sistemas.length > 1) {
        return <>


            <div className="encolumnado flex_centrado">
                <div className="encolumnado flex_centrado boxed">
                    <div>Seleccione la empresa: </div>
                    <div style={{ width: "10px" }}></div>
                    <div>
                        <Combobox
                            data={sistemas}
                            dataKey='Key_Sistema'
                            textField='Key_Sistema'
                            placeholder="Seleccione la empresa"
                            onChange={value => {
                                if (typeof value !== 'string') {
                                    let Key_Sistema = value.Key_Sistema
                                    onSistemaClick(Key_Sistema)
                                }
                            }}
                        />
                    </div>
                </div>
                <div className="boxed menuitem" onClick={() => onSistemaClick("")} >Todas las empresas</div>
            </div>
        </>
    } else {
        let Key_Sistema = sistemas[0].Key_Sistema
        return (
            <>
                <div className="encolumnado flex_centrado">
                    <div className="encolumnado flex_centrado boxed">
                        <div>Datos de la empresa: {Key_Sistema}</div>
                        <div style={{ width: "10px" }}></div>
                        <div>
                        </div>
                    </div>
                    <div className="boxed menuitem" onClick={() => onSistemaClick("")} >Todas las empresas</div>
                </div>
            </>

        )
    }
}
export function SelectorEmpresas({ sistemas, onSistemaClick }: { sistemas: Sistema[]; onSistemaClick: (Key_Sistema: string) => void }) {
    console.log("largo", sistemas.length)
    if (sistemas.length > 1) {
        return (
            <>
                <div>Selector de empresas</div>
                {sistemas.map((sistema) => (
                    <div key={sistema.Key_Sistema} onClick={() => onSistemaClick(sistema.Key_Sistema)} >{sistema.ID_Sistema}</div>
                ))}

            </>
        )
    } else {
        return (
            <>
                <div className="boxed" onClick={() => onSistemaClick("")} >Todas las empresas</div>
            </>

        )
    }
}

export default SelectorEmpresas;