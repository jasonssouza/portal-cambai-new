'use client';

import React, { useEffect, useState } from 'react';

interface Agenda {
  id: string;
  data: string;
  descricao?: string;
}

export default function ListaAgenda() {
  const [agendas, setAgendas] = useState<Agenda[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [erro, setErro] = useState<string | null>(null);

  useEffect(() => {
    async function fetchAgendas() {
      try {
        const res = await fetch('/api/agenda', {
          method: 'GET',
          credentials: 'include',
        });

        if (!res.ok) {
          throw new Error('Erro ao buscar agendas.');
        }

        const data = await res.json();

        const agendasOrdenadas = data.sort(
          (a: Agenda, b: Agenda) =>
            new Date(b.data).getTime() - new Date(a.data).getTime()
        );

        setAgendas(agendasOrdenadas);
      } catch (err) {
        console.error('Erro ao buscar agenda:', err);
        setErro('Erro ao carregar agenda.');
      } finally {
        setIsLoading(false);
      }
    }

    fetchAgendas();
  }, []);

  return (
    <div className="bg-gray-700 p-6 rounded-lg shadow-md w-full max-w-lg mt-8">
      <h2 className="text-2xl font-semibold mb-4">Minha Agenda</h2>
      {isLoading ? (
        <p className="text-gray-300">Carregando agendas...</p>
      ) : erro ? (
        <p className="text-red-500">{erro}</p>
      ) : agendas.length === 0 ? (
        <p className="text-gray-400">Nenhum evento na agenda.</p>
      ) : (
        <ul className="space-y-4">
          {agendas.map((item) => (
            <li key={item.id} className="border-b border-gray-600 pb-2">
              <p className="font-bold">{new Date(item.data).toLocaleDateString('pt-BR')}</p>
              {item.descricao && <p className="text-sm text-gray-300">{item.descricao}</p>}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
