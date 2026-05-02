export interface Distrito {
  id: number;
  codigo: string;
  nombre: string;
  idMunicipio: number;
}

export interface Municipio {
  id: number;
  codigo: string;
  nombre: string;
  idDepartam: number;
  distritos: Distrito[];
}
