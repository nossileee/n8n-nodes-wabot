import type { IExecuteFunctions } from 'n8n-workflow';
import type { INodeType, INodeTypeDescription } from 'n8n-workflow';
import { wabotRequest } from './GenericFunctions';

export class WabotGroupRemoveNumber implements INodeType {
  description: INodeTypeDescription = {
    displayName: 'Wabot: Group Remove Number',
    name: 'wabotGroupRemoveNumber',
    icon: { light: 'file:wabot.png', dark:  'file:wabot.png', },
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

  async execute(this: IExecuteFunctions) {
    const items = this.getInputData();
    const returnData: any[] = [];
    for (let i = 0; i < items.length; i++) {
      const body: any = {
        group_id: `${this.getNodeParameter('groupId', i) as string}@g.us`,
        action: 'remove',
        number: this.getNodeParameter('number', i) as string,
      };
      const resp = await wabotRequest.call(this, 'POST', '/group_action', body);
      returnData.push(resp);
    }
    return [returnData.map(d => ({ json: d }))];
  }
}