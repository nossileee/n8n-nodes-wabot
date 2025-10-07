"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WabotGroupRemoveNumber = void 0;
const GenericFunctions_1 = require("./GenericFunctions");
class WabotGroupRemoveNumber {
    constructor() {
        this.description = {
            displayName: 'Wabot: Group Remove Number',
            name: 'wabotGroupRemoveNumber',
            icon: 'file:wabot.png',
            group: ['transform'],
            version: 1,
            description: 'Remove a phone number from a WhatsApp group.',
            defaults: { name: 'Wabot: Group Remove Number' },
            inputs: ['main'],
            outputs: ['main'],
            credentials: [{ name: 'wabotApi', required: true }],
            properties: [
                { displayName: 'Group ID (without @g.us)', name: 'groupId', type: 'string', default: '', required: true },
                { displayName: 'Number', name: 'number', type: 'string', default: '', required: true },
            ],
        };
    }
    async execute() {
        const items = this.getInputData();
        const returnData = [];
        for (let i = 0; i < items.length; i++) {
            const body = {
                group_id: `${this.getNodeParameter('groupId', i)}@g.us`,
                action: 'remove',
                number: this.getNodeParameter('number', i),
            };
            const resp = await GenericFunctions_1.wabotRequest.call(this, 'POST', '/group_action', body);
            returnData.push(resp);
        }
        return [returnData.map(d => ({ json: d }))];
    }
}
exports.WabotGroupRemoveNumber = WabotGroupRemoveNumber;
