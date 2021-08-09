import { FormGroup } from '@angular/forms';

export interface MultFormModel {
  view: ViewFormModel[];
  buttonLabel: string;
  onSubmit: any;
  appearance: 'legacy' | 'standard' | 'fill' | 'outline';
  disableButton: boolean;
  object: any;
}


export interface ViewFormModel {
  row: number;
  cols: FormFieldModel[];
}

export interface FormFieldModel {
  callback?: FormCallbackModel;
  element: 'input' | 'textarea' | 'select';
  rowsText?: string;
  label: string;
  name: string;
  propName?: string;
  value?: any
  placeholder?: string;
  type: 'text' | 'number' | 'password' | 'email' | 'date' | 'tel' | 'time' | 'url';
  required: boolean;
  disabled?: boolean;
  validators?: any[];
  translate?: boolean;
  /* For select */
  options?: any[];
  multiple?: boolean;
}

interface FormCallbackModel {
  event: 'keyup';
  function: (e: any, form?: FormGroup, value?: any) => any;
}


export class ViewModel {
    es: FormFieldModel[] = [];
    en: FormFieldModel[] = [];
    raw: FormFieldModel[] = [];
}
