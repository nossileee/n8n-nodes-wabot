import type {
  ICredentialType,
  INodeProperties,
  ICredentialTestRequest,
} from 'n8n-workflow';

export class WabotApi implements ICredentialType {
  name = 'wabotApi';
  displayName = 'Wabot API';
  iconUrl = 'file:wabot.png';
  documentationUrl = 'https://github.com/nossileee/n8n-nodes-wabot';
  properties: INodeProperties[] = [
    {
      displayName: 'Base URL',
      name: 'baseUrl',
      type: 'string',
      default: 'https://painel.wabot.app.br/api',
    },
    {
      displayName: 'Access Token',
      name: 'accessToken',
      type: 'string',
      typeOptions: { password: true },
      default: '',
      required: true,
    },
    {
      displayName: 'Instance ID',
      name: 'instanceId',
      type: 'string',
      default: '',
      required: true,
    },
  ];

  test: ICredentialTestRequest = {
    request: {
      baseURL: '={{$credentials.baseUrl}}',
      url: '/check_instance',
      method: 'GET',
      qs: {
        instance_id: '={{$credentials.instanceId}}',
        access_token: '={{$credentials.accessToken}}',
      },
    },
  };
}