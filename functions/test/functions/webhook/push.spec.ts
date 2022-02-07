import { expect } from 'chai';
import { describe, it } from 'mocha';
import {
  initializeTestEnvironment,
  RulesTestEnvironment,
} from '@firebase/rules-unit-testing';
import { doc, getDoc, setLogLevel } from 'firebase/firestore';

import { mockWebhookPayload } from './mockHttpFunction';
import { CreateEventPayload } from '../../../src/webhook/create';
import { PushEventPayload } from '../../../src/webhook/push';
import { getFullBranchName } from '../../util';

const projectId = process.env.GCLOUD_PROJECT ?? 'demo-project';
let testEnv: RulesTestEnvironment;

before(async () => {
  // Silence expected rules rejections from Firestore SDK. Unexpected rejections
  // will still bubble up and will be thrown as an error (failing the tests).
  setLogLevel('error');

  testEnv = await initializeTestEnvironment({
    firestore: {
      port: 8080,
      host: 'localhost',
    },
    projectId,
  });
});

after(async () => {
  // Delete all the FirebaseApp instances created during testing.
  // Note: this does not affect or clear any data.
  await testEnv.cleanup();
});

describe('A push payload is received', () => {
  beforeEach(async () => {
    await testEnv.clearFirestore();
  });

  it('tests a new branch creation', async () => {
    try {
      await mockWebhookPayload('create', mockCreateEventPayload);
      await mockWebhookPayload('push', mockPushEventPayload);
    } catch (e) {
      console.error('ERROR:', e);
    }

    const { ref: branchName } = mockCreateEventPayload;

    const fullBranchName = getFullBranchName(
      mockCreateEventPayload,
      branchName,
    );

    await testEnv.withSecurityRulesDisabled(async context => {
      const branchRef = doc(context.firestore(), `branches/${fullBranchName}`);

      const branchSnapshot = await getDoc(branchRef);

      expect(branchSnapshot.data().head_commit).to.include({
        message: 'update README.md',
        id: '29465d8a3a0f1fefc52db5b1b6269a0b4320fb05',
        tree_id: '6552999063fe365dc6fbcd5d21e5b5f3c210e752',
        distinct: true,
        timestamp: '2022-02-04T14:42:03-05:00',
        url: 'https://github.com/ideacrew/active-branch-tracker/commit/29465d8a3a0f1fefc52db5b1b6269a0b4320fb05',
      });
    });
  });
});

// Replace with a BranchInfo object that is set programmatically
const mockCreateEventPayload: CreateEventPayload = {
  ref: 'create-branch-event',
  ref_type: 'branch',
  master_branch: 'trunk',
  description: 'Dashboard for Work in Process for IdeaCrew repos',
  pusher_type: 'user',
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
    updated_at: '2022-01-03T21:58:08Z',
    pushed_at: '2022-02-04T19:38:04Z',
    git_url: 'git://github.com/ideacrew/active-branch-tracker.git',
    ssh_url: 'git@github.com:ideacrew/active-branch-tracker.git',
    clone_url: 'https://github.com/ideacrew/active-branch-tracker.git',
    svn_url: 'https://github.com/ideacrew/active-branch-tracker',
    homepage: 'https://yellr.app',
    size: 10374,
    stargazers_count: 1,
    watchers_count: 1,
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
    open_issues_count: 13,
    license: null,
    allow_forking: true,
    is_template: false,
    topics: [],
    visibility: 'public',
    forks: 0,
    open_issues: 13,
    watchers: 1,
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

const mockPushEventPayload: PushEventPayload = {
  ref: 'refs/heads/create-branch-event',
  before: 'd786a697fe6b3542a70de370cae2a6200f32beb3',
  after: '29465d8a3a0f1fefc52db5b1b6269a0b4320fb05',
  repository: {
    id: 279365735,
    node_id: 'MDEwOlJlcG9zaXRvcnkyNzkzNjU3MzU=',
    name: 'active-branch-tracker',
    full_name: 'ideacrew/active-branch-tracker',
    private: false,
    owner: {
      name: 'ideacrew',
      email: 'info@ideacrew.com',
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
    url: 'https://github.com/ideacrew/active-branch-tracker',
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
    created_at: 1594660419,
    updated_at: '2022-01-03T21:58:08Z',
    pushed_at: 1644003723,
    git_url: 'git://github.com/ideacrew/active-branch-tracker.git',
    ssh_url: 'git@github.com:ideacrew/active-branch-tracker.git',
    clone_url: 'https://github.com/ideacrew/active-branch-tracker.git',
    svn_url: 'https://github.com/ideacrew/active-branch-tracker',
    homepage: 'https://yellr.app',
    size: 10374,
    stargazers_count: 1,
    watchers_count: 1,
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
    open_issues_count: 13,
    license: null,
    allow_forking: true,
    is_template: false,
    topics: [],
    visibility: 'public',
    forks: 0,
    open_issues: 13,
    watchers: 1,
    default_branch: 'trunk',
    stargazers: 1,
    master_branch: 'trunk',
    organization: 'ideacrew',
  },
  pusher: {
    name: 'markgoho',
    email: 'markgoho@gmail.com',
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
  created: false,
  deleted: false,
  forced: false,
  base_ref: null,
  compare:
    'https://github.com/ideacrew/active-branch-tracker/compare/d786a697fe6b...29465d8a3a0f',
  commits: [
    {
      id: '29465d8a3a0f1fefc52db5b1b6269a0b4320fb05',
      tree_id: '6552999063fe365dc6fbcd5d21e5b5f3c210e752',
      distinct: true,
      message: 'update README.md',
      timestamp: '2022-02-04T14:42:03-05:00',
      url: 'https://github.com/ideacrew/active-branch-tracker/commit/29465d8a3a0f1fefc52db5b1b6269a0b4320fb05',
      author: {
        name: 'Mark Goho',
        email: 'markgoho@gmail.com',
        username: 'markgoho',
      },
      committer: {
        name: 'GitHub',
        email: 'noreply@github.com',
        username: 'web-flow',
      },
      added: [],
      removed: [],
      modified: ['README.md'],
    },
  ],
  head_commit: {
    id: '29465d8a3a0f1fefc52db5b1b6269a0b4320fb05',
    tree_id: '6552999063fe365dc6fbcd5d21e5b5f3c210e752',
    distinct: true,
    message: 'update README.md',
    timestamp: '2022-02-04T14:42:03-05:00',
    url: 'https://github.com/ideacrew/active-branch-tracker/commit/29465d8a3a0f1fefc52db5b1b6269a0b4320fb05',
    author: {
      name: 'Mark Goho',
      email: 'markgoho@gmail.com',
      username: 'markgoho',
    },
    committer: {
      name: 'GitHub',
      email: 'noreply@github.com',
      username: 'web-flow',
    },
    added: [],
    removed: [],
    modified: ['README.md'],
  },
};