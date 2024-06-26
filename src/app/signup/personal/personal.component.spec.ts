import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PersonalComponent } from './personal.component';
import { AppComponent } from "../../app.component";

const fields: Array<String> = ['name', 'location', 'phone', 'email'];

describe('PersonalComponent', () => {
  let component: PersonalComponent;
  let fixture: ComponentFixture<PersonalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PersonalComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PersonalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('has required inputs and inputs are i18ned', () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    const renderedFields: NodeListOf<HTMLElement> = compiled.querySelectorAll('fieldset');

    expect(renderedFields.length).toBe(fields.length);

    fields.forEach( field => {
      const renderedField = compiled.querySelector( `fieldset input[formcontrolname=${field}]`);

      expect(renderedField).toBeTruthy();
    })
  });

  it('does not allow bad email', () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;

  });
});
