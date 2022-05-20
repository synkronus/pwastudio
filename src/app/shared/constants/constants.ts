
export const GRID_REF = {
    COLUNM: {
        COL_1: 'p-col-1',
        COL_2: 'p-col-2',
        COL_3: 'p-col-3',
        COL_4: 'p-col-4',
        COL_5: 'p-col-5',
        COL_6: 'p-col-6',
        COL_7: 'p-col-7',
        COL_8: 'p-col-8',
        COL_9: 'p-col-9',
        COL_10: 'p-col-10',
        COL_11: 'p-col-11',
        COL_12: 'p-col-12'
    },
    COLUNM_RESPONSIVE: {
        COL_1: 'p-sm-1 p-md-1 p-lg-1',
        COL_2: 'p-sm-2 p-md-2 p-lg-2',
        COL_3: 'p-sm-3 p-md-3 p-lg-3',
        COL_4: 'p-sm-4 p-md-4 p-lg-4',
        COL_5: 'p-sm-5 p-md-5 p-lg-5',
        COL_6: 'p-sm-6 p-md-6 p-lg-6',
        COL_7: 'p-sm-7 p-md-7 p-lg-7',
        COL_8: 'p-sm-8 p-md-8 p-lg-8',
        COL_9: 'p-sm-9 p-md-9 p-lg-9',
        COL_10: 'p-sm-10 p-md-10 p-lg-10',
        COL_11: 'p-sm-11 p-md-11 p-lg-11',
        COL_12: 'p-sm-3 p-md-6 p-lg-1'
    },
};

export const VALIDATION_CRITERIA = {
    EXPRESION_REGULAR: 'Expresión Regular',
    IGUAL_O_MAYOR: 'Igual o Mayor que',
    IGUAL_O_MENOR: 'Igual o Menor que',
    IGUAL: 'Igual',
    DIFERENTE: 'Diferente',
    NUM_MAX_CARACTERES: 'Número Máx de Caracteres',
    NUM_MIN_CARACTERES: 'Número Mín de Caracteres',
    EMAIL_VALIDO: 'Email',
    URL_VALIDA: 'Url',
}

export const SERVICE_LISTNAMES = {
    ESTADOS: {
        NAME: 'Estados',
        DEFAULT_VALUE: 'Activo'
    },
    RESTRICIONES: {
        NAME: 'Restricción',
        DEFAULT_VALUE: 'Mercado'
    },
    ZONAS: {
        NAME: 'Zona',
        DEFAULT_VALUE: ''
    },
    VISUAL: {
        NAME: 'Visual',
        DEFAULT_VALUE: ''
    },
    ESTATUS: {
        NAME: 'Estatus',
        DEFAULT_VALUE: 'Activo'
    },
    ILUMINACION: {
        NAME: 'Iluminación',
        DEFAULT_VALUE: ''
    },
    SENTIDO_CARDINAL: {
        NAME: 'SentidoCardinal',
        DEFAULT_VALUE: ''
    },
    UNIDADES_METRICAS: {
        NAME: 'Unidades',
        DEFAULT_VALUE: 'Metros'
    },
    MATERIALES: {
        NAME: 'Material',
        DEFAULT_VALUE: ''
    },
    NIVELSE: {
        NAME: 'NivelSocioeconomico',
        DEFAULT_VALUE: ''
    },
    PAIS: {
        NAME: 'Pais',
        DEFAULT_VALUE: ''
    },
    PROVINCIAS: {
        NAME: 'Provincia',
        DEFAULT_VALUE: []
    },
    MUNICIPIOS: {
        NAME: 'Municipio',
        DEFAULT_VALUE: []
    },
    AYUNTAMIENTOS: {
        NAME: 'Ayuntamiento',
        DEFAULT_VALUE: []
    },
    DISTRITOS: {
        NAME: 'DistritosMunicipales',
        DEFAULT_VALUE: []
    },
    PROVINCIAS_TRAVERSY_DATA: {
        NAME: 'ProvinciaTraversyData',
        DEFAULT_VALUE: []
    },
    DIMENSIONES: {
        NAME: 'Dimension',
        DEFAULT_VALUE: []
    },
    VIA_PRINCIPAL: {
        NAME: 'Via principal',
        DEFAULT_VALUE: []
    },
    TIPO_ACTIVO: {
        NAME: 'TipoActivo',
        DEFAULT_VALUE: []
    },
    CLIENTES: {
        NAME: 'Cliente',
        DEFAULT_VALUE: []
    },
    VENDEDORES: {
        NAME: 'Vendedor',
        DEFAULT_VALUE: []
    },
    TIPOS_OFERTA: {
        NAME: 'tiposoferta',
        DEFAULT_VALUE: []
    },
    ESTADOS_OFERTA: {
        NAME: 'estadosoferta',
        DEFAULT_VALUE: []
    },
    CATEROGY: {
        NAME: 'Categorias',
        DEFAULT_VALUE: []
    },
    RUTAS: {
        NAME: 'Ruta',
        DEFAULT_VALUE: []
    },
    SECTORES: {
        NAME: 'Sectores',
        DEFAULT_VALUE: []
    },
    CARAS: {
        NAME: 'Caras',
        DEFAULT_VALUE: []
    },
    VIAS_PRINCIPALES: {
        NAME: 'ViaPrincipal',
        DEFAULT_VALUE: []
    },
    TIPO_INSPECCION: {
        NAME: 'TipoInpeccion',
        DEFAULT_VALUE: []
    },
    FRECUENCIA: {
        NAME: 'Frecuencia',
        DEFAULT_VALUE: []
    }
};

export const ADMISSION_REQUEST = {
    STATUS: {
        ENROLLMENT_RESERVATION: 'RI',
        ENROLLED: {
            WITHOUT_MANAGEMENT: 'N',
            WITH_VALIDATION: 'C'
        },
        PRE_ENROLLED: 'I',
        ADMITTED: '35',
        REGISTERED: {
            WITH_PAYMENT: '005-REGISTERED-NEW',
            FINANCIAL: '005-PAID-NEW',
        }
    }
}

export const ACTION_MSG = {
    OP_EXITOSA: 'Operación Exitosa.',
    OP_ERROR: 'Error en la operación',
    CREAR_REG: 'Crear registro',
    ACTUALIZAR_REG: 'Actualizar registro',
    LISTAR_REG: 'Listar registros',
};
export const EVENT_STATUSES = {
    loading: 'loading',
    loaded: 'loaded',
    ready: 'ready',
    failed: 'failed',
    attended: 'attended',
    notAttended: 'not_attended',
};

export const USER_OBJ_CLAIMS = {
    token: 'eltoken',
    refreshToken: 'elrefreshToken',
    success: true,
    objModel: {
        id: '22a0b494-2224-404e-9456-0ba8eea8309b',
        id_usuario: '664899b0-bba8-4c4f-aebf-f9d826d98c88',
        urole: 'User',
        perfil: 'Sales Comercial',
        usuario_nombre: 'user@hot.com',
        alias: 'pashenkov',
        nombre_completo: 'Company',
        profesion: 'Electronic Engineer',
        identificacion: '568732432',
        genero: 'male',
        user_data: [
            {
                email_institucional: 'company@support.com',
                email_personal: 'user@gmail.com',
                telefono_institucional: '318 12932 2342',
                telefono_movil: '23847239847',
                direccion_fisica: 'Street 43',
            },
            {
                email_institucional: 'company@support.com',
                email_personal: 'user@gmail.com',
                telefono_institucional: '318 12932 2342',
                telefono_movil: '23847239847',
                direccion_fisica: 'Street 43',
            },
        ],
        user_claims: [
            {
                md_id: '2',
                module: 'operations',
                md_title: 'operations',
                md_link: 'operations',
                md_icon: 'token',
                ft_id: '1',
                feature: 'routes',
                ft_title: 'routes',
                ft_link: 'routes',
                ft_icon: 'double_arrow',
                can_access: true,
                can_edit: false,
            },
            {
              md_id: '2',
              module: 'operations',
              md_title: 'operations',
              md_link: 'operations',
              md_icon: 'token',
              ft_id: '1',
              feature: 'category',
              ft_title: 'category',
              ft_link: 'categories',
              ft_icon: 'double_arrow',
              can_access: true,
              can_edit: false,
          },

        ],
    },
};
