import { useState } from 'react';

import { Box, Button, Hidden, Typography } from '@material-ui/core';
import { observer } from 'mobx-react';
import { useToggle } from 'react-use';

import { LogoContabilUsWhite } from 'src/assets/svg';
import { Gap } from 'src/components';
import { NUMBER_SIZES, theme } from 'src/constants';

import { AboutUsComponent, LoginForm, RecoverPasswordDialog, RegisterForm } from './components';
import { useStyles } from './LoginScreen.styles';

const FORM_NAVIGATOR_TYPES = {
  LOGIN: 'login',
  REGISTER: 'register',
} as const;

type FormNavigator = ValueOf<typeof FORM_NAVIGATOR_TYPES>;

export const LoginScreen = observer(() => {
  const classes = useStyles();
  const [formNavigator, setFormNavigator] = useState<FormNavigator>(FORM_NAVIGATOR_TYPES.LOGIN);
  const [isOpen, toggleModal] = useToggle(false);

  const handleStyle = (navigator: FormNavigator) => (formNavigator === navigator ? classes.active : classes.disabled);

  return (
    <div className={classes.paperContainer}>
      <RecoverPasswordDialog
        open={isOpen}
        onClose={toggleModal}
        handleLogin={() => setFormNavigator(FORM_NAVIGATOR_TYPES.LOGIN)}
        handleRegister={() => setFormNavigator(FORM_NAVIGATOR_TYPES.REGISTER)}
      />

      <Box
        display="flex"
        flexDirection="row"
        width="100%"
        height="100%"
        sx={{
          [theme.breakpoints.down('md')]: {
            justifyContent: 'center',
          },
        }}
      >
        <Hidden mdDown>
          <AboutUsComponent />
        </Hidden>

        <Box
          height="100%"
          width="40%"
          display="flex"
          justifyContent="flex-start"
          alignItems="center"
          sx={{
            [theme.breakpoints.down('md')]: {
              width: '60%',
            },
            [theme.breakpoints.down(500)]: {
              width: '100%',
            },
          }}
        >
          <Box
            width="340px"
            paddingRight={1}
            sx={{
              [theme.breakpoints.down('md')]: {
                width: '100%',
              },
            }}
          >
            <Hidden mdUp>
              <Box width="100%" justifyContent="center" display="flex">
                <LogoContabilUsWhite width="172px" height="42px" />
              </Box>

              <Gap size={NUMBER_SIZES.$56} />
            </Hidden>

            <Box display="flex" justifyContent="space-between" marginBottom={NUMBER_SIZES.$4}>
              <Button variant="text" color="secondary" onClick={() => setFormNavigator(FORM_NAVIGATOR_TYPES.LOGIN)}>
                <Typography variant="h5" className={handleStyle(FORM_NAVIGATOR_TYPES.LOGIN)}>
                  Login
                </Typography>
              </Button>

              <Button variant="text" color="secondary" onClick={() => setFormNavigator(FORM_NAVIGATOR_TYPES.REGISTER)}>
                <Typography variant="h5" className={handleStyle(FORM_NAVIGATOR_TYPES.REGISTER)}>
                  Cadastre-se
                </Typography>
              </Button>
            </Box>

            {formNavigator === FORM_NAVIGATOR_TYPES.LOGIN ? <LoginForm toggleModal={toggleModal} /> : <RegisterForm />}
          </Box>
        </Box>
      </Box>
    </div>
  );
});
