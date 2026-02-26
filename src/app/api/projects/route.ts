import { NextResponse } from 'next/server';
import { readDb, writeDb } from '@/lib/db';

export const dynamic = 'force-dynamic';

export async function GET() {
    try {
        const db = await readDb();
        const projects = db.projects || [];
        return NextResponse.json(projects);
    } catch (error) {
        return NextResponse.json([]);
    }
}

export async function POST(request: Request) {
    try {
        const data = await request.json();
        const db = await readDb();

        const newProject = {
            ...data,
            _id: Date.now().toString(), // Offline unique ID
            createdAt: new Date().toISOString()
        };

        db.projects.push(newProject);
        await writeDb(db);

        return NextResponse.json(newProject);
    } catch (error) {
        return NextResponse.json({ error: 'Failed' }, { status: 500 });
    }
}

export async function DELETE(request: Request) {
    try {
        const { searchParams } = new URL(request.url);
        const id = searchParams.get('id');

        const db = await readDb();
        db.projects = db.projects.filter((p: any) => p._id !== id);
        await writeDb(db);

        return NextResponse.json({ success: true });
    } catch (error) {
        return NextResponse.json({ error: 'Failed' }, { status: 500 });
    }
}
