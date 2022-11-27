import { Dialog, styled } from '@material-ui/core';

import { COLORS } from 'src/constants';

export const StyledCustomDialog = styled(Dialog)(() => ({
  backdropFilter: 'blur(5px)',
  '& .MuiPaper-root': {
    maxWidth: '492px',
    width: '100%',
    padding: '24px 12px 8px 12px',
    background: COLORS.white,
    boxShadow:
      '0px 11px 15px -7px rgb(0 0 0 / 20%), 0px 24px 38px 3px rgb(0 0 0 / 14%), 0px 9px 46px 8px rgb(0 0 0 / 12%)',
    overflowY: 'unset',
  },
}));
