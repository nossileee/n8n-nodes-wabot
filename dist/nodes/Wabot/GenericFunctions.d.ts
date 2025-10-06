import type { IExecuteFunctions, ILoadOptionsFunctions, IDataObject } from 'n8n-workflow';
export declare function wabotRequest(this: IExecuteFunctions | ILoadOptionsFunctions, method: string, endpoint: string, body?: IDataObject, qs?: IDataObject): Promise<any>;
