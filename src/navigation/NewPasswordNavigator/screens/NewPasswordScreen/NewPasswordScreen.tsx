import { Box, Button, Stack, TextField, Typography } from '@material-ui/core';
import { useFormik } from 'formik';
import { observer } from 'mobx-react';

import { DesktopNewPasswordImage } from 'src/assets/images';
import { LogoContabilUsWhite } from 'src/assets/svg';
import { COLORS, NUMBER_SIZES } from 'src/constants';
import { useStores } from 'src/store/useStores';

import { NewPasswordSchema } from './NewPassword.schema';

const CONTAINER_STYLE = {
  backgroundImage: `url(${DesktopNewPasswordImage}) `,
  backgroundSize: '100% 100%',
  backgroundRepeat: 'no-repeat',
  height: '100%',
  width: '100%',
};

const INPUT_STYLE = {
  '& .MuiInputBase-input': {
    color: COLORS.white,
  },
  '& .MuiInputBase-input:active': {
    color: COLORS.white,
  },
  '& MuiInput-root:hover': {
    color: COLORS.white,
  },
  '& .MuiInput-underline:after': {
    borderBottomColor: COLORS.gray800,
    opacity: 0.38,
  },
  '& label.Mui-focused': {
    color: COLORS.white,
  },
  '& label.Mui-error': {
    color: 'yellow',
  },
  '& p.Mui-error': {
    color: 'yellow',
  },
};

export const NewPasswordScreen = observer(() => {
  const store = useStores();

  const formik = useFormik({
    initialValues: {
      password: '',
      passwordConfirmation: '',
    },
    validationSchema: NewPasswordSchema,
    onSubmit: async (val) => {
      const { password, passwordConfirmation } = val;

      const payload: any = {
        password,
        password_confirmation: passwordConfirmation,
        // keepLogin,
      };

      // const res = await toast.promise(store.authStore.register(payload), {
      //   success: 'Cadastro realizado com sucesso, você será redirecionado em instantes.',
      //   error: {
      //     render({ data }) {
      //       console.log('data', data);
      //       return `Hello ${data}`;
      //     },
      //   },
      //   pending: PENDING_REQUEST,
      // });

      // console.log('res', res);
    },
  });

  return (
    <Box sx={CONTAINER_STYLE}>
      <Stack spacing={NUMBER_SIZES.$8} alignItems="center" justifyContent="center" pt={NUMBER_SIZES.$12}>
        <LogoContabilUsWhite />

        <Typography variant="h4" color={COLORS.white} letterSpacing="0.25px">
          Crie uma nova senha
        </Typography>

        <Box width="100%">
          <form onSubmit={formik.handleSubmit}>
            <Box alignItems="center" width="100%" justifyContent="center" display="flex">
              <Stack spacing={NUMBER_SIZES.$3} width="100%" maxWidth="435px">
                <TextField
                  id="password"
                  name="password"
                  label="Senha"
                  type="password"
                  autoComplete="new-password"
                  variant="standard"
                  aria-required
                  InputLabelProps={{
                    sx: {
                      color: COLORS.white,
                    },
                  }}
                  sx={INPUT_STYLE}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={formik.touched.password && !!formik.errors.password}
                  value={formik.values.password}
                  helperText={formik.touched.password && formik.errors.password}
                />

                <TextField
                  id="passwordConfirmation"
                  name="passwordConfirmation"
                  autoComplete="new-password"
                  label="Confirmar senha"
                  type="password"
                  aria-required
                  variant="standard"
                  InputLabelProps={{
                    sx: {
                      color: COLORS.white,
                    },
                  }}
                  sx={INPUT_STYLE}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={formik.touched.passwordConfirmation && !!formik.errors.passwordConfirmation}
                  value={formik.values.passwordConfirmation}
                  helperText={formik.touched.passwordConfirmation && formik.errors.passwordConfirmation}
                />
                <Button
                  type="submit"
                  variant="contained"
                  disabled={formik.isSubmitting}
                  sx={{ width: '50%', alignSelf: 'center' }}
                >
                  Criar nova senha
                </Button>
              </Stack>
            </Box>
          </form>
        </Box>
      </Stack>
    </Box>
  );
});
