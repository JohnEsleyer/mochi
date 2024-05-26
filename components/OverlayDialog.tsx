'use client'

import React from 'react';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';

interface OverlayDialogProps {
  open: boolean;
  onClose: () => void;
  onContinue: () => void;
  textContent: string;
  title: string;
  continueColor: string;
  closeColor: string;
}

const OverlayDialog: React.FC<OverlayDialogProps> = ({ 
    open, 
    onClose, 
    onContinue, 
    textContent, 
    title,
    continueColor,
    closeColor,
}) => {
  return (

    <Dialog open={open} onClose={onClose}>
      <DialogTitle>{title}</DialogTitle>
      <DialogContent>
        <p>{textContent}</p>
      </DialogContent>
      <DialogActions>
        <button onClick={onClose} className={`text-${closeColor}-500`}>
          Close
        </button>
        <button onClick={onContinue} className={`text-${continueColor}-500`}>
          Continue
        </button>
      </DialogActions>
    </Dialog>

  );
};

export default OverlayDialog;
