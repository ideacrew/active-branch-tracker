import { Route } from '@angular/router';
import { AuthorsListComponent } from './authors-list/authors-list.component';

export const authorsFeatureRoutes: Route[] = [
  { path: '', pathMatch: 'full', component: AuthorsListComponent },
];
