import { NextResponse } from 'next/server';
import { readDb, writeDb } from '@/lib/db';

export const dynamic = 'force-dynamic';

export async function GET() {
    try {
        const db = await readDb();
        const messages = db.messages || [];
        return NextResponse.json(messages);
    } catch (error) {
        return NextResponse.json([]);
    }
}

export async function POST(request: Request) {
    try {
        const data = await request.json();
        const db = await readDb();

        const newMessage = {
            ...data,
            _id: Date.now().toString(), // Offline unique ID
            createdAt: new Date().toISOString()
        };

        if (!db.messages) {
            db.messages = [];
        }

        db.messages.unshift(newMessage); // Put newest message at the top
        await writeDb(db);

        return NextResponse.json(newMessage);
    } catch (error) {
        return NextResponse.json({ error: 'Failed' }, { status: 500 });
    }
}

export async function DELETE(request: Request) {
    try {
        const { searchParams } = new URL(request.url);
        const id = searchParams.get('id');

        const db = await readDb();
        if (db.messages) {
            db.messages = db.messages.filter((m: any) => m._id !== id);
            await writeDb(db);
        }

        return NextResponse.json({ success: true });
    } catch (error) {
        return NextResponse.json({ error: 'Failed' }, { status: 500 });
    }
}
