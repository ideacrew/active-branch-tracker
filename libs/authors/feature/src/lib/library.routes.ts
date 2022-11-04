import { Route } from '@angular/router';

import { AuthorDetailComponent } from './author-detail/author-detail.component';
import { AuthorsListComponent } from './authors-list/authors-list.component';

export const authorsFeatureRoutes: Route[] = [
  { path: '', pathMatch: 'full', component: AuthorsListComponent },
  { path: ':authorId', component: AuthorDetailComponent },
];
