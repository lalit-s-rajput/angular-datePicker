import { Component, OnInit } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { DatePickerService } from '../../service/datePicker.service';
import { dateData } from '../../core/interface';

@Component({
  selector: 'app-date-picker-container',
  templateUrl: './date-picker-container.component.html',
  styleUrls: ['./date-picker-container.component.scss'],
})
export class DatePickerContainerComponent implements OnInit {
  currentDate: Date = new Date();
  currentYear: number = 0;
  currentMonthNumber: number = 0;
  currentLocaleStringData: dateData = {
    weekday: '',
    day: 0,
    month: '',
    year: 0,
  };
  allDatesOfMonth: any = [];
  constructor(private dateService: DatePickerService) {}
  ngOnInit(): void {
    this.setRequiredData(this.currentDate);
    this.allDatesOfMonth = this.dateService.datesArray$;
  }
  setRequiredData(date: Date) {
    this.currentYear = date.getFullYear();
    this.currentMonthNumber = date.getMonth();
    let currentStringData = date.toLocaleDateString(undefined, {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
    console.log(currentStringData);
    this.dateService.currentLocaleString$.next(currentStringData);
    this.currentLocaleStringData = { ...this.dateService.getAllDateData() };
    this.dateService.getAllDatesOfCurrentMonth(
      this.currentMonthNumber,
      this.currentYear
    );
  }
  getYear(event: number) {
    this.currentYear = event;
    this.dateService.getAllDatesOfCurrentMonth(
      this.currentMonthNumber,
      this.currentYear
    );
  }
  getMonth(event: string) {
    this.currentMonthNumber = this.dateService.months.indexOf(event);
    this.dateService.getAllDatesOfCurrentMonth(
      this.currentMonthNumber,
      this.currentYear
    );
  }
  getSelectedDate(dateValue: number) {
    console.log(dateValue);
    this.currentDate = new Date(
      `${this.currentYear}-${this.currentMonthNumber + 1}-${dateValue}`
    );
    // this.currentDate.setDate(dateValue);
    this.setRequiredData(this.currentDate);
  }
}
