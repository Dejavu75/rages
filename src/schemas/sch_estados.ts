export type json_trafico = {
  res_object: {}
  errmsg: string
  res_json: string
  res_mensaje: string
  res_file: string
  res_filename: string
  res_tipo: number
  status: string
  trafico_id: string
  res_tempurl: string
  res_codigo: string
  res_coll: []
  errcol: number
  errmessage: string
  errcod: number
  codificado: boolean
  AutoCodificar: boolean
}

export interface directorios {
  dir_inst: string
  dir_local: string
  dir_sistema: string
  dir_tablas: string
}

type json_trafico_Type = json_trafico

export interface recibir_estado_general extends json_trafico_Type {
  "res_object": estado_general
}
export interface json_respuestas extends json_trafico { }

export interface estado_general {
  exe_ges2k_fecha: Date
  exe_ges_actualizador_fecha: Date
  exe_ges_fecha: Date
  fecha: Date
  id_sistema: string
  nombre: string
  url_dyndns: string
  version_system: number
  ultimo_backup: string
  localizacion: number
  subsistema: number
  sucpropia: number
  ip_publico: string
  ip_publico_dyndns: string
  directorios: directorios
  dev_env: number
  licencia_estado: number
  licencia_mensaje: string
  licencia_validacion: string
  hay_comandos: number
  key_sistema: string
  Comandos_JSON: string
  Comandos: EG_Comandos
  rama: string
  desdegestask: boolean
  desde_gestask_fecha: Date
  exe_ges_act_fecha: Date
  url: string  
}

export interface recibir_comando_resultado extends json_trafico_Type {
  "res_object": EG_Comando
}
export interface EG_Comando extends json_trafico{
  id_comando: number
  key_sistema: string
  valido_desde: Date
  valido_hasta: Date
  comando: number
  datos_adicionales: string
  estado: number
  res_fecha: Date
  mostrar_ventana: boolean 
}
export interface EG_Comandos {
  collection_kv_collection: {
      collectionitems: EG_Comando_item[]
  }
}
export interface EG_Comando_item {
      key: string
      value: EG_Comando
}

