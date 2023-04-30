import * as React from 'react';
import { useRouter } from 'next/router'
// MUI Imports
import { 
  Box, 
  BottomNavigation, 
  BottomNavigationAction, 
  CssBaseline,
  Paper,
} from '@mui/material'
// MUI Icons
import HomeRoundedIcon from '@mui/icons-material/HomeRounded';
import EditCalendarIcon from '@mui/icons-material/EditCalendar';
import AddRoundedIcon from '@mui/icons-material/AddRounded';
import CheckroomRoundedIcon from '@mui/icons-material/CheckroomRounded';

export default function BottomNavigationContainer() {
  const router = useRouter();
  const value = router.pathname.slice(1);

  return (
    <Box sx={{ pb: 10 }}>
      <CssBaseline />
      <Paper
        sx={{ position: "fixed", bottom: 0, left: 0, right: 0 }}
        elevation={3}
      >
        <BottomNavigation
          showLabels
          value={value}
          onChange={(event, newValue) => {
            router.push("/" + newValue);
          }}
        >
          <BottomNavigationAction
            label="Home"
            value=""
            icon={<HomeRoundedIcon />}
          />
          <BottomNavigationAction
            label="Add clothes"
            value="addclothes"
            icon={<AddRoundedIcon />}
          />
          <BottomNavigationAction
            label="Wardrobe"
            value="wardrobe"
            icon={<CheckroomRoundedIcon />}
          />
        </BottomNavigation>
      </Paper>
    </Box>
  );
}
