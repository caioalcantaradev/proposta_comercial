import { NextResponse } from 'next/server';
import { getDb } from '@/lib/database';
import { v4 as uuidv4 } from 'uuid';

// GET - Listar todas as propostas
export async function GET() {
  try {
    const db = await getDb();
    const propostas = await db.all('SELECT * FROM propostas ORDER BY dataCriacao DESC');
    return NextResponse.json({ propostas });
  } catch (error) {
    console.error('Erro ao buscar propostas:', error);
    return NextResponse.json(
      { error: 'Erro ao buscar propostas' },
      { status: 500 }
    );
  }
}

// POST - Criar nova proposta
export async function POST(request: Request) {
  try {
    const { nomeCliente, projeto, valorTotal, valorPix, valorCartao, dataProposta, validadeProposta, garantia, dataCriacao } = await request.json();

    if (!nomeCliente || !projeto || !valorTotal || !valorPix || !valorCartao || !dataProposta || !validadeProposta || !garantia || !dataCriacao) {
      return NextResponse.json({ error: 'Todos os campos são obrigatórios' }, { status: 400 });
    }

    const db = await getDb();
    const id = uuidv4();
    const expiraEm = new Date(new Date(dataCriacao).getTime() + 7 * 24 * 60 * 60 * 1000).toISOString(); // 7 dias de validade

    await db.run(
      `INSERT INTO propostas (id, nomeCliente, projeto, valorTotal, valorPix, valorCartao, dataProposta, validadeProposta, garantia, dataCriacao, expiraEm) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      id, nomeCliente, projeto, valorTotal, valorPix, valorCartao, dataProposta, validadeProposta, garantia, dataCriacao, expiraEm
    );

    const link = `${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}/proposta/${id}`;

    return NextResponse.json({ message: 'Proposta criada com sucesso!', id, link }, { status: 201 });
  } catch (error) {
    console.error('Erro ao criar proposta:', error);
    return NextResponse.json({ error: 'Erro interno do servidor' }, { status: 500 });
  }
}
