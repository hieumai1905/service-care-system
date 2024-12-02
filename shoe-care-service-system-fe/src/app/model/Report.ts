export interface Report {
  totalSpent: number;
  averageSpent: number;
  highestSpent: number;
  lowestSpent: number;
  transactionCount: number;
  clientTypeStats: { [key: string]: number };  // Thống kê theo loại khách hàng
}
