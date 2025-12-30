import { EchoTransaction, TransactionType } from '#finances/model';

export interface TransactionsState {
  isLoading: boolean;
  transactions: EchoTransaction[];
  selectedTxType: TransactionType;
}
