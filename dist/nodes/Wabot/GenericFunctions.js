"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.wabotRequest = wabotRequest;
async function wabotRequest(method, endpoint, body = {}, qs = {}) {
    const credentials = await this.getCredentials('wabotApi');

    // Inject instance_id from credentials into body/qs if missing
    const inst = (credentials && (credentials.instanceId || credentials.instanceID || credentials.instance_id));
    if (inst) {
        if (body && typeof body === 'object' && body.instance_id == null) {
            body.instance_id = inst;
        }
        if (qs && typeof qs === 'object' && qs.instance_id == null) {
            qs.instance_id = inst;
        }
    }

    const options = {
        method,
        url: endpoint,
        qs,
        body,
        json: true,
        baseURL: (credentials && typeof credentials.baseUrl === 'string') ? credentials.baseUrl : undefined,
    };
    // @ts-ignore
    return await this.helpers.httpRequestWithAuthentication.call(this, 'wabotApi', options);
}
