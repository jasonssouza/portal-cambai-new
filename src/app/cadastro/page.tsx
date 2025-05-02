'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function CadastroPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState<'SELLER' | 'CLIENT'>('SELLER'); // Valor padrão
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(null);

    try {
      const res = await fetch('/api/cadastro', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password, role }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || 'Erro ao cadastrar.');
      } else {
        setSuccess('Cadastro realizado com sucesso!');
        setName('');
        setEmail('');
        setPassword('');

        // Redirecionamento automático com base no papel
        if (role === 'SELLER') {
          router.push('/dashboard');
        } else {
          router.push('/area-cliente');
        }
      }
    } catch (err) { // Adicione um nome de variável, como 'err'
      // Opcional, mas recomendado para debug: logar o erro real
      console.error("Erro no cadastro:", err);
      setError('Erro inesperado ao se cadastrar.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="flex min-h-screen items-center justify-center bg-gray-900 text-white p-6">
      <div className="w-full max-w-md bg-gray-800 p-6 rounded-lg shadow-lg space-y-6">
        <h1 className="text-2xl font-bold text-center">Cadastro de Usuário</h1>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium">Nome</label>
            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-3 py-2 rounded-md bg-gray-700 text-white border border-gray-600"
            />
          </div>
          <div>
            <label className="block text-sm font-medium">E-mail</label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-3 py-2 rounded-md bg-gray-700 text-white border border-gray-600"
            />
          </div>
          <div>
            <label className="block text-sm font-medium">Senha</label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-3 py-2 rounded-md bg-gray-700 text-white border border-gray-600"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Tipo de Usuário</label>
            <select
              value={role}
              onChange={(e) => setRole(e.target.value as 'SELLER' | 'CLIENT')}
              className="w-full px-3 py-2 rounded-md bg-gray-700 text-white border border-gray-600"
            >
              <option value="SELLER">Vendedor</option>
              <option value="CLIENT">Cliente</option>
            </select>
          </div>

          {error && <p className="text-red-500 text-sm text-center">{error}</p>}
          {success && <p className="text-green-500 text-sm text-center">{success}</p>}

          <button
            type="submit"
            disabled={loading}
            className={`w-full py-2 px-4 rounded-md text-white font-medium ${loading ? 'bg-gray-500' : 'bg-green-600 hover:bg-green-700'}`}
          >
            {loading ? 'Cadastrando...' : 'Cadastrar'}
          </button>
        </form>
      </div>
    </main>
  );
}
