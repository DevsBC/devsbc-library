import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FormModel } from '../models/form/form.model';

@Component({
  selector: 'dbc-form',
  templateUrl: './devsbc-form.component.html',
  styles: [`mat-card { width: 90%; }
          .full-width { width: 100%; }
          .form-card { min-width: 120px; margin: 20px auto;}`]
})
export class DevsbcFormComponent implements OnInit {

  @Input() data = {} as FormModel;
  form!: FormGroup;
  loading = false;
  ready = false;
  canActivateButton!: boolean;

  constructor(private fb: FormBuilder, private snackBar: MatSnackBar) { }


  ngOnInit(): void {
    this.form = this.fb.group(this.getForm());
    this.ready = true;
  }

  private getForm(): any {
    const formGroup: any = {};
    for (const field of this.data.formData) {
      formGroup[field.name] = [field.value, field.validator];
    }
    return formGroup;
  }

  public async onSubmit(): Promise<void> {
    this.loading = true;
    if (this.form.invalid) {
      this.openSnackBar('Llena todos los campos');
      this.loading = false;
      return;
    }
    this.loading = await this.data.onSubmit(this.form.value);
  }

  private openSnackBar(message: string): void {
    this.snackBar.open(message, 'OK');
  }

}
