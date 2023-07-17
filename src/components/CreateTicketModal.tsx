import React, { useState, FormEvent, ChangeEvent } from 'react';
import { SelectChangeEvent } from '@mui/material';
import {
  Modal,
  Box,
  Typography,
  TextField,
  Button,
  ButtonGroup,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from '@mui/material';

interface Ticket {
  _id: string;
  client: string;
  issue: string;
  status: 'open' | 'closed';
  deadline: string;
}

interface CreateTicketModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCreate: (newTicket: Ticket) => void;
}

const CreateTicketModal: React.FC<CreateTicketModalProps> = ({
  isOpen,
  onClose,
  onCreate,
}) => {
  // State variables for managing form fields
  const [client, setClient] = useState('');
  const [issue, setIssue] = useState('');
  const [status, setStatus] = useState<'open' | 'closed'>('open');
  const [deadline, setDeadline] = useState('');

// This function is called when the form is submitted. It creates a new ticket object with the form field values, calls the onCreate callback function with the new ticket, resets the form field values, and closes the modal.
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Create a new ticket object with form field values
    const newTicket: Ticket = {
      _id: Date.now().toString(),
      client,
      issue,
      status,
      deadline,
    };

    // Call the onCreate callback function with the new ticket
    onCreate(newTicket);

    // Reset form field values
    setClient('');
    setIssue('');
    setStatus('open');
    setDeadline('');

    // Close the modal
    onClose();
  };

  const handleClientChange = (e: ChangeEvent<HTMLInputElement>) => {
    setClient(e.target.value);
  };

  const handleIssueChange = (e: ChangeEvent<HTMLInputElement>) => {
    setIssue(e.target.value);
  };

  const handleStatusChange = (e: SelectChangeEvent<'open' | 'closed'>) => {
    setStatus(e.target.value as 'open' | 'closed');
  };

  const handleDeadlineChange = (e: ChangeEvent<HTMLInputElement>) => {
    setDeadline(e.target.value);
  };

  return (
    <Modal open={isOpen} onClose={onClose} data-cy="create-ticket-modal">
      <Box
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          bgcolor: 'background.paper',
          boxShadow: 24,
          p: 4,
          minWidth: 400,
        }}
      >
        <Typography variant="h6" component="h2" gutterBottom>
          Create Ticket
        </Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            label="Client"
            value={client}
            onChange={handleClientChange}
            required
            fullWidth
            margin="normal"
            data-cy="client"
          />
          <TextField
            label="Issue"
            value={issue}
            onChange={handleIssueChange}
            required
            fullWidth
            margin="normal"
            data-cy="issue"
          />
          <FormControl fullWidth margin="normal">
            <InputLabel>Status</InputLabel>
            <Select value={status} onChange={handleStatusChange} required>
              <MenuItem value="open">Open</MenuItem>
              <MenuItem value="closed">Closed</MenuItem>
            </Select>
          </FormControl>
          <TextField
            label="Deadline"
            type="date"
            value={deadline}
            onChange={handleDeadlineChange}
            required
            fullWidth
            margin="normal"
            data-cy="deadline"
          />
          <ButtonGroup
            disableElevation
            fullWidth
            sx={{ display: 'flex', flexDirection: 'column', marginTop: '.5em' }}
          >
            <Button
              type="submit"
              variant="contained"
              color="primary"
              data-cy="create-ticket-submit"
              fullWidth
              sx={{ marginBottom: '.5em' }}
            >
              Create
            </Button>
            <Button variant="contained" fullWidth onClick={onClose}>
              Cancel
            </Button>
          </ButtonGroup>
        </form>
      </Box>
    </Modal>
  );
};

export default CreateTicketModal;