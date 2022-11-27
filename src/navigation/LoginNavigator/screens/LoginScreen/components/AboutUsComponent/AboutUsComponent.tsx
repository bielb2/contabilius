import { Button, Typography, Box } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';

import { LogoContabilUsWhite } from 'src/assets/svg';
import { Gap } from 'src/components';
import { NUMBER_SIZES, theme } from 'src/constants';

const useStyles = makeStyles(() => ({
  logoBox: {
    width: '70%',
    [theme.breakpoints.down('md')]: {
      width: '100%',
    },
  },
}));

export const AboutUsComponent = (): JSX.Element => {
  const classes = useStyles();

  return (
    <Box display="flex" width="100%" height="100%" flexDirection="column">
      <Box
        display="flex"
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
        height="100%"
        className={classes.logoBox}
        marginTop={NUMBER_SIZES.$4}
      >
        <Box>
          <LogoContabilUsWhite />

          <Typography variant="subtitle1" color="white" marginBottom={NUMBER_SIZES.$4}>
            Lorem ipsum dolor sit, consectetur adipisci elit.
          </Typography>

          <Gap size={NUMBER_SIZES.$48} />
          {/* TODO: VER O 'primary.main' */}
          <Button variant="contained" color="inherit" size="large" sx={{ color: theme.palette.primary.main }}>
            Quem somos
          </Button>
        </Box>
      </Box>

      <Box display="flex" justifyContent="flex-end" width="93%">
        <Box borderRight="1px solid white" padding={NUMBER_SIZES.$2} textAlign="right">
          <Typography variant="h6" component="h6" color="white">
            Contatos
          </Typography>

          <Typography variant="subtitle1" color="white">
            (85) 0000-0000 - (85) 0000-0001
          </Typography>

          <Typography variant="subtitle1" color="white">
            www.lorem.com.br
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};
