import React, { useState, useEffect } from 'react';
import { Ticket } from './types';
import TicketList from './components/TicketList';
import { Box, ButtonGroup, Button } from '@mui/material';
import { getTickets, createTicket, updateTicketStatus } from './api';
import { debounce } from 'lodash';
import { faker } from '@faker-js/faker';


function App() {
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const fetchTickets = async () => {
    try {
      const fetchedTickets = await getTickets();
      setTickets(fetchedTickets);
      setLoading(false);
    } catch (error) {
      console.error('Failed to fetch tickets:', error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTickets();
  }, []);

  const handleCreateTicket = () => {
    const newTicket: Ticket = {
      _id: String(Date.now()),
      client: 'New Client',
      issue: 'New Issue',
      status: 'open',
      deadline: '2023-07-12T00:00:00.000Z',
    };
    setTickets(prevTickets => [...prevTickets, newTicket]);
  };
  
  function randomDate() {
    const from : Date = new Date();
    const to : Date = new Date();
    from!.setDate(from!.getDate() - 2);
    to!.setDate(to!.getDate() + 2);
    const ran = Math.floor(Math.random() * (2 - (-2) + 1) + (-2));
    return new Date(
      from!.getTime() +
      Math.random() * (to.getTime() - from!.getTime()),
    );
  }

  const handleGenerateRandomTicket = debounce(async () => {
    try {
      setLoading(true);
      const newTicket: Ticket = {
        // _id: String(Date.now()),
        client: faker.company.name(),
        issue: faker.word.noun(),
        status: 'open',
        deadline: randomDate().toString(),
      }
      await createTicket(newTicket).then(response => {
        setTickets(prevTickets => [...prevTickets, response]);
      });
      setLoading(false);
    } catch (error) {
      console.error('Failed to generate random ticket:', error);
      setLoading(false);
    }
  }, 1000);
  

  const handleUpdateStatus = async (ticketId: string, status: 'open' | 'closed') => {
    try {
      await updateTicketStatus(ticketId, status)
      .then(response => {
        const updatedTickets = tickets.map(ticket => {
          if (ticket._id === ticketId) {
            return { ...ticket, status };
          }
          return ticket;
        });
        setTickets(updatedTickets);
      })
      .catch(error => {
        console.log(error);
      })
      setLoading(false);
    } catch (error) {
      console.error('Failed to generate random ticket:', error);
      setLoading(false);
    }
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
        {loading ? (
          <p>Loading...</p>
        ) : (
          <TicketList tickets={tickets} onUpdateStatus={handleUpdateStatus} />
        )}
        <ButtonGroup
          disableElevation
          variant="contained"
          aria-label="Disabled elevation buttons"
          sx={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'flex-end', gap: '1rem' }}
        >
          <Button onClick={handleCreateTicket}>Create New Ticket</Button>
          {/* <RandomTicketButton /> */}
          <Button onClick={handleGenerateRandomTicket} disabled={loading}>
            {loading ? 'Generating Ticket...' : 'Generate Random Ticket'}
          </Button>
        </ButtonGroup>
      </Box>
    </Box>
  );
}

export default App;