import { HttpClient } from '@angular/common/http';
import { ServerConnectionService } from './../../../../projects/devsbc-components/src/lib/services/server-connection.service';
import { MultFormModel } from './../../../../projects/devsbc-components/src/lib/models/devsbc-mult-form.model';
import { FormModel } from './../../../../projects/devsbc-components/src/lib/models/devsbc-form.model';
import { Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit {

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

  example: MultFormModel = {
    view: [
      { row: 1,
        cols: [
          { 
            label: 'Título', 
            placeholder: 'Título', 
            name: 'title', 
            type: 'text', 
            element: 'input', 
            required: true, 
            translate: true, 
            callback: {
              event: 'keyup',
              function: (e, form, value) => this.translateText(e, form, value)
            }
          },
          { 
            label: 'Etiqueta', 
            placeholder: 'Etiqueta', 
            name: 'tag', 
            type: 'text', 
            element: 'input', 
            required: true, 
            translate: true, 
            callback: {
              event: 'keyup',
              function: (e, form, value) => this.translateText(e, form, value)
            }
          }
        ]
      },
      {
        row: 2,
        cols: [
          { 
            label: 'Descripcion', 
            placeholder: 'Descripcion corta', 
            name: 'description', 
            type: 'text', 
            element: 'textarea', 
            rowsText: '4',
            required: true,
            validators: [Validators.min(10), Validators.max(255)], 
            translate: true, 
            callback: {
              event: 'keyup',
              function: (e, form, value) => this.translateText(e, form, value)
            }
          }
        ]
      },
      {
        row: 3,
        cols: [
          { 
            label: 'Texto del botón', 
            placeholder: 'Texto del botón', 
            name: 'button', 
            type: 'text', 
            element: 'input', 
            required: true, 
            translate: true, 
            callback: {
              event: 'keyup',
              function: (e, form, value) => this.translateText(e, form, value)
            }
          }
        ]
      },
      {
        row: 4,
        cols: [
          { 
            label: 'Enlace del botón', 
            placeholder: 'Enlace del botón', 
            name: 'href', 
            type: 'url', 
            element: 'input', 
            required: true, 
          }
        ]
      }
    ],
    disableButton: false,
    appearance: 'outline',
    buttonLabel: 'Crear Componente',
    object: {},
    onSubmit: (data: any) => this.onSubmitForm(data)
  };

  
  typingTimer: any;
  doneTypingInterval = 2000;
  baseUrl: string
  constructor(private serverConnection: ServerConnectionService, private http: HttpClient) { 
    this.baseUrl = this.serverConnection.initServerConnection('ip', 'translate', 1);

  }

  ngOnInit(): void {
    // async process to get data

  }

  public async onSubmit(data: any): Promise<boolean> {
    // Your logic Here
    // The data is ready to usage
    // return boolean response to stop spinner loading in form
    return false;
  }

  public async onSubmitForm(data: any) {
    console.log(data);
  }

  async translateText(event: any, form: any, property: any): Promise<any> {
    if (form) {
      clearTimeout(this.typingTimer);
      const translateInterface = this.getTranslateInfo(form, property);
      if (translateInterface.word) {
        this.typingTimer = setTimeout( async () => {
          const wordTranslated = await this.translate(translateInterface.word);
          translateInterface.form.controls[translateInterface.result].setValue(wordTranslated);
        }, this.doneTypingInterval);
      } else {
        if (translateInterface.form) {
          translateInterface.form.controls[translateInterface.result].setValue('');
        }
      }
    } else {
      return await this.translate(event);
    }
   
  }

  private getTranslateInfo(form: any, property: any): any {
    return {
      word: form.value[property + 'Es'],
      form: form,
      result: property + 'En'
    }
  }

  private async translate(text: string) {
    return await this.http.post(this.baseUrl, { text }).toPromise();
  }

}
