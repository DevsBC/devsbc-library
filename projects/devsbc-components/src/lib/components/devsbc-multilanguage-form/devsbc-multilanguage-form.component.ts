import { FormFieldModel, MultFormModel, ViewFormModel } from './../../models/devsbc-mult-form.model';
import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';



@Component({
  selector: 'dbc-mult-form',
  templateUrl: './devsbc-multilanguage-form.component.html',
  styleUrls: ['./devsbc-multilanguage-form.component.css']
})
export class DevsbcMultilanguageFormComponent implements OnInit {

  @Input() data = {} as MultFormModel;
  form!: FormGroup;
  loading = false;
  ready = false;
  canActivateButton!: boolean;
  view: ViewFormModel[] = [];

  constructor(private fb: FormBuilder) { }

  async ngOnInit(): Promise<void> {
    this.form = this.fb.group( await this.getForm());
    this.ready = true;
  }

  private async getForm(): Promise<any> {
    const formGroup: any = {};
    const obj = this.data.object;
    
    for (const row of this.data.view) {
      const view: ViewFormModel = {
        row: row.row,
        cols: []
      }
      for (let col of row.cols) {
        let validators = col.required ? [Validators.required]: [];
        if (col.validators) { validators = validators.concat(col.validators) }
        if (col.translate) {
          const {es, en} = await this.getTranslateValues(col, obj);
          formGroup[es.name] = [es.value, validators];
          view.cols.push(es);
          formGroup[en.name] = [en.value, validators];
          view.cols.push(en);
        } else {
          formGroup[col.name] = [obj[col.name], validators];
          view.cols.push(col);
        }
      }
      this.view.push(view);
    }
    return formGroup;
  }

  private async getTranslateValues(formField: FormFieldModel, obj: any) {
    const es = { ...formField };
    es.name = formField.name + 'Es';
    es.value = obj[formField.name]?.es;
    es.propName = formField.name;
  
    const en = { ...formField };
    en.name = formField.name + 'En';
    en.value = obj[formField.name]?.en;
    en.propName = formField.name;

    if (formField.label) { en.label = await formField.callback?.function(es.label)}
    if (formField.placeholder) { en.placeholder = await formField.callback?.function(es.placeholder)}


    return  { es, en };
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
