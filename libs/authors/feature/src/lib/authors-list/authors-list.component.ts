import { Component, ChangeDetectionStrategy } from '@angular/core';
import { Author, AuthorsService } from '@idc/authors/data-access';
import { Observable } from 'rxjs';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './authors-list.component.html',
  styleUrls: ['./authors-list.component.scss'],
})
export class AuthorsListComponent {
  authors$: Observable<Author[]> = this.authorsService.queryAuthorList();

  constructor(private authorsService: AuthorsService) {}

  trackByAuthor(index: number): number {
    return index;
  }
}
