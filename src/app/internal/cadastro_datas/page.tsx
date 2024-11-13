"use client";

import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import MenuIcon from '@mui/icons-material/Menu';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import LogoutIcon from '@mui/icons-material/Logout';
import { Button, Drawer, FormControl, InputLabel, List, ListItem, ListItemButton, ListItemIcon, ListItemText, MenuItem, Select, Stack, styled, Tooltip } from '@mui/material';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { Dayjs } from 'dayjs';
import 'dayjs/locale/pt-br';

export default function CadastroDatas() {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [especialidade, setEspecialidade] = useState('');
  const [medico, setMedico] = useState('');
  const [horario, setHorario] = useState('');
  const [data, setData] = useState<Dayjs | null>(null);

  const [dataEscolhidas, setDataEscolhidas] = useState<string[]>([]);

  const especialidades = ['Oftalmologia', 'Psicologia', 'Nutrição'];

  const medicos = [
    { medico: 'Dr. David', especialidade: 'Oftalmologia' },
    { medico: 'Dr. Carlos', especialidade: 'Psicologia' },
    { medico: 'Dr. Andre', especialidade: 'Nutrição' }
  ];

  const horarios = ['10:00', '10:30', '11:00'];

  useEffect(() => {
    if (localStorage.getItem('token') == null) {
      router.push('/');
    }
  }, []);

  useEffect(() => {
    if (data != null && horario != '' && medico != '' && especialidade != '') {
      setDataEscolhidas([...dataEscolhidas, especialidade + " - " + medico + " - " + data.format('DD / MM / YYYY') + " - " + horario]);
      setEspecialidade('');
      setMedico('');
      setHorario('');
      setData(null);
    }
  }, [horario, data, medico, especialidade]);

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
    return dataEscolhidas.length <= 0;
  }

  const submit = () => {
    router.push('/internal');
  };

  const Demo = styled('div')(({ theme }) => ({
    backgroundColor: theme.palette.background.paper,
  }));

  function removeDate(key: number) {
    setDataEscolhidas(dataEscolhidas.filter((dt, index) => index != key));
  }

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
        </Toolbar>
      </AppBar>

      <Drawer open={open} onClose={toggleDrawer(false)}>
        {DrawerList}
      </Drawer>

      <Stack margin={'20px 0 0 0'} spacing={2} alignItems={'center'} marginX={'auto'} maxWidth={300} direction="column">
        <FormControl className=' width-input'>
          <InputLabel id="esp-select-label">Especialidade</InputLabel>
          <Select
            labelId="esp-select-label"
            id="esp-select"
            value={especialidade}
            label="Especialidade"
            onChange={(event) => setEspecialidade(event.target.value)}
          >
            {especialidades.map((esp, index) => {
              return (
                <MenuItem key={index} value={esp}>{esp}</MenuItem>
              )
            })}
          </Select>
        </FormControl>
        <FormControl className=' width-input'>
          <InputLabel id="med-select-label">Médico</InputLabel>
          <Select
            disabled={especialidade == ''}
            labelId="med-select-label"
            id="med-select"
            value={medico}
            label="Médico"
            onChange={(event) => setMedico(event.target.value)}
          >
            {medicos.map((med, index) => {
              if (med.especialidade == especialidade) {
                return (
                  <MenuItem key={index} value={med.medico}>{med.medico}</MenuItem>
                )
              } else {
                return;
              }
            })}
          </Select>
        </FormControl>

        <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale='pt-BR'>
          <DemoContainer components={['DatePicker']}>
            <DatePicker value={data} format="DD / MM / YYYY"
              className=' width-input'
              onChange={(newValue) => setData(newValue)} label="Data" />
          </DemoContainer>
        </LocalizationProvider>

        <FormControl className=' width-input'>
          <InputLabel id="hor-select-label">Horário</InputLabel>
          <Select
            labelId="hor-select-label"
            id="hor-select"
            value={horario}
            label="Horário"
            onChange={(event) => setHorario(event.target.value)}
          >
            {horarios.map((hor, index) => {
              return (
                <MenuItem key={index} value={hor}>{hor}</MenuItem>
              )
            })}
          </Select>
        </FormControl>

        <Typography className='width-input' sx={{ mt: 4 }} variant="h6" component="div">
          Datas Escolhidas
        </Typography>
        <Demo>
          <List >
            {dataEscolhidas.map((dt, index) => {
              return (
                <ListItem className='width-input' key={index}
                  secondaryAction={
                    <IconButton edge="end" aria-label="delete" onClick={() => removeDate(index)}>
                      <DeleteIcon />
                    </IconButton>
                  }
                >
                  <ListItemText
                    primary={dt}
                  />
                </ListItem>
              )
            }
            )}
          </List>
        </Demo>

        <Tooltip title="Ao menos um medico, especialidade, data, horario deve ser selecionado" arrow>
          <span>
            <Button color='inherit' disabled={validaCampos()} className='toolbar-margin' variant="contained" onClick={() => submit()}>Salvar</Button>
          </span>
        </Tooltip>
      </Stack>
    </Box>
  );
}