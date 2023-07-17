export interface Ticket {
  _id?: string; // Optional ID field for existing tickets
  client: string; // Client name
  issue: string; // Issue message
  status: 'open' | 'closed'; // Ticket status: open or closed
  deadline: string; // Deadline for the ticket
}