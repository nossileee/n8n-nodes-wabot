"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WabotContactGroupRemove = void 0;
const GenericFunctions_1 = require("./GenericFunctions");
class WabotContactGroupRemove {
    constructor() {
        this.description = {
            displayName: 'Wabot: Contact Group Remove',
            name: 'wabotContactGroupRemove',
            icon: 'file:wabot.png',
            group: ['transform'],
            version: 1,
            description: 'Remove a contact from a Wabot contact group.',
            defaults: { name: 'Wabot: Contact Group Remove' },
            inputs: ['main'],
            outputs: ['main'],
            credentials: [{ name: 'wabotApi', required: true }],
            properties: [
                { displayName: 'Contact Group ID', name: 'groupId', type: 'string', default: '', required: true },
                { displayName: 'Number', name: 'number', type: 'string', default: '', required: true },
            ],
        };
    }
    async execute() {
        const items = this.getInputData();
        const returnData = [];
        for (let i = 0; i < items.length; i++) {
            const body = {
                group_id: this.getNodeParameter('groupId', i),
                action: 'remove',
                number: this.getNodeParameter('number', i),
            };
            const resp = await GenericFunctions_1.wabotRequest.call(this, 'POST', '/contact_group_action', body);
            returnData.push(resp);
        }
        return [returnData.map(d => ({ json: d }))];
    }
}
exports.WabotContactGroupRemove = WabotContactGroupRemove;
