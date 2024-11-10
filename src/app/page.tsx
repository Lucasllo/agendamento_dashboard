"use client";

import { Stack, Button, TextField } from '@mui/material';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function Home() {

  const router = useRouter();
  const [identificacao, setIdentificacao] = useState("");

  useEffect(() => {
    localStorage.removeItem('token');
  }, []);

  const submit = () => {
    console.log(identificacao);
    localStorage.setItem('token', JSON.stringify('123456789'));

    router.push('/internal');
  };

  return (
    <div className='container'>
      <Stack className='box' spacing={4} alignItems={'center'} justifyContent={'center'} marginX={'auto'} maxWidth={500} direction="column">
        <img src="logo2.png" alt="logo_unifor" />
        <TextField
          id="outlined-disabled"
          label="Identificação"
          size='small'
          defaultValue=''
          onChange={evento => setIdentificacao(evento.target.value)}
        />
        <Button color='inherit' size='medium' variant="contained" onClick={() => submit()}>Entrar</Button>
      </Stack>

    </div>
  );
}
