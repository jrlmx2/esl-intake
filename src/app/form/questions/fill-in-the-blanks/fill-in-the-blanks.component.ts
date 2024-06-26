import { Component, Input, OnInit } from '@angular/core';
import { QuizStep } from "../../quiz-step.interface";
import { FormInputInterface } from "../../inputs/form-input/form-input.component";

export interface QuestionInterface {
  label?: string;
  audio?: any,
  img?: string;
}

@Component({
  selector: 'app-fill-in-the-blanks',
  standalone: true,
  imports: [],
  templateUrl: './fill-in-the-blanks.component.html',
  styleUrl: './fill-in-the-blanks.component.less'
})
export class FillInTheBlanksComponent implements OnInit, QuizStep{
  @Input() question!: QuestionInterface;

  private inputs: Map<Symbol, FormInputInterface> = new Map();

  ngOnInit(): void {
    this.parse(this.question);
  }

  parse(question: QuestionInterface) {
    for( let charPos = 0; charPos < question.length; charPos++ ) {

    }
  }

  registerFormControls(): void {

  }

  score(): number {
    return 0;
  }



}
