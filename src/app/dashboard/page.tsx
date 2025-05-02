import CadastroProduto from './_components/CadastroProduto';
import ListaProdutos from './_components/ListaProdutos';
import ListaAgenda from './_components/ListaAgenda';
import CadastroAgenda from './_components/CadastroAgenda';
import React from 'react';

export default function DashboardPage() {
  return (
    <main className="flex min-h-screen flex-col items-center p-8 bg-gray-800 text-white">
      <div className="w-full max-w-4xl">
        <h1 className="text-3xl font-bold mb-6 text-center">Dashboard do Vendedor</h1>

        <div className="bg-gray-700 p-6 rounded-lg shadow-md mb-8">
          <p className="text-lg">Bem-vindo à sua área de gerenciamento!</p>
          <div className="mt-4 space-y-2">
            <p>Próximas funcionalidades:</p>
            <ul className="list-disc list-inside text-gray-300">
              <li>Gerenciar Produtos</li>
              <li>Gerenciar Agenda</li>
            </ul>
          </div>
        </div>

        {/* Formulário de cadastro de produto */}
        <CadastroProduto />

        {/* Lista de produtos cadastrados */}
        <ListaProdutos />

        {/* Lista de eventos da agenda */}
        <ListaAgenda />

        <CadastroAgenda>
            {/* Formulario Agenda */}
        </CadastroAgenda>
      </div>
    </main>
  );
}
