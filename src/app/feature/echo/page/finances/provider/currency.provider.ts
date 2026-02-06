import { registerLocaleData } from '@angular/common';
import localePl from '@angular/common/locales/pl';
import { DEFAULT_CURRENCY_CODE, EnvironmentProviders, LOCALE_ID, makeEnvironmentProviders } from '@angular/core';

export const provideCurrencyConfig = (): EnvironmentProviders => {
  registerLocaleData(localePl);

  return makeEnvironmentProviders([
    { provide: LOCALE_ID, useValue: 'pl-PL' },
    { provide: DEFAULT_CURRENCY_CODE, useValue: 'PLN' },
  ]);
};
