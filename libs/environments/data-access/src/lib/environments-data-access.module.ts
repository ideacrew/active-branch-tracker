import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EnvironmentsService } from './environments.service';

@NgModule({
  imports: [CommonModule],
  providers: [EnvironmentsService],
})
export class EnvironmentsDataAccessModule {}
