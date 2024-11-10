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
import { Checkbox, Drawer, FormControlLabel, List, ListItem, ListItemButton, ListItemIcon, ListItemText } from '@mui/material';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Search, SearchIconWrapper, StyledInputBase } from '@/app/components/toolbar_elements';
import { Accordion, AccordionDetails, AccordionSummary } from '@/app/components/accordion_elements';


export default function Agendamentos() {
  const router = useRouter();
  const [open, setOpen] = useState(false);

  const [expanded, setExpanded] = useState<string | false>('paciente1');

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


  const agendamentos = [
    {
      paciente: {
        name: 'Larissa Evangelista Moreira',
        id: '1',
        cpf: '123.456.789-55',
        email: 'larissa@mail.com',
        dataNascimento: '11/11/2005'
      },
      agendamento: {
        medico: 'Dr. David',
        horario: '21:00',
        data: '15/10/2024',
        compareceu: false,
        isPago: false,
        valor: '150'
      }
    },
    {
      paciente: {
        name: 'Allan Kevem',
        id: '2',
        cpf: '123.456.789-55',
        email: 'allan@mail.com',
        dataNascimento: '07/01/2000'
      },
      agendamento: {
        medico: 'Dr. Carlos',
        horario: '12:00',
        data: '05/07/2024',
        compareceu: true,
        isPago: true,
        valor: '350'
      }
    },
    {
      paciente: {
        name: 'Leandro',
        id: '3',
        cpf: '123.456.789-55',
        email: 'leandro@mail.com',
        dataNascimento: '08/04/1980'
      },
      agendamento: {
        medico: 'Dr. Andre',
        horario: '08:00',
        data: '07/07/2024',
        compareceu: true,
        isPago: false,
        valor: '250'
      }
    }
  ]

  const handleChange =
    (panel: string) => (event: React.SyntheticEvent, newExpanded: boolean) => {
      setExpanded(newExpanded ? panel : false);
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
            Agendamentos
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

      {agendamentos.map((agendamento) => {
        return (
          <Accordion key={agendamento.paciente.id} className='toolbar-margin' expanded={expanded === `paciente${agendamento.paciente.id}`} onChange={handleChange(`paciente${agendamento.paciente.id}`)}>
            <AccordionSummary>
              <Typography>{agendamento.paciente.name + ' - ' + agendamento.paciente.cpf}</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <FormControlLabel control={<Checkbox checked={agendamento.agendamento.compareceu} />} label="Compareceu a consulta" />
              <Typography paddingLeft={'33px'}>
                Data: {agendamento.agendamento.data}
                <br />
                Médico: {agendamento.agendamento.medico}
                <br />
                Horário: {agendamento.agendamento.horario}
              </Typography>
              <FormControlLabel control={<Checkbox checked={agendamento.agendamento.isPago} />} label="Consulta paga" />
              <Typography paddingLeft={'33px'}>
                Valor da especialidade: R$ {agendamento.agendamento.valor}
              </Typography>
            </AccordionDetails>
          </Accordion>

        )
      })}
    </Box>
  );
}