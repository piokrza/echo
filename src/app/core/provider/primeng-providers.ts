import { makeEnvironmentProviders } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { DialogService } from 'primeng/dynamicdialog';

// TODO: remove provider
export const primeNgProviders = () => {
  return makeEnvironmentProviders([DialogService, MessageService, ConfirmationService]);
};
