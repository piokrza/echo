import { EchoTransaction } from '#finances/model';

export interface TransactionDetailsState {
  tx: EchoTransaction | null;
  isLoading: boolean;
}
