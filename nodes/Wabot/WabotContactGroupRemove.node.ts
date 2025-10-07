import type { IExecuteFunctions } from 'n8n-workflow';
import type { INodeType, INodeTypeDescription } from 'n8n-workflow';
import { wabotRequest } from './GenericFunctions';

export class WabotContactGroupRemove implements INodeType {
  description: INodeTypeDescription = {
    displayName: 'Wabot: Contact Group Remove',
    name: 'wabotContactGroupRemove',
    icon: { light: 'file:wabot.png', dark:  'file:wabot.png', },
    group: ['transform'],
    version: 1,
    description: 'Remove a contact from a Wabot contact group.',
    defaults: { name: 'Wabot: Contact Group Remove' },
    inputs: ['main'],
    outputs: ['main'],
    credentials: [{ name: 'wabotApi', required: true }],
    properties: [
      { displayName: 'Contact Group ID', name: 'groupId', type: 'string', default: '', required: true },
      { displayName: 'Number', name: 'number', type: 'string', default: '', required: true },
    ],
  };

  async execute(this: IExecuteFunctions) {
    const items = this.getInputData();
    const returnData: any[] = [];
    for (let i = 0; i < items.length; i++) {
      const body: any = {
        group_id: this.getNodeParameter('groupId', i) as string,
        action: 'remove',
        number: this.getNodeParameter('number', i) as string,
      };
      const resp = await wabotRequest.call(this, 'POST', '/contact_group_action', body);
      returnData.push(resp);
    }
    return [returnData.map(d => ({ json: d }))];
  }
}
