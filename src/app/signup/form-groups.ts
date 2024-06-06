import {FormBuilder, Validators} from "@angular/forms";

const formBuilder: FormBuilder = new FormBuilder();

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

export const basicQuiz= formBuilder.group({});

export const beginnerQuiz= formBuilder.group({});

export const intermediateQuiz= formBuilder.group({});

export const advancedQuiz= formBuilder.group({});
