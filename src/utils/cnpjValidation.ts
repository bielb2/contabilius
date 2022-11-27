/* eslint-disable */
// @ts-nocheck
export function cnpjValidation(cnpj: string): boolean {
  cnpj = cnpj?.replace(/[^\d]+/g, '');

  if (cnpj == '' || cnpj == null) return false;

  if (cnpj.length != 14) return false;

  if (
    cnpj === '00000000000000' ||
    cnpj === '11111111111111' ||
    cnpj === '22222222222222' ||
    cnpj === '33333333333333' ||
    cnpj === '44444444444444' ||
    cnpj === '55555555555555' ||
    cnpj === '66666666666666' ||
    cnpj === '77777777777777' ||
    cnpj === '88888888888888' ||
    cnpj === '99999999999999'
  )
    return false;

  let size = cnpj.length - 2;
  let numbers = cnpj.substring(0, size);
  let digits = cnpj.substring(size);
  let sum = 0;
  let pos = size - 7;
  for (let i = size; i >= 1; i--) {
    sum += numbers.charAt(size - i) * pos--;
    if (pos < 2) pos = 9;
  }
  let resultado = sum % 11 < 2 ? 0 : 11 - (sum % 11);
  if (resultado != digits.charAt(0)) return false;

  size += 1;
  numbers = cnpj.substring(0, size);
  sum = 0;
  pos = size - 7;
  for (let i = size; i >= 1; i--) {
    sum += numbers.charAt(size - i) * pos--;
    if (pos < 2) pos = 9;
  }
  resultado = sum % 11 < 2 ? 0 : 11 - (sum % 11);
  // @ts-ignore
  if (resultado != digits.charAt(1)) return false;

  return true;
}

// Referência: https://www.geradorcnpj.com/javascript-validar-cnpj.html
