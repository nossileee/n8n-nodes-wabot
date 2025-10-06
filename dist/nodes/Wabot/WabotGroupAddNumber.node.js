"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WabotGroupAddNumber = void 0;
const GenericFunctions_1 = require("./GenericFunctions");
class WabotGroupAddNumber {
    constructor() {
        this.description = {
            displayName: 'Wabot: Group Add Number',
            name: 'wabotGroupAddNumber',
            icon: 'file:wabot.svg',
            group: ['transform'],
            version: 1,
            description: 'Add a phone number to a WhatsApp group.',
            defaults: { name: 'Wabot: Group Add Number' },
            inputs: ['main'],
            outputs: ['main'],
            credentials: [{ name: 'wabotApi', required: true }],
            properties: [
                { displayName: 'Group ID (without @g.us)', name: 'groupId', type: 'string', default: '', required: true, description: 'Provide only the numeric part; @g.us is appended automatically' },
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
                action: 'add',
                number: this.getNodeParameter('number', i),
            };
            const resp = await GenericFunctions_1.wabotRequest.call(this, 'POST', '/group_action', body);
            returnData.push(resp);
        }
        return [returnData.map(d => ({ json: d }))];
    }
}
exports.WabotGroupAddNumber = WabotGroupAddNumber;
