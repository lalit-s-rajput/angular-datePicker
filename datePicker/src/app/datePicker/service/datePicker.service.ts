import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
import { dateData } from '../core/interface';

@Injectable({
  providedIn: 'root',
})
export class DatePickerService {
  currentLocaleString$ = new BehaviorSubject<string>('');
  datesArray$ = new BehaviorSubject<{ [key: string]: number | Date | {} }[]>(
    []
  );
  noOfDaysCurrentMonth: number = 0;
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
  addInitialMissingDates(date: Date) {
    let missingDates = date.getDay();
    let newDate = new Date(date);
    let arr: [string, number, Date][] = [];
    while (missingDates) {
      newDate.setDate(newDate.getDate() - 1);
      let weekDay = this.weekDays[newDate.getDay()].slice(0, 3);
      arr.push([weekDay, newDate.getDate(), new Date(newDate)]);
      missingDates--;
    }
    return arr;
  }
  addLateralMissingDates(count: number, date: Date) {
    let missingDates = count;
    let newDate = new Date(date);
    let arr: [string, number, Date][] = [];
    while (missingDates) {
      let weekDay = this.weekDays[newDate.getDay()].slice(0, 3);
      arr.push([weekDay, newDate.getDate(), new Date(newDate)]);
      newDate.setDate(newDate.getDate() + 1);
      missingDates--;
    }
    return arr;
  }
  allLaterMissingDates(date: Date) {
    let arr = [];
    let extraDays = 49 - this.monthDays(date);
    console.log(extraDays);
    let newDate = new Date(date);
    let dummyArr: [string, number, Date][] = [];
    let obj: { [key: string]: number | Date | {} } = {};
    while (extraDays) {
      if (newDate.getDay() == 0) {
        dummyArr.forEach((item) => {
          obj[item[0]] = item[1];
          obj['dateObj'] = item[2];
          obj[`test-${item[0]}`] = { [item[0]]: item[1], dateOb: item[2] };
        });
        arr.push({ ...obj });
        obj = {};
        dummyArr = [];
      }
      let weekDay = this.weekDays[newDate.getDay()].slice(0, 3);
      dummyArr.push([weekDay, newDate.getDate(), new Date(newDate)]);
      newDate.setDate(newDate.getDate() + 1);
      extraDays--;
    }
    return dummyArr;
  }
  monthDays(date: Date) {
    let days = new Date(date.getFullYear(), date.getMonth(), 0);
    console.log(days.getDate());
    return days.getDate();
  }
  getAllDatesOfCurrentMonth(month: number, year: number) {
    let arr = [];
    let dummyArr: [string, number, Date][] = []; // array inside array of type string and number same as string[]
    let date = new Date(year, month, 1); // to get first date of a month
    let compareNumbers = function (a: number, b: number) {
      return a - b;
    };
    let obj: { [key: string]: number | Date | {} } = {};
    dummyArr = [...this.addInitialMissingDates(date)];
    while (date.getMonth() == month) {
      // increase by one to get next until and run next month occurs
      if (date.getDay() == 0) {
        //dummyArr.sort((a, b) => compareNumbers(a[1], b[1]));
        dummyArr.forEach((item) => {
          obj[item[0]] = item[1];
          obj['dateObj'] = item[2];
          let key = this.months[item[2].getMonth()] + '-' + item[0];
          obj[key] = { [item[0]]: item[1], dateOb: item[2] };
        });
        arr.push({ ...obj });
        obj = {};
        dummyArr = [];
      }
      let weekDay = this.weekDays[date.getDay()].slice(0, 3);
      dummyArr.push([weekDay, date.getDate(), new Date(date)]);
      date.setDate(date.getDate() + 1);
    }
    //let arrData = this.allLaterMissingDates(date);
    //date = new Date(year, month, 1);

    //dummyArr.sort((a, b) => compareNumbers(a[1], b[1]));
    let count = 7 - dummyArr.length;
    let arrData = this.addLateralMissingDates(count, date);
    if (arrData.length) {
      dummyArr = dummyArr.concat(arrData);
    }
    dummyArr.forEach((item) => {
      obj[item[0]] = item[1];
      obj['dateObj'] = item[2];
      let key = this.months[item[2].getMonth()] + '-' + item[0];
      obj[key] = { [item[0]]: item[1], dateOb: item[2] };
    });
    arr.push({ ...obj });
    if (arrData.length == 0) {
      arrData = this.addLateralMissingDates(7, date);
      let obj: { [key: string]: number | Date | {} } = {};
      arrData.forEach((item) => {
        obj[item[0]] = item[1];
        obj['dateObj'] = item[2];
        let key = this.months[item[2].getMonth()] + '-' + item[0];
        obj[key] = { [item[0]]: item[1], dateOb: item[2] };
      });
      arr.push({ ...obj });
    }
    console.log(arr);
    this.datesArray$.next(arr);
  }
}
