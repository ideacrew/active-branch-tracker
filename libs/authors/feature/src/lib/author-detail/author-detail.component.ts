import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { AuthorsService } from '@idc/authors/data-access';
import { FSPullRequest } from '@idc/pull-requests/data-access';
import { filter, map, Observable, shareReplay, switchMap } from 'rxjs';

@Component({
  templateUrl: './author-detail.component.html',
  styleUrls: ['./author-detail.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AuthorDetailComponent {
  authorUserName$: Observable<string> = this.route.paramMap.pipe(
    filter((parameters: ParamMap) => parameters.has('authorId')),
    map((parameters: ParamMap) => parameters.get('authorId') ?? 'noUserName'),
    shareReplay(),
  );

  authorPullRequests$: Observable<FSPullRequest[]> = this.authorUserName$.pipe(
    switchMap(authorId =>
      this.authorsService.getPullRequestsByAuthor(authorId),
    ),
  );

  constructor(
    private authorsService: AuthorsService,
    private route: ActivatedRoute,
  ) {}
}
