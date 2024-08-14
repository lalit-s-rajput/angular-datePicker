import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
import { dateData } from '../core/interface';

@Injectable({
  providedIn: 'root',
})
export class DatePickerService {
  currentLocaleString$ = new BehaviorSubject<string>('');
  currentDateData: dateData = {
    weekday: '',
    day: 0,
    month: '',
    year: 0,
  };
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
    let months = [
      'Sunday',
      'Monday',
      'Tuesday',
      'Wednesday',
      'Thursday',
      'Friday',
      'Saturday',
    ];
    let arr = [];
    let dummyArr: [string, number][] = []; // array inside array of type string and number same as string[]
    let date = new Date(year, month, 1);
    let compareNumbers = function (a: number, b: number) {
      return a - b;
    };
    let obj: { [key: string]: number } = {};
    while (date.getMonth() == month) {
      if (date.getDay() == 0) {
        dummyArr.sort((a, b) => compareNumbers(a[1], b[1]));
        dummyArr.forEach((item) => {
          obj[item[0]] = item[1];
        });
        arr.push({ ...obj });
        obj = {};
        dummyArr = [];
      }
      let weekDay = months[date.getDay()].slice(0, 3);
      dummyArr.push([weekDay, date.getDate()]);
      date.setDate(date.getDate() + 1);
      /**
      let weekDay = months[date.getDay()].slice(0, 3);
      arr.push({
        month: date.getMonth(),
        day: date.getDay(),
        [weekDay]: date.getDate(),
        dateObj: date,
      });
      date.setDate(date.getDate() + 1);
       */
    }
    dummyArr.sort((a, b) => compareNumbers(a[1], b[1]));
    dummyArr.forEach((item) => {
      obj[item[0]] = item[1];
    });
    arr.push({ ...obj });
    console.log(arr);
    return arr;
  }
}
