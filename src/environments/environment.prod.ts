import { Environment } from '@abp/ng.core';

const baseUrl = 'http://localhost:4200';

export const environment = {
  production: true,
  application: {
    baseUrl,
    name: 'FileExplorer_ng',
    logoUrl: '',
  },
  oAuthConfig: {
    issuer: 'https://localhost:44390/',
    redirectUri: baseUrl,
    clientId: 'FileExplorer_ng_App',
    responseType: 'code',
    scope: 'offline_access FileExplorer_ng',
    requireHttps: true
  },
  apis: {
    default: {
      url: 'https://localhost:44390',
      rootNamespace: 'FileExplorer_ng',
    },
  },
} as Environment;
