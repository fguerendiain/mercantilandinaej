import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ValidationErrorLableComponent } from './validation-error-lable.component';

describe('ValidationErrorLableComponent', () => {
  let component: ValidationErrorLableComponent;
  let fixture: ComponentFixture<ValidationErrorLableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ValidationErrorLableComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ValidationErrorLableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
