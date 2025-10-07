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
        this.test = {
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
}
exports.WabotApi = WabotApi;
