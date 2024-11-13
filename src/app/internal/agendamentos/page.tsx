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
import LogoutIcon from '@mui/icons-material/Logout';
import { Checkbox, Drawer, FormControlLabel, List, ListItem, ListItemButton, ListItemIcon, ListItemText } from '@mui/material';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Search, SearchIconWrapper, StyledInputBase } from '@/app/components/toolbar_elements';
import { Accordion, AccordionDetails, AccordionSummary } from '@/app/components/accordion_elements';


export default function Agendamentos() {
  const router = useRouter();
  const [open, setOpen] = useState(false);

  const [expanded, setExpanded] = useState<string | false>('paciente1');
  const [agendamentos, setAgendamentos] = useState<{
    paciente: {
      name: string;
      id: string;
      cpf: string;
      email: string;
      dataNascimento: string;
    };
    agendamento: {
      id: string,
      medico: string;
      horario: string;
      data: string;
      compareceu: boolean;
      isPago: boolean;
      valor: string;
    }
  }[]>([
    {
      paciente: {
        name: 'Larissa Evangelista Moreira',
        id: '1',
        cpf: '123.456.789-55',
        email: 'larissa@mail.com',
        dataNascimento: '11/11/2005'
      },
      agendamento: {
        id: '1',
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
        id: '2',
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
        id: '3',
        medico: 'Dr. Andre',
        horario: '08:00',
        data: '07/07/2024',
        compareceu: true,
        isPago: false,
        valor: '250'
      }
    }
  ]);

  const [buscar, setBuscar] = useState("");

  const [lista, setLista] = useState(agendamentos);

  function testaBusca(nome: string) {
    const regex = new RegExp(buscar, 'i');
    return regex.test(nome);
  }

  useEffect(() => {
    const novaLista = agendamentos.filter(item => testaBusca(item.paciente.name))
    setLista(novaLista);
  }, [buscar, agendamentos])

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

  const updateIsPago = (ag: {
    paciente: {
      name: string;
      id: string;
      cpf: string;
      email: string;
      dataNascimento: string;
    };
    agendamento: {
      id: string,
      medico: string;
      horario: string;
      data: string;
      compareceu: boolean;
      isPago: boolean;
      valor: string;
    }
  }) => {
    const updateAgendamentos = agendamentos.map(
      (agend) => agend.agendamento.id === ag.agendamento.id ?
        { ...agend, agendamento: { ...agend.agendamento, isPago: !ag.agendamento.isPago } } :
        agend
    )
    setAgendamentos(updateAgendamentos);
  };

  const updateCompareceu = (ag: {
    paciente: {
      name: string;
      id: string;
      cpf: string;
      email: string;
      dataNascimento: string;
    };
    agendamento: {
      id: string,
      medico: string;
      horario: string;
      data: string;
      compareceu: boolean;
      isPago: boolean;
      valor: string;
    }
  }) => {
    const updateAgendamentos = agendamentos.map(
      (agend) => agend.agendamento.id === ag.agendamento.id ?
        { ...agend, agendamento: { ...agend.agendamento, compareceu: !ag.agendamento.compareceu } } :
        agend
    )
    setAgendamentos(updateAgendamentos);
  };

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
              value={buscar} onChange={evento => setBuscar(evento.target.value)}
            />
          </Search>
        </Toolbar>
      </AppBar>

      <Drawer open={open} onClose={toggleDrawer(false)}>
        {DrawerList}
      </Drawer>

      {lista.map((agend) => {
        return (
          <Accordion key={agend.paciente.id} className='toolbar-margin' expanded={expanded === `paciente${agend.paciente.id}`} onChange={handleChange(`paciente${agend.paciente.id}`)}>
            <AccordionSummary>
              <Typography>{agend.paciente.name + ' - ' + agend.paciente.cpf}</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <FormControlLabel control={<Checkbox checked={agend.agendamento.compareceu} onClick={() => updateCompareceu(agend)} />} label="Compareceu a consulta" />
              <Typography paddingLeft={'33px'}>
                Data: {agend.agendamento.data}
                <br />
                Médico: {agend.agendamento.medico}
                <br />
                Horário: {agend.agendamento.horario}
              </Typography>
              <FormControlLabel control={<Checkbox checked={agend.agendamento.isPago} onClick={() => updateIsPago(agend)} />} label="Consulta paga" />
              <Typography paddingLeft={'33px'}>
                Valor da especialidade: R$ {agend.agendamento.valor}
              </Typography>
            </AccordionDetails>
          </Accordion>

        )
      })}
    </Box>
  );
}