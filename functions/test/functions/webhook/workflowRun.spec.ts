import { expect } from 'chai';
import { describe, it, afterEach } from 'mocha';
import * as firebase from '@firebase/rules-unit-testing';

import { mockWebhookPayload } from '../mockHttpFunction';

import { WorkflowRunPayload } from '../../../src/webhook/workflow-run';
import { BranchInfo } from '../../../src/models';

const projectId = process.env.GCLOUD_PROJECT ?? 'demo-project';

const admin = firebase.initializeAdminApp({
  projectId,
});

describe('Workflow run tests', () => {
  const branchRef = admin
    .firestore()
    .collection('branches')
    .doc(`ideacrew-active-branch-tracker-trunk`);

  afterEach(async () => {
    await firebase.clearFirestoreData({
      projectId,
    });
  });

  beforeEach(async () => {
    await branchRef.set(initialBranch);
  });

  it('tests a first-time successful workflow result', async () => {
    try {
      await mockWebhookPayload('workflow_run', successPayload);
    } catch (e) {
      console.error('ERROR:', e);
    }

    const updatedBranchDoc = await branchRef.get();
    const updatedBranchInfo = updatedBranchDoc.data();

    expect(updatedBranchInfo).to.include({
      checkSuiteRuns: 211,
      checkSuiteFailures: 28,
    });

    expect(updatedBranchInfo.head_commit).to.include({
      id: 'b440c373712f27d84aa428703e55cdc95ef41ea3',
      message: 'add workflow run event to webhook handler',
      timestamp: '2021-10-08T18:57:35Z',
      tree_id: '66089ea129a82bdca7327f0d6d3eaaf40b8b2e3e',
    });
  });

  it('tests a first-time failed check suite result', async () => {
    try {
      await mockWebhookPayload('workflow_run', failurePayload);
    } catch (e) {
      console.error('ERROR:', e);
    }

    const updatedBranchDoc = await branchRef.get();
    const updatedBranchInfo = updatedBranchDoc.data();

    expect(updatedBranchInfo).to.include({
      checkSuiteRuns: 211,
      checkSuiteFailures: 29,
    });

    expect(updatedBranchInfo.head_commit).to.include({
      id: 'b440c373712f27d84aa428703e55cdc95ef41ea3',
      message: 'add workflow run event to webhook handler',
      timestamp: '2021-10-08T18:57:35Z',
      tree_id: '66089ea129a82bdca7327f0d6d3eaaf40b8b2e3e',
    });

    expect(updatedBranchInfo.head_commit.author).to.include({
      name: 'Mark Goho',
      email: 'markgoho@gmail.com',
    });
  });
});

const initialBranch: BranchInfo = {
  branchName: 'trunk',
  checkSuiteFailures: 28,
  checkSuiteRuns: 210,
  checkSuiteStatus: 'success',
  createdBy: 'markgoho',
  created_at: '2021-0315T16:10:07:745Z',
  defaultBranch: true,
  head_commit: {
    author: { name: 'bob johnson', email: 'bob@example.com' },
    committer: { name: 'bob johnson', email: 'bob@example.com' },
    id: 'abcd1234',
    message: 'fake commit',
    timestamp: '2021-10-01T18:57:35Z',
    tree_id: 'xyz9876',
  },
  head_sha: 'abcd1234',
  organizationName: 'ideacrew',
  repositoryName: 'active-branch-tracker',
  timestamp: 1633719533000,
  tracked: false,
  updated_at: '2021-10-08T18:58:53Z',
};

const successPayload: WorkflowRunPayload = {
  action: 'completed',
  workflow_run: {
    id: 1321542128,
    name: 'test cloud functions',
    node_id: 'WFR_kwLOEKbIZ85OxSHw',
    head_branch: 'trunk',
    head_sha: 'b440c373712f27d84aa428703e55cdc95ef41ea3',
    run_number: 123,
    event: 'push',
    status: 'completed',
    conclusion: 'success',
    workflow_id: 8539638,
    check_suite_id: 4002177195,
    check_suite_node_id: 'CS_kwDOEKbIZ87ujGCr',
    url: 'https://api.github.com/repos/ideacrew/active-branch-tracker/actions/runs/1321542128',
    html_url:
      'https://github.com/ideacrew/active-branch-tracker/actions/runs/1321542128',
    pull_requests: [],
    created_at: '2021-10-08T18:58:09Z',
    updated_at: '2021-10-08T18:58:53Z',
    run_attempt: 1,
    run_started_at: '2021-10-08T18:58:09Z',
    jobs_url:
      'https://api.github.com/repos/ideacrew/active-branch-tracker/actions/runs/1321542128/jobs',
    logs_url:
      'https://api.github.com/repos/ideacrew/active-branch-tracker/actions/runs/1321542128/logs',
    check_suite_url:
      'https://api.github.com/repos/ideacrew/active-branch-tracker/check-suites/4002177195',
    artifacts_url:
      'https://api.github.com/repos/ideacrew/active-branch-tracker/actions/runs/1321542128/artifacts',
    cancel_url:
      'https://api.github.com/repos/ideacrew/active-branch-tracker/actions/runs/1321542128/cancel',
    rerun_url:
      'https://api.github.com/repos/ideacrew/active-branch-tracker/actions/runs/1321542128/rerun',
    previous_attempt_url: null,
    workflow_url:
      'https://api.github.com/repos/ideacrew/active-branch-tracker/actions/workflows/8539638',
    head_commit: {
      id: 'b440c373712f27d84aa428703e55cdc95ef41ea3',
      tree_id: '66089ea129a82bdca7327f0d6d3eaaf40b8b2e3e',
      message: 'add workflow run event to webhook handler',
      timestamp: '2021-10-08T18:57:35Z',
      author: {
        name: 'Mark Goho',
        email: 'markgoho@gmail.com',
      },
      committer: {
        name: 'Mark Goho',
        email: 'markgoho@gmail.com',
      },
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
    },
    head_repository: {
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
    },
  },
  workflow: {
    id: 8539638,
    node_id: 'MDg6V29ya2Zsb3c4NTM5NjM4',
    name: 'test cloud functions',
    path: '.github/workflows/functions-test.yml',
    state: 'active',
    created_at: '2021-04-26T20:57:52.000Z',
    updated_at: '2021-04-26T20:57:52.000Z',
    url: 'https://api.github.com/repos/ideacrew/active-branch-tracker/actions/workflows/8539638',
    html_url:
      'https://github.com/ideacrew/active-branch-tracker/blob/trunk/.github/workflows/functions-test.yml',
    badge_url:
      'https://github.com/ideacrew/active-branch-tracker/workflows/test%20cloud%20functions/badge.svg',
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
    updated_at: '2021-10-08T18:58:10Z',
    pushed_at: '2021-10-08T18:58:07Z',
    git_url: 'git://github.com/ideacrew/active-branch-tracker.git',
    ssh_url: 'git@github.com:ideacrew/active-branch-tracker.git',
    clone_url: 'https://github.com/ideacrew/active-branch-tracker.git',
    svn_url: 'https://github.com/ideacrew/active-branch-tracker',
    homepage: 'https://yellr.app',
    size: 12472,
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
    open_issues_count: 9,
    license: null,
    allow_forking: true,
    is_template: false,
    topics: [],
    visibility: 'public',
    forks: 0,
    open_issues: 9,
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

const failurePayload: WorkflowRunPayload = {
  action: 'completed',
  workflow_run: {
    id: 1321542128,
    name: 'test cloud functions',
    node_id: 'WFR_kwLOEKbIZ85OxSHw',
    head_branch: 'trunk',
    head_sha: 'b440c373712f27d84aa428703e55cdc95ef41ea3',
    run_number: 123,
    event: 'push',
    status: 'completed',
    conclusion: 'failure',
    workflow_id: 8539638,
    check_suite_id: 4002177195,
    check_suite_node_id: 'CS_kwDOEKbIZ87ujGCr',
    url: 'https://api.github.com/repos/ideacrew/active-branch-tracker/actions/runs/1321542128',
    html_url:
      'https://github.com/ideacrew/active-branch-tracker/actions/runs/1321542128',
    pull_requests: [],
    created_at: '2021-10-08T18:58:09Z',
    updated_at: '2021-10-08T18:58:53Z',
    run_attempt: 1,
    run_started_at: '2021-10-08T18:58:09Z',
    jobs_url:
      'https://api.github.com/repos/ideacrew/active-branch-tracker/actions/runs/1321542128/jobs',
    logs_url:
      'https://api.github.com/repos/ideacrew/active-branch-tracker/actions/runs/1321542128/logs',
    check_suite_url:
      'https://api.github.com/repos/ideacrew/active-branch-tracker/check-suites/4002177195',
    artifacts_url:
      'https://api.github.com/repos/ideacrew/active-branch-tracker/actions/runs/1321542128/artifacts',
    cancel_url:
      'https://api.github.com/repos/ideacrew/active-branch-tracker/actions/runs/1321542128/cancel',
    rerun_url:
      'https://api.github.com/repos/ideacrew/active-branch-tracker/actions/runs/1321542128/rerun',
    previous_attempt_url: null,
    workflow_url:
      'https://api.github.com/repos/ideacrew/active-branch-tracker/actions/workflows/8539638',
    head_commit: {
      id: 'b440c373712f27d84aa428703e55cdc95ef41ea3',
      tree_id: '66089ea129a82bdca7327f0d6d3eaaf40b8b2e3e',
      message: 'add workflow run event to webhook handler',
      timestamp: '2021-10-08T18:57:35Z',
      author: {
        name: 'Mark Goho',
        email: 'markgoho@gmail.com',
      },
      committer: {
        name: 'Mark Goho',
        email: 'markgoho@gmail.com',
      },
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
    },
    head_repository: {
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
    },
  },
  workflow: {
    id: 8539638,
    node_id: 'MDg6V29ya2Zsb3c4NTM5NjM4',
    name: 'test cloud functions',
    path: '.github/workflows/functions-test.yml',
    state: 'active',
    created_at: '2021-04-26T20:57:52.000Z',
    updated_at: '2021-04-26T20:57:52.000Z',
    url: 'https://api.github.com/repos/ideacrew/active-branch-tracker/actions/workflows/8539638',
    html_url:
      'https://github.com/ideacrew/active-branch-tracker/blob/trunk/.github/workflows/functions-test.yml',
    badge_url:
      'https://github.com/ideacrew/active-branch-tracker/workflows/test%20cloud%20functions/badge.svg',
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
    updated_at: '2021-10-08T18:58:10Z',
    pushed_at: '2021-10-08T18:58:07Z',
    git_url: 'git://github.com/ideacrew/active-branch-tracker.git',
    ssh_url: 'git@github.com:ideacrew/active-branch-tracker.git',
    clone_url: 'https://github.com/ideacrew/active-branch-tracker.git',
    svn_url: 'https://github.com/ideacrew/active-branch-tracker',
    homepage: 'https://yellr.app',
    size: 12472,
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
    open_issues_count: 9,
    license: null,
    allow_forking: true,
    is_template: false,
    topics: [],
    visibility: 'public',
    forks: 0,
    open_issues: 9,
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
