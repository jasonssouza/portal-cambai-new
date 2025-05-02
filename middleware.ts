// middleware.ts
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { getToken } from 'next-auth/jwt' // Importa getToken

// Define as rotas que você quer proteger
export const config = {
  matcher: ['/dashboard/:path*'],
}

export async function middleware(req: NextRequest) {
  // Obtém o token JWT da requisição.
  // Precisa do mesmo NEXTAUTH_SECRET que a configuração principal.
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });

  console.log('Middleware - Token:', token); // Log para debug

  // 1. Redireciona para login se não houver token (não autenticado)
  if (!token) {
    const loginUrl = new URL('/api/auth/signin', req.url)
    loginUrl.searchParams.set('callbackUrl', req.nextUrl.pathname) // Usa req.nextUrl.pathname
    console.log('Middleware - Redirecting to login (no token)');
    return NextResponse.redirect(loginUrl)
  }

  // --- VERIFICAÇÃO DE PAPEL (COMENTADA POR AGORA) ---
  // Como estamos usando a estratégia "database", o 'token' JWT
  // pode não ter o 'role' atualizado do banco de dados,
  // a menos que você configure o callback 'jwt' para adicioná-lo.
  // Por enquanto, vamos permitir acesso se estiver logado.
  /*
  if (token.role !== 'SELLER') { // 'role' pode não existir ou estar desatualizado no token JWT
      const homeUrl = new URL('/', req.url)
      console.log(`Middleware - Redirecting non-seller (${token.email}) to home (based on token)`);
      return NextResponse.redirect(homeUrl);
  }
  */
  // --- FIM DA VERIFICAÇÃO DE PAPEL ---


  // 3. Se chegou até aqui, o usuário tem um token (está logado), permite acesso
  console.log(`Middleware - Allowing access based on token for (${token.email})`);
  return NextResponse.next() // Continua para a rota solicitada (/dashboard)
}