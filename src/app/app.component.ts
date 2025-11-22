import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

const imports = [RouterOutlet];

@Component({
  selector: 'echo-root',
  template: `<router-outlet />`,
  imports,
})
export class App {}
