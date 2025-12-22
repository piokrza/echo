import { makeEnvironmentProviders } from '@angular/core';

import { ConfirmationService } from 'primeng/api';
import { DialogService } from 'primeng/dynamicdialog';

export const primeNgProviders = () => {
  return makeEnvironmentProviders([DialogService, ConfirmationService]);
};
