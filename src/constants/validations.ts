import * as Yup from 'yup';

import { cnpjValidation, isCPF } from 'src/utils';

const ValidationMessages = {
  required: '* Campo obrigatório',
  email: '* E-mail inválido',
  min: ({ min }: { min: number }): string => `* Mínimo de ${min} caracteres `,
  passwordConfirm: '* Senhas não coincidem',
  cpf: '* CPF Inválido',
  birthdate: '* Formato de data: dia/mês/ano',
  phone: '* Formato de celular inválido',
  zipCode: '* Insira um CEP válido',
  time: '* Formato de horário inválido',
  url: '* Url inválida. Ex.: https://meet.google.com/abc-def-ghi',
  cnpj: '* CNPJ Inválido',
  password: '* É necessário preencher a senha',
  rg: '* RG Inválido',
  price: '* O valor digitado deve ser numérico com 2 dígitos decimais',
};

const ValidationRules = {
  requiredString: Yup.string().required(ValidationMessages.required),

  nullableString: Yup.string().nullable(),

  nullableEmail: Yup.string().email(ValidationMessages.email).nullable(),

  nullableCPF: Yup.string()
    .test('is-cpf', ValidationMessages.cpf, (value) => isCPF(value as string))
    .nullable(),

  nullablePhone: Yup.string()
    .matches(/^([(][1-9]{2}[)] )([0-9.])?([0-9]{4})[-]([0-9]{4})$/, ValidationMessages.phone)
    .nullable(),

  numberRequired: Yup.number().required(ValidationMessages.required),

  name: Yup.string()
    .required(ValidationMessages.required)
    .matches(/^[a-zà-ú\s0-9]+$/i, '*Não são permitidos caracteres especiais ou números.'),

  password: Yup.string().min(8, ValidationMessages.min).required(ValidationMessages.required),

  confirmPassword: Yup.string()
    .oneOf([Yup.ref('password'), null], ValidationMessages.passwordConfirm)
    .required(ValidationMessages.required),

  cpf: Yup.string()
    .test('is-cpf', ValidationMessages.cpf, (value = '') => isCPF(value))
    .required(ValidationMessages.required),

  birthdate: Yup.string()
    // Basic regex for birthdates
    .matches(/[0-3]?[0-9]\/[0-1]?[0-9]\/(19|20)?[0-9]{2}$/, ValidationMessages.birthdate)
    .required(ValidationMessages.required),

  rg: Yup.string()
    .nullable()
    .matches(/^[0-9.-]+$/, ValidationMessages.rg),

  phone: Yup.string()
    .matches(/^([(][1-9]{2}[)] )([0-9.])?([0-9]{4})[-]([0-9]{4})$/, ValidationMessages.phone)
    .required(ValidationMessages.required),

  zipCode: Yup.string()
    .matches(/\d{2}\.\d{3}-\d{3}/, ValidationMessages.zipCode)
    .required(ValidationMessages.required),

  email: Yup.string().email(ValidationMessages.email).required(ValidationMessages.required),

  time: Yup.string()
    .matches(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/, ValidationMessages.time)
    .required(ValidationMessages.required),

  url: Yup.string()
    .matches(
      // eslint-disable-next-line no-useless-escape
      /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/,
      ValidationMessages.url,
    )
    .required(ValidationMessages.required),

  cnpj: Yup.string()
    .required(ValidationMessages.required)
    .test('is-cnpj', ValidationMessages.cnpj, (value) => cnpjValidation(value as string)),
};

export { ValidationMessages, ValidationRules };
