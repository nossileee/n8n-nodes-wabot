import type { IExecuteFunctions } from 'n8n-workflow';
import type { INodeType, INodeTypeDescription } from 'n8n-workflow';
export declare class WabotGroupAddNumber implements INodeType {
    description: INodeTypeDescription;
    execute(this: IExecuteFunctions): Promise<{
        json: any;
    }[][]>;
}
