"use client";

import { useRouter } from 'next/navigation';
import Agendamentos from './agendamentos/page';
import { useEffect } from 'react';

export default function Internal() {
  const router = useRouter();

  useEffect(() => {
    if (localStorage.getItem('token') == null) {
      router.push('/');
    }
  }, []);

  return (
    <Agendamentos></Agendamentos>
  );
}