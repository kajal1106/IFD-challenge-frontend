import React from 'react';
import { format } from 'date-fns';
import { Box, Card, FormControlLabel, Switch, Grid, Typography } from '@mui/material';

interface TicketItemProps {
  ticket: {
    _id?: string;
    client: string;
    issue: string;
    status: 'open' | 'closed';
    deadline: string;
  };
  onUpdateStatus: (ticketId: string, status: 'open' | 'closed') => void;
  index: number;
}

const TicketItem: React.FC<TicketItemProps> = ({ ticket, onUpdateStatus, index }) => {
  // This function is a handler for the status change switch. It updates the status of the ticket based on the switch's value.
  const handleStatusChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newStatus = event.target.checked ? 'closed' : 'open';
    onUpdateStatus(ticket._id!, newStatus);
  };

  // Determine the color of the status indicator based on the ticket's status and deadline.
  const getStatusColor = () => {
    if (ticket.status === 'closed') {
      return 'green';
    } else if (new Date() > new Date(ticket.deadline)) {
      return 'red';
    } else {
      return 'yellow';
    }
  };

  // This variable stores the formatted deadline date using the format function from the date-fns library.
  const formattedDate = format(new Date(ticket.deadline), 'dd/MM/yyyy');

  return (
    <Box sx={{ }}>
      <Card
        variant="outlined"
        sx={{
          marginBottom: '1em',
          backgroundColor: '#cfebfc',
          padding: '1em',
          height: '12em',
        }}
      >
        <Grid container alignItems="center" justifyContent="space-between">
          <Grid item xs={5}>
            {/* Display the ticket client */}
            <p>{index + 1}.   <span style={{textTransform: 'uppercase'}}>{ticket.client}</span></p>
          </Grid>
          <Grid item xs={4}>
            {/* Display the formatted deadline date */}
            <p>{formattedDate}</p>
          </Grid>
          <Grid item xs={3} sx={{ display: 'flex', justifyContent: 'flex-end' , alignItems: 'center'}}>
            {/* Status change switch */}
            <FormControlLabel
              control={
                <Switch
                  checked={ticket.status === 'closed'}
                  onChange={handleStatusChange}
                  color="primary"
                />
              }
              label=""
            />
            {/* Status indicator */}
            <Box
              sx={{
                width: '24px',
                height: '24px',
                borderRadius: '50%',
                marginRight: '1rem',
                backgroundColor: 'transparent',
                border: `2px solid ${getStatusColor()}`,
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <Box
                sx={{
                  width: '12px',
                  height: '12px',
                  borderRadius: '50%',
                  backgroundColor: getStatusColor(),
                }}
              />
            </Box>
          </Grid>
        </Grid>
        <Box
          sx={{
            backgroundColor: 'white',
            color: 'grey',
            padding: '0.75em',
            marginTop: '.5em',
            borderRadius: '5px',
            height: '80px',
          }}
        >
          {/* Display the ticket issue */}
          <Typography variant="body2">{ticket.issue}</Typography>
        </Box>
      </Card>
    </Box>
  );
};

export default TicketItem;