// src/app/page.tsx
'use client'; // Marca como Componente Cliente
import React from 'react';
import { useSession, signIn, signOut } from 'next-auth/react'; // Importa hooks/funções

export default function Home() {
  // Obtém dados da sessão e status (loading, authenticated, unauthenticated)
  const { data: session, status } = useSession();

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-8 bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
      <div className="text-center space-y-6 max-w-2xl">
        <h1 className="text-4xl md:text-5xl font-bold text-blue-600 dark:text-blue-400">
          Portal Cambaí
        </h1>

        <p className="text-lg md:text-xl text-gray-700 dark:text-gray-300">
          Bem-vindo! Este portal organiza e compartilha informações comerciais
          entre vendedores e seus clientes.
        </p>

        <div className="mt-8 pt-8 border-t border-gray-300 dark:border-gray-700 w-full">
          <h2 className="text-2xl font-semibold mb-4">Próximos Passos:</h2>
          <ul className="list-disc list-inside text-left space-y-2 text-gray-600 dark:text-gray-400 mx-auto max-w-md">
            {/* Lista de passos ... */}
            <li>Configurar autenticação com Google (NextAuth.js) - Concluído!</li>
            <li>Estruturar o banco de dados (Prisma + SQLite) - Concluído! </li>
            <li>Login por e-mail/senha (vendedores) - Concluído! </li>
            <li>Criar páginas para vendedores e produtos - Concluído!</li>
            <li>Implementar a agenda - Concluído!</li>
            <li>Busca por vendedor na área do cliente - Concluído!</li>
            <li>Login google para (clientes) - Concluído!</li>
            <li>Gerenciar dados com React Query - Concluído!</li>
            <li>Ajuste de css das paginas - Em andandomento!</li>
          </ul>
        </div>

        {/* --- Área de Autenticação --- */}
        <div className="mt-10">
          {status === 'loading' && (
            <p className="text-gray-500">Carregando sessão...</p>
          )}

          {status === 'unauthenticated' && (
            <button
            onClick={() => signIn('google', { callbackUrl: '/area-cliente' })} // Chama a função signIn com o ID do provedor
              className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg shadow-md transition-colors duration-200 ease-in-out hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-900"
            >
              Login com Google
            </button>
          )}

          {status === 'authenticated' && session?.user && (
            <div className="space-y-4">
              <p>
                Logado como: <strong>{session.user.name}</strong> ({session.user.email})
              </p>
              <button
                onClick={() => signOut()} // Chama a função signOut
                className="px-6 py-3 bg-red-600 text-white font-semibold rounded-lg shadow-md transition-colors duration-200 ease-in-out hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 focus:ring-offset-gray-900"
              >
                Logout
              </button>
            </div>
          )}
        </div>
        {/* --- Fim da Área de Autenticação --- */}
        <div className="space-y-4">
              <button
                onClick={() => window.location.href = "/cadastro"}
                className="px-6 py-3 bg-red-600 text-white font-semibold rounded-lg shadow-md transition-colors duration-200 ease-in-out hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 focus:ring-offset-gray-900"
              >
                Cadastrar
              </button>
            </div>
            <div className="space-y-4">
              <button
                onClick={() => window.location.href = "/login"}
                className="px-6 py-3 bg-red-600 text-white font-semibold rounded-lg shadow-md transition-colors duration-200 ease-in-out hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 focus:ring-offset-gray-900"
              >
                Login com E-mail
              </button>
            </div>
      </div>
    </main>
  );
}