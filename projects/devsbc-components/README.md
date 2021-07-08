# DevsBC Components

Esta libreria permite reutilizar muchos componentes de gran utilidad y genericos para ser utilizados en tus proyectos.

Incluye
- Formulario
- ModeService
- AuthService

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


# Servicios

<details>
  <summary><b>Mode Service</b></summary>  
  
  
## Introduccion
Ira deja te explico, cuando requieres probar tu aplicacion regularmente lo haces localmente,   
no obstante cuando existen errores o problemas que necesitas verificar resulta muy util habilitar un espacio para pruebas que se encuentre en produccion.  
Esto se reduce en un simple switch que de acuerdo a tus configuraciones pueden verlo ciertos usuarios o solo tu.  
Para implementar esta funcionalidad este servicio te ayuda a fijar un modo ya sea 'prod' o 'test'  
Con esto puedes consumir tu app en produccion en un modo distinto y asegurarte que funciona bien.  
Tambien esta implementacion te ayuda a aislar aquellos datos y configuraciones que pertenecen a tu ambiente de pruebas.  

## Ejemplo 
Considera esta APP de Ionic que implementa un modo de prueba para hacer testing y separar los datos reales de los ficticios.  
![mode](https://storage.googleapis.com/satoru_bucket/angular-libraries/services/mode/s1.jpg)
![mode](https://storage.googleapis.com/satoru_bucket/angular-libraries/services/mode/s3.jpg)  
Considera hacer evidente que tu APP esta en modo prueba(como cambiar el color)  
![mode](https://storage.googleapis.com/satoru_bucket/angular-libraries/services/mode/s2.jpg)

## Uso
Utilizar este servicio es tan sencillo, solo pasa tu variable environment.production e inicializar el servicio.  
El modo se guarda en sessionStorage.  
Utilizar environment.production garantiza que tu app es congruente con tu entorno.  
El switch funciona para cambiar de contexto toda la app.

```typescript
constructor(private modeService: ModeService) {
    this.mode = this.modeService.getMode(environment.production);
}

public toggleMode(event: any) {
    const checked = event.checked;
    const mode = (checked) ? 'test' : 'prod';
    this.modeService.saveMode(mode, true);
 }

```
</details>

<details>
  <summary><b>Auth Service</b></summary>
  
## Introduccion
Este servicio se encarga de hacer llamadas http POST al servidor para autenticar o registrar un usuario.  
Para usar este servicio es necesario contar con un ENDPOINT a tu servidor.

**IMPORTANTE**  
Las llamadas a SignIn y SignUp devuelven un token, basado en JSON Web Token  
Para mas informacion acerca de esta implementacion ver [JWT](https://jwt.io/).  

Si tu servidor no devuelve TOKEN este servicio NO funcionara.    
Aqui un ejemplo BASICO de implementacion (BACKEND)
```typescript
 private generateToken(user: any, duration?: string) {
    const signature = CREDENTIALS.signature;
    const expiration = duration || '1h';
    return jwt.sign({ user }, signature, { expiresIn: expiration });
}
```

## Modelos
Utiliza el siguiente modelo para comunicarte con SignIn y SignUp.  
El servicio se encarga de guardar la sesion.
```typescript
export interface AccessAuthModel {
    endpoint: string; // url to HTTP CALL
    user: any; // Your custom object for User
    sessionName: string;
    multiSession?: boolean; // if multiSession -> User saves in sessionStorage *default localStorage
}
```

## Uso
He aqui un ejemplo de como puedes usar este servicio
```typescript
 /* EXAMPLE FOR AUTH SERVICE */
  baseUrl!: string;
  sessionName = 'my-session-name';

  constructor(private authService: AuthService, private modeService: ModeService) {}

  ngOnInit(): void {
    // Init URL for Access
    this.baseUrl = this.initServerConnection('ip', 'access');

    // Enable this to test
    // this.signIn();
  }

  /* MY OWN IMPLEMENTATION FOR GET BASE URL FOR MY SERVER */
  public initServerConnection(app: string, endpoint: string): string {
    const mode = this.modeService.getMode(environment.production);
    const server = new ServerModel(mode, app);
    const baseUrl = server.getBaseUrl(endpoint);
    return baseUrl;
  }

  public async signIn(): Promise<void> {
    const user = { email: '', password: '' };
    const access: AccessAuthModel = {
      endpoint: this.baseUrl + '/signin',
      user, // this object will be added to POST CALL
      sessionName: this.sessionName
    };

    // the function saves the session
    await this.authService.signIn(access);
    // show message
    // redirect
    // some stuff
  }

  public async signUp(): Promise<void> {
    const user = { email: '', password: '', username: '', role: '' };
    const access: AccessAuthModel = {
      endpoint: this.baseUrl + '/signin',
      user, // this object will be added to POST CALL
      sessionName: this.sessionName,
    };

    // the function saves the session
    await this.authService.signUp(access);
    // show message
    // redirect
    // some stuff
  }
```

## Funciones Disponibles
| Funcion | Argumentos  | Valor de retorno  |
| :---:   | :-: | :-: |
| signUp | AccessAuthModel | void |
| signIn | AccessAuthModel | void |
| recoverPassword | url: string, email: string | any |
| verifyToken | url: string, token: string | any |
| updatePassword | url: string, email: string, password: string | any |
| isAdmin | url: string, data: any | any |
| isAuthenticated | void | any |
| getSession | void | any |
| getToken | void | string |
| logout | urlToRedirect?: string | void |

## Flujo de trabajo
El siguiente diagrama representa el flujo basico para usar el servicio.  
![Diagrama](https://storage.googleapis.com/satoru_bucket/angular-libraries/services/auth/diagram.png)
</details>



## Como contribuir

Contribuciones aceptadas [GitHub](https://github.com/DevsBC/devsbc-library.git)  
Si fue de ayuda, comprame un cafe.

## Contacto
developersbac@gmail.com
