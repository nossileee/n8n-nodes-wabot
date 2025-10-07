"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.wabotRequest = wabotRequest;
async function wabotRequest(method, endpoint, body = {}, qs = {}) {
    const credentials = await this.getCredentials('wabotApi');
    const accessToken = credentials.accessToken;
    const instanceId = credentials.instanceId;
    const baseUrl = credentials.baseUrl;
    const basicAuth = Buffer.from(`${accessToken}:${instanceId}`).toString('base64');
    if (method === 'POST' || method === 'PUT' || method === 'PATCH') {
        if (!body.instance_id) {
            body.instance_id = instanceId;
        }
    }
    else if (method === 'GET' || method === 'DELETE') {
        if (!qs.instance_id) {
            qs.instance_id = instanceId;
        }
    }
    const options = {
        headers: {
            'Authorization': `Basic ${basicAuth}`,
        },
        method,
        body,
        qs,
        url: `${baseUrl}${endpoint}`,
        json: true,
    };
    return await this.helpers.request(options);
}
