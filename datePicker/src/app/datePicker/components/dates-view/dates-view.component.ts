import {
  AfterViewChecked,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  QueryList,
  ViewChildren,
} from '@angular/core';

@Component({
  selector: 'app-dates-view',
  templateUrl: './dates-view.component.html',
  styleUrls: ['./dates-view.component.scss'],
})
export class DatesViewComponent implements OnInit, AfterViewChecked {
  weekdaysArray: string[] = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  monthsArray: string[] = [
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
  weekdaysArrayKeys: { value: string; index: number }[] = [];
  datesArray: any = [
    // { Sun: 1, Mon: 2, Tue: 3, wed: 4, Thu: 5, Fri: 6, Sat: 7 },
    // { Sun: 8, Mon: 9, Tue: 10, wed: 11, Thu: 12, Fri: 13, Sat: 14 },
  ];
  @ViewChildren('datesSelector') tdInput!: QueryList<any>;
  currentSelectedDateNumber: any;
  @Output() getSelectedDate = new EventEmitter<number>();
  currentMonthNumber: any;
  @Input() set _datesArray(val: any) {
    this.datesArray = val;
  }
  @Input() set _currentMonthNumber(val: any) {
    if (val !== undefined) {
      this.currentMonthNumber = val;
    }
  }
  ngOnInit(): void {
    this.weekdaysArrayKeys = this.weekdaysArray.map((item, index) => {
      return { value: item, index: index };
    });
  }
  ngAfterViewChecked(): void {
    if (this.tdInput) this.setCurrentDateStyle();
  }
  getDateValue(date: any, weekDay: string) {
    let key = this.monthsArray[this.currentMonthNumber] + '-' + weekDay;
    if (date[key]?.['dateOb'].getMonth() === this.currentMonthNumber) {
      this.currentSelectedDateNumber = date[weekDay];
      this.getSelectedDate.emit(this.currentSelectedDateNumber);
    }
  }
  getSlicedData(weekday: { value: string; index: number }) {
    return weekday.value.slice(0, 1);
  }
  setCurrentDateStyle() {
    this.tdInput.forEach((element) => {
      if (
        this.currentSelectedDateNumber &&
        element.nativeElement.classList.contains('currentMonthDates') &&
        element.nativeElement.innerHTML.trim() ===
          this.currentSelectedDateNumber.toString()
      ) {
        element.nativeElement.className = 'setBackGroundColor';
      } else {
        element.nativeElement.classList.remove('setBackGroundColor');
      }
    });
  }
  setClassValue(date: any, weekDay: string) {
    let key = this.monthsArray[this.currentMonthNumber] + '-' + weekDay;
    if (date[key]?.['dateOb']) {
      return date[key]['dateOb'].getMonth() === this.currentMonthNumber
        ? 'currentMonthDates'
        : 'otherMonthDates';
    }
    return 'otherMonthDates';
  }
}
