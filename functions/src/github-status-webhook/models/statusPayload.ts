/* eslint-disable camelcase */
export interface GitHubStatusPayload {
  meta: GitHubStatusMeta;
  component?: GitHubStatusComponent;
  component_update?: GitHubStatusComponentUpdate;
  page: GitHubStatusPage;
  incident?: GitHubStatusIncident;
}

interface GitHubStatusMeta {
  unsubscribe: string;
  generated_at: string;
  documentation: string;
}

interface GitHubStatusPage {
  status_indicator: string;
  status_description: string; // 'All Systems Operational'
  id: string;
}

interface GitHubStatusComponent {
  position: number;
  description: string;
  status: string; // enum?
  name: string; // GitHub Actions; enum?
  start_date: string | null;
  showcase: boolean;
  id: string;
  updated_at: string;
  page_id: string;
  created_at: string;
  group_id: string | null;
}

interface GitHubStatusComponentUpdate {
  component_id: string;
  id: string;
  created_at: string;
  old_status: string;
  component_type: string; // 'Component' enum?
  new_status: string; // 'operational' enum?
  state: string; // 'sn_created' enum?
}

interface GitHubStatusIncident {
  status: string; // enum? 'resolved'
  updated_at: string;
  postmortem_body_last_updated_at: string | null;
  id: string;
  scheduled_reminded_at: string | null;
  monitoring_at: string | null;
  postmortem_notified_subscribers: boolean;
  created_at: string;
  scheduled_for: string | null;
  shortlink: string;
  metadata: {
    github: {
      essential: string;
      availability_issue_id: string;
      impacted_regions: string;
      customers_affected: string;
      impacted_services: string; // 'actions'
      non_essential_services: string;
      ic: string;
      channel_id: string;
      invoking_channel_id: string;
      icm_incident_id: string;
    };
  };
  resolved_at: string;
  postmortem_published_at: string | null;
  components: GitHubStatusComponent[];
  postmortem_notified_twitter: boolean;
  scheduled_auto_in_progress: boolean;
  started_at: string;
  incident_updates: GitHubStatusIncidentUpdate[];
  scheduled_until: string | null;
  name: string; // 'Incident with GitHub Actions'
  scheduled_auto_completed: boolean;
  postmortem_ignored: boolean;
  impact: string; // 'minor
  postmortem_body: string | null;
  scheduled_remind_prior: boolean;
  impact_override: string; // 'minor
  page_id: string;
}

interface GitHubStatusIncidentUpdate {
  incident_id: string;
  twitter_updated_at: string | null;
  custom_tweet: string | null;
  display_at: string;
  affected_components: GitHubStatusAffectedComponents[] | null;
  status: string; // 'resolved'
  created_at: string;
  deliver_notifications: true;
  wants_twitter_update: boolean;
  body: string;
  id: string;
  tweet_id: string | null;
  updated_at: string;
}

interface GitHubStatusAffectedComponents {
  old_status: string; // 'operational'
  new_status: string; // 'operational'
  code: string;
  name: string; // 'GitHub Actions'
}

export const payload: GitHubStatusPayload = {
  meta: {
    unsubscribe: 'http://www.githubstatus.com/?unsubscribe=tv453k2k0m8d',
    generated_at: '2021-10-06T14:05:29.736Z',
    documentation:
      'https://help.statuspage.io/knowledge_base/topics/webhook-notifications',
  },
  incident: {
    status: 'resolved',
    updated_at: '2021-10-06T14:05:09.892Z',
    postmortem_body_last_updated_at: null,
    id: '1096gcjqz3pb',
    scheduled_reminded_at: null,
    monitoring_at: null,
    postmortem_notified_subscribers: false,
    created_at: '2021-10-06T13:22:27.320Z',
    scheduled_for: null,
    shortlink: 'https://stspg.io/q29fmytlt593',
    metadata: {
      github: {
        essential: 'true',
        availability_issue_id: '1595',
        impacted_regions: '',
        customers_affected: '',
        impacted_services: 'actions',
        non_essential_services: '',
        ic: '',
        channel_id: 'C1AH2A4R2',
        invoking_channel_id: 'C1AH2A4R2',
        icm_incident_id: '',
      },
    },
    resolved_at: '2021-10-06T14:05:09.873Z',
    postmortem_published_at: null,
    components: [
      {
        group_id: null,
        id: 'br0l2tvcx85d',
        created_at: '2019-11-13T18:02:19.432Z',
        name: 'GitHub Actions',
        position: 7,
        description: 'Workflows, Compute and Orchestration for GitHub Actions',
        updated_at: '2021-10-06T14:05:17.011Z',
        page_id: 'kctbh9vrtdwd',
        start_date: null,
        status: 'operational',
        showcase: false,
      },
    ],
    postmortem_notified_twitter: false,
    scheduled_auto_in_progress: false,
    started_at: '2021-10-06T13:22:27.310Z',
    incident_updates: [
      {
        incident_id: '1096gcjqz3pb',
        twitter_updated_at: null,
        custom_tweet: null,
        display_at: '2021-10-06T14:05:09.873Z',
        affected_components: null,
        status: 'resolved',
        created_at: '2021-10-06T14:05:09.873Z',
        deliver_notifications: true,
        wants_twitter_update: false,
        body: 'This incident has been resolved.',
        id: '8y3jnm6l79jm',
        tweet_id: null,
        updated_at: '2021-10-06T14:05:09.873Z',
      },
      {
        updated_at: '2021-10-06T13:22:27.376Z',
        affected_components: [
          {
            old_status: 'operational',
            new_status: 'operational',
            code: 'br0l2tvcx85d',
            name: 'GitHub Actions',
          },
        ],
        body: 'We are investigating reports of degraded performance for GitHub Actions.',
        status: 'investigating',
        created_at: '2021-10-06T13:22:27.376Z',
        id: 'gyvsk4j3pm54',
        tweet_id: null,
        custom_tweet: null,
        deliver_notifications: true,
        display_at: '2021-10-06T13:22:27.376Z',
        incident_id: '1096gcjqz3pb',
        wants_twitter_update: false,
        twitter_updated_at: null,
      },
    ],
    scheduled_until: null,
    name: 'Incident with GitHub Actions',
    scheduled_auto_completed: false,
    postmortem_ignored: false,
    impact: 'minor',
    postmortem_body: null,
    scheduled_remind_prior: false,
    impact_override: 'minor',
    page_id: 'kctbh9vrtdwd',
  },
  page: {
    status_indicator: 'none',
    id: 'kctbh9vrtdwd',
    status_description: 'All Systems Operational',
  },
};

export const anotherPayload: GitHubStatusPayload = {
  component: {
    position: 7,
    description: 'Workflows, Compute and Orchestration for GitHub Actions',
    status: 'operational',
    name: 'GitHub Actions',
    start_date: null,
    showcase: false,
    id: 'br0l2tvcx85d',
    updated_at: '2021-10-06T14:05:17.011Z',
    page_id: 'kctbh9vrtdwd',
    created_at: '2019-11-13T18:02:19.432Z',
    group_id: null,
  },
  meta: {
    unsubscribe: 'http://www.githubstatus.com/?unsubscribe=tv453k2k0m8d',
    generated_at: '2021-10-06T14:05:50.804Z',
    documentation:
      'https://help.statuspage.io/knowledge_base/topics/webhook-notifications',
  },
  component_update: {
    component_id: 'br0l2tvcx85d',
    id: '7k75k63t6fr0',
    created_at: '2021-10-06T14:05:17.021Z',
    old_status: 'partial_outage',
    component_type: 'Component',
    new_status: 'operational',
    state: 'sn_created',
  },
  page: {
    status_indicator: 'none',
    status_description: 'All Systems Operational',
    id: 'kctbh9vrtdwd',
  },
};
