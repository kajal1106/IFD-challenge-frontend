import React, { useState } from 'react';
import { createTicket } from '../api';
import { debounce } from 'lodash';
import { Button } from '@mui/material'; 

const RandomTicketButton: React.FC = () => {
  const [loading, setLoading] = useState(false);

  const handleGenerateRandomTicket = debounce(async () => {
    console.log('asd');
    try {
      setLoading(true);
      // await createTicket();
      setLoading(false);
    } catch (error) {
      console.error('Failed to generate random ticket:', error);
    }
  }, 1000);

  return (
    <Button onClick={handleGenerateRandomTicket} disabled={loading}>
      {loading ? 'Generating Ticket...' : 'Generate Random Ticket'}
    </Button>
  );
};

export default RandomTicketButton;