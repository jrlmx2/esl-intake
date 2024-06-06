import { booleanAttribute, ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { animate, state, style, transition, trigger } from "@angular/animations";

@Component({
  selector: 'app-button',
  standalone: true,
  imports: [],
  templateUrl: './button.component.html',
  styleUrl: './button.component.less',
  animations: [
    trigger('blink',[
      state('highlight', style({
        backgroundColor: '#70BCFF'
      })),
      state('normal', style({})),
      transition('* => highlight', [
        animate('1.5s 10ms cubic-bezier(.17,.67,.88,.1)')
      ]),
      transition('* => normal', [
        animate('0.5s 50ms')
      ]),
      transition('highlight <=> normal', [
        animate('1.5s 10ms cubic-bezier(.17,.67,.88,.1)')
      ]),
    ]),
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ButtonComponent {
  blinked: boolean = false

  // blink$ = this.select('blink');
  @Input() click!: ()=>void;
  @Input() classes?: Array<string>;
  @Input() buttonText!: string;
  @Input() disabled = false;
  @Input() i18n!: string;

  // @Input({transform: booleanAttribute})
  // public set blink(blink: boolean) { this.set({ blink })}
}
