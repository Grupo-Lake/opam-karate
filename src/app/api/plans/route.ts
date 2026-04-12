import { NextResponse } from 'next/server';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3334';

export async function GET() {
  try {
    const response = await fetch(`${API_URL}/api/subscription-plans`, {
      headers: { 'Content-Type': 'application/json' },
      next: { revalidate: 300 }, // cache for 5 minutes
    });

    if (!response.ok) {
      return NextResponse.json(
        { message: 'Erro ao buscar planos' },
        { status: response.status },
      );
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error('[api/plans] Erro:', error);
    return NextResponse.json(
      { message: 'Erro ao buscar planos' },
      { status: 500 },
    );
  }
}
