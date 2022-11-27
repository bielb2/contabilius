import { Box } from '@material-ui/core';

type Props = { size: number };

export const Gap = ({ size }: Props): JSX.Element => <Box width={size} height={size} />;
