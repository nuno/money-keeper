export interface Expense {
  $key?: string;
  amount: number;
  category: string;
  comment: string;
  createdAt: Date;
}
