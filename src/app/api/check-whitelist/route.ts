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

    if (!token) {
      return NextResponse.json(
        { authorized: false, message: 'Token não fornecido' },
        { status: 400 }
      );
    }

    const response = await fetch(`${API_URL}/admin-whitelist/check`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify({ email }),
    });

    if (response.status === 200) {
      const data = await response.json();

      if (!data.authorized) {
        return NextResponse.json(
          { authorized: false, message: 'Acesso não autorizado' },
          { status: 403 }
        );
      }

      // Definir cookie HttpOnly no servidor para evitar acesso via XSS
      const res = NextResponse.json({ authorized: true });
      res.cookies.set('__session', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        path: '/',
        maxAge: 3600,
      });
      return res;
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
