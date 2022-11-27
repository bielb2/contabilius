import { styled } from '@material-ui/core';

import { theme } from 'src/constants';

type Props = {
  isActive?: boolean;
};

export const Dot = styled('div', {
  shouldForwardProp: (props) => props !== 'isActive',
})(({ isActive }: Props) => ({
  width: '9px',
  height: '9px',
  borderRadius: '50%',
  border: !isActive ? '1px solid rgba(165, 165, 165, 0.7)' : '',
  boxShadow: !isActive ? 'box-shadow: inset 0px 4px 4px rgba(0, 0, 0, 0.25)' : '',
  backgroundColor: isActive ? theme.palette.primary.main : theme.palette.grey[400],
}));
