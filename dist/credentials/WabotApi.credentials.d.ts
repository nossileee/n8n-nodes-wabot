import type { ICredentialType, INodeProperties, IAuthenticateGeneric, ICredentialTestRequest } from 'n8n-workflow';
export declare class WabotApi implements ICredentialType {
    name: string;
    displayName: string;
    documentationUrl: string;
    properties: INodeProperties[];
    authenticate: IAuthenticateGeneric;
    test: ICredentialTestRequest;
}
