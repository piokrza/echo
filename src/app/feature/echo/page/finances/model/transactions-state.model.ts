import { EchoTransaction, TransactionType } from '#finances/model';

export interface TransactionsState {
  isLoading: boolean;
  selectedTxType: TransactionType;
  transactions: EchoTransaction[] | null;
}
