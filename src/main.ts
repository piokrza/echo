/* eslint-disable no-console */
import { App } from './app/app.component';
import { appConfig } from './app/app.config';

import { bootstrapApplication } from '@angular/platform-browser';

bootstrapApplication(App, appConfig).catch((err) => console.error(err));
