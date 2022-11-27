import { observer } from 'mobx-react';

import { useDocumentTitle } from 'src/hooks';

type PageProps = {
  title?: string;
  children: JSX.Element;
};

export const Page = observer(({ title, children }: PageProps): JSX.Element => {
  useDocumentTitle(title);
  return children;
});
