import { PullRequestEventPayload } from '../interfaces/pullRequest';

export const prEvent: PullRequestEventPayload = {
  action: 'opened',
  number: 12,
  pull_request: {
    url: 'https://api.github.com/repos/ideacrew/active-branch-tracker/pulls/12',
    id: 610764732,
    node_id: 'MDExOlB1bGxSZXF1ZXN0NjEwNzY0NzMy',
    html_url: 'https://github.com/ideacrew/active-branch-tracker/pull/12',
    diff_url: 'https://github.com/ideacrew/active-branch-tracker/pull/12.diff',
    patch_url:
      'https://github.com/ideacrew/active-branch-tracker/pull/12.patch',
    issue_url:
      'https://api.github.com/repos/ideacrew/active-branch-tracker/issues/12',
    number: 12,
    state: 'open',
    locked: false,
    title: 'add test json',
    user: {
      login: 'markgoho',
      id: 9759954,
      node_id: 'MDQ6VXNlcjk3NTk5NTQ=',
      avatar_url: 'https://avatars.githubusercontent.com/u/9759954?v=4',
      gravatar_id: '',
      url: 'https://api.github.com/users/markgoho',
      html_url: 'https://github.com/markgoho',
      followers_url: 'https://api.github.com/users/markgoho/followers',
      following_url:
        'https://api.github.com/users/markgoho/following{/other_user}',
      gists_url: 'https://api.github.com/users/markgoho/gists{/gist_id}',
      starred_url:
        'https://api.github.com/users/markgoho/starred{/owner}{/repo}',
      subscriptions_url: 'https://api.github.com/users/markgoho/subscriptions',
      organizations_url: 'https://api.github.com/users/markgoho/orgs',
      repos_url: 'https://api.github.com/users/markgoho/repos',
      events_url: 'https://api.github.com/users/markgoho/events{/privacy}',
      received_events_url:
        'https://api.github.com/users/markgoho/received_events',
      type: 'User',
      site_admin: false,
    },
    body: '',
    created_at: '2021-04-07T15:26:55Z',
    updated_at: '2021-04-07T15:26:55Z',
    closed_at: null,
    merged_at: null,
    merge_commit_sha: null,
    assignee: null,
    assignees: [],
    requested_reviewers: [],
    requested_teams: [],
    labels: [],
    milestone: null,
    draft: false,
    commits_url:
      'https://api.github.com/repos/ideacrew/active-branch-tracker/pulls/12/commits',
    review_comments_url:
      'https://api.github.com/repos/ideacrew/active-branch-tracker/pulls/12/comments',
    review_comment_url:
      'https://api.github.com/repos/ideacrew/active-branch-tracker/pulls/comments{/number}',
    comments_url:
      'https://api.github.com/repos/ideacrew/active-branch-tracker/issues/12/comments',
    statuses_url:
      'https://api.github.com/repos/ideacrew/active-branch-tracker/statuses/7b5d382460a735d5a40e227c367293f99ec169de',
    head: {
      label: 'ideacrew:test-pr',
      ref: 'test-pr',
      sha: '7b5d382460a735d5a40e227c367293f99ec169de',
      user: {
        login: 'ideacrew',
        id: 16527269,
        node_id: 'MDEyOk9yZ2FuaXphdGlvbjE2NTI3MjY5',
        avatar_url: 'https://avatars.githubusercontent.com/u/16527269?v=4',
        gravatar_id: '',
        url: 'https://api.github.com/users/ideacrew',
        html_url: 'https://github.com/ideacrew',
        followers_url: 'https://api.github.com/users/ideacrew/followers',
        following_url:
          'https://api.github.com/users/ideacrew/following{/other_user}',
        gists_url: 'https://api.github.com/users/ideacrew/gists{/gist_id}',
        starred_url:
          'https://api.github.com/users/ideacrew/starred{/owner}{/repo}',
        subscriptions_url:
          'https://api.github.com/users/ideacrew/subscriptions',
        organizations_url: 'https://api.github.com/users/ideacrew/orgs',
        repos_url: 'https://api.github.com/users/ideacrew/repos',
        events_url: 'https://api.github.com/users/ideacrew/events{/privacy}',
        received_events_url:
          'https://api.github.com/users/ideacrew/received_events',
        type: 'Organization',
        site_admin: false,
      },
      repo: {
        id: 279365735,
        node_id: 'MDEwOlJlcG9zaXRvcnkyNzkzNjU3MzU=',
        name: 'active-branch-tracker',
        full_name: 'ideacrew/active-branch-tracker',
        private: false,
        owner: {
          login: 'ideacrew',
          id: 16527269,
          node_id: 'MDEyOk9yZ2FuaXphdGlvbjE2NTI3MjY5',
          avatar_url: 'https://avatars.githubusercontent.com/u/16527269?v=4',
          gravatar_id: '',
          url: 'https://api.github.com/users/ideacrew',
          html_url: 'https://github.com/ideacrew',
          followers_url: 'https://api.github.com/users/ideacrew/followers',
          following_url:
            'https://api.github.com/users/ideacrew/following{/other_user}',
          gists_url: 'https://api.github.com/users/ideacrew/gists{/gist_id}',
          starred_url:
            'https://api.github.com/users/ideacrew/starred{/owner}{/repo}',
          subscriptions_url:
            'https://api.github.com/users/ideacrew/subscriptions',
          organizations_url: 'https://api.github.com/users/ideacrew/orgs',
          repos_url: 'https://api.github.com/users/ideacrew/repos',
          events_url: 'https://api.github.com/users/ideacrew/events{/privacy}',
          received_events_url:
            'https://api.github.com/users/ideacrew/received_events',
          type: 'Organization',
          site_admin: false,
        },
        html_url: 'https://github.com/ideacrew/active-branch-tracker',
        description: 'Dashboard for Work in Process for IdeaCrew repos',
        fork: false,
        url: 'https://api.github.com/repos/ideacrew/active-branch-tracker',
        forks_url:
          'https://api.github.com/repos/ideacrew/active-branch-tracker/forks',
        keys_url:
          'https://api.github.com/repos/ideacrew/active-branch-tracker/keys{/key_id}',
        collaborators_url:
          'https://api.github.com/repos/ideacrew/active-branch-tracker/collaborators{/collaborator}',
        teams_url:
          'https://api.github.com/repos/ideacrew/active-branch-tracker/teams',
        hooks_url:
          'https://api.github.com/repos/ideacrew/active-branch-tracker/hooks',
        issue_events_url:
          'https://api.github.com/repos/ideacrew/active-branch-tracker/issues/events{/number}',
        events_url:
          'https://api.github.com/repos/ideacrew/active-branch-tracker/events',
        assignees_url:
          'https://api.github.com/repos/ideacrew/active-branch-tracker/assignees{/user}',
        branches_url:
          'https://api.github.com/repos/ideacrew/active-branch-tracker/branches{/branch}',
        tags_url:
          'https://api.github.com/repos/ideacrew/active-branch-tracker/tags',
        blobs_url:
          'https://api.github.com/repos/ideacrew/active-branch-tracker/git/blobs{/sha}',
        git_tags_url:
          'https://api.github.com/repos/ideacrew/active-branch-tracker/git/tags{/sha}',
        git_refs_url:
          'https://api.github.com/repos/ideacrew/active-branch-tracker/git/refs{/sha}',
        trees_url:
          'https://api.github.com/repos/ideacrew/active-branch-tracker/git/trees{/sha}',
        statuses_url:
          'https://api.github.com/repos/ideacrew/active-branch-tracker/statuses/{sha}',
        languages_url:
          'https://api.github.com/repos/ideacrew/active-branch-tracker/languages',
        stargazers_url:
          'https://api.github.com/repos/ideacrew/active-branch-tracker/stargazers',
        contributors_url:
          'https://api.github.com/repos/ideacrew/active-branch-tracker/contributors',
        subscribers_url:
          'https://api.github.com/repos/ideacrew/active-branch-tracker/subscribers',
        subscription_url:
          'https://api.github.com/repos/ideacrew/active-branch-tracker/subscription',
        commits_url:
          'https://api.github.com/repos/ideacrew/active-branch-tracker/commits{/sha}',
        git_commits_url:
          'https://api.github.com/repos/ideacrew/active-branch-tracker/git/commits{/sha}',
        comments_url:
          'https://api.github.com/repos/ideacrew/active-branch-tracker/comments{/number}',
        issue_comment_url:
          'https://api.github.com/repos/ideacrew/active-branch-tracker/issues/comments{/number}',
        contents_url:
          'https://api.github.com/repos/ideacrew/active-branch-tracker/contents/{+path}',
        compare_url:
          'https://api.github.com/repos/ideacrew/active-branch-tracker/compare/{base}...{head}',
        merges_url:
          'https://api.github.com/repos/ideacrew/active-branch-tracker/merges',
        archive_url:
          'https://api.github.com/repos/ideacrew/active-branch-tracker/{archive_format}{/ref}',
        downloads_url:
          'https://api.github.com/repos/ideacrew/active-branch-tracker/downloads',
        issues_url:
          'https://api.github.com/repos/ideacrew/active-branch-tracker/issues{/number}',
        pulls_url:
          'https://api.github.com/repos/ideacrew/active-branch-tracker/pulls{/number}',
        milestones_url:
          'https://api.github.com/repos/ideacrew/active-branch-tracker/milestones{/number}',
        notifications_url:
          'https://api.github.com/repos/ideacrew/active-branch-tracker/notifications{?since,all,participating}',
        labels_url:
          'https://api.github.com/repos/ideacrew/active-branch-tracker/labels{/name}',
        releases_url:
          'https://api.github.com/repos/ideacrew/active-branch-tracker/releases{/id}',
        deployments_url:
          'https://api.github.com/repos/ideacrew/active-branch-tracker/deployments',
        created_at: '2020-07-13T17:13:39Z',
        updated_at: '2021-04-06T17:05:16Z',
        pushed_at: '2021-04-07T15:26:41Z',
        git_url: 'git://github.com/ideacrew/active-branch-tracker.git',
        ssh_url: 'git@github.com:ideacrew/active-branch-tracker.git',
        clone_url: 'https://github.com/ideacrew/active-branch-tracker.git',
        svn_url: 'https://github.com/ideacrew/active-branch-tracker',
        homepage: 'https://yellr.app',
        size: 4309,
        stargazers_count: 0,
        watchers_count: 0,
        language: 'TypeScript',
        has_issues: true,
        has_projects: true,
        has_downloads: true,
        has_wiki: false,
        has_pages: false,
        forks_count: 0,
        mirror_url: null,
        archived: false,
        disabled: false,
        open_issues_count: 3,
        license: null,
        forks: 0,
        open_issues: 3,
        watchers: 0,
        default_branch: 'trunk',
        allow_squash_merge: true,
        allow_merge_commit: false,
        allow_rebase_merge: false,
        delete_branch_on_merge: true,
      },
    },
    base: {
      label: 'ideacrew:trunk',
      ref: 'trunk',
      sha: '1604892b7ad643147fcc141580982fb9ede0a54e',
      user: {
        login: 'ideacrew',
        id: 16527269,
        node_id: 'MDEyOk9yZ2FuaXphdGlvbjE2NTI3MjY5',
        avatar_url: 'https://avatars.githubusercontent.com/u/16527269?v=4',
        gravatar_id: '',
        url: 'https://api.github.com/users/ideacrew',
        html_url: 'https://github.com/ideacrew',
        followers_url: 'https://api.github.com/users/ideacrew/followers',
        following_url:
          'https://api.github.com/users/ideacrew/following{/other_user}',
        gists_url: 'https://api.github.com/users/ideacrew/gists{/gist_id}',
        starred_url:
          'https://api.github.com/users/ideacrew/starred{/owner}{/repo}',
        subscriptions_url:
          'https://api.github.com/users/ideacrew/subscriptions',
        organizations_url: 'https://api.github.com/users/ideacrew/orgs',
        repos_url: 'https://api.github.com/users/ideacrew/repos',
        events_url: 'https://api.github.com/users/ideacrew/events{/privacy}',
        received_events_url:
          'https://api.github.com/users/ideacrew/received_events',
        type: 'Organization',
        site_admin: false,
      },
      repo: {
        id: 279365735,
        node_id: 'MDEwOlJlcG9zaXRvcnkyNzkzNjU3MzU=',
        name: 'active-branch-tracker',
        full_name: 'ideacrew/active-branch-tracker',
        private: false,
        owner: {
          login: 'ideacrew',
          id: 16527269,
          node_id: 'MDEyOk9yZ2FuaXphdGlvbjE2NTI3MjY5',
          avatar_url: 'https://avatars.githubusercontent.com/u/16527269?v=4',
          gravatar_id: '',
          url: 'https://api.github.com/users/ideacrew',
          html_url: 'https://github.com/ideacrew',
          followers_url: 'https://api.github.com/users/ideacrew/followers',
          following_url:
            'https://api.github.com/users/ideacrew/following{/other_user}',
          gists_url: 'https://api.github.com/users/ideacrew/gists{/gist_id}',
          starred_url:
            'https://api.github.com/users/ideacrew/starred{/owner}{/repo}',
          subscriptions_url:
            'https://api.github.com/users/ideacrew/subscriptions',
          organizations_url: 'https://api.github.com/users/ideacrew/orgs',
          repos_url: 'https://api.github.com/users/ideacrew/repos',
          events_url: 'https://api.github.com/users/ideacrew/events{/privacy}',
          received_events_url:
            'https://api.github.com/users/ideacrew/received_events',
          type: 'Organization',
          site_admin: false,
        },
        html_url: 'https://github.com/ideacrew/active-branch-tracker',
        description: 'Dashboard for Work in Process for IdeaCrew repos',
        fork: false,
        url: 'https://api.github.com/repos/ideacrew/active-branch-tracker',
        forks_url:
          'https://api.github.com/repos/ideacrew/active-branch-tracker/forks',
        keys_url:
          'https://api.github.com/repos/ideacrew/active-branch-tracker/keys{/key_id}',
        collaborators_url:
          'https://api.github.com/repos/ideacrew/active-branch-tracker/collaborators{/collaborator}',
        teams_url:
          'https://api.github.com/repos/ideacrew/active-branch-tracker/teams',
        hooks_url:
          'https://api.github.com/repos/ideacrew/active-branch-tracker/hooks',
        issue_events_url:
          'https://api.github.com/repos/ideacrew/active-branch-tracker/issues/events{/number}',
        events_url:
          'https://api.github.com/repos/ideacrew/active-branch-tracker/events',
        assignees_url:
          'https://api.github.com/repos/ideacrew/active-branch-tracker/assignees{/user}',
        branches_url:
          'https://api.github.com/repos/ideacrew/active-branch-tracker/branches{/branch}',
        tags_url:
          'https://api.github.com/repos/ideacrew/active-branch-tracker/tags',
        blobs_url:
          'https://api.github.com/repos/ideacrew/active-branch-tracker/git/blobs{/sha}',
        git_tags_url:
          'https://api.github.com/repos/ideacrew/active-branch-tracker/git/tags{/sha}',
        git_refs_url:
          'https://api.github.com/repos/ideacrew/active-branch-tracker/git/refs{/sha}',
        trees_url:
          'https://api.github.com/repos/ideacrew/active-branch-tracker/git/trees{/sha}',
        statuses_url:
          'https://api.github.com/repos/ideacrew/active-branch-tracker/statuses/{sha}',
        languages_url:
          'https://api.github.com/repos/ideacrew/active-branch-tracker/languages',
        stargazers_url:
          'https://api.github.com/repos/ideacrew/active-branch-tracker/stargazers',
        contributors_url:
          'https://api.github.com/repos/ideacrew/active-branch-tracker/contributors',
        subscribers_url:
          'https://api.github.com/repos/ideacrew/active-branch-tracker/subscribers',
        subscription_url:
          'https://api.github.com/repos/ideacrew/active-branch-tracker/subscription',
        commits_url:
          'https://api.github.com/repos/ideacrew/active-branch-tracker/commits{/sha}',
        git_commits_url:
          'https://api.github.com/repos/ideacrew/active-branch-tracker/git/commits{/sha}',
        comments_url:
          'https://api.github.com/repos/ideacrew/active-branch-tracker/comments{/number}',
        issue_comment_url:
          'https://api.github.com/repos/ideacrew/active-branch-tracker/issues/comments{/number}',
        contents_url:
          'https://api.github.com/repos/ideacrew/active-branch-tracker/contents/{+path}',
        compare_url:
          'https://api.github.com/repos/ideacrew/active-branch-tracker/compare/{base}...{head}',
        merges_url:
          'https://api.github.com/repos/ideacrew/active-branch-tracker/merges',
        archive_url:
          'https://api.github.com/repos/ideacrew/active-branch-tracker/{archive_format}{/ref}',
        downloads_url:
          'https://api.github.com/repos/ideacrew/active-branch-tracker/downloads',
        issues_url:
          'https://api.github.com/repos/ideacrew/active-branch-tracker/issues{/number}',
        pulls_url:
          'https://api.github.com/repos/ideacrew/active-branch-tracker/pulls{/number}',
        milestones_url:
          'https://api.github.com/repos/ideacrew/active-branch-tracker/milestones{/number}',
        notifications_url:
          'https://api.github.com/repos/ideacrew/active-branch-tracker/notifications{?since,all,participating}',
        labels_url:
          'https://api.github.com/repos/ideacrew/active-branch-tracker/labels{/name}',
        releases_url:
          'https://api.github.com/repos/ideacrew/active-branch-tracker/releases{/id}',
        deployments_url:
          'https://api.github.com/repos/ideacrew/active-branch-tracker/deployments',
        created_at: '2020-07-13T17:13:39Z',
        updated_at: '2021-04-06T17:05:16Z',
        pushed_at: '2021-04-07T15:26:41Z',
        git_url: 'git://github.com/ideacrew/active-branch-tracker.git',
        ssh_url: 'git@github.com:ideacrew/active-branch-tracker.git',
        clone_url: 'https://github.com/ideacrew/active-branch-tracker.git',
        svn_url: 'https://github.com/ideacrew/active-branch-tracker',
        homepage: 'https://yellr.app',
        size: 4309,
        stargazers_count: 0,
        watchers_count: 0,
        language: 'TypeScript',
        has_issues: true,
        has_projects: true,
        has_downloads: true,
        has_wiki: false,
        has_pages: false,
        forks_count: 0,
        mirror_url: null,
        archived: false,
        disabled: false,
        open_issues_count: 3,
        license: null,
        forks: 0,
        open_issues: 3,
        watchers: 0,
        default_branch: 'trunk',
        allow_squash_merge: true,
        allow_merge_commit: false,
        allow_rebase_merge: false,
        delete_branch_on_merge: true,
      },
    },
    _links: {
      self: {
        href:
          'https://api.github.com/repos/ideacrew/active-branch-tracker/pulls/12',
      },
      html: {
        href: 'https://github.com/ideacrew/active-branch-tracker/pull/12',
      },
      issue: {
        href:
          'https://api.github.com/repos/ideacrew/active-branch-tracker/issues/12',
      },
      comments: {
        href:
          'https://api.github.com/repos/ideacrew/active-branch-tracker/issues/12/comments',
      },
      review_comments: {
        href:
          'https://api.github.com/repos/ideacrew/active-branch-tracker/pulls/12/comments',
      },
      review_comment: {
        href:
          'https://api.github.com/repos/ideacrew/active-branch-tracker/pulls/comments{/number}',
      },
      commits: {
        href:
          'https://api.github.com/repos/ideacrew/active-branch-tracker/pulls/12/commits',
      },
      statuses: {
        href:
          'https://api.github.com/repos/ideacrew/active-branch-tracker/statuses/7b5d382460a735d5a40e227c367293f99ec169de',
      },
    },
    author_association: 'MEMBER',
    auto_merge: null,
    active_lock_reason: null,
    merged: false,
    mergeable: null,
    rebaseable: null,
    mergeable_state: 'unknown',
    merged_by: null,
    comments: 0,
    review_comments: 0,
    maintainer_can_modify: false,
    commits: 1,
    additions: 3,
    deletions: 0,
    changed_files: 1,
  },
  repository: {
    id: 279365735,
    node_id: 'MDEwOlJlcG9zaXRvcnkyNzkzNjU3MzU=',
    name: 'active-branch-tracker',
    full_name: 'ideacrew/active-branch-tracker',
    private: false,
    owner: {
      login: 'ideacrew',
      id: 16527269,
      node_id: 'MDEyOk9yZ2FuaXphdGlvbjE2NTI3MjY5',
      avatar_url: 'https://avatars.githubusercontent.com/u/16527269?v=4',
      gravatar_id: '',
      url: 'https://api.github.com/users/ideacrew',
      html_url: 'https://github.com/ideacrew',
      followers_url: 'https://api.github.com/users/ideacrew/followers',
      following_url:
        'https://api.github.com/users/ideacrew/following{/other_user}',
      gists_url: 'https://api.github.com/users/ideacrew/gists{/gist_id}',
      starred_url:
        'https://api.github.com/users/ideacrew/starred{/owner}{/repo}',
      subscriptions_url: 'https://api.github.com/users/ideacrew/subscriptions',
      organizations_url: 'https://api.github.com/users/ideacrew/orgs',
      repos_url: 'https://api.github.com/users/ideacrew/repos',
      events_url: 'https://api.github.com/users/ideacrew/events{/privacy}',
      received_events_url:
        'https://api.github.com/users/ideacrew/received_events',
      type: 'Organization',
      site_admin: false,
    },
    html_url: 'https://github.com/ideacrew/active-branch-tracker',
    description: 'Dashboard for Work in Process for IdeaCrew repos',
    fork: false,
    url: 'https://api.github.com/repos/ideacrew/active-branch-tracker',
    forks_url:
      'https://api.github.com/repos/ideacrew/active-branch-tracker/forks',
    keys_url:
      'https://api.github.com/repos/ideacrew/active-branch-tracker/keys{/key_id}',
    collaborators_url:
      'https://api.github.com/repos/ideacrew/active-branch-tracker/collaborators{/collaborator}',
    teams_url:
      'https://api.github.com/repos/ideacrew/active-branch-tracker/teams',
    hooks_url:
      'https://api.github.com/repos/ideacrew/active-branch-tracker/hooks',
    issue_events_url:
      'https://api.github.com/repos/ideacrew/active-branch-tracker/issues/events{/number}',
    events_url:
      'https://api.github.com/repos/ideacrew/active-branch-tracker/events',
    assignees_url:
      'https://api.github.com/repos/ideacrew/active-branch-tracker/assignees{/user}',
    branches_url:
      'https://api.github.com/repos/ideacrew/active-branch-tracker/branches{/branch}',
    tags_url:
      'https://api.github.com/repos/ideacrew/active-branch-tracker/tags',
    blobs_url:
      'https://api.github.com/repos/ideacrew/active-branch-tracker/git/blobs{/sha}',
    git_tags_url:
      'https://api.github.com/repos/ideacrew/active-branch-tracker/git/tags{/sha}',
    git_refs_url:
      'https://api.github.com/repos/ideacrew/active-branch-tracker/git/refs{/sha}',
    trees_url:
      'https://api.github.com/repos/ideacrew/active-branch-tracker/git/trees{/sha}',
    statuses_url:
      'https://api.github.com/repos/ideacrew/active-branch-tracker/statuses/{sha}',
    languages_url:
      'https://api.github.com/repos/ideacrew/active-branch-tracker/languages',
    stargazers_url:
      'https://api.github.com/repos/ideacrew/active-branch-tracker/stargazers',
    contributors_url:
      'https://api.github.com/repos/ideacrew/active-branch-tracker/contributors',
    subscribers_url:
      'https://api.github.com/repos/ideacrew/active-branch-tracker/subscribers',
    subscription_url:
      'https://api.github.com/repos/ideacrew/active-branch-tracker/subscription',
    commits_url:
      'https://api.github.com/repos/ideacrew/active-branch-tracker/commits{/sha}',
    git_commits_url:
      'https://api.github.com/repos/ideacrew/active-branch-tracker/git/commits{/sha}',
    comments_url:
      'https://api.github.com/repos/ideacrew/active-branch-tracker/comments{/number}',
    issue_comment_url:
      'https://api.github.com/repos/ideacrew/active-branch-tracker/issues/comments{/number}',
    contents_url:
      'https://api.github.com/repos/ideacrew/active-branch-tracker/contents/{+path}',
    compare_url:
      'https://api.github.com/repos/ideacrew/active-branch-tracker/compare/{base}...{head}',
    merges_url:
      'https://api.github.com/repos/ideacrew/active-branch-tracker/merges',
    archive_url:
      'https://api.github.com/repos/ideacrew/active-branch-tracker/{archive_format}{/ref}',
    downloads_url:
      'https://api.github.com/repos/ideacrew/active-branch-tracker/downloads',
    issues_url:
      'https://api.github.com/repos/ideacrew/active-branch-tracker/issues{/number}',
    pulls_url:
      'https://api.github.com/repos/ideacrew/active-branch-tracker/pulls{/number}',
    milestones_url:
      'https://api.github.com/repos/ideacrew/active-branch-tracker/milestones{/number}',
    notifications_url:
      'https://api.github.com/repos/ideacrew/active-branch-tracker/notifications{?since,all,participating}',
    labels_url:
      'https://api.github.com/repos/ideacrew/active-branch-tracker/labels{/name}',
    releases_url:
      'https://api.github.com/repos/ideacrew/active-branch-tracker/releases{/id}',
    deployments_url:
      'https://api.github.com/repos/ideacrew/active-branch-tracker/deployments',
    created_at: '2020-07-13T17:13:39Z',
    updated_at: '2021-04-06T17:05:16Z',
    pushed_at: '2021-04-07T15:26:41Z',
    git_url: 'git://github.com/ideacrew/active-branch-tracker.git',
    ssh_url: 'git@github.com:ideacrew/active-branch-tracker.git',
    clone_url: 'https://github.com/ideacrew/active-branch-tracker.git',
    svn_url: 'https://github.com/ideacrew/active-branch-tracker',
    homepage: 'https://yellr.app',
    size: 4309,
    stargazers_count: 0,
    watchers_count: 0,
    language: 'TypeScript',
    has_issues: true,
    has_projects: true,
    has_downloads: true,
    has_wiki: false,
    has_pages: false,
    forks_count: 0,
    mirror_url: null,
    archived: false,
    disabled: false,
    open_issues_count: 3,
    license: null,
    forks: 0,
    open_issues: 3,
    watchers: 0,
    default_branch: 'trunk',
  },
  organization: {
    login: 'ideacrew',
    id: 16527269,
    node_id: 'MDEyOk9yZ2FuaXphdGlvbjE2NTI3MjY5',
    url: 'https://api.github.com/orgs/ideacrew',
    repos_url: 'https://api.github.com/orgs/ideacrew/repos',
    events_url: 'https://api.github.com/orgs/ideacrew/events',
    hooks_url: 'https://api.github.com/orgs/ideacrew/hooks',
    issues_url: 'https://api.github.com/orgs/ideacrew/issues',
    members_url: 'https://api.github.com/orgs/ideacrew/members{/member}',
    public_members_url:
      'https://api.github.com/orgs/ideacrew/public_members{/member}',
    avatar_url: 'https://avatars.githubusercontent.com/u/16527269?v=4',
    description: '',
  },
  sender: {
    login: 'markgoho',
    id: 9759954,
    node_id: 'MDQ6VXNlcjk3NTk5NTQ=',
    avatar_url: 'https://avatars.githubusercontent.com/u/9759954?v=4',
    gravatar_id: '',
    url: 'https://api.github.com/users/markgoho',
    html_url: 'https://github.com/markgoho',
    followers_url: 'https://api.github.com/users/markgoho/followers',
    following_url:
      'https://api.github.com/users/markgoho/following{/other_user}',
    gists_url: 'https://api.github.com/users/markgoho/gists{/gist_id}',
    starred_url: 'https://api.github.com/users/markgoho/starred{/owner}{/repo}',
    subscriptions_url: 'https://api.github.com/users/markgoho/subscriptions',
    organizations_url: 'https://api.github.com/users/markgoho/orgs',
    repos_url: 'https://api.github.com/users/markgoho/repos',
    events_url: 'https://api.github.com/users/markgoho/events{/privacy}',
    received_events_url:
      'https://api.github.com/users/markgoho/received_events',
    type: 'User',
    site_admin: false,
  },
};
