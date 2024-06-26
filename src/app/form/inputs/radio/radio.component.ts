import {Component, Input} from '@angular/core';

export interface RadioConfig {
  question: string;
  i18n: string;
  choices: Array<RadioItem>;
}

export interface RadioItem {
  type: "radio";
  checked: boolean;
  label: string;
  i18n: string;
}



@Component({
  selector: 'app-radio',
  standalone: true,
  imports: [ Input ],
  templateUrl: './radio.component.html',
  styleUrl: './radio.component.less'
})
export class RadioComponent {
  @Input() radio!: RadioConfig;
}
