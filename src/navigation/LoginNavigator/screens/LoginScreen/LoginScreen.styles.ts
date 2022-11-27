import { makeStyles } from '@material-ui/styles';

import { DesktopLoginImage, MobileLoginImage } from 'src/assets/images';
import { NUMBER_SIZES, theme, THEME } from 'src/constants';

export const useStyles = makeStyles(() => ({
  paperContainer: {
    [theme.breakpoints.down('md')]: {
      backgroundImage: `url(${MobileLoginImage})`,
      backgroundSize: '100% 100%',
    },
    backgroundImage: `url(${DesktopLoginImage})`,
    backgroundSize: '70% 100%',
    backgroundRepeat: 'no-repeat',
    height: '100%',
    width: '100%',
  },
  active: {
    borderBottom: `2px solid ${THEME.palette.secondary.main}`,
    paddingRight: NUMBER_SIZES.$12,
  },
  disabled: {
    borderBottom: `2px solid ${THEME.palette.disabled.main}`,
    paddingRight: NUMBER_SIZES.$12,
    color: THEME.palette.disabled.main,
  },
}));
