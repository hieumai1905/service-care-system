import {Transaction} from "./Transaction";

export interface ClientReport {
  id: number;
  name: string;
  totalSpent: number;
  type: string;
  phoneNumber: string;
  email: string;
  transactionHistory: Transaction[];
}
