"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WabotLabelAdd = void 0;
const GenericFunctions_1 = require("./GenericFunctions");
class WabotLabelAdd {
    constructor() {
        this.description = {
            displayName: 'Wabot: Label Add',
            name: 'wabotLabelAdd',
            icon: 'file:wabot.png',
            group: ['transform'],
            version: 1,
            description: 'Add a WhatsApp Business label to a number.',
            defaults: { name: 'Wabot: Label Add' },
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
                action: 'add',
                number: this.getNodeParameter('number', i),
            };
            const resp = await GenericFunctions_1.wabotRequest.call(this, 'POST', '/label_action', body);
            returnData.push(resp);
        }
        return [returnData.map(d => ({ json: d }))];
    }
}
exports.WabotLabelAdd = WabotLabelAdd;
