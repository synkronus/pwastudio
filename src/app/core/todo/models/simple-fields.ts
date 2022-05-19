import { GRID_REF, SERVICE_LISTNAMES, VALIDATION_CRITERIA } from "../../../shared/utils/constants";

export const filteringRoutesOptions  = ['id','nombre', 'estado'];

export const RoutesArrayCols  = [
  {field: 'nombre', header: 'Descripción'},
  {field: 'estatus', header: 'Estado'}
];

export const FormFieldDefinition = [
  {
    colPos: GRID_REF.COLUNM.COL_2,
    type: "",//FieldType.Number,
    name: 'id',
    order: 0,
    disabled : 'true',
  },
  {
    colPos: GRID_REF.COLUNM.COL_6,
    type: "",//FieldType.Text,
    name: 'nombre',
    label: 'Descripción',
    order: 1,
    required: true,
    validations: [{
        criteria: VALIDATION_CRITERIA.NUM_MAX_CARACTERES,
        criteriaValue: "30",
        changed: false
    },
      {
          criteria: VALIDATION_CRITERIA.NUM_MIN_CARACTERES,
          criteriaValue: "5",
          changed: false
      }
    ]
  },
  {
    colPos: GRID_REF.COLUNM.COL_4,
    type: "",//FieldType.Dropdown,
    name: 'estatus',
    label: 'Estado',
    order: 2,
    defaultValue: SERVICE_LISTNAMES.ESTATUS.DEFAULT_VALUE,
    serviceName: SERVICE_LISTNAMES.ESTATUS.NAME,
    idSvcCol:'idEstatus',
    dirty: false,
  }

] ;

