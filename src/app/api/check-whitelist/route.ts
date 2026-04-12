import { NextRequest, NextResponse } from 'next/server';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3334';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { email, token } = body;

    if (!email) {
      return NextResponse.json(
        { authorized: false, message: 'Email não fornecido' },
        { status: 400 }
      );
    }

    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
    };

    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }

    const response = await fetch(`${API_URL}/api/admin-whitelist/check`, {
      method: 'POST',
      headers,
      body: JSON.stringify({ email }),
    });

    if (response.status === 200) {
      const data = await response.json();
      return NextResponse.json({ authorized: data.authorized });
    }

    if (response.status === 403) {
      return NextResponse.json(
        { authorized: false, message: 'Acesso não autorizado' },
        { status: 403 }
      );
    }

    return NextResponse.json(
      { authorized: false, message: 'Erro ao verificar autorização' },
      { status: 500 }
    );
  } catch (error) {
    console.error('[check-whitelist] Erro:', error);
    return NextResponse.json(
      { authorized: false, message: 'Erro ao verificar autorização' },
      { status: 500 }
    );
  }
}
