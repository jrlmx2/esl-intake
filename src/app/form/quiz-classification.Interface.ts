import { Route } from "@angular/router";

// A collection of quiz forms under a label
export interface QuizClassification {
  questionType(): String;
  randomQuestion(score: Number): String;
  routes(prefix: Array<String> | String, options?:unknown): Array<Route>;
}
