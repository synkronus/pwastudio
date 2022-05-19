export const environment = {
  production: true,
  version: "{{ENV_VERSION}}",
  base_url: "https://ap03-ms-op-azcolindev.azurewebsites.net/api/v1",
  base_url_mt_v1: "https://ap04-ms-ma-azcolindev.azurewebsites.net/api/v1",
  url_files: 'https://apicolorinlinux.azurewebsites.net',
  scopeUri: ['api://ec2e03c1-f831-44d6-a9db-74b5452a22e0/RITScopeApp'],
  tenantId: '15e9c9d3-b605-41e3-a9c1-c40bc7633dbc',
  uiClienId: 'f78bbc04-99d8-4f54-bb5f-9910492560a6',
  redirectUrl: 'https://web.azurewebsites.net',
  consentScopes: ["user.read","openid","profile"],
  timeCheck: 30000,
  versionCheck: true,
  defaultLanguage: 'es-LA',
  supportedLanguages: ['es-LA', 'en-US']
};
