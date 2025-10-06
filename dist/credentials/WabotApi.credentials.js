"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WabotApi = void 0;
class WabotApi {
    constructor() {
        this.name = 'wabotApi';
        this.displayName = 'Wabot API';
        this.documentationUrl = '';
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
        this.authenticate = {
            type: 'generic',
            properties: {
                headers: {
                    // use expressão do n8n começando com "=" para montar o Bearer:
                    Authorization: '={{"Bearer " + $credentials.accessToken}}',
                    'Content-Type': 'application/json',
                },
            },
        };
        this.test = {
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
}
exports.WabotApi = WabotApi;
