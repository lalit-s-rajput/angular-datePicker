import { Component, OnInit } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Component({
  selector: 'app-date-picker-container',
  templateUrl: './date-picker-container.component.html',
  styleUrls: ['./date-picker-container.component.scss'],
})
export class DatePickerContainerComponent implements OnInit {
  currentDate: Date = new Date();
  currentLocaleString$ = new BehaviorSubject<string>('');
  ngOnInit(): void {
    let currentStringData = this.currentDate.toLocaleDateString(undefined, {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
    console.log(currentStringData);
    this.currentLocaleString$.next(currentStringData);
  }
}
