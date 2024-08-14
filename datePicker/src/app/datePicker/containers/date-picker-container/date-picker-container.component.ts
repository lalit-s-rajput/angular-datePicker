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
    this.currentYear = this.currentDate.getFullYear();
    this.currentMonthNumber = this.currentDate.getMonth();
    let currentStringData = this.currentDate.toLocaleDateString(undefined, {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
    console.log(currentStringData);
    this.dateService.currentLocaleString$.next(currentStringData);
    this.currentLocaleStringData = this.dateService.getAllDateData();
    this.dateService.getAllDatesOfCurrentMonth(
      this.currentMonthNumber,
      this.currentYear
    );
    this.allDatesOfMonth = this.dateService.datesArray$;
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
}
