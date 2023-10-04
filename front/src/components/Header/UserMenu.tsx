import React, { useState } from 'react';
import { Avatar, Button, Grid, Menu, MenuItem } from '@mui/material';
import { IUser } from '../../types';
import { Link, Link as NavLink } from 'react-router-dom';
import { useAppDispatch } from '../../app/hook';
import { logout } from '../../store/usersThunk';

interface Props {
  user: IUser;
}

const UserMenu: React.FC<Props> = ({ user }) => {
  const dispatch = useAppDispatch();
  const handleLogout = () => dispatch(logout());

  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <Grid container>
      <Button component={NavLink} to="/track_history" color="inherit">
        Track History
      </Button>

      <Button onClick={handleClick} color="inherit">
        Hello, {user.displayName}
        <Avatar
          sx={{ ml: 1 }}
          alt={user.displayName}
          src={user.avatar ? user.avatar : '/static/images/avatar/1.jpg'}
        />
      </Button>
      <Menu anchorEl={anchorEl} keepMounted open={Boolean(anchorEl)} onClose={handleClose}>
        <MenuItem>Profile</MenuItem>
        <MenuItem>My account</MenuItem>
        <MenuItem component={Link} to="/new-artist" onClick={handleClose}>
          Add artist
        </MenuItem>
        <MenuItem component={Link} to="/new-album" onClick={handleClose}>
          Add album
        </MenuItem>
        <MenuItem component={Link} to="/new-track" onClick={handleClose}>
          Add track
        </MenuItem>
        <MenuItem onClick={handleLogout}>Logout</MenuItem>
      </Menu>
    </Grid>
  );
};

export default UserMenu;
