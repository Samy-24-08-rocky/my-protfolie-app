import { NextResponse } from 'next/server';
import { verifySession } from '@/lib/auth';

export const dynamic = 'force-dynamic';

export async function GET() {
    try {
        const session = await verifySession();
        if (session) {
            return NextResponse.json({ success: true, username: session.username });
        }
        return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });
    } catch {
        return NextResponse.json({ success: false }, { status: 500 });
    }
}
