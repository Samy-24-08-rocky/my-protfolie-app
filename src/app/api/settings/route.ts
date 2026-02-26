import { NextResponse } from 'next/server';
import { readDb, writeDb } from '@/lib/db';

export const dynamic = 'force-dynamic';

export async function GET() {
    try {
        const db = await readDb();

        // Convert array format to key-value config object like MongoDB did
        const config = (db.settings || []).reduce((acc: any, curr: any) => {
            acc[curr.key] = curr.value;
            return acc;
        }, {});

        return NextResponse.json(config);
    } catch (error) {
        return NextResponse.json({});
    }
}

export async function POST(request: Request) {
    try {
        const { key, value } = await request.json();
        const db = await readDb();

        // Upsert logic for offline DB
        const existingIndex = db.settings.findIndex((s: any) => s.key === key);
        if (existingIndex > -1) {
            db.settings[existingIndex].value = value;
        } else {
            db.settings.push({ key, value, _id: Date.now().toString() });
        }

        await writeDb(db);
        return NextResponse.json({ success: true });
    } catch (error) {
        return NextResponse.json({ error: 'Failed' }, { status: 500 });
    }
}
