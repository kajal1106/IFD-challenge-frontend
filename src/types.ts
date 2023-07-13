export interface Ticket {
  _id?: string;
  client: string;
  issue: string;
  status: 'open' | 'closed';
  deadline: string; // You can use the string type for the deadline or define a specific Date type if needed
}