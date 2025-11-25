import type { LinkTarget, HttpMethod } from '#core/model';

export interface Base64FormSubmitConfig {
  url: string;
  target: LinkTarget;
  base64Data: string;
  methodType: HttpMethod;
}
