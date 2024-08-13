import { Route } from '@angular/router';
import * as fromContainers from './datePicker/containers';
import { AppComponent } from './app.component';
export const allRoutes: Route[] = [
  {
    path: '',
    component: AppComponent,
    children: [
      {
        path: '',
        component: fromContainers.DatePickerContainerComponent,
        loadChildren: () =>
          import('./datePicker/date-picker.module').then((m) => m.ResultModule),
      },
    ],
  },
];
