import { AuthFormType } from '#auth/model';

export interface AuthViewState {
  formType: AuthFormType;
  isPerformingGoogleAuth: boolean;
  isPerformingEmailAndPasswordAuth: boolean;
}
