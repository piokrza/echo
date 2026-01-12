import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'echo-dashboard',
  template: ` <h1>Dashboard works</h1> `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DashboardComponent {}
