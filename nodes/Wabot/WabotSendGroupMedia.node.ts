import type { IExecuteFunctions } from 'n8n-workflow';
import type { INodeType, INodeTypeDescription } from 'n8n-workflow';
import { wabotRequest } from './GenericFunctions';

export class WabotSendGroupMedia implements INodeType {
  description: INodeTypeDescription = {
    displayName: 'Wabot: Send Group Media',
    name: 'wabotSendGroupMedia',
    icon: 'file:wabot.svg',
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

  async execute(this: IExecuteFunctions) {
    const items = this.getInputData();
    const returnData: any[] = [];
    for (let i = 0; i < items.length; i++) {
      const body: any = {
        group_id: this.getNodeParameter('groupId', i) as string,
        type: 'media',
        media_url: this.getNodeParameter('mediaUrl', i) as string,
        filename: this.getNodeParameter('filename', i) as string,
        message: this.getNodeParameter('message', i) as string,
      };
      const resp = await wabotRequest.call(this, 'POST', '/send_group', body);
      returnData.push(resp);
    }
    return [returnData.map(d => ({ json: d }))];
  }
}