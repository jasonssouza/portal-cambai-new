'use client';

import React, { useEffect, useState } from 'react';

type Produto = {
  id: string;
  nome: string;
  descricao: string;
  preco: number;
  imagemUrl?: string;
  createdAt: string;
};

export default function ListaProdutos() {
  const [produtos, setProdutos] = useState<Produto[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProdutos = async () => {
      try {
        const res = await fetch('/api/produto');
        if (!res.ok) throw new Error('Erro ao buscar produtos.');
        const data = await res.json();
        setProdutos(data.produtos);
      } catch (err: any) {
        setError(err.message || 'Erro desconhecido.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchProdutos();
  }, []);

  if (isLoading) return <p>Carregando produtos...</p>;
  if (error) return <p className="text-red-500">{error}</p>;
  if (produtos.length === 0) return <p>Nenhum produto cadastrado.</p>;

  return (
    <div className="mt-10 space-y-4">
      <h2 className="text-xl font-bold">Seus Produtos Cadastrados</h2>
      <ul className="space-y-4">
        {produtos.map(produto => (
          <li key={produto.id} className="p-4 bg-gray-700 rounded-md shadow">
            <h3 className="text-lg font-semibold">{produto.nome}</h3>
            <p className="text-sm text-gray-300">{produto.descricao}</p>
            <p className="text-sm text-green-400 font-bold">R$ {Number(produto.preco).toFixed(2)}</p>
            {produto.imagemUrl && (
              <img
                src={produto.imagemUrl}
                alt={produto.nome}
                className="mt-2 max-w-xs rounded"
              />
            )}
            <p className="text-xs text-gray-400 mt-1">Cadastrado em: {new Date(produto.createdAt).toLocaleString()}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
