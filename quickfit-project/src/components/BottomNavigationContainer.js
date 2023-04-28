import * as React from "react";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import RestoreIcon from "@mui/icons-material/Restore";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ArchiveIcon from "@mui/icons-material/Archive";
import CottageRoundedIcon from "@mui/icons-material/CottageRounded";
import EditCalendarIcon from "@mui/icons-material/EditCalendar";
import AddRoundedIcon from "@mui/icons-material/AddRounded";
import CheckroomRoundedIcon from "@mui/icons-material/CheckroomRounded";
import Paper from "@mui/material/Paper";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import ListItemText from "@mui/material/ListItemText";
import Avatar from "@mui/material/Avatar";
import Link from "next/link";
import { useRouter } from "next/router";

export default function BottomNavigationContainer() {
  const router = useRouter();
  const value = router.pathname.slice(1);

  return (
    <Box sx={{ pb: 7 }}>
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
            icon={<CottageRoundedIcon />}
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
