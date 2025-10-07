import type {
  IExecuteFunctions,
  ILoadOptionsFunctions,
  IDataObject,
  IHttpRequestOptions,
  IHttpRequestMethods,
} from 'n8n-workflow';

export async function wabotRequest(
  this: IExecuteFunctions | ILoadOptionsFunctions,
  method: IHttpRequestMethods,
  endpoint: string,
  body: IDataObject = {},
  qs: IDataObject = {},
) {
  const credentials = await this.getCredentials('wabotApi');
  const accessToken = credentials.accessToken as string;
  const instanceId = credentials.instanceId as string;
  const baseUrl = credentials.baseUrl as string;

   body.access_token = accessToken;
  body.instance_id = instanceId;
  qs.access_token = accessToken;
  qs.instance_id = instanceId;

  const options: IHttpRequestOptions = {
    headers: {
      'Content-Type': 'application/json',
    },
    method,
    body,
    qs,
    url: `${baseUrl}${endpoint}`,
    json: true,  
  };
  
  return await this.helpers.request(options);
}