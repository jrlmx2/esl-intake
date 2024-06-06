import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SignupForm } from './signup-form.component';

describe('FormComponent', () => {
  let component: SignupForm;
  let fixture: ComponentFixture<SignupForm>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SignupForm]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SignupForm);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
