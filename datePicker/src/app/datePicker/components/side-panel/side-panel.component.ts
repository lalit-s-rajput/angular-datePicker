import { Component, Input } from '@angular/core';
import { dateData } from '../../core/interface';

@Component({
  selector: 'app-side-panel',
  templateUrl: './side-panel.component.html',
  styleUrls: ['./side-panel.component.scss'],
})
export class SidePanelComponent {
  weekday: string = '';
  day: number = 0;
  month: string = '';
  year: number = 0;
  @Input() set currentDateString(value: dateData) {
    ({
      weekday: this.weekday,
      day: this.day,
      month: this.month,
      year: this.year,
    } = value);
  }
}
