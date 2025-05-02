// src/app/api/vendedor/[nome]/route.ts
import { PrismaClient } from "@prisma/client";
import { NextRequest } from "next/server";

const prisma = new PrismaClient();

export async function GET(req: NextRequest){

  const nomeVendedor = decodeURIComponent(req.nextUrl.pathname.split("/").pop() || "");

  try {
    const user = await prisma.user.findFirst({
      where: {
        name: {
          equals: nomeVendedor,
          mode: "insensitive", // ignora maiúsculas/minúsculas
        },
        role: "SELLER", // garante que seja um vendedor
      },
      include: {
        produtos: true,
        agendas: true,
      },
    });

    if (!user) {
      return new Response(
        JSON.stringify({ error: "Vendedor não encontrado." }),
        { status: 404 }
      );
    }

    return new Response(
      JSON.stringify({
        nome: user.name,
        produtos: user.produtos,
        agenda: user.agendas,
      }),
      { status: 200 }
    );
  } catch (error) {
    console.error("Erro ao buscar vendedor:", error);
    return Response.json({ error: "Erro interno do servidor." }, { status: 500 });
  }
}
