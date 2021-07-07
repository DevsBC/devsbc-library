import { FormModel } from './../../projects/devsbc-components/src/lib/models/devsbc-form.model';
import { Component } from '@angular/core';
import { Validators } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  form: FormModel = {
    view: [
      { row: 1,
        cols: [
          { placeholder: 'Título', name: 'title', type: 'text', element: 'input', required: true },
        ]
      },
      {
        row: 2,
        cols: [
          { placeholder: 'Descripción', name: 'description', type: 'text', element: 'textarea', required: false },
        ]
      },
      {
        row: 3,
        cols: [
          { placeholder: 'Texto del botón', name: 'button', type: 'text', element: 'input', required: false },
        ]
      },
      {
        row: 4,
        cols: [
          { placeholder: 'Enlace del botón', name: 'href', type: 'text', element: 'input', required: false },
        ]
      }
    ],
    formData: [
      { name: 'title', value: null, validator: Validators.required },
      { name: 'description', value: null, validator: [] },
      { name: 'button', value: null, validator: [] },
      { name: 'href', value: null, validator: [] },
    ],
    disableButton: false,
    buttonLabel: 'Crear Slider',
    onSubmit: (data: any) => this.onSubmit(data) // call your submit function
  };

  public onSubmit(data: any) {
    // Your logic Here
    // The data is ready to usage
  }
}
