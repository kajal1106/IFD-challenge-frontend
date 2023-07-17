import axios from 'axios';
import { Ticket } from './types';

const API_BASE_URL = 'http://localhost:3000';

// Retrieve all tickets
export const getTickets = async () =>
  await axios.get<Ticket[]>(`${API_BASE_URL}/tickets`)
  .then(response => {
    return response.data;
});

// Create a new ticket
export const createTicket = async (ticket : Ticket): Promise<Ticket> => {
  const respo = await axios.post(`${API_BASE_URL}/tickets`, ticket).then(response => {
    return response.data;
  })
  return respo;
};

// Update ticket status
export const updateTicketStatus = async (ticketId: string, status: string) =>
  await axios.put(`${API_BASE_URL}/tickets/${ticketId}`, { status })
  .then(response => {
    return response.data;
  })