import type { IExecuteFunctions, ILoadOptionsFunctions, IDataObject } from 'n8n-workflow';

export async function wabotRequest(
  this: IExecuteFunctions | ILoadOptionsFunctions,
  method: string,
  endpoint: string,
  body: IDataObject = {},
  qs: IDataObject = {},
) {
  const credentials = await this.getCredentials('wabotApi');

  // Inject instance_id from credentials into body/qs if missing
  const inst = (credentials && (credentials.instanceId || credentials.instanceID || credentials.instance_id)) as string | undefined;
  if (inst) {
    if (body && typeof body === 'object' && body.instance_id == null) {
      (body as any).instance_id = inst;
    }
    if (qs && typeof qs === 'object' && qs.instance_id == null) {
      (qs as any).instance_id = inst;
    }
  }

  const options = {
    method,
    url: endpoint,
    qs,
    body,
    json: true,
    baseURL: (credentials && typeof credentials.baseUrl === 'string') ? credentials.baseUrl : undefined,
  } as unknown as IDataObject;

  // @ts-ignore
  return await this.helpers.httpRequestWithAuthentication.call(this, 'wabotApi', options);
}
