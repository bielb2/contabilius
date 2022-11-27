import { object as YupObject } from 'yup';

import { ValidationRules } from 'src/constants';

export const RegisterSchema = YupObject().shape({
  companyName: ValidationRules.requiredString,
  cnpj: ValidationRules.cnpj,
  email: ValidationRules.email,
  password: ValidationRules.password,
  passwordConfirmation: ValidationRules.confirmPassword,
});
