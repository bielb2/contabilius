import React from 'react';

import { IconButton } from '@material-ui/core';
import { CloseOutlined } from '@material-ui/icons';

import { StyledCustomDialog } from './CustomDialog.styles';

type Props = {
  open: boolean;
  children: React.ReactNode;
  onClose: () => void;
};

export const CustomDialog = (props: Props): JSX.Element => {
  const { open, children, onClose } = props;

  return (
    <StyledCustomDialog open={open} onClose={onClose}>
      {onClose && (
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: 'absolute',
            right: '-48px',
            top: '-24px',
            color: 'white',
          }}
        >
          <CloseOutlined />
        </IconButton>
      )}
      {children}
    </StyledCustomDialog>
  );
};
