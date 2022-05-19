export const environment = {
  production: false,
  version: "{{ENV_VERSION}}",
  base_url: "https://localhost:5002/api/v1",
  base_url_mt_v1: "http://localhost:5001/api/v1",
  url_files: 'http://localhost:7001',
  scopeUri: ['api://ec2e03c1-f831-44d6-a9db-74b5452a22e0/RITScopeApp'],
  tenantId: '15e9c9d3-b605-41e3-a9c1-c40bc7633dbc',
  uiClienId: 'f78bbc04-99d8-4f54-bb5f-9910492560a6',
  redirectUrl: 'http://localhost:4200',
  consentScopes: ["user.read","openid","profile"],
  timeCheck: 30000,
  versionCheck: true,
  defaultLanguage: 'es-LA',
  supportedLanguages: ['es-LA', 'en-US']
};

