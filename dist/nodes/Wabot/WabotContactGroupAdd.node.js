"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WabotContactGroupAdd = void 0;
const GenericFunctions_1 = require("./GenericFunctions");
class WabotContactGroupAdd {
    constructor() {
        this.description = {
            displayName: 'Wabot: Contact Group Add',
            name: 'wabotContactGroupAdd',
            icon: 'file:wabot.svg',
            group: ['transform'],
            version: 1,
            description: 'Add a contact to a Wabot contact group.',
            defaults: { name: 'Wabot: Contact Group Add' },
            inputs: ['main'],
            outputs: ['main'],
            credentials: [{ name: 'wabotApi', required: true }],
            properties: [
                { displayName: 'Contact Group ID', name: 'groupId', type: 'string', default: '', required: true },
                { displayName: 'Number', name: 'number', type: 'string', default: '', required: true },
                { displayName: 'Name', name: 'name', type: 'string', default: '', required: true },
            ],
        };
    }
    async execute() {
        const items = this.getInputData();
        const returnData = [];
        for (let i = 0; i < items.length; i++) {
            const body = {
                group_id: this.getNodeParameter('groupId', i),
                action: 'add',
                number: this.getNodeParameter('number', i),
                name: this.getNodeParameter('name', i),
            };
            const resp = await GenericFunctions_1.wabotRequest.call(this, 'POST', '/contact_group_action', body);
            returnData.push(resp);
        }
        return [returnData.map(d => ({ json: d }))];
    }
}
exports.WabotContactGroupAdd = WabotContactGroupAdd;
