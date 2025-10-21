import { NextResponse } from "next/server";
import { getDb } from "@/lib/database";

// GET - Buscar proposta por ID
export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const db = await getDb();
    const proposta = await db.get("SELECT * FROM propostas WHERE id = ?", id);

    if (!proposta) {
      return NextResponse.json(
        { error: "Proposta não encontrada" },
        { status: 404 }
      );
    }

    const expiraEm = new Date(proposta.expiraEm);
    const agora = new Date();

    if (agora > expiraEm) {
      return NextResponse.json({ error: "Proposta expirada" }, { status: 410 });
    }

    return NextResponse.json({ proposta }, { status: 200 });
  } catch (error) {
    console.error("Erro ao buscar proposta:", error);
    return NextResponse.json(
      { error: "Erro interno do servidor" },
      { status: 500 }
    );
  }
}

// DELETE - Deletar proposta
export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const db = await getDb();
    const resultado = await db.run("DELETE FROM propostas WHERE id = ?", id);

    if (resultado.changes === 0) {
      return NextResponse.json(
        { error: "Proposta não encontrada" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "Proposta deletada com sucesso",
    });
  } catch (error) {
    console.error("Erro ao deletar proposta:", error);
    return NextResponse.json(
      { error: "Erro interno do servidor" },
      { status: 500 }
    );
  }
}
