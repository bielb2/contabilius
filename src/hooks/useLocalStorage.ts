import { CONTABILUS_PREFIX } from 'src/constants/storageKeys';

export const useLocalStorage = <T>(key = ''): [T | undefined, React.Dispatch<React.SetStateAction<any>>] => {
  const state: T | undefined = JSON.parse(localStorage.getItem(`${CONTABILUS_PREFIX}@${key}`)!) || undefined;

  const setState = (newState: any) => {
    localStorage.setItem(`${CONTABILUS_PREFIX}@${key}`, JSON.stringify(newState));
  };

  return [state, setState];
};
