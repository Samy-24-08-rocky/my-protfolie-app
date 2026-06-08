import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import { Message } from '@/lib/models';
import { verifySession } from '@/lib/auth';

export const dynamic = 'force-dynamic';

export async function GET() {
    try {
        const session = await verifySession();
        if (!session) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        await dbConnect();
        const messages = await Message.find({}).sort({ createdAt: -1 });
        return NextResponse.json(messages);
    } catch {
        return NextResponse.json([]);
    }
}

export async function POST(request: Request) {
    try {
        const data = await request.json();
        await dbConnect();
        const newMessage = await Message.create(data);
        return NextResponse.json(newMessage);
    } catch {
        return NextResponse.json({ error: 'Failed' }, { status: 500 });
    }
}

export async function DELETE(request: Request) {
    try {
        const session = await verifySession();
        if (!session) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const { searchParams } = new URL(request.url);
        const id = searchParams.get('id');
        await dbConnect();
        await Message.findByIdAndDelete(id);
        return NextResponse.json({ success: true });
    } catch {
        return NextResponse.json({ error: 'Failed' }, { status: 500 });
    }
}
