import Axios from 'axios';

import { isDev } from 'src/utils';

export const apiErrorHandler = (
  error: unknown | Error,
  title = 'Api error',
): { status: HttpErrorStatus; message: string } => {
  if (error instanceof Error) {
    if (isDev()) {
      console.log(`${title}: ${error}`);
    }
  }

  if (Axios.isAxiosError(error)) {
    const status = (error.response?.status ?? 500) as HttpErrorStatus;
    const message = error.response?.data.message ?? 'Internal server error';

    if (error?.response?.data != null) {
      console.log('Error data', JSON.stringify(error.response.data, null, 2));
    }
    return { status, message };
  }
  return { status: 500, message: 'Internal server error' };
};
