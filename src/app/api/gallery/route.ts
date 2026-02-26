import { NextResponse } from 'next/server';
import { readDb, writeDb } from '@/lib/db';

export const dynamic = 'force-dynamic';

export async function GET() {
    try {
        const db = await readDb();
        const items = db.gallery || [];
        return NextResponse.json(items);
    } catch (error) {
        return NextResponse.json([]);
    }
}

export async function POST(request: Request) {
    try {
        const data = await request.json();
        const db = await readDb();

        const newItem = {
            ...data,
            _id: Date.now().toString(),
            createdAt: new Date().toISOString()
        };

        db.gallery.push(newItem);
        await writeDb(db);

        return NextResponse.json(newItem);
    } catch (error) {
        return NextResponse.json({ error: 'Failed' }, { status: 500 });
    }
}

export async function PUT(request: Request) {
    try {
        const data = await request.json();
        const { _id, ...updateData } = data;
        const db = await readDb();

        const index = db.gallery.findIndex((i: any) => i._id === _id);
        if (index > -1) {
            db.gallery[index] = { ...db.gallery[index], ...updateData };
            await writeDb(db);
            return NextResponse.json(db.gallery[index]);
        }
        return NextResponse.json({ error: 'Not Found' }, { status: 404 });
    } catch (error) {
        return NextResponse.json({ error: 'Failed' }, { status: 500 });
    }
}

export async function DELETE(request: Request) {
    try {
        const { searchParams } = new URL(request.url);
        const id = searchParams.get('id');

        const db = await readDb();
        db.gallery = db.gallery.filter((i: any) => i._id !== id);
        await writeDb(db);

        return NextResponse.json({ success: true });
    } catch (error) {
        return NextResponse.json({ error: 'Failed' }, { status: 500 });
    }
}
