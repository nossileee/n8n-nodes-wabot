"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WabotSendGroupText = void 0;
const GenericFunctions_1 = require("./GenericFunctions");
class WabotSendGroupText {
    constructor() {
        this.description = {
            displayName: 'Wabot: Send Group Text',
            name: 'wabotSendGroupText',
            icon: 'file:wabot.svg',
            group: ['transform'],
            version: 1,
            description: 'Send text to a WhatsApp group.',
            defaults: { name: 'Wabot: Send Group Text' },
            inputs: ['main'],
            outputs: ['main'],
            credentials: [{ name: 'wabotApi', required: true }],
            properties: [
                { displayName: 'Group ID', name: 'groupId', type: 'string', default: '', required: true, description: 'Group JID (e.g. 1203630...@g.us)' },
                { displayName: 'Message', name: 'message', type: 'string', typeOptions: { rows: 4 }, default: '', required: true },
            ],
        };
    }
    async execute() {
        const items = this.getInputData();
        const returnData = [];
        for (let i = 0; i < items.length; i++) {
            const body = {
                group_id: this.getNodeParameter('groupId', i),
                type: 'text',
                message: this.getNodeParameter('message', i),
            };
            const resp = await GenericFunctions_1.wabotRequest.call(this, 'POST', '/send_group', body);
            returnData.push(resp);
        }
        return [returnData.map(d => ({ json: d }))];
    }
}
exports.WabotSendGroupText = WabotSendGroupText;
