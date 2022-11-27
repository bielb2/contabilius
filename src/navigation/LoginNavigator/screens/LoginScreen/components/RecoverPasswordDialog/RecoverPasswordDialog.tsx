import { useEffect } from 'react';

import {
  Box,
  Button,
  Typography,
  DialogTitle,
  DialogContent,
  DialogActions,
  Link,
  TextField,
  Stack,
} from '@material-ui/core';
import { useFormik } from 'formik';
import { toast } from 'react-toastify';

import { LogoContabilUsWhite } from 'src/assets/svg';
import { CustomDialog, Gap } from 'src/components';
import { COLORS, NUMBER_SIZES, PENDING_REQUEST } from 'src/constants';
import { RecoverPasswordPayload } from 'src/services/api/auth';
import { useStores } from 'src/store';
import { toastDataError } from 'src/utils';

import { RecoverPasswordSchema } from './RecoverPasswordDialog.schema';

type Props = {
  open: boolean;
  onClose: () => void;
  handleLogin: () => void;
  handleRegister: () => void;
};

export const RecoverPasswordDialog = (props: Props): JSX.Element => {
  const { open, onClose, handleLogin, handleRegister } = props;

  const store = useStores();

  const formik = useFormik({
    initialValues: {
      email: '',
    },
    onSubmit: async (val) => {
      const { email } = val;

      const payload: RecoverPasswordPayload = {
        email,
      };

      await toast.promise(store.authStore.recoverPassword(payload), {
        success: 'E-mail enviado com sucesso. Por favor, cheque sua caixa de entrada',
        error: {
          render: toastDataError,
        },
        pending: PENDING_REQUEST,
      });
    },

    validationSchema: RecoverPasswordSchema,
  });

  useEffect(() => {
    if (!open) {
      formik.resetForm();
    }
  }, [open]);

  return (
    <CustomDialog open={open} onClose={onClose}>
      <Box position="absolute" top="-200px" display="flex" alignItems="center" flexDirection="column">
        <LogoContabilUsWhite />

        <Gap size={NUMBER_SIZES.$24} />

        <Typography variant="subtitle1" align="center" color="white" letterSpacing="0.15">
          Registrando-se neste site, você aceita nossos <Link href="/">Termos de uso</Link> e nossa{' '}
          <Link href="/">Política de privacidade </Link>
        </Typography>
      </Box>

      <DialogTitle>
        <div>
          <Typography variant="h4" fontWeight="bold" color="secondary">
            Recupere sua senha
          </Typography>
        </div>
      </DialogTitle>

      <DialogContent>
        <Typography variant="body1" lineHeight="28px" letterSpacing="0.15px" color={COLORS.body1} fontWeight="500">
          Digite seu e-mail para recuperar sua senha. Você receberá um e-mail com instruções. Se você esta <br /> tendo
          problemas para recuperar sua senha <Link href="/">contato</Link>
        </Typography>

        <Gap size={NUMBER_SIZES.$24} />

        <Box width="100%">
          <form onSubmit={formik.handleSubmit}>
            <Stack alignItems="center" spacing={3}>
              <TextField
                variant="standard"
                sx={{ width: '70%' }}
                id="email"
                name="email"
                label="E-mail de acesso"
                aria-required
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.email && !!formik.errors.email}
                value={formik.values.email}
                helperText={formik.touched.email && formik.errors.email}
              />

              <Button
                type="submit"
                variant="contained"
                size="large"
                sx={{ width: '50%' }}
                title="Enviar"
                disabled={formik.isSubmitting}
              >
                Enviar
              </Button>
            </Stack>
          </form>
        </Box>
      </DialogContent>

      <Gap size={NUMBER_SIZES.$48} />

      <DialogActions sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <Button
          variant="text"
          onClick={() => {
            handleLogin();
            onClose();
          }}
        >
          Entrar
        </Button>

        <Button
          variant="text"
          onClick={() => {
            handleRegister();
            onClose();
          }}
        >
          Não possuo conta!
          <Typography fontWeight="bold" fontSize="inherit" component="span" ml="4px">
            Cadastre-se
          </Typography>
        </Button>
      </DialogActions>
    </CustomDialog>
  );
};
