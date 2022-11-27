import { Backdrop, CircularProgress, Stack, Typography } from '@material-ui/core';

type Props = {
  isOpen: boolean;
  message: string | undefined;
};

export const CustomBackDrop = ({ isOpen, message }: Props): JSX.Element => {
  return (
    <Backdrop sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }} open={isOpen}>
      <Stack alignItems="center" spacing={1}>
        <CircularProgress color="inherit" />
        {message && (
          <Typography variant="h6" color="inherit">
            {message}
          </Typography>
        )}
      </Stack>
    </Backdrop>
  );
};
