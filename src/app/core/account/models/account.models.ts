import { FormlyFieldConfig } from "@ngx-formly/core";
import { formlyRow, formlyInput } from "src/app/common/components/formly-types/utility/field-utils";


export interface Profile {
  username: string;
  firstName: string;
  lastName: string;
  website: string;
  avatar_url: string;
}

  export const formState = {
    countries: [
      { label: 'Germany', value: '1' },
      { label: 'States', value: '2' },
      { label: 'Australia', value: '3' },
      { label: 'Qatar', value: '4' },
    ],
  };

  export const FieldsCfg:FormlyFieldConfig[] = [
    formlyRow([
      formlyInput({
        key: 'firstName',
        label: 'First Name',
        templateOptions: {
          required: true,
        },
      }),
      formlyInput({
        key: 'lastName',
        label: 'Last Name',
        templateOptions: {
          required: true,
        },
      }),
      formlyInput({
        key: 'username',
        label: 'UserName',
        templateOptions: {
          required: true,
        },
      }),
      formlyInput({
        key: 'email',
        label: 'Email',
        templateOptions: {
          required: false,
          type: 'email',
        },
      }),
      formlyInput({
        key: 'website',
        label: 'WebSite',
        templateOptions: {
          required: false,
        },
      }),
    ]),

  ];



