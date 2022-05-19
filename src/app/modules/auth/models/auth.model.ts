
export class UserLoginModel {
    id: string;
    id_usuario: string;
    urole: string;
    perfil: string;
    usuario_nombre: string;
    alias: string;
    nombre_completo: string;
    profesion: string;
    identificacion: string;
    genero: string;
    user_data: user_data[];
    user_claims: user_claims[];
}
export class user_data {
    email_institucional : string;
    email_personal : string;
    telefono_institucional : string;
    telefono_movil : string;    
    direccion_fisica : string;
}
export class user_claims {
    md_id : string;
    module : string;
    md_title : string;
    md_link : string;
    md_icon : string;
    ft_id : string;
    feature : string;
    ft_title : string;
    ft_link : string;
    ft_icon : string;
    can_access : boolean;
    can_edit : boolean;
}
export class UsuarioMenuModelo
{
    Id: number;
    RolId: number;
    NombreRol: string;
    NoDocumento: string;
    TipoDocumento: string;
    Nombres: string;
    Apellidos: string;
    Email: string;
    user_claims: string;
}