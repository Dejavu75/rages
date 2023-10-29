/* eslint-disable @typescript-eslint/no-unused-vars */
import { useEffect, useMemo, useState } from 'react';
import {
  MaterialReactTable, useMaterialReactTable, type MRT_ColumnDef,
  type MRT_Row,
  type MRT_TableOptions,
  MRT_TableInstance,
} from 'material-react-table'

import {
  Box,
  Button,
  IconButton,
  Tooltip,
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { actualizarIncoterm, borrarIncoterm } from './mod_incoterms';
import {
  QueryClient,
  QueryClientProvider,
  useMutation,
  useQuery,
  useQueryClient,
} from '@tanstack/react-query';
import { nagesConfig } from '../../funciones';
export type incoterm = {
  codigo: number
  incoterm: string
  descr: string
}
const queryClient = new QueryClient();
const nConf: nagesConfig = new nagesConfig()

function TablaIncoterms() {
  return (
    <><div className="boxedfit" >
      <h3>Incoterms definidos en el sistema</h3>
    </div>
      <div className="boxed" >
        <QueryClientProvider client={queryClient}>
          <TablaIndices2 />
        </QueryClientProvider>
      </div>
    </>)
}
function TablaIndices2() {
  
  const [datas, setDatas] = useState<incoterm[]>([]);
  const [reloads, setReload] = useState<number>(0);
  useEffect(() => {
    let xpath = nConf.API_PATH + "/ages/tablas/incoterms/";
    fetch(xpath)
      .then((res) => res.json())
      .then((data) => {
        setDatas(data)
      });
  }, [reloads]);

  const columns = useMemo<MRT_ColumnDef<incoterm>[]>(
    () => [
      {
        accessorKey: 'codigo',
        header: 'Cód',
        maxsize: 50,
        size: 6,
        enableEditing: false,
      },
      {
        accessorKey: 'incoterm',
        header: 'Incoterm',
        maxsize: 50,
        size: 30,
      },
      {
        accessorKey: 'descr',
        header: 'Descripción',
        maxsize: 400,
      },
    ],
    [],
  );
  let props: propsBotonera = {
    abm: 0,
    incoterm: {
      codigo: 0,
      incoterm: '',
      descr: '',
    },
  }

  const handleCreateUser: MRT_TableOptions<incoterm>['onCreatingRowSave'] = async ({
    values,
    table,
  }) => {
    await actualizarIncoterm(values)
    table.setCreatingRow(null);
    handlesetReload(values.codigo)    
  };

  //UPDATE action
  const handleSaveUser: MRT_TableOptions<incoterm>['onEditingRowSave'] = async ({
    values,
    table,
  }) => {
    await actualizarIncoterm(values)
    table.setEditingRow(null);
  };
  const { mutateAsync: deleteIncoterm, isPending: isDeletingIncoterm } = useDeleteIncoterm();


  //DELETE action
  const handlesetReload = (codigo: number) => {
    console.log("hook par")
    setReload(codigo);
    return codigo
  };

  const openDeleteConfirmModal = (row: MRT_Row<incoterm>, handlesetReload: ((codigo: number) => number)) => {
    if (window.confirm('Está seguro de borrar este Incoterm?')) {

      deleteIncoterm(row.original.codigo).then(() => {
        console.log("Borro")
        handlesetReload(row.original.codigo) // Agrega un log que diga "hecho"
      })
      console.log("deleted " + row.original.codigo.toString())

    }
  };
  function useDeleteIncoterm() {
    const queryClient = useQueryClient();
    return useMutation({
      mutationFn: async (incotermCodigo: number) => {
        await borrarIncoterm(incotermCodigo)
        await new Promise((resolve) => setTimeout(resolve, 1000)); //fake api call
        return Promise.resolve();
      },
      //client side optimistic update
      onMutate: (incotermCodigo: number) => {
        queryClient.setQueryData(
          ['incoterm'],
          (prevUsers: any) =>
            prevUsers?.filter((incoterm: incoterm) => incoterm.codigo !== incotermCodigo),
        );
      },
      // onSettled: () => queryClient.invalidateQueries({ queryKey: ['users'] }), //refetch users after mutation, disabled for demo
    });
  }

  const table = useMaterialReactTable({
    columns, data: datas,
    createDisplayMode: 'row',
    editDisplayMode: 'row',
    enableEditing: true,
    onCreatingRowSave: handleCreateUser,
    onEditingRowSave: handleSaveUser,
    initialState: {
      density: 'compact',
      sorting: [{ id: 'incoterm', desc: false, },],
      pagination: { pageSize: 20, pageIndex: 0 }
    },
    muiPaginationProps: {
      color: 'secondary',
      rowsPerPageOptions: [20, 50, 200],
      shape: 'rounded',
      variant: 'outlined',
      defaultValue: 20,
    },
    renderRowActions: ({ row, table }) => (
      <Box sx={{ display: 'flex', gap: '1rem' }}>
        <Tooltip title="Editar">
          <IconButton onClick={() => table.setEditingRow(row)}>
            <EditIcon />
          </IconButton>
        </Tooltip>
        <Tooltip title="Borrar">
          <IconButton color="error" onClick={() => openDeleteConfirmModal(row, handlesetReload)}>
            <DeleteIcon />
          </IconButton>
        </Tooltip>
      </Box>
    ),
    renderTopToolbarCustomActions: ({ table }) => (
      <Button
        variant="contained"
        onClick={() => {
          table.setCreatingRow(true);
        }}
      >
        Crear
      </Button>
    ),
  })

  return < MaterialReactTable table={table} />

}

interface propsBotonera {
  abm: number
  incoterm: incoterm
}


export default TablaIncoterms;

