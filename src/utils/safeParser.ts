/* eslint-disable */
export const safeBoolean = (bool: any): boolean => bool === true || bool === 1 || /true/i.test(bool);

export const safeNumber = (number: any): number => (Number.isNaN(Number(number)) ? 0 : Number(number));
