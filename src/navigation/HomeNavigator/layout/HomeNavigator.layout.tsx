/* eslint-disable jsx-a11y/no-static-element-interactions */

import { useState } from 'react';

import {
  AppBar,
  Avatar,
  Badge,
  Box,
  Button,
  Divider,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemText,
  Menu,
  MenuItem,
  Toolbar,
  Typography,
} from '@material-ui/core';
import { KeyboardArrowDown, Notifications } from '@material-ui/icons';
import { observer } from 'mobx-react';
import { useToggle } from 'react-use';

import { Gap } from 'src/components';
import { CustomBackDrop } from 'src/components/CustomBackDrop/CustomBackDrop';
import { COLORS } from 'src/constants';
import { useStores } from 'src/store';
import { delay } from 'src/utils';

const APP_BAR_HEIGHT = 64;

const DRAWER_ITEMS = [
  {
    name: 'Configurações',
    key: 'CONFIGURACOES',
  },
  {
    name: 'Suporte',
    key: 'SUPORTE',
  },
  {
    name: 'Logout',
    key: 'LOGOUT',
  },
] as const;

type DrawerActionType = typeof DRAWER_ITEMS[number]['key'];

export const HomeLayout = observer(() => {
  const store = useStores();

  const [anchorEl, setAnchorEl] = useState<null | Element>(null);
  const [drawerIsOpen, toggleDrawer] = useToggle(false);
  const [backDropIsOpen, toggleBackDrop] = useToggle(false);

  const handleToggleMenu = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>): void => {
    setAnchorEl(e.currentTarget);
  };

  const handleCloseMenu = () => {
    setAnchorEl(null);
  };

  const logout = async () => {
    try {
      toggleBackDrop(true);
      await delay(1500);
      await store.authStore.invalidateSession();
    } finally {
      toggleBackDrop(false);
    }
  };

  const handleDrawerAction = async (action: DrawerActionType) => {
    switch (action) {
      case 'CONFIGURACOES':
        break;
      case 'SUPORTE':
        break;
      case 'LOGOUT':
        logout();
        break;
      default:
        break;
    }
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <CustomBackDrop isOpen={backDropIsOpen} message="Invalidando sessão..." />

      <AppBar position="static" color="default" sx={{ height: APP_BAR_HEIGHT }}>
        <Toolbar>
          <Box justifyContent="space-between" alignItems="center" display="flex" flexGrow={1}>
            {/* eslint-disable-next-line jsx-a11y/click-events-have-key-events */}
            <div onClick={toggleDrawer}>Logo</div>

            <Box justifyContent="center" display="flex" alignItems="center">
              <IconButton size="large">
                <Badge badgeContent={10} title="Notificações" color="error" aria-label="show 10 new notifications">
                  <Notifications color="action" />
                </Badge>
              </IconButton>

              <Gap size={8} />

              <Button title="Configurações de conta" onClick={handleToggleMenu}>
                <Avatar src={store.authStore._user.profile_photo_url} sx={{ width: 32, height: 32, mr: 1 }} />

                <Typography variant="subtitle2" color={COLORS.gray800} fontWeight="400">
                  {store.authStore._user.name}
                </Typography>

                <KeyboardArrowDown />
              </Button>
            </Box>

            <Menu
              id="basic-menu"
              open={!!anchorEl}
              anchorEl={anchorEl}
              onClose={handleCloseMenu}
              MenuListProps={{
                'aria-labelledby': 'basic-button',
              }}
              sx={{ width: '100%' }}
              anchorOrigin={{ horizontal: 25, vertical: 'bottom' }}
            >
              <MenuItem onClick={handleCloseMenu}>Meu perfil</MenuItem>

              <MenuItem onClick={handleCloseMenu}>Minha empresa</MenuItem>

              <MenuItem onClick={handleCloseMenu}>Configurações</MenuItem>
            </Menu>
          </Box>
        </Toolbar>
      </AppBar>
      <Drawer
        variant="permanent"
        open={drawerIsOpen}
        onClose={toggleDrawer}
        sx={{
          '& .MuiDrawer-paper': {
            top: APP_BAR_HEIGHT,
            pb: APP_BAR_HEIGHT,
          },
        }}
      >
        <List>
          {['Inbox', 'Starred', 'Send email', 'Drafts'].map((text, index) => (
            <ListItem button key={text}>
              {/* <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon> */}
              <ListItemText primary={text}>aaa</ListItemText>
            </ListItem>
          ))}
        </List>
        <Divider />
        <List>
          {DRAWER_ITEMS.map((item, index) => (
            <ListItem button key={item.key} onClick={() => handleDrawerAction(item.key)}>
              {/* <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon> */}
              <ListItemText primary={item.name}>asdd</ListItemText>
            </ListItem>
          ))}
        </List>
      </Drawer>
    </Box>
  );
});
