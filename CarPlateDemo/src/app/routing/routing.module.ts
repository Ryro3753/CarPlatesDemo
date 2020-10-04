import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { CarPlatesScreenComponent } from '../components/car-plates-screen/car-plates-screen.component';
const routes: Routes = [
  { path: 'carplate', component: CarPlatesScreenComponent},
  { path: '', redirectTo: '/carplate', pathMatch: 'full' }
];
@NgModule({
  imports: [
    CommonModule,
    RouterModule.forRoot(routes)
  ],
  exports: [
    RouterModule
  ],
  declarations: []
})
export class RoutingModule { }