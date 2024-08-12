import { Component, Input } from '@angular/core';
import { dateData } from '../../core/interface';

@Component({
  selector: 'app-side-panel',
  templateUrl: './side-panel.component.html',
  styleUrls: ['./side-panel.component.scss'],
})
export class SidePanelComponent {
  weekday: string = '';
  day: string = '';
  month: string = '';
  year: string = '';
  @Input() set currentDateString(value: dateData) {
    ({
      weekday: this.weekday,
      day: this.day,
      month: this.month,
      year: this.year,
    } = value);
  }
}
