# DevsBC Form created by Juan Carlos Aranda Alonso

Esta libreria permite reutilizar muchos componentes de gran utilidad y genericos para ser utilizados en tus proyectos.

Incluye
- Formulario

**IMPORTANTE**  
Agrega Angular Material a tu proyecto
```bash
ng add @angular/material
```
Agrega Bootstrap  
https://getbootstrap.com/docs/5.0/getting-started/download/

## Instalacion
Instala la libreria en tu modulo principal

```bash
npm i devsbc-form
```
## Uso
```typescript
import { DevsbcModule } from './../../projects/devsbc-components/src/lib/devsbc.module';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    DevsbcModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
```

# Componentes

<details>
  <summary><b>DevsBC Form</b></summary>
 
## Resumen
Ira deja te explico, este componente te permite crear formularios con:  
Angular Material, usando el Grid de Bootstrap.  
El componente recibe un objeto que representa la vista del HTML y un formulario Angular que valida los campos.
  
 En tu componente:
```html
<dbc-form [data]="TUFORMULARIO"></dbc-form>
```

## Modelo de Formulario
```typescript
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

```

## Ejemplo(s)

Cada view tiene un arreglo de cols, usa la misma funcionalidad de Bootstrap en el Grid.  
Si requieres en la vista Desktop ver columnas en una sola fila, agregalas en el mismo arreglo de cols.

- Cabe destacar que la propiedad name debe ser igual en view y formData

**IMPORTANTE**  
El campo FormDataModel utiliza:  
import { Validators } from '@angular/forms';  
Esto te permite agregar Validaciones a cada campo utilizando Angular Forms.  
Si no deseas agregar validacion para un campo simplemente agrega [] (array vacio)




```typescript
const form: FormModel = {
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
```

Tambien es posible pasar funciones para que respondan a eventos en el formulario.  
Para ello usa la propiedad callback en la definicion de la vista en cada columna.

Es necesario definir el nombre del evento, el cual es igual a los eventos HTML/Angular disponibles.

La funcion definida tambien puede cambiar el estado del formulario.

En el Siguiente ejemplo:
- En el FormFieldModel 'email' el callback verifica que ambos campos sean igual. (con esto es posible deshabilitar el formulario, vaciar campos o mostrar mensajes personalizados)
- En el FormFieldModel 'pin' el callback cambia el texto ingresado a mayusculas.

```typescript

 const data: FormModel = {
    view: [
      { row: 1, 
        cols: [
        { placeholder: 'fullName', name: 'fullName', type: 'text', element: 'input' }
        ],
      },
      {
        row: 2, 
        cols: [
          { placeholder: 'email', name: 'email', type: 'email', element: 'input', callback: {
            event: 'keyup',
            function: (e: any, form?: FormGroup) => (form) ? this.onSetEmail(e, form) : e.value
          } },
          { placeholder: 'confirm-email', name: 'confirmEmail', type: 'email', element: 'input', callback: {
            event: 'keyup',
            function: (e: any, form?: FormGroup) => (form) ? this.onSetEmail(e, form) : e.value
          } }
        ]
      },
      {
        row: 3, cols: [
          { placeholder: 'serial-number', name: 'serialNumber', type: 'number', element: 'input', callback: {
            event: 'keyup',
            function: (e: any, form?: FormGroup) => (form) ? this.onSetSN(e, form) : e.value
          }},
          { placeholder: 'confirm-serial-number', name: 'confirmSerialNumber', type: 'number', element: 'input', callback: {
            event: 'keyup',
            function: (e: any, form?: FormGroup) => (form) ? this.onSetSN(e, form) : e.value
          }}
        ]
      },
      {
        row: 4, cols: [
          { placeholder:'PIN', name: 'pin', type: 'text', element: 'input', callback: {
            event: 'keyup',
            function: (e: any, form?: FormGroup) => e.value = e.value.toUpperCase()
          }}
        ]
      }
    ],
    formData: [
      { name: 'fullName', value: '', validator: Validators.required },
      { name: 'email', value: '', validator: [Validators.required, Validators.email] },
      { name: 'confirmEmail', value: '', validator: [Validators.required, Validators.email] },
      { name: 'serialNumber', value: null, validator: Validators.required },
      { name: 'confirmSerialNumber', value: null, validator: Validators.required },
      { name: 'pin', value: null, validator: Validators.required }
    ],
    disableButton: false,
    buttonLabel: 'register',
    onSubmit: (data: any) => this.onSubmit(data)
  }
```

## Eventos disponibles
De momento solo esta disponible un solo evento (wait for more)
- keyup

## Funcionalidad extendida
Si el formulario no cumple con tus requerimientos, puedes agregar HTML personalizado arriba o abajo del formulario y completar la experiencia.  
Para ello usa slot="top/bottom" en tu html dentro del componente dbc-form.  
La validacion del HTML agregado corre por tu cuenta.

```html
<dbc-form [data]="form">
  <!--USING A FILE MANAGER FOR ADD IMAGE TO FORM -->
  <div slot="top" class="text-center" style="margin-bottom: 10px;">
    <button mat-raised-button color="accent" (click)="getFile()" style="margin-bottom: 10px;">
      <span *ngIf="!url">Seleccionar imagen</span>
      <span *ngIf="url">Cambiar imagen</span>
    </button>
    <img [src]="url" *ngIf="url" >
  </div>
</dbc-form>
```

```html
<dbc-form [data]="data">
  <!--USING A INFO FOR FORM -->
  <ng-container slot="bottom">
      <div class="row">
          <div class="col">
              <div class="alert alert-danger" role="alert">
                  El número de serie del equipo se encuentra en la parte posterior del equipo
              </div>
              <img src="../../../assets/sn.png">
          </div>
      </div>
  </ng-container>
</dbc-form>
```

## Capturas
El siguiente ejemplo agrega HTML personalizado para integrarse con el formulario  
![Formulario](https://storage.googleapis.com/satoru_bucket/angular-libraries/devsbc-form/s2.jpg)  

La vista movil es responsiva (Grid de Bootstrap)  
![Formulario](https://storage.googleapis.com/satoru_bucket/angular-libraries/devsbc-form/s2-mobile.jpg)  

Formulario con Stripe   
![Formulario](https://storage.googleapis.com/satoru_bucket/angular-libraries/devsbc-form/s3-stripe.jpg) 

Formulario Autovalidado (Angular Forms Validators)  
![Formulario](https://storage.googleapis.com/satoru_bucket/angular-libraries/devsbc-form/s4-valid.jpg) 


Formulario con File Manager  
![Formulario](https://storage.googleapis.com/satoru_bucket/angular-libraries/devsbc-form/s5.jpg) 
 
 
</details>




## Como contribuir

Contribuciones aceptadas [GitHub](https://github.com/DevsBC/devsbc-library.git)

## Contacto
developersbac@gmail.com
