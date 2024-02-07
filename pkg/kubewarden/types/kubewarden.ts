import {
  V1SecurityContext, V1PodSecurityContext, V1ObjectMeta, V1EnvVar, V1LabelSelector
} from '@kubernetes/client-node';

import { Condition } from './core';

export const KUBEWARDEN_PRODUCT_NAME = 'kubewarden';
export const KUBEWARDEN_PRODUCT_GROUP = 'policies.kubewarden.io';

export const CHART_NAME = 'rancher-kubewarden';

export const KUBEWARDEN_DASHBOARD = 'dashboard';
export const KUBEWARDEN_REPO = 'https://charts.kubewarden.io';

export const KUBEWARDEN_CHARTS = {
  CONTROLLER:       'kubewarden-controller',
  DEFAULTS:         'kubewarden-defaults',
};

export const KUBEWARDEN_APPS = {
  RANCHER_CONTROLLER: 'rancher-kubewarden-controller',
  RANCHER_DEFAULTS:   'rancher-kubewarden-defaults'
};

export const KUBEWARDEN_LABELS = { POLICY_SERVER: 'kubewarden/policy-server' };

export const KUBEWARDEN = {
  ADMISSION_POLICY:         'policies.kubewarden.io.admissionpolicy',
  CLUSTER_ADMISSION_POLICY: 'policies.kubewarden.io.clusteradmissionpolicy',
  POLICY_SERVER:            'policies.kubewarden.io.policyserver',
  POLICY_REPORT:            'wgpolicyk8s.io.policyreport',
  CLUSTER_POLICY_REPORT:    'wgpolicyk8s.io.clusterpolicyreport'
};

/* eslint-disable no-unused-vars */
export enum KUBEWARDEN_CRD {
  ADMISSION_POLICY = 'admissionpolicies.policies.kubewarden.io',
  CLUSTER_ADMISSION_POLICY = 'clusteradmissionpolicies.policies.kubewarden.io',
  POLICY_SERVER = 'policyservers.policies.kubewarden.io',
  POLICY_REPORT = 'policyreports.wgpolicyk8s.io',
  CLUSTER_POLICY_REPORT = 'clusterpolicyreports.wgpolicyk8s.io'
}
/* eslint-enable no-unused-vars */

export interface Rule {
  apiGroups: string[];
  apiVersions: string[];
  operations: string[];
  resources: string[];
}

export interface PolicyServer {
  id: string;
  type: string;
  links?: {
    remove?: string;
    self?: string;
    update?: string;
    view?: string;
  };
  apiVersion: string;
  kind: string;
  metadata: V1ObjectMeta;
  spec: {
    env: V1EnvVar[];
    image?: string;
    replicas?: number;
    securityContexts?: {
      container?: V1SecurityContext;
      pod?: V1PodSecurityContext;
    };
    serviceAccountName?: string;
  };
  status: {
    conditions: Array<Condition>;
  };
}

export type Policy = {
  id: string;
  type: string;
  links?: {
    remove?: string;
    self?: string;
    update?: string;
    view?: string;
  };
  apiVersion: string;
  kind: string;
  metadata: V1ObjectMeta;
  spec: {
    backgroundAudit?: boolean;
    matchPolicy?: string;
    mode: string;
    module: string;
    mutating?: boolean;
    namespaceSelector?: V1LabelSelector;
    objectSelector?: V1LabelSelector;
    policyServer: string;
    rules: Array<Rule>;
    failurePolicy?: string;
    settings?: any;
    sideEffects?: string;
    timeoutSeconds?: number;
  };
  status: {
    conditions: Array<Condition>;
    mode: string;
    policyStatus: string;
  }
}