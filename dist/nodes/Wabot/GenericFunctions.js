"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.wabotRequest = wabotRequest;
async function wabotRequest(method, endpoint, body = {}, qs = {}) {
    const credentials = await this.getCredentials('wabotApi');
    const accessToken = credentials.accessToken;
    const instanceId = credentials.instanceId;
    const baseUrl = credentials.baseUrl;
    body.access_token = accessToken;
    body.instance_id = instanceId;
    qs.access_token = accessToken;
    qs.instance_id = instanceId;
    const options = {
        headers: {
            'Content-Type': 'application/json',
        },
        method,
        body,
        qs,
        url: `${baseUrl}${endpoint}`,
        json: true,
    };
    return await this.helpers.request(options);
}
