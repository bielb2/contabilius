import { object as YupObject } from 'yup';

import { ValidationRules } from 'src/constants';

export const LoginSchema = YupObject().shape({
  email: ValidationRules.email,
});
