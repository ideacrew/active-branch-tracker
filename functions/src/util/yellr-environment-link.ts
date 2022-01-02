export const yellrEnvironmentLink = ({
  org,
  env,
}: {
  org: string;
  env: string;
}): string => `https://yellr.app/environments/${org}/${env}`;
