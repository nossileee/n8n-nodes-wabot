import type { ICredentialType, INodeProperties, ICredentialTestRequest } from 'n8n-workflow';
export declare class WabotApi implements ICredentialType {
    name: string;
    displayName: string;
    iconUrl: string;
    documentationUrl: string;
    properties: INodeProperties[];
    test: ICredentialTestRequest;
}
