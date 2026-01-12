import { ChangeDetectionStrategy, Component } from '@angular/core';

import { ProgressSpinnerModule } from 'primeng/progressspinner';

const imports = [ProgressSpinnerModule];

@Component({
  selector: 'echo-loader',
  template: `
    <div class="flex items-center justify-center w-full">
      <div>
        <p-progress-spinner ariaLabel="loading" strokeWidth="8" />
        <p class="text-center">Loading...</p>
      </div>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports,
})
export class LoaderComponent {}
