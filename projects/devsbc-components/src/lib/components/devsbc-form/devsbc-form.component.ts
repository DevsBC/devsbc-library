import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { FormModel } from '../../models/devsbc-form.model';

@Component({
  selector: 'dbc-form',
  templateUrl: './devsbc-form.component.html',
  styleUrls: ['./devsbc-form.component.css']
})
export class DevsbcFormComponent implements OnInit {

  @Input() data = {} as FormModel;
  form!: FormGroup;
  loading = false;
  ready = false;
  canActivateButton!: boolean;

  constructor(private fb: FormBuilder) { }

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
      this.loading = false;
      return;
    }
    this.loading = await this.data.onSubmit(this.form.value);
  }

}
