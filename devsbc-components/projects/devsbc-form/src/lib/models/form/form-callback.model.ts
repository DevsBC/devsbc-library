import { FormGroup } from "@angular/forms";

export interface FormCallbackModel {
    event: string;
    function: (e: any, form?: FormGroup) => any;
}