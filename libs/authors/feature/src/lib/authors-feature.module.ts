import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { authorsFeatureRoutes } from './lib.routes';

@NgModule({
  imports: [CommonModule, RouterModule.forChild(authorsFeatureRoutes)],
})
export class AuthorsFeatureModule {}
