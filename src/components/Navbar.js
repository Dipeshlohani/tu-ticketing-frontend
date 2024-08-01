// Navbar.tsx
'use client';
import React, { useState } from 'react';
import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  InputBase,
  Menu,
  MenuItem,
  Avatar,
  Grid,
} from '@mui/material';
import {
  Menu as MenuIcon,
  Search as SearchIcon,
  Settings as SettingsIcon,
  ExitToApp as LogOutIcon,
} from '@mui/icons-material';
import { useAuth } from '@/context/AuthContext';

const Navbar = ({ onMenuClick }) => {
  const { logout } = useAuth();
  const [openMenu, setOpenMenu] = useState(null);

  const handleMenuOpen = (event) => {
    setOpenMenu(event.currentTarget);
  };

  const handleMenuClose = () => {
    setOpenMenu(null);
  };

  return (
    // <AppBar position="static" sx={{ backgroundColor: 'white', color: 'black' }}>
    <Toolbar>
      <IconButton
        edge="start"
        color="inherit"
        aria-label="menu"
        onClick={onMenuClick}
      >
        <MenuIcon />
      </IconButton>
      <Typography variant="h6" sx={{ flexGrow: 1 }}></Typography>
      <Grid container alignItems="center">
        <InputBase
          placeholder="Search tickets..."
          inputProps={{ 'aria-label': 'search' }}
          sx={{
            marginLeft: 1,
            flex: 1,
            border: '1px solid #d3d3d3',
            borderRadius: 2,
            p: 1,
            m: 1,
          }}
        />
        <IconButton color="inherit">
          <SearchIcon />
        </IconButton>
        <IconButton color="inherit" onClick={handleMenuOpen}>
          <Avatar alt="Avatar" />
        </IconButton>
        <Menu
          anchorEl={openMenu}
          open={Boolean(openMenu)}
          onClose={handleMenuClose}
        >
          <MenuItem onClick={handleMenuClose}>
            <SettingsIcon />
            Profile
          </MenuItem>
          <MenuItem onClick={handleMenuClose}>
            <SettingsIcon />
            Settings
          </MenuItem>
          <MenuItem onClick={logout}>
            <LogOutIcon />
            Logout
          </MenuItem>
        </Menu>
      </Grid>
    </Toolbar>
    // </AppBar>
  );
};

export default Navbar;
