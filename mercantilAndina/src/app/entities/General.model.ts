export interface CodeDescription {
  desc: string;
  codigo: string;
}

export interface Coverage {
  numero: number;
  costo: number;
  producto: string;
  texto: string;
  franquicia: number;
  codigoProducto: number;
  titulo: string;
  descripcion: string;
  puntaje: number;
  granizo: boolean;
}

export interface GeoLatLong {
  lat: number;
  lon: number;
}

export interface Provincia {
  centroide: GeoLatLong;
  id: string;
  nombre: string;
}

export interface Provincias {
  cantidad: number;
  inicio: number;
  parametros: any;
  provincias: Provincia[];
  total: number;
}


export interface Parametros {
  campos: string[];
  max: number;
  provincia: string[];
}

export interface Municipio  {
    id: string;
    nombre: string;
}

export interface Municipios {
  cantidad: number;
  inicio: number;
  municipios: Municipio[];
  parametros: Parametros;
  total: number;
}
