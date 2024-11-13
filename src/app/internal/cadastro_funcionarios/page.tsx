"use client";

import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import MenuIcon from '@mui/icons-material/Menu';
import AddIcon from '@mui/icons-material/Add';
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import LogoutIcon from '@mui/icons-material/Logout';
import { Button, Drawer, FormControl, InputLabel, List, ListItem, ListItemButton, ListItemIcon, ListItemText, MenuItem, Select, Stack, TextField } from '@mui/material';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

export default function CadastroFuncionarios() {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [telefone, setTelefone] = useState('');
  const [numCracha, setNumCracha] = useState('');
  const [funcao, setFuncao] = useState('');

  useEffect(() => {
    if (localStorage.getItem('token') == null) {
      router.push('/');
    }
  }, []);

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
      case 'Sair':
          redirectPage = 'Sair';
          break;
      default:
        redirectPage = '';
    }

    if(redirectPage == 'Sair'){
      localStorage.removeItem('token');
      router.push(`/`);
    }else if (redirectPage != '') {
      router.push(`/${redirectPage}`);
    }

    setOpen(!open);
  };

  const DrawerList = (
    <Box sx={{ width: 250 }} role="presentation">
      <List>
        {['Agendamentos', 'Cadastro de funcionarios', 'Cadastro de especialidades', 'Cadastro de datas', 'Sair'].map((text) => (
          <ListItem key={text} disablePadding onClick={changePage(text)}>
            <ListItemButton>
              <ListItemIcon>
                {text == 'Agendamentos' ? <ArrowRightIcon /> : text == 'Sair' ? <LogoutIcon/> : <AddIcon />}
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  const validaCampos = (): boolean => {
    return nome != null || email != null || telefone != null || numCracha != null;
  }

  const submit = () => {
    router.push('/internal');
  };


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
            Cadastro de funcionarios
          </Typography>
        </Toolbar>
      </AppBar>

      <Drawer open={open} onClose={toggleDrawer(false)}>
        {DrawerList}
      </Drawer>

      <Stack margin={'20px 0 0 0'} spacing={2} alignItems={'center'} marginX={'auto'} maxWidth={300} direction="column">
        <TextField
          required
          id="outlined-required"
          label="Nome"
          className='toolbar-margin width-input'
          value={nome || ""}
          onChange={evento => setNome(evento.target.value)}
        />
        <TextField
          required
          id="outlined-required"
          label="Email"
          className='toolbar-margin  width-input'
          value={email || ""}
          onChange={evento => setEmail(evento.target.value)}
        />
        <TextField
          required
          id="outlined-required"
          label="Telefone"
          className='toolbar-margin width-input'
          value={telefone || ""}
          onChange={evento => setTelefone(evento.target.value)}
        />
        <TextField
          required
          id="outlined-required"
          label="Número de crachá"
          className='toolbar-margin  width-input'
          value={numCracha || ""}
          onChange={evento => setNumCracha(evento.target.value)}
        />

        <FormControl className=' width-input'>
          <InputLabel id="select-label">Tipo de funcionário</InputLabel>
          <Select
            labelId="select-label"
            id="select"
            value={funcao}
            label="Tipo de funcionário"
            onChange={(event) => setFuncao(event.target.value)}
          >
            <MenuItem value={'medico'}>Médico</MenuItem>
            <MenuItem value={'funcionario'}>Funcionário</MenuItem>
          </Select>
        </FormControl>

        <Button color='inherit' disabled={validaCampos()} className='toolbar-margin' variant="contained" onClick={() => submit()}>Salvar</Button>
      </Stack>
    </Box>
  );
}