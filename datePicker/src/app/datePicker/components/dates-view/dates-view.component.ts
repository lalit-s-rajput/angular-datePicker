import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-dates-view',
  templateUrl: './dates-view.component.html',
  styleUrls: ['./dates-view.component.scss'],
})
export class DatesViewComponent implements OnInit {
  monthsArray: string[] = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  monthsArrayKeys: { value: string; index: number }[] = [];
  datesArray: any = [
    // { Sun: 1, Mon: 2, Tue: 3, wed: 4, Thu: 5, Fri: 6, Sat: 7 },
    // { Sun: 8, Mon: 9, Tue: 10, wed: 11, Thu: 12, Fri: 13, Sat: 14 },
  ];
  @Input() set _datesArray(val: any) {
    this.datesArray = val;
  }
  ngOnInit(): void {
    this.monthsArrayKeys = this.monthsArray.map((item, index) => {
      return { value: item, index: index };
    });
    console.log(this.monthsArrayKeys);
  }
}
