export interface MunicipioDepartamento {
  id: number;
  codigo: string;
  nombre: string;
  idDepartamento: number;
  distritos: any[];
}

export interface Departamento {
  id: number;
  codigo: string;
  nombre: string;
  municipios: MunicipioDepartamento[];
}
