import React from 'react';
import TicketItem from './TicketItem';
import { Ticket } from '../types';
import { CircularProgress, Box } from '@mui/material';
import styled from 'styled-components';

// Styled component for the container of the ticket list
const TicketListContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-gap: 1rem;
  margin-top: 2rem;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

// Styled component for the individual ticket item
const StyledTicketItem = styled(TicketItem)`
  width: 100%;
`;

// This interface defines the props expected by the TicketList component, including the tickets array and the onUpdateStatus callback.
interface TicketListProps {
  tickets: Ticket[];
  onUpdateStatus: (ticketId: string, newStatus: 'open' | 'closed') => void;
}

// This functional component receives the tickets and onUpdateStatus props and renders the list of tickets. It also handles the case when there are no tickets, displaying a loading spinner.
const TicketList: React.FC<TicketListProps> = ({ tickets, onUpdateStatus }) => {
  // If there are no tickets, display a loading spinner
  if (tickets.length === 0) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '200px' }}>
        <CircularProgress />
      </Box>
    );
  }

  // Render the list of tickets
  return (
    <TicketListContainer data-cy="ticket-list">
      {tickets.map((ticket, index) => (
        <StyledTicketItem
          key={ticket._id}
          ticket={ticket}
          onUpdateStatus={onUpdateStatus}
          index={index}
        />
      ))}
    </TicketListContainer>
  );
};

export default TicketList;