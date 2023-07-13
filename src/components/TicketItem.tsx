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
  const handleStatusChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newStatus = event.target.checked ? 'closed' : 'open';
    onUpdateStatus(ticket._id!, newStatus);
  };

  const getStatusColor = () => {
    if (ticket.status === 'closed') {
      return 'green';
    } else if (new Date() > new Date(ticket.deadline)) {
      return 'red';
    } else {
      return 'yellow';
    }
  };

  const formattedDate = format(new Date(ticket.deadline), 'dd/MM/yyyy');

  return (
    <Box sx={{ minWidth: 275, width: '50%' }}>

      <Card variant="outlined" 
        sx={{
          marginBottom: '1em',
          backgroundColor: '#cfebfc',
          padding: '1em',
        }}
      >
        <Grid container alignItems="center" justifyContent="space-between">
          <Grid item xs={5}>
            <p>{index + 1}.   <span style={{textTransform: 'uppercase'}}>{ticket.client}</span></p>

          </Grid>
          <Grid item xs={4}>
            <p>{formattedDate}</p>
          </Grid>
          <Grid item xs={3} sx={{ display: 'flex', justifyContent: 'flex-end' , alignItems: 'center'}}>
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
        <Box sx={{ backgroundColor: 'white', color: 'grey' ,padding: '0.75em', marginTop: '.5em', borderRadius: '5px', height: '80px' }}>
          <Typography variant="body2">{ticket.issue}</Typography>
        </Box>
        {/* <p>Issue: {ticket.issue}</p> */}
      </Card>
    </Box>
  );
};

export default TicketItem;