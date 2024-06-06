import { Component } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from "@angular/forms";

const formBuilder = new FormBuilder();
export const instructions= formBuilder.group({});

@Component({
  selector: 'app-instructions',
  standalone: true,
  imports: [
    ReactiveFormsModule
  ],
  templateUrl: './instructions.component.html',
  styleUrl: './instructions.component.less'
})
export class InstructionsComponent {}
