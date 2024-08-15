import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { allRoutes } from './routes';

@NgModule({
  imports: [RouterModule.forRoot(allRoutes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
