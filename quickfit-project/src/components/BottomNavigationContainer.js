import * as React from 'react';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import RestoreIcon from '@mui/icons-material/Restore';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ArchiveIcon from '@mui/icons-material/Archive';
import CottageRoundedIcon from '@mui/icons-material/CottageRounded';
import EditCalendarIcon from '@mui/icons-material/EditCalendar';
import AddRoundedIcon from '@mui/icons-material/AddRounded';
import CheckroomRoundedIcon from '@mui/icons-material/CheckroomRounded';
import Paper from '@mui/material/Paper';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemText from '@mui/material/ListItemText';
import Avatar from '@mui/material/Avatar';
import Link from 'next/link';

export default function BottomNavigationContainer() {
  const [value, setValue] = React.useState(0);

  return (
    <Box sx={{ pb: 7 }}>
      <CssBaseline />
      <Paper sx={{ position: 'fixed', bottom: 0, left: 0, right: 0 }} elevation={3}>
        <BottomNavigation
          showLabels
          value={value}
          onChange={(event, newValue) => {
            setValue(newValue);
          }}
        >
          <Link href="/">
            <BottomNavigationAction label="Home" icon={<CottageRoundedIcon />} />
          </Link>
          <BottomNavigationAction label="Calendar" icon={<EditCalendarIcon />} />
          <BottomNavigationAction label="Add clothes" icon={<AddRoundedIcon />} />
          <BottomNavigationAction label="Wardrobe" icon={<CheckroomRoundedIcon />} />
        </BottomNavigation>
      </Paper>
    </Box>
  );
}
