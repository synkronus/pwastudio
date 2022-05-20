import { FormlyFieldConfig, FormlyTemplateOptions } from "@ngx-formly/core";

export const formlyRow = (fieldConfig: FormlyFieldConfig[]) => {
  return {
    fieldGroupClassName: 'p-fluid p-formgrid p-grid',
    fieldGroup: fieldConfig,
  };
};

export const formlyInput = (config: {
  key: string;
  label: string;
  templateOptions: FormlyTemplateOptions;
}): FormlyFieldConfig => {
  return {
    key: config.key,
    type: 'input',
    className: 'p-field p-col-12 p-md-4',
    templateOptions: {
      label: config.label,
      ...config.templateOptions,
    },
  };
};
