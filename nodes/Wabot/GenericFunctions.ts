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

  const basicAuth = Buffer.from(`${accessToken}:${instanceId}`).toString('base64');

  if (method === 'POST' || method === 'PUT' || method === 'PATCH') {
    if (!body.instance_id) {
      body.instance_id = instanceId;
    }
  } else if (method === 'GET' || method === 'DELETE') {
    if (!qs.instance_id) {
      qs.instance_id = instanceId;
    }
  }

  const options: IHttpRequestOptions = {
    headers: {
      'Authorization': `Basic ${basicAuth}`,
    },
    method,
    body,
    qs,
    url: `${baseUrl}${endpoint}`,
    json: true,
  };
  
  return await this.helpers.request(options);
}