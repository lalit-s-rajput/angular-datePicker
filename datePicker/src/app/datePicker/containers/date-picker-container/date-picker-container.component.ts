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
  currentLocaleStringData: dateData = {
    weekday: '',
    day: 0,
    month: '',
    year: 0,
  };
  allDatesOfMonth: any = [];
  constructor(private dateService: DatePickerService) {}
  ngOnInit(): void {
    let currentStringData = this.currentDate.toLocaleDateString(undefined, {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
    console.log(currentStringData);
    this.dateService.currentLocaleString$.next(currentStringData);
    this.currentLocaleStringData = this.dateService.getAllDateData();
    this.allDatesOfMonth = this.dateService.getAllDatesOfCurrentMonth(7, 2024);
  }
}
