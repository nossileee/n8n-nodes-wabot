"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WabotSendText = void 0;
const GenericFunctions_1 = require("./GenericFunctions");
class WabotSendText {
    constructor() {
        this.description = {
            displayName: 'Wabot: Send Text',
            name: 'wabotSendText',
            icon: 'file:wabot.png',
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
                message: this.getNodeParameter('message', i),
            };
            const response = await GenericFunctions_1.wabotRequest.call(this, 'POST', '/send', body, {});
            returnData.push({ json: response });
        }
        return [returnData];
    }
}
exports.WabotSendText = WabotSendText;
