'use client';

import { useState } from 'react';

// --- Definição das Interfaces ---
interface AgendaItem {
  id: number | string;
  data: string;
  descricao?: string;
}

interface Produto {
  id: number | string;
  nome: string;
  descricao?: string;
  preco: number | string; // string | number aqui pois você usa Number(p.preco)
}

interface ResultadoVendedor {
  produtos?: Produto[]; // Use '?' se a chave pode não existir na resposta
  agenda?: AgendaItem[];  // Use '?' se a chave pode não existir na resposta
}
// --- Fim das Interfaces ---

export default function AreaCliente() {
  const [vendedor, setVendedor] = useState('');
  // Use a interface ResultadoVendedor, permitindo null como estado inicial
  const [resultado, setResultado] = useState<ResultadoVendedor | null>(null);
  // Estado para loading ou erros pode ser útil também
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);


  const handleBuscar = async () => {
    setLoading(true);
    setError(null);
    setResultado(null); // Limpa resultado anterior
    try {
      const res = await fetch(`/api/vendedor/${vendedor}`);

      if (!res.ok) {
        // Trata erros HTTP (como 404 Not Found, 500 Internal Server Error)
        throw new Error(`Erro ao buscar dados: ${res.statusText} (${res.status})`);
      }

      // Tipamos 'data' explicitamente ao receber da API
      const data: ResultadoVendedor = await res.json();
      setResultado(data);

    } catch (err) {
        console.error("Falha na busca:", err);
        // Se err for uma instância de Error, pegue a mensagem, senão use uma string genérica
        setError(err instanceof Error ? err.message : 'Ocorreu um erro desconhecido.');
    } finally {
      setLoading(false);
    }
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
          disabled={loading} // Desabilita input durante o loading
        />
        <button
          onClick={handleBuscar}
          className={`w-full px-4 py-2 bg-blue-600 text-white font-semibold rounded hover:bg-blue-700 ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
          disabled={loading} // Desabilita botão durante o loading
        >
          {loading ? 'Buscando...' : 'Buscar'}
        </button>
      </div>

      {/* Exibe mensagem de erro */}
      {error && (
          <div className="mt-4 text-center text-red-500 dark:text-red-400">{error}</div>
      )}

      {/* Exibe os resultados */}
      {resultado && !loading && !error && (
        <div className="mt-8">
          {/* Verifica se há produtos antes de tentar mapear */}
          {resultado.produtos && resultado.produtos.length > 0 ? (
            <>
              <h2 className="text-xl font-semibold mb-2">Produtos de {vendedor}</h2>
              <ul className="list-disc list-inside space-y-2">
                {/* Agora 'p' é inferido como tipo 'Produto', não precisa mais de ': any' */}
                {resultado.produtos.map((p) => (
                  <li key={p.id}>
                    <strong>{p.nome}</strong>: {p.descricao || 'Sem descrição'} — R$ {Number(p.preco).toFixed(2)}
                  </li>
                ))}
              </ul>
            </>
          ) : (
             <p className="mt-4 text-center text-gray-600 dark:text-gray-400">Nenhum produto encontrado para este vendedor.</p>
          )}

          {/* Verifica se há agenda antes de tentar mapear */}
          {resultado.agenda && resultado.agenda.length > 0 ? (
            <>
              <h2 className="text-xl font-semibold mt-6 mb-2">Agenda</h2>
              <ul className="list-disc list-inside space-y-2">
                {/* Agora 'a' é inferido como tipo 'AgendaItem', não precisa mais de ': any' */}
                {resultado.agenda.map((a) => (
                  <li key={a.id}>
                    {new Date(a.data).toLocaleDateString()} — {a.descricao || 'Sem descrição'}
                  </li>
                ))}
              </ul>
            </>
            ) : (
             <p className="mt-4 text-center text-gray-600 dark:text-gray-400">Nenhum item na agenda encontrado para este vendedor.</p>
          )}

        </div>
      )}
       {/* Mensagem se não houver resultado e não estiver carregando/erro */}
       {!resultado && !loading && !error && vendedor && (
           <p className="mt-8 text-center text-gray-600 dark:text-gray-400">Busque por um vendedor para ver os resultados.</p>
       )}
    </main>
  );
}