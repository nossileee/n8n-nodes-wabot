"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WabotSendMedia = void 0;
const GenericFunctions_1 = require("./GenericFunctions");
class WabotSendMedia {
    constructor() {
        this.description = {
            displayName: 'Wabot: Send Media',
            name: 'wabotSendMedia',
            icon: 'file:wabot.png',
            group: ['transform'],
            version: 1,
            description: 'Send media/file to a number.',
            defaults: { name: 'Wabot: Send Media' },
            inputs: ['main'],
            outputs: ['main'],
            credentials: [{ name: 'wabotApi', required: true }],
            properties: [
                { displayName: 'Number', name: 'number', type: 'string', default: '', required: true },
                { displayName: 'Media URL', name: 'mediaUrl', type: 'string', default: '', required: true },
                { displayName: 'Filename', name: 'filename', type: 'string', default: '', required: true },
                { displayName: 'Message', name: 'message', type: 'string', typeOptions: { rows: 3 }, default: '' },
            ],
        };
    }
    async execute() {
        const items = this.getInputData();
        const returnData = [];
        for (let i = 0; i < items.length; i++) {
            const body = {
                number: this.getNodeParameter('number', i),
                type: 'media',
                media_url: this.getNodeParameter('mediaUrl', i),
                filename: this.getNodeParameter('filename', i),
                message: this.getNodeParameter('message', i),
            };
            const resp = await GenericFunctions_1.wabotRequest.call(this, 'POST', '/send', body);
            returnData.push(resp);
        }
        return [returnData.map(d => ({ json: d }))];
    }
}
exports.WabotSendMedia = WabotSendMedia;
