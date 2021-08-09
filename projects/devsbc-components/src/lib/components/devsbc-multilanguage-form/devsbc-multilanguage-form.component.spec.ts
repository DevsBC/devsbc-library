import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DevsbcMultilanguageFormComponent } from './devsbc-multilanguage-form.component';

describe('DevsbcMultilanguageFormComponent', () => {
  let component: DevsbcMultilanguageFormComponent;
  let fixture: ComponentFixture<DevsbcMultilanguageFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DevsbcMultilanguageFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DevsbcMultilanguageFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
