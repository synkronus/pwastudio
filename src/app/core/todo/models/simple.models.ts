import { FormlyFieldConfig } from "@ngx-formly/core";
import { AuditableFields } from "src/app/shared/models/common.models";

  export interface RoutesDto extends AuditableFields {
    id?: number;
    nombre: string;
    idEstatus:	number;
    estatus:	string;
  }

  export const defaultRoutesObj = {
    id: 0,
    nombre: '',
    idEstatus:	1,
    estatus:	'Activo'
  }

  export const TablefilterOptions  = ['id','names', 'date'];

  export const TableColumnDefinitions  = [
    {field: 'names', header: 'Names'},
    {field: 'date', header: 'Birthday'},
    {field: 'age', header: 'age'},
    {field: 'country', header: 'country'},
    {field: 'city', header: 'City'},
    {field: 'status', header: 'Status'}
  ];

  export const formState = {
    countries: [
      { label: 'Germany', value: '1' },
      { label: 'States', value: '2' },
      { label: 'Australia', value: '3' },
      { label: 'Qatar', value: '4' },
    ],
  };

  export const FieldsCfg:FormlyFieldConfig[] = [
    {
      key: 'id',
    },
    {
      key: 'AutoComplete',
      type: 'AutocompletePrmNg',
      defaultValue: { label: 'Germany', value: '1' },
      templateOptions: {
        label: 'Autocomplete',
        placeholder: 'Select placeholder',
        required: true,
        searchObject: (templateOptions, $event) => {
          templateOptions.results = formState.countries.filter(
            (item) => item.label.toLowerCase().indexOf($event.query.toLowerCase()) > -1);
        },
      },
      expressionProperties: {
        'templateOptions.options': 'formState.countries',
      },
    },
      {
      key: 'names',
      type: 'input',
      className: 'col-sm-6',
      templateOptions: {
        label: 'Names',
        placeholder: '...',
        required: true,
      }
    },
  ];
  // export const FieldsCfgs:FormlyFieldConfig[] = [
  //   {
  //     key: 'names',
  //     type: 'input',
  //     className: 'col-sm-6',
  //     templateOptions: {
  //       label: 'Names',
  //       placeholder: '...',
  //       required: true,
  //     }
  //   },
  //   {
  //     key: 'date',
  //     type: 'datepicker',
  //     className: 'col-sm-6',
  //     templateOptions: {
  //       label: 'Birthday',
  //       required: true,
  //       placeholder: '...',
  //       description: 'Description',
  //       dateFormat: 'dd/mm/yy',
  //       hourFormat: '24',
  //       numberOfMonths: 1,
  //       selectionMode: 'single',
  //       readonlyInput: false,
  //       showTime: false,
  //       showButtonBar: true,
  //       showIcon: false,
  //       showOtherMonths: true,
  //       selectOtherMonths: false,
  //       monthNavigator: false,
  //       yearNavigator: false,
  //       yearRange: '2020:2030',
  //       inline: false,
  //     },
  //   },
  //   {
  //     key: 'age',
  //     type: 'input',
  //     className: 'col-sm-6',
  //     templateOptions: {
  //       label: 'Age',
  //       placeholder: '',
  //       type: 'number'
  //     }
  //   },
  //   {
  //     type: 'input',
  //     key: 'jsDate',
  //     className: 'col-sm-6',
  //     templateOptions: {
  //       type: 'date',
  //       label: 'Js-Date',
  //     },
  //   },
  //   {
  //     key: 'gender',
  //     type: 'radio',
  //     templateOptions: {
  //       label: 'Gender',
  //       required: true,
  //       options: [
  //         { label: 'Female', value: '1' },
  //         { label: 'Male', value: '2' },
  //       ]
  //     }
  //   },
  //     {
  //       key: 'country',
  //       type: 'select',
  //       templateOptions: {
  //         label: 'Country',
  //         placeholder: 'Select country',
  //         required: true,
  //         options: [
  //           { label: 'Option 1', value: '1' },
  //           { label: 'Option 2', value: '2' },
  //           { label: 'Option 3', value: '3' },
  //         ]
  //       }
  //     },
  //     {
  //       key: 'city',
  //       type: 'select',
  //       templateOptions: {
  //         label: 'City',
  //         placeholder: 'Select city',
  //         description: 'Description',
  //         required: true,
  //         multiple: true,
  //         selectAllOption: 'Select All',
  //         options: [
  //           { label: 'Option 1', value: '1' },
  //           { label: 'Option 2', value: '2' },
  //           { label: 'Option 3', value: '3' },
  //           { value: 4, label: 'Option 4', disabled: true },
  //         ]
  //       }
  //     },
  //   {
  //     key: 'status',
  //     type: 'checkbox',
  //     templateOptions: {
  //       label: 'Single',
  //     }
  //   },
  //   {
  //     key: 'status02',
  //     type: 'inputCustom',
  //     templateOptions: {
  //       label: 'Single02'
  //     }
  //   },
  // ];

  // [
  //   {
  //     key: 'input',
  //     type: 'input',
  //     templateOptions: {
  //       label: 'Input',
  //       placeholder: 'Input placeholder',
  //       required: true,
  //     }
  //   },
  //   {
  //     key: 'textarea',
  //     type: 'textarea',
  //     templateOptions: {
  //       label: 'Textarea',
  //       placeholder: 'Textarea placeholder',
  //       required: true,
  //     }
  //   },
  //   {
  //     key: 'checkbox',
  //     type: 'checkbox',
  //     templateOptions: {
  //       label: 'Checkbox',
  //     }
  //   },
  //   {
  //     key: 'select',
  //     type: 'select',
  //     templateOptions: {
  //       label: 'Select',
  //       placeholder: 'Select placeholder',
  //       required: true,
  //       options: [
  //         { label: 'Option 1', value: '1' },
  //         { label: 'Option 2', value: '2' },
  //         { label: 'Option 3', value: '3' },
  //       ]
  //     }
  //   },
  //   {
  //     key: 'radio',
  //     type: 'radio',
  //     templateOptions: {
  //       label: 'Radio',
  //       required: true,
  //       options: [
  //         { label: 'Option 1', value: '1' },
  //         { label: 'Option 2', value: '2' },
  //       ]
  //     }
  //   }
  // ];

