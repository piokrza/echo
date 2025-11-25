import { DOCUMENT } from '@angular/common';
import { inject, Injectable } from '@angular/core';

import type { Base64FormSubmitConfig } from '#core/model';

@Injectable({ providedIn: 'root' })
export class DynamicFormSubmitService {
  readonly #document: Document = inject(DOCUMENT);

  base64(config: Base64FormSubmitConfig): void {
    const encodedRequestBody = decodeURIComponent(escape(atob(config.base64Data)));
    const safe = encodedRequestBody.replace(/\+/g, '%2B'); // Prevent converting '+' with ' '

    const params = new URLSearchParams(safe);
    const form: HTMLFormElement = this.#document.createElement('form');

    form.action = config.url;
    form.target = config.target;
    form.method = config.methodType;

    for (const [key, value] of params as unknown as Iterable<[string, string]>) {
      const input: HTMLInputElement = this.#document.createElement('input');

      input.name = key;
      input.type = 'hidden';
      input.setAttribute('value', value);

      form.appendChild(input);
    }

    this.#document.body.appendChild(form);
    form.submit();
    form.remove();
  }
}
