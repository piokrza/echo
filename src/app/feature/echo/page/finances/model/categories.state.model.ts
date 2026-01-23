import { EchoTransactionCategory } from '#finances/model';

export interface CategoriesState {
  isLoading: boolean;
  categories: EchoTransactionCategory[] | null;
}
