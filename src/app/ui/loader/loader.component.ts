import { Component } from '@angular/core';

import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

const imports = [MatProgressSpinnerModule];

@Component({
  selector: 'echo-loader',
  template: `
    <div class="flex items-center justify-center w-full">
      <div>
        <mat-spinner />
        <p class="text-center">Loading...</p>
      </div>
    </div>
  `,
  imports,
})
export class LoaderComponent {}
