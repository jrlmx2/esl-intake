import { Injectable } from '@angular/core';
import {FormArray, FormBuilder, FormControl, FormGroup} from "@angular/forms";


export const SIGNUP: string = 'signup'
export const INSTRUCTIONS: string = 'instructions';
export const QUIZ: string = 'quiz';
export const QUIZ_PREFIX = [SIGNUP, QUIZ];
const start: Array<string> =  [SIGNUP];
const instructions: Array<string> = [SIGNUP, INSTRUCTIONS];
const quizLength: number = 12;


// TODO make interface, abstract, and register types as they are created
const questionType: Array<string> = ['fill', 'picture', 'paragraph'];
const quizQuestionGenerator = {
  fill: (score: number): string => '',
  picture: (score: number): string => '',
  paragraph: (score: number): string => ''
};

@Injectable({
  providedIn: 'root'
})
export class QuizService {
  private readonly formBuilder = new FormBuilder()
  // @ts-ignore
  private readonly form: FormArray = new FormArray([]);
  private groupsAdded: Array<string> = new Array<string>();
  private quizPath: Array<Array<string>> = new Array<Array<string>>();
  private pathPointer: number = 0;

  private questionsAsked: Array<String> = new Array<String>();

  private score = 0;

  constructor() { }

  get builder() { return this.formBuilder; }

  addSection(group: FormGroup) {
    this.form.push(group);
  }

  get currentScore() { return this.score; }

  changeScore(change: number) {
    this.score += change;
  }

  get formJourney(): String {
    return this.quizPath.map( path => path.join("/") ).join(" -> ");
  }

  get atStart(): boolean {
    return this.pathPointer === 0;
  }

  get valid(): boolean {
    return this.form.valid;
  }

  get complete(): boolean {
    return this.quizPath.length + 1 === quizLength;
  }

  next(): string[] {
    switch(this.pathPointer) {
      case 0:
        this.quizPath.push(start);
        this.pathPointer++;
        return start;
      case 1:
        this.quizPath.push(instructions);
        this.pathPointer++;
        return instructions;
      default:
        const nextPath: Array<string> = this.makeNext();
        this.quizPath.push(nextPath);
        return nextPath;
    }
  }

  private makeNext(): Array<string> {
    const path = Array<string>();
    path.push(SIGNUP);

    path.push(QUIZ);

    const questionType = this.randomQuestionType();
    path.push(questionType);

    const question = this.randomQuestion(questionType);
    path.push(question);


    // if this is at the final step and the step is repeated, do not increment
    if( this.pathPointer === this.quizPath.length-1 && path.join("/") === this.currentPath().join("/") )
      this.pathPointer++;

    return path;
  }

  private randomQuestionType(): string {
    return questionType[Math.floor(Math.random() * (questionType.length - 1))];
  }

  private randomQuestion(questionType: string): string {

    // @ts-ignore, is only temp will be fixed later with question swapper
    const questionPath = quizQuestionGenerator[questionType]();

    let question: string = `${questionType}/${questionPath}`
    /*if( this.questionsAsked.indexOf(question) !== -1 )
      return this.randomQuestion(questionType);*/

    this.questionsAsked.push(`${questionType}/${questionPath}`);
    return questionPath;
  }

  previous(decrementCounter: boolean = true) {
    if ( this.pathPointer === 0 )
      return start;

    if ( decrementCounter )
      return this.quizPath[ --this.pathPointer ];
    else
      return this.quizPath[ this.pathPointer - 1 ];
  }

  currentPath() {
    return this.quizPath[ this.pathPointer ];
  }
}
