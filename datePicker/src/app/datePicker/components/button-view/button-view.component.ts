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
  currentYear = 0;
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
    this.currentMonthIndex = this.monthArray.indexOf(this.currentMonthValue);
    this.currentYear = value.year;
  }
  prevMonth() {
    if (this.currentMonthIndex == 0) {
      this.currentMonthIndex = 11;
      this.currentMonthValue = this.monthArray[this.currentMonthIndex];
    } else {
      this.currentMonthIndex--;
      this.currentMonthValue = this.monthArray[this.currentMonthIndex];
    }
  }
  nextMonth() {
    if (this.currentMonthIndex == 11) {
      this.currentMonthIndex = 0;
      this.currentMonthValue = this.monthArray[this.currentMonthIndex];
    } else {
      this.currentMonthIndex++;
      this.currentMonthValue = this.monthArray[this.currentMonthIndex];
    }
  }
  prevYear() {
    this.currentYear = this.currentYear - 1;
  }
  nextYear() {
    this.currentYear = this.currentYear + 1;
  }
}
