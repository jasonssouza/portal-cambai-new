// src/app/api/auth/[...nextauth]/route.ts
import CredentialsProvider from "next-auth/providers/credentials"
import bcrypt from "bcrypt"
import NextAuth, { DefaultSession } from "next-auth"
import Google from "next-auth/providers/google"
import { PrismaAdapter } from "@auth/prisma-adapter" // Importa o Adapter
import { PrismaClient, Role } from "@prisma/client"      // Importa o Prisma Client


// Validação das variáveis de ambiente
const clientId = process.env.GOOGLE_CLIENT_ID;
const clientSecret = process.env.GOOGLE_CLIENT_SECRET;
const prisma = new PrismaClient()
//import { getToken } from "next-auth/jwt";


console.log("--- Initializing NextAuth Handler (v5 Style) with Prisma Adapter ---");

if (!clientId || !clientSecret) {
    // Retornar um erro aqui pode ser melhor que throw em alguns casos
    throw new Response("Missing Google OAuth credentials", { status: 500 });
}

declare module "next-auth" {
    interface Session extends DefaultSession {
      user?: {
        id?: string | null; // Adiciona id
        role?: Role | null; // Adiciona role
      } & DefaultSession["user"];
    }
  
    interface User { // Estende o tipo User base do NextAuth
      role?: Role | null;
    }
  }

// Configura o NextAuth diretamente aqui
export const authOptions = {
    adapter: PrismaAdapter(prisma),
    providers: [
      Google({
        clientId: process.env.GOOGLE_CLIENT_ID as string,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
      }),
      CredentialsProvider({
        name: "Credentials",
        credentials: {
          email: { label: "E-mail", type: "email" },
          password: { label: "Senha", type: "password" }
        },
        async authorize(credentials) {
          const user = await prisma.user.findUnique({
            where: { email: credentials?.email }
          });
  
          if (!user || !user.password) return null;
  
          const isValid = await bcrypt.compare(
            credentials!.password,
            user.password
          );
  
          if (!isValid) return null;
  
          return {
            id: user.id,
            name: user.name,
            email: user.email,
            role: user.role
          };
        }
      })
    ],
    session: {
      strategy: "jwt", // <- necessário para que getToken funcione
      maxAge: 30 * 24 * 60 * 60,
      updateAge: 24 * 60 * 60,
    },
    secret: process.env.NEXTAUTH_SECRET,
    callbacks: {
      async jwt({ token, user }) {
        if (user) {
          token.id = user.id;
          token.role = user.role;
        }
        return token;
      },
      async session({ session, token }) {
        if (session.user) {
          session.user.id = token.id;
          session.user.role = token.role;
        }
        return session;
      },
      async redirect({ baseUrl, token }) {
        if (token?.role === 'SELLER') {
          return `${baseUrl}/dashboard`;
        }
      
        return `${baseUrl}/area-cliente`;
      }
    }
    
  };
  
  // Use o objeto acima no NextAuth
  const handler = NextAuth(authOptions);
  
// Exporta os handlers diretamente obtidos da chamada NextAuth()
export const GET = handler.handlers.GET
export const POST = handler.handlers.POST