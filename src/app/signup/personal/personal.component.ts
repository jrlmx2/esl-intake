import { Component } from '@angular/core';
import { ReactiveFormsModule, Validators } from "@angular/forms";
import { QuizService } from "../../form/quiz.service";
import { QuizStep } from "../../form/quiz-step.interface";

@Component({
  selector: 'app-personal',
  templateUrl: './personal.component.html',
  imports: [ ReactiveFormsModule ],
  standalone: true,
  styleUrl: './personal.component.less'
})
export class PersonalComponent implements QuizStep {
  public readonly contact;

  constructor(private quizService: QuizService) {
    const b = quizService.builder;

    this.contact = b.group({
      name: ['', Validators.required],
      contact: b.group<{
        email?: string,
        phone?: string,
      }>({
        email: '',
        phone: ''
      }),
      location: ''
    });

    this.registerFormControls();
  }

  registerFormControls(): void {
    console.log("registering personal controls");
    this.quizService.addSection(this.contact);
  }

  score(): number {
    return 0;
  }
}
