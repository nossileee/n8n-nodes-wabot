"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WabotLabelRemove = void 0;
const GenericFunctions_1 = require("./GenericFunctions");
class WabotLabelRemove {
    constructor() {
        this.description = {
            displayName: 'Wabot: Label Remove',
            name: 'wabotLabelRemove',
            icon: 'file:wabot.png',
            group: ['transform'],
            version: 1,
            description: 'Remove a WhatsApp Business label from a number.',
            defaults: { name: 'Wabot: Label Remove' },
            inputs: ['main'],
            outputs: ['main'],
            credentials: [{ name: 'wabotApi', required: true }],
            properties: [
                { displayName: 'Label ID', name: 'labelId', type: 'string', default: '', required: true },
                { displayName: 'Number', name: 'number', type: 'string', default: '', required: true },
            ],
        };
    }
    async execute() {
        const items = this.getInputData();
        const returnData = [];
        for (let i = 0; i < items.length; i++) {
            const body = {
                label_id: this.getNodeParameter('labelId', i),
                action: 'remove',
                number: this.getNodeParameter('number', i),
            };
            const resp = await GenericFunctions_1.wabotRequest.call(this, 'POST', '/label_action', body);
            returnData.push(resp);
        }
        return [returnData.map(d => ({ json: d }))];
    }
}
exports.WabotLabelRemove = WabotLabelRemove;
