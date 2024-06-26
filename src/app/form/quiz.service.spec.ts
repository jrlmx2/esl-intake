import { TestBed } from '@angular/core/testing';

import { QuizService } from './quiz.service';
import { FormGroup } from "@angular/forms";

describe('FormService', () => {
  let service: QuizService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(QuizService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should expose form builder', () => {
    expect(service.builder.group({}) instanceof FormGroup).toBeTruthy();
  });

  it('should add form sections dynamically', () => {
    service.addSection(service.builder.group({}));
    // how do I test this?
  });

  it( 'should provide next form path', () => {

  })

  it('should change score', () => {
    const change1 = Math.random();
    service.changeScore(change1);
    expect(service.currentScore).toBe(change1);

    const change2 = Math.random();
    service.changeScore(change2);
    expect(service.currentScore).toBe(change1 + change2);

    const change3 = Math.random();
    service.changeScore(change3);
    expect(service.currentScore).toBe(change1 + change2 + change3);
  });
});
