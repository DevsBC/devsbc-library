import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DevsbcFormComponent } from './devsbc-form.component';

describe('DevsbcFormComponent', () => {
  let component: DevsbcFormComponent;
  let fixture: ComponentFixture<DevsbcFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DevsbcFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DevsbcFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
