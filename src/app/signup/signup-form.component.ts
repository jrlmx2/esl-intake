
import { ReactiveFormsModule } from "@angular/forms";
import { RouterOutlet, RouterLink, Router, ActivatedRoute } from "@angular/router";
import { Component } from "@angular/core";
import { ButtonComponent } from "../button/button.component";
import { QuizService } from "../form/quiz.service";
import { QuizStep } from "../form/quiz-step.interface";
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";


@Component({
  standalone: true,
  imports: [
    ReactiveFormsModule,
    RouterOutlet,
    RouterLink,
    ButtonComponent,
    MatProgressSpinnerModule,
  ],
  templateUrl: './signup-form.component.html',
  styleUrl: './signup-form.component.less'
})
export class SignupForm {
  constructor(
    private quizService: QuizService,
    private router: Router,
    private activatedRoute: ActivatedRoute) {
  }

  next() {
    // dangerous... find a better way
    const component: QuizStep = this.activatedRoute.component as unknown as QuizStep;
    this.quizService.changeScore(component.score());

    this.router.navigate(this.quizService.next());
  }

  get valid(): boolean {
    return this.quizService.valid;
  }

  get complete(): boolean {
    return this.quizService.complete;
  }

  get disablePrevious() {
    return this.quizService.atStart;
  }

  get loading() {
    return false;
  }

  previous() {
    this.router.navigate(this.quizService.previous());
  }

  submit() {

  }

  printform() {
    console.log(arguments);
  }
}
