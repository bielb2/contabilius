import { useEffect } from 'react';

import { CONTABILUS_TITLE } from 'src/constants';

export const useDocumentTitle = (title = ''): void =>
  useEffect(() => {
    if (typeof title === 'string' && title) document.title = `${CONTABILUS_TITLE} | ${title}`;
    else document.title = CONTABILUS_TITLE;
  }, []);
