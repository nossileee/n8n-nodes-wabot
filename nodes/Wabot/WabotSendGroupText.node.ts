import type { IExecuteFunctions } from 'n8n-workflow';
import type { INodeType, INodeTypeDescription } from 'n8n-workflow';
import { wabotRequest } from './GenericFunctions';

export class WabotSendGroupText implements INodeType {
  description: INodeTypeDescription = {
    displayName: 'Wabot: Send Group Text',
    name: 'wabotSendGroupText',
    icon: 'file:wabot.png',
    group: ['transform'],
    version: 1,
    description: 'Send text to a WhatsApp group.',
    defaults: { name: 'Wabot: Send Group Text' },
    inputs: ['main'],
    outputs: ['main'],
    credentials: [{ name: 'wabotApi', required: true }],
    properties: [
      { displayName: 'Group ID', name: 'groupId', type: 'string', default: '', required: true, description: 'Group JID (e.g. 1203630...@g.us)' },
      { displayName: 'Message', name: 'message', type: 'string', typeOptions: { rows: 4 }, default: '', required: true },
    ],
  };

  async execute(this: IExecuteFunctions) {
    const items = this.getInputData();
    const returnData: any[] = [];
    for (let i = 0; i < items.length; i++) {
      const body: any = {
        group_id: this.getNodeParameter('groupId', i) as string,
        type: 'text',
        message: this.getNodeParameter('message', i) as string,
      };
      const resp = await wabotRequest.call(this, 'POST', '/send_group', body);
      returnData.push(resp);
    }
    return [returnData.map(d => ({ json: d }))];
  }
}