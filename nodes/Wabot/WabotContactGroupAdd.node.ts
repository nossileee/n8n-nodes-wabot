import type { IExecuteFunctions } from 'n8n-workflow';
import type { INodeType, INodeTypeDescription } from 'n8n-workflow';
import { wabotRequest } from './GenericFunctions';

export class WabotContactGroupAdd implements INodeType {
  description: INodeTypeDescription = {
    displayName: 'Wabot: Contact Group Add',
    name: 'wabotContactGroupAdd',
    icon: { light: 'file:wabot.png', dark:  'file:wabot.png', },
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

  async execute(this: IExecuteFunctions) {
    const items = this.getInputData();
    const returnData: any[] = [];
    for (let i = 0; i < items.length; i++) {
      const body: any = {
        group_id: this.getNodeParameter('groupId', i) as string,
        action: 'add',
        number: this.getNodeParameter('number', i) as string,
        name: this.getNodeParameter('name', i) as string,
      };
      const resp = await wabotRequest.call(this, 'POST', '/contact_group_action', body);
      returnData.push(resp);
    }
    return [returnData.map(d => ({ json: d }))];
  }
}
