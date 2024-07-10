import {Component, Input} from '@angular/core';
import {TitleCasePipe} from "@angular/common";
import {MatDivider} from "@angular/material/divider";

@Component({
  selector: 'esl-content',
  standalone: true,
  imports: [
    TitleCasePipe,
    MatDivider
  ],
  templateUrl: './content.component.html',
  styleUrl: './content.component.scss'
})
export class ContentComponent {
  @Input() sectionTitle?: string;
  @Input() divider: boolean = false;

}
