"use client";

import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import AddIcon from '@mui/icons-material/Add';
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import { Drawer, List, ListItem, ListItemButton, ListItemIcon, ListItemText } from '@mui/material';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Search, SearchIconWrapper, StyledInputBase } from '@/app/components/toolbar_elements';

export default function CadastroDatas() {
  const router = useRouter();
  const [open, setOpen] = useState(false);

  const toggleDrawer = (newOpen: boolean) => () => {
    setOpen(newOpen);
  };

  const changePage = (page: string) => () => {
    let redirectPage: string;
    switch (page) {
      case 'Cadastro de funcionarios':
        redirectPage = 'internal/cadastro_funcionarios';
        break;
      case 'Cadastro de especialidades':
        redirectPage = 'internal/cadastro_especialidades';
        break;
      case 'Cadastro de datas':
        redirectPage = 'internal/cadastro_datas';
        break;
      case 'Agendamentos':
        redirectPage = 'internal';
        break;
      default:
        redirectPage = '';
    }

    if (redirectPage != '') {
      router.push(`/${redirectPage}`);
    }

    setOpen(!open);
  };

  const DrawerList = (
    <Box sx={{ width: 250 }} role="presentation">
      <List>
        {['Agendamentos', 'Cadastro de funcionarios', 'Cadastro de especialidades', 'Cadastro de datas'].map((text) => (
          <ListItem key={text} disablePadding onClick={changePage(text)}>
            <ListItemButton>
              <ListItemIcon>
                {text == 'Agendamentos' ? <ArrowRightIcon /> : <AddIcon />}
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" color='inherit'>
        <Toolbar className='toolbar-margin'>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="open drawer"
            sx={{ mr: 2 }}
            onClick={toggleDrawer(true)}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' } }}
          >
            Cadastro de datas
          </Typography>
          <Search>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
              placeholder="Search…"
              inputProps={{ 'aria-label': 'search' }}
            />
          </Search>
        </Toolbar>
      </AppBar>

      <Drawer open={open} onClose={toggleDrawer(false)}>
        {DrawerList}
      </Drawer>
    </Box>
  );
}