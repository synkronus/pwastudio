export class Provincias {
    id: number;
    nombre: string;
    municipios : Municipios
}
export class Municipios {
    id: number;
    nombre: string;
    idProvincia: number;
    distritosMunicipales: DistritoMunicipal
    
}
export class DistritoMunicipal {
    id?: number;
    idMunicipio?: number;
    nombre?: string;
}

 export class Categorias {
    id?: number;
    nombre: string;
    descripcion: string;
    estado: number;
    items : ItemsCategoria[];
  }

 export class ItemsCategoria {
    id?: number;
    nombre: string;
    codigo?: string;
    descripcion: string;
    estado?: number;
  }

 export class ViaPrincipal {
    id?: number;
    nombre: string;
  }