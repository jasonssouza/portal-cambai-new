// src/app/api/agenda/route.ts
import { NextRequest, NextResponse } from "next/server";
import { authOptions } from "../auth/[...nextauth]/route";
import { PrismaClient } from "@prisma/client";
import { getToken } from "next-auth/jwt";


const prisma = new PrismaClient();
const secret = process.env.NEXTAUTH_SECRET;
//POST
export async function POST(req: NextRequest) {
  
  const token = await getToken({ req, secret });

  if (!token || token.role !== "SELLER") {
    return NextResponse.json({ error: "Acesso não autorizado." }, { status: 401 });
  }
  try {
    const { data, descricao } = await req.json();

    if (!data) {
      return NextResponse.json({ error: "A data é obrigatória." }, { status: 400 });
    }

    const agenda = await prisma.agenda.create({
      data: {
        data: new Date(data),
        descricao,
        sellerId: token.id,
      },
    });

    return NextResponse.json({ message: "Agenda criada com sucesso.", agenda });
  } catch (error) {
    console.error("Erro ao criar agenda:", error);
    return NextResponse.json({ error: "Erro interno do servidor." }, { status: 500 });
  }
}
// GET /api/agenda → Lista agendas do vendedor logado
export async function GET(req: NextRequest) {
  const token = await getToken({ req, secret });

  if (!token || token.role !== "SELLER") {
    return NextResponse.json({ error: "Acesso não autorizado." }, { status: 401 });
  }

  try {
    const agendas = await prisma.agenda.findMany({
      where: {
        sellerId: token.id,
      },
      orderBy: {
        data: 'asc', // opcional: ordena pela data
      },
    });

    return NextResponse.json(agendas);
  } catch (error) {
    console.error("Erro ao buscar agendas:", error);
    return NextResponse.json({ error: "Erro interno do servidor." }, { status: 500 });
  }
}
