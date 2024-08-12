import { Component, Input } from '@angular/core';
import { dateData } from '../../core/interface';

@Component({
  selector: 'app-button-view',
  templateUrl: './button-view.component.html',
  styleUrls: ['./button-view.component.scss'],
})
export class ButtonViewComponent {
  currentMonthIndex = 0;
  currentMonthValue = '';
  currentYear = '';
  monthArray = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];
  @Input() set currentMonthAndYear(value: dateData) {
    this.currentMonthValue = value.month;
    this.currentYear = value.year;
  }
  @Input() set selectedYear(value: number) {}
}
