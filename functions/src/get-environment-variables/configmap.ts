export interface ConfigMap {
  apiVersion: string;
  kind: string;
  metadata: {
    creationTimestamp: string | null;
    labels: {
      app: string;
      environment: string;
    };
    name: string;
  };
  data: Record<string, string | boolean | number>;
}
