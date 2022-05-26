import { FormlyFieldConfig } from "@ngx-formly/core";
import { formlyRow, formlyInput } from "src/app/common/components/formly-types/utility/field-utils";

  export interface TodoModel {
    id: string;
    user_id: string;
    task: string;
    is_complete: boolean;
    inserted_at: Date;
  }

  export const FieldsCfg:FormlyFieldConfig[] = [
    formlyRow([
      formlyInput({
        key: 'task',
        label: 'First Name',
        templateOptions: {
          required: true,
        },
      }),
    ]),
  ];
