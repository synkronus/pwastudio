export class AuditableFields {
    usuario?: string;
    usuarioCrea?: string;
    usuarioModifica?: string;
    fechaModifica?: string;
}


 export interface GenericFilterResponse<T> {
    total?: number
    data?: T
  }
  