/* eslint-disable camelcase */
import { CheckSuiteStatus } from '../../check-suite';
import {
  CheckSuiteConclusion,
  HeadCommit,
  Owner,
  WebhookPayload,
} from '../../interfaces';
import { PullRequestSummary } from '../../interfaces/pullRequestSummary';

export interface WorkflowRunPayload extends WebhookPayload {
  action: 'requested' | 'completed';
  workflow_run: WorkflowRun;
  workflow: Workflow;
}

export interface WorkflowRun {
  id: number;
  name: string; // Name of the workflow
  node_id: string;
  head_branch: string; // name of the branch being run
  head_sha: string; // head sha of the branch
  run_number: number;
  event: string; // enum? 'push'
  status: CheckSuiteStatus; // enum? 'completed'
  conclusion: CheckSuiteConclusion; // enum? 'success'
  workflow_id: number; // unique workflow id?
  check_suite_id: number;
  check_suite_node_id: string;
  url: string; // api url
  html_url: string; // url to hit to see the run
  pull_requests: PullRequestSummary[];
  created_at: string;
  updated_at: string;
  run_attempt: number;
  run_started_at: string;
  jobs_url: string;
  logs_url: string;
  check_suite_url: string;
  artifacts_url: string;
  cancel_url: string;
  rerun_url: string;
  previous_attempt_url: string | null;
  workflow_url: string;
  head_commit: HeadCommit;
  repository: Repository;
  head_repository: Repository;
}

export interface Workflow {
  id: number;
  node_id: string;
  name: string; // name of the workflow
  path: string; // relative path to workflow file
  state: string; // workflow state enum? 'active'
  created_at: string;
  updated_at: string;
  url: string;
  html_url: string; // url to workflow file
  badge_url: string; // url to workflow badge
}

interface Repository {
  id: number;
  node_id: string;
  name: string;
  full_name: string;
  private: boolean;
  owner: Owner;
  html_url: string;
  description: string;
  fork: boolean;
  url: string;
  forks_url: string;
  keys_url: string;
  collaborators_url: string;
  teams_url: string;
  hooks_url: string;
  issue_events_url: string;
  events_url: string;
  assignees_url: string;
  branches_url: string;
  tags_url: string;
  blobs_url: string;
  git_tags_url: string;
  git_refs_url: string;
  trees_url: string;
  statuses_url: string;
  languages_url: string;
  stargazers_url: string;
  contributors_url: string;
  subscribers_url: string;
  subscription_url: string;
  commits_url: string;
  git_commits_url: string;
  comments_url: string;
  issue_comment_url: string;
  contents_url: string;
  compare_url: string;
  merges_url: string;
  archive_url: string;
  downloads_url: string;
  issues_url: string;
  pulls_url: string;
  milestones_url: string;
  notifications_url: string;
  labels_url: string;
  releases_url: string;
  deployments_url: string;
}
