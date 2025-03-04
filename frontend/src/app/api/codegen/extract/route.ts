import { createClient } from '@/lib/supabase/server';
import { NextRequest, NextResponse } from 'next/server';

const NEXT_PUBLIC_BACKEND_URL =
  process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:5004';

export async function POST(request: NextRequest) {
  const supabase = await createClient();

  // Get the session from Supabase
  const {
    data: { session },
    error: sessionError,
  } = await supabase.auth.getSession();

  if (sessionError || !session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const data = await request.json();
    const res = await fetch(`${NEXT_PUBLIC_BACKEND_URL}/v1/codegen/extract`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${session.access_token}`,
      },
      body: JSON.stringify(data),
    });

    const code = await res.json();

    if (res.status !== 200) {
      console.warn('Codegen(extract) failed:', code);
    }

    return NextResponse.json(code, { status: res.status });
  } catch (e) {
    console.error('Error:', e);
    return NextResponse.json({ error: (e as Error).message }, { status: 500 });
  }
}
