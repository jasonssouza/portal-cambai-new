// src/app/area-cliente/page.tsx
'use client';

import { useState } from 'react';

export default function AreaCliente() {
  const [vendedor, setVendedor] = useState('');
  const [resultado, setResultado] = useState<any>(null); // depois você substitui com tipo correto

  const handleBuscar = async () => {
    const res = await fetch(`/api/vendedor/${vendedor}`);
    const data = await res.json();
    setResultado(data);
  };

  return (
    <main className="min-h-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 p-6">
      <h1 className="text-2xl font-bold text-center mb-4">Área do Cliente</h1>

      <div className="max-w-md mx-auto space-y-4">
        <input
          type="text"
          placeholder="Digite o nome do vendedor"
          value={vendedor}
          onChange={(e) => setVendedor(e.target.value)}
          className="w-full px-4 py-2 border rounded bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600"
        />
        <button
          onClick={handleBuscar}
          className="w-full px-4 py-2 bg-blue-600 text-white font-semibold rounded hover:bg-blue-700"
        >
          Buscar
        </button>
      </div>

      {resultado && (
        <div className="mt-8">
          <h2 className="text-xl font-semibold mb-2">Produtos de {vendedor}</h2>
          <ul className="list-disc list-inside space-y-2">
            {resultado.produtos?.map((p: any) => (
              <li key={p.id}>
                <strong>{p.nome}</strong>: {p.descricao || 'Sem descrição'} — R$ {Number(p.preco).toFixed(2)}
              </li>
            ))}
          </ul>
          <h2 className="text-xl font-semibold mt-6 mb-2">Agenda</h2>
          <ul className="list-disc list-inside space-y-2">
            {resultado.agenda?.map((a: any) => (
              <li key={a.id}>
                {new Date(a.data).toLocaleDateString()} — {a.descricao || 'Sem descrição'}
              </li>
            ))}
          </ul>
        </div>
      )}
    </main>
  );
}
