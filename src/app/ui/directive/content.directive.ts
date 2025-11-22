import { Directive, inject, TemplateRef } from '@angular/core';

@Directive({ selector: '[echoContent]' })
export class ContentDirective {
  readonly template = inject(TemplateRef);
}
