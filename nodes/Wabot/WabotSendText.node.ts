import type { IExecuteFunctions } from 'n8n-workflow';
import type { INodeType, INodeTypeDescription } from 'n8n-workflow';
import { wabotRequest } from './GenericFunctions';

export class WabotSendText implements INodeType {
  description: INodeTypeDescription = {
    displayName: 'Wabot: Send Text',
    name: 'wabotSendText',
    icon: 'file:wabot.svg',
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

  async execute(this: IExecuteFunctions) {
    const items = this.getInputData();
    const returnData: any[] = [];
    for (let i = 0; i < items.length; i++) {
      const body: any = {
        number: this.getNodeParameter('number', i) as string,
        type: 'text',
        message: this.getNodeParameter('message', i) as string) as string,
      };
      const resp = await wabotRequest.call(this, 'POST', '/send', body);
      returnData.push(resp);
    }
    return [returnData.map(d => ({ json: d }))];
  }
}
