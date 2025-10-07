"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WabotSendGroupMedia = void 0;
const GenericFunctions_1 = require("./GenericFunctions");
class WabotSendGroupMedia {
    constructor() {
        this.description = {
            displayName: 'Wabot: Send Group Media',
            name: 'wabotSendGroupMedia',
            icon: { light: 'file:wabot.png', dark: 'file:wabot.png', },
            group: ['transform'],
            version: 1,
            description: 'Send media/file to a WhatsApp group.',
            defaults: { name: 'Wabot: Send Group Media' },
            inputs: ['main'],
            outputs: ['main'],
            credentials: [{ name: 'wabotApi', required: true }],
            properties: [
                { displayName: 'Group ID', name: 'groupId', type: 'string', default: '', required: true },
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
                group_id: this.getNodeParameter('groupId', i),
                type: 'media',
                media_url: this.getNodeParameter('mediaUrl', i),
                filename: this.getNodeParameter('filename', i),
                message: this.getNodeParameter('message', i),
            };
            const resp = await GenericFunctions_1.wabotRequest.call(this, 'POST', '/send_group', body);
            returnData.push(resp);
        }
        return [returnData.map(d => ({ json: d }))];
    }
}
exports.WabotSendGroupMedia = WabotSendGroupMedia;
