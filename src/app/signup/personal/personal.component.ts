import { Component } from '@angular/core';
import {FormBuilder, Validators} from "@angular/forms";

const formBuilder = new FormBuilder();
export const personal= formBuilder.group({
  name: ['', Validators.required],
  contact: formBuilder.group<{
    email?: string,
    phone?: string,
  }>({
    email: '',
    phone: ''
  }),
  location: ''
});

@Component({
  selector: 'app-personal',
  templateUrl: './personal.component.html',
  styleUrl: './personal.component.less'
})
export class PersonalComponent {}
