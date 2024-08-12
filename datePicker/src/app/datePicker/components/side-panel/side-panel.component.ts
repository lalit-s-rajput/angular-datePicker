import { Component, Input } from '@angular/core';

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
  @Input() set currentDateString(value: string | null) {
    if (value) {
      let splitData = value.split(',');
      this.weekday = splitData[0].trim();
      let dayMonth = splitData[1].trim().split(' ');
      this.day = dayMonth[1];
      this.month = dayMonth[0];
      this.year = splitData[2].trim();
    }
  }
}
