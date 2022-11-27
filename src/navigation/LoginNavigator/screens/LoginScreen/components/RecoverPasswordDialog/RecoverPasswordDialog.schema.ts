import { object as YupObject } from 'yup';

import { ValidationRules } from 'src/constants';

export const RecoverPasswordSchema = YupObject().shape({
  email: ValidationRules.email,
});
