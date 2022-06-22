export interface ConfigMapEnvironmentReference {
  name: string;
  valueFrom: {
    configMapKeyRef: KeyReference;
  };
}

export interface RawEnvironmentVariable {
  name: string;
  value: string;
}

// We don't want these to show up anywhere
export interface SecretKeyEnvironmentReference {
  name: string;
  valueFrom: {
    secretKeyRef: KeyReference;
  };
}

interface KeyReference {
  key: string;
  name: string;
}

export type EnvironmentReference =
  | RawEnvironmentVariable
  | ConfigMapEnvironmentReference
  | SecretKeyEnvironmentReference;
