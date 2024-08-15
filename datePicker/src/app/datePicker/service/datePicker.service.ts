import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
import { dateData } from '../core/interface';

@Injectable({
  providedIn: 'root',
})
export class DatePickerService {
  currentLocaleString$ = new BehaviorSubject<string>('');
  datesArray$ = new BehaviorSubject<{ [key: string]: number | Date }[]>([]);
  currentDateData: dateData = {
    weekday: '',
    day: 0,
    month: '',
    year: 0,
  };
  weekDays: string[] = [
    'Sunday',
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
  ];
  months: string[] = [
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
  getAllDateData() {
    let dateString = this.currentLocaleString$.value;
    let splitData = dateString.split(',');
    this.currentDateData.weekday = splitData[0].trim();
    let dayMonth = splitData[1].trim().split(' ');
    this.currentDateData.day = Number(dayMonth[1]);
    this.currentDateData.month = dayMonth[0];
    this.currentDateData.year = Number(splitData[2].trim());
    return this.currentDateData;
  }
  getAllDatesOfCurrentMonth(month: number, year: number) {
    let arr = [];
    let dummyArr: [string, number, Date][] = []; // array inside array of type string and number same as string[]
    let date = new Date(year, month, 1);
    let compareNumbers = function (a: number, b: number) {
      return a - b;
    };
    let obj: { [key: string]: number | Date } = {};
    while (date.getMonth() == month) {
      if (date.getDay() == 0) {
        dummyArr.sort((a, b) => compareNumbers(a[1], b[1]));
        dummyArr.forEach((item) => {
          obj[item[0]] = item[1];
          obj['dateObj'] = item[2];
        });
        arr.push({ ...obj });
        obj = {};
        dummyArr = [];
      }
      let weekDay = this.weekDays[date.getDay()].slice(0, 3);
      dummyArr.push([weekDay, date.getDate(), new Date(date)]);
      date.setDate(date.getDate() + 1);
    }
    date = new Date(year, month, 1);
    dummyArr.sort((a, b) => compareNumbers(a[1], b[1]));
    dummyArr.forEach((item) => {
      obj[item[0]] = item[1];
      obj['dateObj'] = item[2];
    });
    arr.push({ ...obj });

    console.log(arr);
    this.datesArray$.next(arr);
  }
}
