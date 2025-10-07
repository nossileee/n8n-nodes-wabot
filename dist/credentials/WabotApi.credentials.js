"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WabotApi = void 0;
class WabotApi {
    constructor() {
        this.name = 'wabotApi';
        this.displayName = 'Wabot API';
        this.documentationUrl = 'https://github.com/nossileee/n8n-nodes-wabot';
        this.properties = [
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
        this.test = {
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
}
exports.WabotApi = WabotApi;
