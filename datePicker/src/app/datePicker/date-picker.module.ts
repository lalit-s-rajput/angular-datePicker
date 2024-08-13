import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import * as fromContainers from './containers';
import * as fromComponents from './components';

import { CommonModule } from '@angular/common';
@NgModule({
  declarations: [fromContainers.containers, fromComponents.components],
  imports: [CommonModule, FormsModule],
  providers: [],
})
export class ResultModule {}
