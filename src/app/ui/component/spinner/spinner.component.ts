import { ChangeDetectionStrategy, Component } from '@angular/core';

import { ProgressSpinnerModule } from 'primeng/progressspinner';

const imports = [ProgressSpinnerModule];

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
