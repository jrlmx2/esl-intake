import { Routes } from '@angular/router';
import { SignupForm } from "./signup/signup-form.component";
import { NotFoundComponent } from "./404/404page.component";
import {PersonalComponent} from "./signup/personal/personal.component";
import {InstructionsComponent} from "./signup/instructions/instructions.component";
import {TestComponent} from "./test/test.component";

export const routes: Routes = [
  { 'path':'', 'redirectTo': 'signup', 'pathMatch': 'full' },
  { 'path': 'test', 'component': TestComponent },
  { 'path': 'signup', title: 'Signup', 'component': SignupForm, children: [
    { path: '', title: 'Tell Us About Yourself', component: PersonalComponent },
    { path: 'instructions', title: 'Proficiency Quiz', component: InstructionsComponent }
  ]},
  { 'path':'**', 'component': NotFoundComponent },
];
