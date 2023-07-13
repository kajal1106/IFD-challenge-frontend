import axios from 'axios';
import { Ticket } from './types';

const API_BASE_URL = 'http://localhost:3000';

export const getTickets = async () =>
  await axios.get<Ticket[]>(`${API_BASE_URL}/tickets`)
  .then(response => {
    console.log(response.data);
    return response.data;
});

export const createTicket = async (ticket : Ticket): Promise<Ticket> => {
  const respo = await axios.post(`${API_BASE_URL}/tickets`, ticket).then(response => {
    console.log(response);
    return response.data;
  })
  return respo;
};

export const updateTicketStatus = async (ticketId: string, status: string) =>
  await axios.put(`${API_BASE_URL}/tickets/${ticketId}`, { status })
  .then(response => {
    console.log(response);
    return response.data;
  })