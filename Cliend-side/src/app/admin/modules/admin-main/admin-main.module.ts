import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminMainRoutingModule } from './admin-main-routing.module';
import { AdminMainComponent } from './admin-main.component';
import { AdminSharedModule } from '../../components/admin-shared.module';


@NgModule({
  declarations: [
    AdminMainComponent
  ],
  imports: [
    CommonModule,
    AdminMainRoutingModule,
    AdminSharedModule
  ]
})
export class AdminMainModule { }
