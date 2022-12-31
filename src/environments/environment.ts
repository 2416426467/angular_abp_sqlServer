import { Environment } from '@abp/ng.core';

const baseUrl = 'http://localhost:4200';

export const environment = {
  production: false,
  application: {
    baseUrl,
    name: 'Angular_abp练习',
    logoUrl: 'assets/logo2.png',
  
  },
  oAuthConfig: {
    issuer: 'https://localhost:44365',
    redirectUri: baseUrl,
    clientId: 'angular_abp_sqlServer_App',
    responseType: 'code',
    scope: 'offline_access angular_abp_sqlServer',
    requireHttps: true,
  },
  apis: {
    default: {
      url: 'https://localhost:44365',
      rootNamespace: 'angular_abp_sqlServer',
    },
    identity: {
      url: 'https://localhost:44365',
      rootNamespace: 'AbpIdentity',
    },
  },
} as Environment;
