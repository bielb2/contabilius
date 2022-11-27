import { useState } from 'react';

import {
  Box,
  Button,
  Checkbox,
  FormControl,
  FormControlLabel,
  FormGroup,
  IconButton,
  InputAdornment,
  Stack,
  TextField,
  TextFieldProps,
  Typography,
} from '@material-ui/core';
import { Visibility, VisibilityOff } from '@material-ui/icons';
import { useFormik } from 'formik';
import { observer } from 'mobx-react';
import InputMask from 'react-input-mask';
import { toast } from 'react-toastify';
import { useToggle } from 'react-use';

import { Gap } from 'src/components';
import { COLORS, NUMBER_SIZES, PENDING_REQUEST, PIXEL_SIZES } from 'src/constants';
import { RegisterPayload } from 'src/services/api/auth';
import { useStores } from 'src/store';
import { toastDataError } from 'src/utils';

import { RegisterSchema } from './RegisterForm.schema';
import { Dot } from './RegisterForm.styles';

const CustomFieldView = (props: TextFieldProps) => (
  <TextField
    InputProps={{
      disableUnderline: true,
    }}
    {...props}
    variant="standard"
    disabled
    sx={{ marginBottom: NUMBER_SIZES.$1 }}
    InputLabelProps={{
      sx: { fontSize: 16, color: COLORS.disabledLabel },
      disabled: false,
    }}
  />
);

const STEPS = {
  STEP_1: 'register',
  STEP_2: 'confirm_data',
} as const;

type Steps = ValueOf<typeof STEPS>;

export const RegisterForm = observer((): JSX.Element => {
  const store = useStores();

  const [step, setStep] = useState<Steps>(STEPS.STEP_1);
  const [showPassword, togglePasswordVisibility] = useToggle(false);

  const formik = useFormik({
    initialValues: {
      companyName: '',
      cnpj: '',
      email: '',
      password: '',
      passwordConfirmation: '',
      keepLogin: false,
    },
    validationSchema: RegisterSchema,
    onSubmit: async (val) => {
      if (step === STEPS.STEP_1) {
        setStep(STEPS.STEP_2);
        return;
      }

      const { companyName, cnpj, email, password, passwordConfirmation, keepLogin } = val;

      const payload: RegisterPayload = {
        name: companyName,
        // cnpj,
        email,
        password,
        password_confirmation: passwordConfirmation,
        keepLogin,
      };

      await toast.promise(store.authStore.register(payload), {
        success: 'Cadastro realizado com sucesso, você será redirecionado em instantes.',
        error: {
          render: toastDataError,
        },
        pending: PENDING_REQUEST,
      });
    },
  });

  return (
    <Box marginX={NUMBER_SIZES.$2}>
      <Box display="flex" width="100%" flexDirection="row" justifyContent="center">
        <Dot isActive />

        <Gap size={NUMBER_SIZES.$16} />

        <Dot isActive={step === STEPS.STEP_2} />
      </Box>

      <Gap size={NUMBER_SIZES.$16} />
      <Box width="100%" display={step === STEPS.STEP_1 ? 'block' : ' none'}>
        <form onSubmit={formik.handleSubmit}>
          <Stack width="100%" spacing={3}>
            <TextField
              variant="standard"
              id="companyName"
              name="companyName"
              label="Razão Social"
              aria-required
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.companyName}
              error={formik.touched.companyName && !!formik.errors.companyName}
              helperText={formik.touched.companyName && formik.errors.companyName}
            />

            <InputMask
              mask="99.999.999/9999-99"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.cnpj}
            >
              {() => (
                <TextField
                  variant="standard"
                  id="cnpj"
                  name="cnpj"
                  label="CNPJ"
                  aria-required
                  error={formik.touched.cnpj && !!formik.errors.cnpj}
                  helperText={formik.touched.cnpj && formik.errors.cnpj}
                />
              )}
            </InputMask>

            <TextField
              variant="standard"
              id="email"
              name="email"
              label="E-mail"
              autoComplete="email"
              aria-required
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.email && !!formik.errors.email}
              value={formik.values.email}
              helperText={formik.touched.email && formik.errors.email}
            />

            <TextField
              variant="standard"
              id="password"
              name="password"
              label="Senha"
              type="password"
              autoComplete="new-password"
              aria-required
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.password && !!formik.errors.password}
              value={formik.values.password}
              helperText={formik.touched.password && formik.errors.password}
            />

            <TextField
              variant="standard"
              id="passwordConfirmation"
              name="passwordConfirmation"
              autoComplete="new-password"
              label="Confirmar senha"
              type="password"
              aria-required
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.passwordConfirmation && !!formik.errors.passwordConfirmation}
              value={formik.values.passwordConfirmation}
              helperText={formik.touched.passwordConfirmation && formik.errors.passwordConfirmation}
            />
            <Box width="100%" display="flex" justifyContent="center">
              <Button type="submit" variant="contained" size="large" sx={{ width: '80%' }}>
                Continuar
              </Button>
            </Box>
          </Stack>
        </form>
      </Box>
      {step === STEPS.STEP_2 && (
        <form onSubmit={formik.handleSubmit}>
          <Box
            width="420px"
            ml={`-${PIXEL_SIZES.$48}`}
            sx={{
              [`@media screen and (max-width: 1376px)`]: {
                marginLeft: 0,
                width: '100%',
              },
            }}
          >
            <Box
              border={`1px solid ${COLORS.gray100}`}
              boxShadow="inset 0px 4px 4px rgba(0, 0, 0, 0.1);"
              borderRadius={NUMBER_SIZES.$2}
            >
              <Box
                bgcolor={COLORS.gray200}
                boxShadow="inset 0px 4px 4px rgba(0, 0, 0, 0.1);"
                borderRadius={NUMBER_SIZES.$2}
                py={PIXEL_SIZES.$12}
                px={PIXEL_SIZES.$16}
              >
                <Typography fontSize="16px" letterSpacing="0.15px" variant="subtitle1" color={COLORS.secondary}>
                  Confirme os dados
                </Typography>
              </Box>
              <FormControl sx={{ width: '100%', pt: NUMBER_SIZES.$3, px: NUMBER_SIZES.$2 }}>
                {/* fazer o custom field */}
                <CustomFieldView label="Razão social" defaultValue={formik.values.companyName} />
                <CustomFieldView label="CNPJ" defaultValue={formik.values.cnpj} />
                <CustomFieldView label="E-mail" defaultValue={formik.values.email} autoComplete="email" />
                <CustomFieldView
                  label="Senha"
                  type={showPassword ? 'text' : 'password'}
                  defaultValue={formik.values.password}
                  variant="standard"
                  autoComplete="new-password"
                  InputProps={{
                    disableUnderline: true,
                    endAdornment: (
                      <InputAdornment position="start">
                        <IconButton
                          aria-label="toggle password visibility"
                          edge="start"
                          onClick={togglePasswordVisibility}
                        >
                          {showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />
              </FormControl>
            </Box>
            <FormGroup>
              <FormControlLabel
                control={
                  <Checkbox
                    id="keepLogin"
                    name="keepLogin"
                    value={formik.values.keepLogin}
                    aria-checked={formik.values.keepLogin}
                    onChange={formik.handleChange}
                  />
                }
                label={
                  <Typography variant="subtitle2" component="small" color="rgb(51, 51, 51, .7)">
                    Manter conectado
                  </Typography>
                }
                color="gray"
              />
            </FormGroup>

            <Box width="100%" display="flex" justifyContent="center" mt={PIXEL_SIZES.$32}>
              <Button variant="contained" onClick={() => setStep(STEPS.STEP_1)} disabled={formik.isSubmitting}>
                Voltar
              </Button>

              <Gap size={NUMBER_SIZES.$16} />

              <Button type="submit" variant="contained" disabled={formik.isSubmitting}>
                Finalizar cadastro
              </Button>
            </Box>
          </Box>
        </form>
      )}
    </Box>
  );
});
