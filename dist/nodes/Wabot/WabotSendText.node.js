"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WabotSendText = void 0;
const GenericFunctions_1 = require("./GenericFunctions");
class WabotSendText {
    constructor() {
        this.description = {
            displayName: 'Wabot: Send Text',
            name: 'wabotSendText',
            icon: 'file:wabot.svg',
            group: ['transform'],
            version: 1,
            description: 'Send a text message to a number.',
            defaults: { name: 'Wabot: Send Text' },
            inputs: ['main'],
            outputs: ['main'],
            credentials: [{ name: 'wabotApi', required: true }],
            properties: [
                {
                    displayName: 'Number',
                    name: 'number',
                    type: 'string',
                    default: '',
                    required: true,
                    description: 'Destination phone number with country code (e.g. 5511999999999)',
                },
                {
                    displayName: 'Message',
                    name: 'message',
                    type: 'string',
                    typeOptions: { rows: 4 },
                    default: '',
                    required: true,
                    description: 'Text content',
                },
                {
                    
                    type: 'string',
                    default: '',
                    required: true,
                    description: 'Wabot instance ID',
                },
            ],
        };
    }
    async execute() {
        const items = this.getInputData();
        const returnData = [];
        for (let i = 0; i < items.length; i++) {
            const body = {
                number: this.getNodeParameter('number', i),
                type: 'text',
                message: this.getNodeParameter('message', i)),
            };
            const resp = await GenericFunctions_1.wabotRequest.call(this, 'POST', '/send', body);
            returnData.push(resp);
        }
        return [returnData.map(d => ({ json: d }))];
    }
}
exports.WabotSendText = WabotSendText;
