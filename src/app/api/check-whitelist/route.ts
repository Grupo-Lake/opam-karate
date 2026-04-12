import { auth } from '@clerk/nextjs/server';
import { NextRequest, NextResponse } from 'next/server';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3333/api';

export async function POST(req: NextRequest) {
  try {
    const { userId } = await auth();
    
    const body = await req.json();
    const { email } = body;

    if (!email) {
      return NextResponse.json(
        { authorized: false, message: 'Email não fornecido' },
        { status: 400 }
      );
    }

    const response = await fetch(`${API_URL}/admin-whitelist/check`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email }),
    });

    if (response.status === 200) {
      const data = await response.json();
      return NextResponse.json({ authorized: data.authorized });
    }

    if (response.status === 403) {
      const data = await response.json();
      return NextResponse.json(
        { authorized: false, message: data.message },
        { status: 403 }
      );
    }

    return NextResponse.json(
      { authorized: false, message: 'Erro ao verificar autorização' },
      { status: 500 }
    );
  } catch (error) {
    console.error('Error checking whitelist:', error);
    return NextResponse.json(
      { authorized: false, message: 'Erro ao verificar autorização' },
      { status: 500 }
    );
  }
}
