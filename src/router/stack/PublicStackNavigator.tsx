import { LoginNavigator, NewPasswordNavigator } from 'src/navigation';

export const PublicStackNavigator = (): JSX.Element => (
  <>
    <LoginNavigator />
    <NewPasswordNavigator />
  </>
);
