import * as React from 'react';
import {
  AppBar,
  Box,
  Button,
  Card,
  CardActions,
  CardActionArea,
  CardMedia,
  CardContent,
  Typography,
  Stack,
  Divider,
  Modal,
  Container,
} from "@mui/material";
import Toolbar from '@mui/material/Toolbar';
import { UserButton } from "@clerk/nextjs";
import { useRouter } from 'next/router'


const pages = ['Products', 'Pricing', 'Blog'];
const settings = ['Profile', 'Account', 'Dashboard', 'Logout'];

function ResponsiveAppBar() {
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const router = useRouter();

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
        <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
          <Typography
            variant="h6"
            noWrap
            component="a"
            onClick={()=>{router.push('/');}}
            sx={{
              mr: 2,
              display: { xs: 'none', md: 'flex' },
              fontFamily: '',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
              cursor: 'pointer',
            }}
          >
            QUICKFIT
          </Typography>
        </Box>

        <Stack alignItems="center"
          justifyContent="center" sx={{ml:"20vw", width:"100vw", display: { xs: 'flex', md: 'none' } }}>
          <Typography
            variant="h5"
            noWrap
            component="a"
            onClick={()=>{router.push('/');}}
            sx={{
              cursor: 'pointer',
              mr: 2,
              display: { xs: 'flex', md: 'none' },
              flexGrow: 1,
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            QUICKFIT
          </Typography>
        </Stack>

          <Box sx={{ flexGrow: 0 }}>
            <UserButton/>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default ResponsiveAppBar;
