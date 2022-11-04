import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { authorsFeatureRoutes } from './library.routes';
import { AuthorsListComponent } from './authors-list/authors-list.component';

@NgModule({
  imports: [CommonModule, RouterModule.forChild(authorsFeatureRoutes)],
  declarations: [AuthorsListComponent],
})
export class AuthorsFeatureModule {}
