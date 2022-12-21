import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { UtilModule } from '@idc/util';

import { authorsFeatureRoutes } from './library.routes';
import { AuthorsListComponent } from './authors-list/authors-list.component';
import { AuthorDetailComponent } from './author-detail/author-detail.component';
import { PrsPerBusinessDayPipe } from './prs-per-business-day.pipe';
import { PrStatsComponent } from './pr-stats/pr-stats.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(authorsFeatureRoutes),
    UtilModule,
  ],
  declarations: [
    AuthorsListComponent,
    AuthorDetailComponent,
    PrsPerBusinessDayPipe,
    PrStatsComponent,
  ],
})
export class AuthorsFeatureModule {}
