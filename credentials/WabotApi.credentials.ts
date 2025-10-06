import type {
  ICredentialType,
  INodeProperties,
  IAuthenticateGeneric,
  ICredentialTestRequest,
} from 'n8n-workflow';

export class WabotApi implements ICredentialType {
  name = 'wabotApi';
  displayName = 'Wabot API';
  documentationUrl = '';
  properties: INodeProperties[] = [
    {
      displayName: 'Base URL',
      name: 'baseUrl',
      type: 'string',
      default: 'https://painel.wabot.app.br/api',
      placeholder: 'https://painel.wabot.app.br/api',
      description: 'API base URL for Wabot',
    },
    {
      displayName: 'Access Token (Bearer)',
      name: 'accessToken',
      type: 'string',
      typeOptions: { password: true },
      default: '',
      required: true,
      description: 'Your Wabot API access token',
    },
    {
      displayName: 'Instance ID',
      name: 'instanceId',
      type: 'string',
      default: '',
      required: true,
      description: 'Your Wabot Instance ID (WhatsApp session identifier)',
    },
  ];

  authenticate: IAuthenticateGeneric = {
  type: 'generic',
  properties: {
    headers: {
      // use expressão do n8n começando com "=" para montar o Bearer:
      Authorization: '={{"Bearer " + $credentials.accessToken}}',
      'Content-Type': 'application/json',
    },
    },
  };

  test: ICredentialTestRequest = {
  request: {
    baseURL: '={{$credentials.baseUrl}}',
    url: '/check_instance',
    method: 'GET',
    qs: {
      instance_id: '={{$credentials.instanceId}}',
    },
  },
  };

}
