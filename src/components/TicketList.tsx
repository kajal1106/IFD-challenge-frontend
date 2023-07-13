import React from 'react';
import TicketItem from './TicketItem';
import { Ticket } from '../types';
import { CircularProgress, Box } from '@mui/material';

interface TicketListProps {
  tickets: Ticket[];
  onUpdateStatus: (ticketId: string, status: 'open' | 'closed') => void;
}

const TicketList: React.FC<TicketListProps> = ({ tickets, onUpdateStatus }) => {
  if (tickets.length === 0) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '200px' }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <div>
      {tickets.map((ticket, index) => (
        <TicketItem
          key={ticket._id!}
          ticket={ticket}
          onUpdateStatus={onUpdateStatus}
          index={index}
        />
      ))}
    </div>
  );
};

export default TicketList;
