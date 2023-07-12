import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';


function NavBar() {


  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <IconButton color="inherit" aria-label="logo" sx={{marginLeft:'30px'}}>
            <img src="../LogoMain.png" alt="Logo" style={{ height: '160px' }} />
         </IconButton>
          
          <Button variant="contained" color='error'>Log Out</Button>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default NavBar