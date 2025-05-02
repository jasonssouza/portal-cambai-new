import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import { getToken } from 'next-auth/jwt';

const prisma = new PrismaClient();
const secret = process.env.NEXTAUTH_SECRET!;

export async function POST(req: NextRequest) {
  const token = await getToken({ req, secret });

  if (!token || token.role !== 'SELLER') {
    return NextResponse.json({ error: 'Acesso não autorizado.' }, { status: 401 });
  }

  try {
    const { name, description, price, imageUrl } = await req.json();

    if (!name || !price) {
      return NextResponse.json({ error: 'Nome e preço são obrigatórios.' }, { status: 400 });
    }

    const produto = await prisma.produto.create({
      data: {
        nome: name,
        descricao: description,
        preco: parseFloat(price),
        imagemUrl: imageUrl,
        sellerId: token.sub, // sub = id do usuário
      },
    });

    return NextResponse.json({ message: 'Produto cadastrado com sucesso!', produto }, { status: 201 });
  } catch (err) {
    console.error('Erro ao cadastrar produto:', err);
    return NextResponse.json({ error: 'Erro interno no servidor.' }, { status: 500 });
  }
}
// GET /api/produto → Lista produtos do vendedor logado
export async function GET(req: NextRequest) {
    const token = await getToken({ req, secret });
  
    if (!token || token.role !== 'SELLER') {
      return NextResponse.json({ error: 'Acesso não autorizado.' }, { status: 401 });
    }
  
    try {
      const produtos = await prisma.produto.findMany({
        where: {
          sellerId: token.sub,
        },
        orderBy: {
          createdAt: 'desc',
        },
      });
  
      return NextResponse.json({ produtos }, { status: 200 });
    } catch (err) {
      console.error('Erro ao buscar produtos:', err);
      return NextResponse.json({ error: 'Erro interno do servidor.' }, { status: 500 });
    }
  }