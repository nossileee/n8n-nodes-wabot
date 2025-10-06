import type { IExecuteFunctions } from 'n8n-workflow';
import type { INodeType, INodeTypeDescription } from 'n8n-workflow';
import { wabotRequest } from './GenericFunctions';

export class WabotLabelAdd implements INodeType {
  description: INodeTypeDescription = {
    displayName: 'Wabot: Label Add',
    name: 'wabotLabelAdd',
    icon: 'file:wabot.svg',
    group: ['transform'],
    version: 1,
    description: 'Add a WhatsApp Business label to a number.',
    defaults: { name: 'Wabot: Label Add' },
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
        action: 'add',
        number: this.getNodeParameter('number', i) as string,
      };
      const resp = await wabotRequest.call(this, 'POST', '/label_action', body);
      returnData.push(resp);
    }
    return [returnData.map(d => ({ json: d }))];
  }
}