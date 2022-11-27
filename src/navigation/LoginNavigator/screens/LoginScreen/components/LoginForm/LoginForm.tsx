import {
  Box,
  Button,
  Typography,
  TextField,
  FormGroup,
  FormControlLabel,
  Checkbox,
  InputAdornment,
  IconButton,
  Stack,
} from '@material-ui/core';
import { Visibility, VisibilityOff } from '@material-ui/icons';
import { useFormik } from 'formik';
import { observer } from 'mobx-react';
import { toast } from 'react-toastify';
import { useToggle } from 'react-use';

import { Gap } from 'src/components';
import { COLORS, NUMBER_SIZES, PENDING_REQUEST, theme } from 'src/constants';
import { LoginPayload } from 'src/services/api/auth';
import { useStores } from 'src/store';
import { toastDataError } from 'src/utils';

import { LoginSchema } from './LoginForm.schema';

type Props = {
  toggleModal: () => void;
};

export const LoginForm = observer(({ toggleModal }: Props): JSX.Element => {
  const store = useStores();
  const [showPassword, togglePasswordVisibility] = useToggle(false);

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
      keepLogin: false,
    },
    onSubmit: async (val) => {
      const { email, password, keepLogin } = val;

      const payload: LoginPayload = {
        email,
        password,
        keepLogin,
      };

      await toast.promise(store.authStore.login(payload), {
        pending: PENDING_REQUEST,
        error: {
          render: toastDataError,
        },
      });

      toast.dismiss();
    },
    validationSchema: LoginSchema,
  });

  return (
    <Box marginX={NUMBER_SIZES.$2} marginTop={NUMBER_SIZES.$2}>
      <form onSubmit={formik.handleSubmit}>
        <Stack width="100%" spacing={3}>
          <TextField
            id="email"
            name="email"
            label="E-mail de acesso"
            variant="standard"
            aria-required
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.email && !!formik.errors.email}
            value={formik.values.email}
            helperText={formik.touched.email && formik.errors.email}
          />

          <TextField
            id="password"
            name="password"
            label="Senha de acesso"
            variant="standard"
            type={showPassword ? 'text' : 'password'}
            onChange={formik.handleChange}
            value={formik.values.password}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton aria-label="toggle password visibility" onClick={togglePasswordVisibility} edge="end">
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
        </Stack>

        <Gap size={NUMBER_SIZES.$32} />

        <Button type="submit" size="large" variant="contained" sx={{ width: '100%' }} disabled={formik.isSubmitting}>
          Login
        </Button>

        <Gap size={NUMBER_SIZES.$40} />

        <Box display="flex" flexDirection="row" justifyContent="space-between" alignItems="center">
          <FormGroup>
            <FormControlLabel
              control={
                <Checkbox
                  id="keepLogin"
                  name="keepLogin"
                  value={formik.values.keepLogin}
                  aria-checked={formik.values.keepLogin}
                  onChange={formik.handleChange}
                  sx={{
                    [theme.breakpoints.down('md')]: {
                      color: COLORS.gray800,
                    },
                  }}
                />
              }
              label={
                <Typography
                  variant="subtitle2"
                  color="rgb(51, 51, 51, .7)"
                  sx={{
                    [theme.breakpoints.down('md')]: {
                      color: COLORS.gray800,
                    },
                  }}
                >
                  Manter conectado
                </Typography>
              }
              color="gray"
            />
          </FormGroup>
          <Button
            variant="text"
            onClick={toggleModal}
            sx={{
              textDecoration: 'underline',
              color: COLORS.blackHighEmphasis,
              [theme.breakpoints.down('md')]: {
                color: COLORS.gray800,
              },
            }}
          >
            Esqueci a senha
          </Button>
        </Box>
      </form>
    </Box>
  );
});
