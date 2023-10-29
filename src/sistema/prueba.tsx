/* eslint-disable @typescript-eslint/no-unused-vars */
import { useEffect, useMemo, useState } from 'react';
import { MaterialReactTable, useMaterialReactTable,MRT_ColumnDef } from 'material-react-table'

import { fecha_grilla } from '../funciones';
import { estado_general } from '../schemas/sch_estados';
import ResumenSistemas from './sistemas/versiones';

interface InicioProps2 {
    onSistemaSelect: (Key_sistema: string) => void;
}

export default ResumenSistemas;