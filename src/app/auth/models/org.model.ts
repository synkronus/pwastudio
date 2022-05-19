export class UserPermissionsModel {
    id: string;
    company_position: string;
    name: string;
    lastname: string;
    normalized_name: string;
    identification: string;
    gender: string;
    profession: string;
    status: string;
    fk_data: string;
    created_at: string;
    user_created: string;
    last_updated: string;
    user_updated: string;
    active: string;
    user_data: userPermissionData[];
    user_login: userPermissionslogin[];
}

export class userPermissionData {
    id: string;
    business_email: string;
    personal_emal: string;
    address: string;
    city: string;
    mobile_number: string;
    phone_number: string;
    postal_code: string;
    fk_data: string;
    created_at: string;
    user_created: string;
    last_updated: string;
    user_updated: string;
    active: string;
}

export class userPermissionslogin {   
    id: string;
    urole: string;
    profile: string;
    username: string;
    user_alias: string;
    password: string;
    two_factor_auth: string;
    active_dir_auth: string;
    custom_auth: string;
    status: string;
    fk_data: string;
    created_at: string;
    user_created: string;
    last_updated: string;
    user_updated: string;
    active: string;
    user_claims: any[];
}

export class userPermissionsclaims {
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
