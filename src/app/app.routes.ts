import { Routes } from '@angular/router'
import { HomeComponent } from './home/home.component'

export const routes: Routes = [
  { 'path': '', 'component': HomeComponent }
  /*{ 'path': '' },
  { 'path': 'signup', title: 'Signup', 'component': SignupFormComponent, children: [
      { path: '', title: 'Tell Us About Yourself', component: PersonalComponent },
      { path: 'instructions', title: 'Proficiency Quiz', component: InstructionsComponent }
    ]},
  { 'path':'**', 'component': NotFoundComponent },*/
]
