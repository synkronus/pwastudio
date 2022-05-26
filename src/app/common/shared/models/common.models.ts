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

  export class MsgConfirmPopOver{
    key: string;
    acceptLabel: string;
    rejectLabel: string;
    message: string;
    icon: string;
    defaultFocus: string;
  }
