import { PRIVATE_ROUTES, PUBLIC_ROUTES } from 'src/constants';

declare global {
  type PublicPaths = ValueOf<typeof PUBLIC_ROUTES>;
  type PrivatePaths = ValueOf<typeof PRIVATE_ROUTES>;
}
