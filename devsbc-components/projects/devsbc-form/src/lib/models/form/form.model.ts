import { FormGroup } from "@angular/forms";
import { FormDataModel } from "./form-data.model";
import { ViewFormModel } from "./view-form.model";

export interface FormModel {
    formData: FormDataModel[];
    view: ViewFormModel[];
    labelSubmit: string;
    onSubmit: any;
    disableButton: boolean;
}