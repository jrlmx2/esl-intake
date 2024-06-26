import { Component, Input } from '@angular/core';
import { QuizInputRegisterCallback } from "../../quiz-input";
import { FormControl } from "@angular/forms";

export interface FormInputOptions {
  type: 'checkbox' | 'radio' | 'select' | 'combobox',
  values: string[]
}

export interface FormInputInterface {
  options?: FormInputOptions;
  placeholder?: string[];
  disabled: boolean;
  label?: string;
  control?: FormControl;
  registerControl: QuizInputRegisterCallback;
}


@Component({
  selector: 'app-form-input',
  standalone: true,
  imports: [],
  templateUrl: './form-input.component.html',
  styleUrl: './form-input.component.less'
})
export class FormInputComponent implements OnInit {
  @Input() options?: FormInputOptions;
  @Input() placeholder?: string[];
  @Input() disabled: boolean = false;
  @Input() label?: string;
  @Input() control!: FormControl;
}
