import React, { useState } from 'react';
import { debounce } from 'lodash';
import { Button } from '@mui/material';

const RandomTicketButton: React.FC = () => {
  // State to manage the loading state of the button
  const [loading, setLoading] = useState(false);

  // Handler for generating a random ticket with debounce
  const handleGenerateRandomTicket = debounce(async () => {
    console.log('asd');
    try {
      setLoading(true);
      // Perform the necessary logic to generate a random ticket
      setLoading(false);
    } catch (error) {
      console.error('Failed to generate random ticket:', error);
    }
  }, 1000);

  return (
    <Button onClick={handleGenerateRandomTicket} disabled={loading}>
      {/* Display the appropriate button label based on the loading state */}
      {loading ? 'Generating Ticket...' : 'Generate Random Ticket'}
    </Button>
  );
};

export default RandomTicketButton;