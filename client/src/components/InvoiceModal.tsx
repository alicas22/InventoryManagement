import React from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Typography } from '@mui/material';

import { Invoice } from '../types';

interface InvoiceModalProps {
  open: boolean;
  onClose: () => void;
  invoice: Invoice | null;
}

const InvoiceModal: React.FC<InvoiceModalProps> = ({ open, onClose, invoice }) => {
  if (!invoice) return null;

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle className="bg-gray-50">
        Invoice Details - {invoice.vendor_name}
      </DialogTitle>
      <DialogContent className="space-y-4 py-4">
        <Typography variant="body1">
          <span className="font-semibold">Amount:</span> ${invoice.amount}
        </Typography>
        <Typography variant="body1">
          <span className="font-semibold">Due Date:</span> {new Date(invoice.due_date).toLocaleDateString()}
        </Typography>
        <Typography variant="body1">
          <span className="font-semibold">Description:</span> {invoice.description}
        </Typography>
        <Typography variant="body1">
          <span className="font-semibold">Status:</span>{' '}
          <span className={invoice.paid ? 'text-green-600' : 'text-red-600'}>
            {invoice.paid ? 'Paid' : 'Unpaid'}
          </span>
        </Typography>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default InvoiceModal;
