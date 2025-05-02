'use client';

import { useState } from 'react';

export default function CadastroAgenda() {
  const [data, setData] = useState('');
  const [descricao, setDescricao] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [mensagem, setMensagem] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setMensagem(null);

    try {
      const res = await fetch('/api/agenda', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ data, descricao }),
      });

      const result = await res.json();

      if (!res.ok) throw new Error(result.error || 'Erro ao cadastrar');

      setMensagem('Agenda cadastrada com sucesso!');
      setData('');
      setDescricao('');
    } catch (error: any) {
      setMensagem(error.message || 'Erro ao cadastrar');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-gray-700 p-6 rounded-lg shadow-md w-full max-w-lg mt-8">
      <h2 className="text-2xl font-semibold mb-4">Adicionar Evento à Agenda</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="data" className="block text-sm font-medium text-gray-300">
            Data do Evento <span className="text-red-500">*</span>
          </label>
          <input
            type="datetime-local"
            id="data"
            value={data}
            onChange={(e) => setData(e.target.value)}
            required
            className="mt-1 block w-full px-3 py-2 bg-gray-800 border border-gray-600 rounded-md shadow-sm text-white"
          />
        </div>
        <div>
          <label htmlFor="descricao" className="block text-sm font-medium text-gray-300">
            Descrição
          </label>
          <input
            type="text"
            id="descricao"
            value={descricao}
            onChange={(e) => setDescricao(e.target.value)}
            className="mt-1 block w-full px-3 py-2 bg-gray-800 border border-gray-600 rounded-md shadow-sm text-white"
          />
        </div>
        <button
          type="submit"
          disabled={isLoading}
          className="w-full py-2 px-4 bg-blue-600 hover:bg-blue-700 text-white rounded-md text-sm font-semibold"
        >
          {isLoading ? 'Cadastrando...' : 'Adicionar Evento'}
        </button>
        {mensagem && <p className="text-sm mt-2 text-center">{mensagem}</p>}
      </form>
    </div>
  );
}
