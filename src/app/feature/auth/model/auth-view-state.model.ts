import { AuthFormType } from '#auth/model';

export interface AuthViewState {
  isPerforming: boolean;
  formType: AuthFormType;
}
