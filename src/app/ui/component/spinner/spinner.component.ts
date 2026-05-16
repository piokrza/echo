import { ChangeDetectionStrategy, Component } from '@angular/core';

import { ProgressSpinner } from 'primeng/progressspinner';

const imports = [ProgressSpinner];

@Component({
  selector: 'echo-spinner',
  template: `
    <div class="flex justify-center">
      <p-progress-spinner ariaLabel="loading" />
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports,
})
export class SpinnerComponent {}
