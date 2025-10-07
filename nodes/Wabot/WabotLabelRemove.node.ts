import type { IExecuteFunctions } from 'n8n-workflow';
import type { INodeType, INodeTypeDescription } from 'n8n-workflow';
import { wabotRequest } from './GenericFunctions';

export class WabotLabelRemove implements INodeType {
  description: INodeTypeDescription = {
    displayName: 'Wabot: Label Remove',
    name: 'wabotLabelRemove',
    icon: { light: 'file:wabot.png', dark:  'file:wabot.png', },
    group: ['transform'],
    version: 1,
    description: 'Remove a WhatsApp Business label from a number.',
    defaults: { name: 'Wabot: Label Remove' },
    inputs: ['main'],
    outputs: ['main'],
    credentials: [{ name: 'wabotApi', required: true }],
    properties: [
      { displayName: 'Label ID', name: 'labelId', type: 'string', default: '', required: true },
      { displayName: 'Number', name: 'number', type: 'string', default: '', required: true },
    ],
  };

  async execute(this: IExecuteFunctions) {
    const items = this.getInputData();
    const returnData: any[] = [];
    for (let i = 0; i < items.length; i++) {
      const body: any = {
        label_id: this.getNodeParameter('labelId', i) as string,
        action: 'remove',
        number: this.getNodeParameter('number', i) as string,
      };
      const resp = await wabotRequest.call(this, 'POST', '/label_action', body);
      returnData.push(resp);
    }
    return [returnData.map(d => ({ json: d }))];
  }
}