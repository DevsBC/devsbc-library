import { FormCallbackModel } from "./form-callback.model";
import { FormOptionModel } from "./form-options.model";

export interface FormFieldModel {
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