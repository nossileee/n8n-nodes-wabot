import type { IExecuteFunctions, INodeExecutionData } from 'n8n-workflow';
import type { INodeType, INodeTypeDescription } from 'n8n-workflow';
export declare class WabotSendText implements INodeType {
    description: INodeTypeDescription;
    execute(this: IExecuteFunctions): Promise<INodeExecutionData[][]>;
}
