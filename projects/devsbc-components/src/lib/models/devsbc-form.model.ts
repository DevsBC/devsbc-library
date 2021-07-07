import { FormGroup } from '@angular/forms';

export interface FormModel {
  formData: FormDataModel[];
  view: ViewFormModel[];
  buttonLabel: string;
  onSubmit: any;
  disableButton: boolean;
}

interface FormDataModel {
  name: string;
  validator: any;
  value: any;
}

interface ViewFormModel {
  row: number;
  cols: FormFieldModel[];
}

interface FormFieldModel {
  callback?: FormCallbackModel | any;
  element: string;
  name: string;
  placeholder: string;
  type: string;
  required: boolean;
  disabled?: boolean;
  /* For select */
  options?: any[];
  multiple?: boolean;
}

interface FormCallbackModel {
  event: string;
  function: (e: any, form?: FormGroup) => any;
}
