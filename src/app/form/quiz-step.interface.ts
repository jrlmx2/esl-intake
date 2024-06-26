// an individual step in the quiz
export interface QuizStep {
  registerFormControls(): void; // must register in OnInit in the formService
  score(): number;
}
