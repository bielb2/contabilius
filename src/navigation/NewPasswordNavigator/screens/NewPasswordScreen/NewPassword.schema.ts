import { object as YupObject } from 'yup';

import { ValidationRules } from 'src/constants';

export const NewPasswordSchema = YupObject().shape({
  password: ValidationRules.password,
  passwordConfirmation: ValidationRules.confirmPassword,
});
