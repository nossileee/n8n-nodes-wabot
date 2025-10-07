import type {
  ICredentialType,
  INodeProperties,
  ICredentialTestRequest,
} from 'n8n-workflow';

export class WabotApi implements ICredentialType {
  name = 'wabotApi';
  displayName = 'Wabot API';
  documentationUrl = 'https://github.com/nossileee/n8n-nodes-wabot';
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
      displayName: 'Access Token',
      name: 'accessToken',
      type: 'string',
      typeOptions: { password: true },
      default: '',
      required: true,
      description: 'Your Wabot API access token (used as username for Basic Auth)',
    },
    {
      displayName: 'Instance ID',
      name: 'instanceId',
      type: 'string',
      default: '',
      required: true,
      description: 'Your Wabot Instance ID (used as password for Basic Auth)',
    },
  ];

  test: ICredentialTestRequest = {
    request: {
      baseURL: '={{$credentials.baseUrl}}',
      url: '/check_instance',
      method: 'GET',     
      headers: {
        'Authorization': '=Basic {{$credentials.accessToken + ":" + $credentials.instanceId).toString("base64")}}',
      },
      qs: {
        instance_id: '={{$credentials.instanceId}}',
      },
    },
  };
}