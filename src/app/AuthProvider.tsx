// src/app/AuthProvider.tsx
'use client'; // Marca este componente como Cliente

import { SessionProvider } from 'next-auth/react';
import React from 'react';

// Definindo um tipo para as props, incluindo children
interface AuthProviderProps {
  children: React.ReactNode;
}

export default function AuthProvider({ children }: AuthProviderProps) {
  // O SessionProvider provê o contexto da sessão para os componentes filhos
  return <SessionProvider>{children}</SessionProvider>;
}