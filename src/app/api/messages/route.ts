import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import { Message } from '@/lib/models';

export const dynamic = 'force-dynamic';

export async function GET() {
    try {
        await dbConnect();
        const messages = await Message.find({}).sort({ createdAt: -1 });
        return NextResponse.json(messages);
    } catch (error) {
        return NextResponse.json([]);
    }
}

export async function POST(request: Request) {
    try {
        const data = await request.json();
        await dbConnect();
        const newMessage = await Message.create(data);
        return NextResponse.json(newMessage);
    } catch (error) {
        return NextResponse.json({ error: 'Failed' }, { status: 500 });
    }
}

export async function DELETE(request: Request) {
    try {
        const { searchParams } = new URL(request.url);
        const id = searchParams.get('id');
        await dbConnect();
        await Message.findByIdAndDelete(id);
        return NextResponse.json({ success: true });
    } catch (error) {
        return NextResponse.json({ error: 'Failed' }, { status: 500 });
    }
}
