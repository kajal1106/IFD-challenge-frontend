import React, { useState, useEffect } from 'react';
import { ButtonGroup, Button, Box , Typography } from '@mui/material';
import TicketList from './components/TicketList';
import CreateTicketModal from './components/CreateTicketModal';
import { Ticket } from './types';
import { getTickets, createTicket, updateTicketStatus } from './api';
import { debounce } from 'lodash';
import { faker } from '@faker-js/faker';

const App: React.FC = () => {
  const [isModalOpen, setModalOpen] = useState(false);
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    fetchTickets();
  }, []);

  // This function retrieves the tickets from the API and updates the state with the fetched data.
  const fetchTickets = async () => {
    try {
      // Fetch tickets from the API
      const fetchedTickets = await getTickets();
      setTickets(fetchedTickets);
      setLoading(false);
    } catch (error) {
      console.error('Failed to fetch tickets:', error);
      setLoading(false);
    }
  };

  // This function handles the creation of a new ticket by making an API call and updating the state with the new ticket.
  const handleCreateTicket = async (newTicket: Ticket) => {
    try {
      setLoading(true);
      // Create a new ticket using the API
      await createTicket(newTicket).then((response) => {
        // Add the new ticket to the existing tickets list
        setTickets((prevTickets) => [...prevTickets, response]);
      });
      setLoading(false);
    } catch (error) {
      console.error('Failed to generate ticket:', error);
      setLoading(false);
    }
    handleCloseModal();
  };

  // This function generates a random date for the deadline of the random ticket.
  function randomDate() {
    const from: Date = new Date();
    const to: Date = new Date();
    from.setDate(from.getDate() - 2);
    to.setDate(to.getDate() + 2);
    return new Date(from.getTime() + Math.random() * (to.getTime() - from.getTime()));
  }

  // This debounced function generates a random ticket using faker.js, makes an API call to create the ticket, and updates the state with the new ticket.
  const handleGenerateRandomTicket = debounce(async () => {
    try {
      setLoading(true);
      // Generate a random ticket with faker.js
      const newTicket: Ticket = {
        client: faker.company.name(),
        issue: faker.word.noun(),
        status: 'open',
        deadline: randomDate().toString(),
      };
      await createTicket(newTicket).then((response) => {
        // Add the new ticket to the existing tickets list
        setTickets((prevTickets) => [...prevTickets, response]);
      });
      setLoading(false);
    } catch (error) {
      console.error('Failed to generate random ticket:', error);
      setLoading(false);
    }
  }, 1000);

  // This function handles the update of a ticket's status by making an API call and fetching the updated tickets list.
  const handleUpdateStatus = async (ticketId: string, newStatus: 'open' | 'closed') => {
    try {
      setLoading(true);
      // Update the ticket status using the API
      await updateTicketStatus(ticketId, newStatus).then((response) => {
        // Fetch the updated tickets list after status update
        fetchTickets();
      });
      setLoading(false);
    } catch (error) {
      console.error('Failed to update ticket: status', error);
      setLoading(false);
    }
  };

  // These functions handle the opening and closing of the create ticket modal.
  const handleOpenModal = () => {
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };

  return (
    <Box
      sx={{
        border: '1px solid grey',
        borderRadius: '5px',
        margin: '1em',
        padding: '1em',
        marginTop: '2em',
      }}
    >
      <Box>
        <Typography variant="h4" component="h1" align="center" gutterBottom>
          Ticket Management System
        </Typography>
        {loading ? (
          <p>Loading...</p>
        ) : (
          // Render the list of tickets
          <TicketList tickets={tickets} onUpdateStatus={handleUpdateStatus} />
        )}
        <ButtonGroup
          disableElevation
          variant="contained"
          aria-label="Disabled elevation buttons"
          sx={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'flex-end', gap: '1rem' }}
        >
          <Button onClick={handleOpenModal} data-cy="create-ticket-button">Create New Ticket</Button>
          <Button onClick={handleGenerateRandomTicket} disabled={loading}>
            {loading ? 'Generating Ticket...' : 'Generate Random Ticket'}
          </Button>
        </ButtonGroup>
        <CreateTicketModal
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          onCreate={handleCreateTicket}
        />
      </Box>
    </Box>
  );
};

export default App;