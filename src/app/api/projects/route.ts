import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import { Project } from '@/lib/models';

export const dynamic = 'force-dynamic';

export async function GET() {
    try {
        await dbConnect();
        const items = await Project.find({}).sort({ createdAt: -1 });
        return NextResponse.json(items);
    } catch (error) {
        return NextResponse.json([]);
    }
}

export async function POST(request: Request) {
    try {
        const data = await request.json();
        await dbConnect();
        const newItem = await Project.create(data);
        return NextResponse.json(newItem);
    } catch (error) {
        return NextResponse.json({ error: 'Failed' }, { status: 500 });
    }
}

export async function PUT(request: Request) {
    try {
        const data = await request.json();
        const { _id, ...updateData } = data;
        await dbConnect();

        const updatedItem = await Project.findByIdAndUpdate(_id, updateData, { new: true });
        if (updatedItem) {
            return NextResponse.json(updatedItem);
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
        await dbConnect();
        await Project.findByIdAndDelete(id);
        return NextResponse.json({ success: true });
    } catch (error) {
        return NextResponse.json({ error: 'Failed' }, { status: 500 });
    }
}
