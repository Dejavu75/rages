/* eslint-disable @typescript-eslint/no-unused-vars */
import { useEffect, useMemo, useState } from 'react';
import MaterialReactTable, { MRT_ColumnDef } from 'material-react-table';
import env from "react-dotenv";
import { fecha_grilla } from '../funciones';
import { estado_general } from '../schemas/sch_estados';
import { GraficoIngresosGeneral } from './ingreso_general';

export function Ingresos() {
    return <>
        <GraficoIngresosGeneral />
    </>
}