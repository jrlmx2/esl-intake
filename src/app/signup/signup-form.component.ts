
import { FormBuilder, FormGroup, ReactiveFormsModule} from "@angular/forms";
import { ActivatedRoute, RouterOutlet, RouterLink, UrlSegment, Router } from "@angular/router";
import { Component } from "@angular/core";
import { personal } from "./personal/personal.component";
import { instructions } from "./instructions/instructions.component";
import { ButtonComponent } from "../button/button.component";

const formBuilder: FormBuilder = new FormBuilder();

const groupMap: Map<String, FormGroup> = new Map([
  [ 'personal', personal ],
]);

const studentForm: FormGroup = formBuilder.group({
  personal,
  instructions,
  quiz: formBuilder.array([])
});

@Component({
  standalone: true,
  imports: [
    ReactiveFormsModule,
    RouterOutlet,
    RouterLink,
    ButtonComponent,
  ],
  templateUrl: './signup-form.component.html',
  styleUrl: './signup-form.component.less'
})
export class SignupForm {
  formGroup?: FormGroup | null;
  isComplete: boolean = false;
  currentPath?: string;

  constructor(private route: ActivatedRoute, private router: Router){
    this.route.url.subscribe( (url) => {
      url.forEach( (url: UrlSegment) => {
        if(groupMap.has(url.path)) this.formGroup = groupMap.get(url.path)
        else this.formGroup = groupMap.get('personal');

        this.currentPath = url.path;
      });
      console.log(url, `section valid: ${this.formGroup?.valid}, form valid: ${studentForm.valid}`);
    })
  }

  next() {
    this.router.navigate(['signup','instructions']);
  }
}
