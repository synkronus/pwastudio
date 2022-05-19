import { AuditableFields } from "../../../shared/models/common.models";

export class CategoriesDto extends AuditableFields {
    id?: number;
    nombre: string;
    descripcion: string;
    estado:	boolean;
    items: CategoryItemsDto[];
}

export class CategoryItemsDto extends AuditableFields {
    id?: number;
    categoriaId: number;
    nombre: string;
    descripcion: string;
    codigo: string;
    estado:	boolean;
}

export class CategoriesCrudDto  {
    id?: number;
    nombre: string;
    descripcion: string;
    estado:	number;
}

export class CategoryItemCrudDto  {
    id?: number;
    categoriaId: number;
    nombre: string;
    descripcion: string;
    estado:	number;
}

export class CategoryDataMdl {
    category: CategoriesDto;
    categoryItemsList:CategoryItemsDto[]
  }

export const Statuses = [
    { label: "Inactivo", value: 0 },
    { label: "Activo", value: 1 }
]
