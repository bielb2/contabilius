/* eslint-disable no-plusplus */
export function isCPF(cpf: string): boolean {
  if (!cpf) {
    return true;
  }

  let clearCpf = '';
  if (cpf) {
    clearCpf = cpf.replace(/[^\d]/g, '');
  } else {
    return false;
  }

  let sum = 0;
  let rest;

  if (
    clearCpf.length !== 11 ||
    clearCpf === '00000000000' ||
    clearCpf === '11111111111' ||
    clearCpf === '22222222222' ||
    clearCpf === '33333333333' ||
    clearCpf === '44444444444' ||
    clearCpf === '55555555555' ||
    clearCpf === '66666666666' ||
    clearCpf === '77777777777' ||
    clearCpf === '88888888888' ||
    clearCpf === '99999999999'
  ) {
    return false;
  }

  for (let i = 1; i <= 9; i++) {
    sum += parseInt(clearCpf.substring(i - 1, i), 10) * (11 - i);
  }

  rest = (sum * 10) % 11;

  if (rest === 10 || rest === 11) {
    rest = 0;
  }

  if (rest !== parseInt(clearCpf.substring(9, 10), 10)) {
    return false;
  }

  sum = 0;

  for (let i = 1; i <= 10; i++) {
    sum += parseInt(clearCpf.substring(i - 1, i), 10) * (12 - i);
  }

  rest = (sum * 10) % 11;

  if (rest === 10 || rest === 11) {
    rest = 0;
  }

  if (rest !== parseInt(clearCpf.substring(10, 11), 10)) {
    return false;
  }

  return true;
}
