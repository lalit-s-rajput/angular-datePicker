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
}
