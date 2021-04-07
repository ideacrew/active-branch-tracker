import { IssueCommentPayload } from '../interfaces/issueComment';

export const issueCommentEdited: IssueCommentPayload = {
  action: 'edited',
  changes: {
    body: {
      from: "Here's a comment!",
    },
  },
  issue: {
    url:
      'https://api.github.com/repos/ideacrew/active-branch-tracker/issues/12',
    repository_url:
      'https://api.github.com/repos/ideacrew/active-branch-tracker',
    labels_url:
      'https://api.github.com/repos/ideacrew/active-branch-tracker/issues/12/labels{/name}',
    comments_url:
      'https://api.github.com/repos/ideacrew/active-branch-tracker/issues/12/comments',
    events_url:
      'https://api.github.com/repos/ideacrew/active-branch-tracker/issues/12/events',
    html_url: 'https://github.com/ideacrew/active-branch-tracker/pull/12',
    id: 852527757,
    node_id: 'MDExOlB1bGxSZXF1ZXN0NjEwNzY0NzMy',
    number: 12,
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
    labels: [
      {
        id: 2201259444,
        node_id: 'MDU6TGFiZWwyMjAxMjU5NDQ0',
        url:
          'https://api.github.com/repos/ideacrew/active-branch-tracker/labels/enhancement',
        name: 'enhancement',
        color: 'a2eeef',
        default: true,
        description: 'New feature or request',
      },
    ],
    state: 'open',
    locked: false,
    assignee: null,
    assignees: [],
    milestone: null,
    comments: 1,
    created_at: '2021-04-07T15:26:55Z',
    updated_at: '2021-04-07T19:15:35Z',
    closed_at: null,
    author_association: 'MEMBER',
    active_lock_reason: null,
    pull_request: {
      url:
        'https://api.github.com/repos/ideacrew/active-branch-tracker/pulls/12',
      html_url: 'https://github.com/ideacrew/active-branch-tracker/pull/12',
      diff_url:
        'https://github.com/ideacrew/active-branch-tracker/pull/12.diff',
      patch_url:
        'https://github.com/ideacrew/active-branch-tracker/pull/12.patch',
    },
    body: '',
    performed_via_github_app: null,
  },
  comment: {
    url:
      'https://api.github.com/repos/ideacrew/active-branch-tracker/issues/comments/815032286',
    html_url:
      'https://github.com/ideacrew/active-branch-tracker/pull/12#issuecomment-815032286',
    issue_url:
      'https://api.github.com/repos/ideacrew/active-branch-tracker/issues/12',
    id: 815032286,
    node_id: 'MDEyOklzc3VlQ29tbWVudDgxNTAzMjI4Ng==',
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
    created_at: '2021-04-07T16:01:42Z',
    updated_at: '2021-04-07T19:15:35Z',
    author_association: 'MEMBER',
    body: "Here's a comment! (I edited this)",
    performed_via_github_app: null,
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
    pushed_at: '2021-04-07T15:26:56Z',
    git_url: 'git://github.com/ideacrew/active-branch-tracker.git',
    ssh_url: 'git@github.com:ideacrew/active-branch-tracker.git',
    clone_url: 'https://github.com/ideacrew/active-branch-tracker.git',
    svn_url: 'https://github.com/ideacrew/active-branch-tracker',
    homepage: 'https://yellr.app',
    size: 4310,
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
