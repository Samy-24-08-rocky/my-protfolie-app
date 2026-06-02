import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import { Testimonial } from '@/lib/models';

export const dynamic = 'force-dynamic';

export async function GET(request: Request) {
    try {
        const { searchParams } = new URL(request.url);
        const isAdmin = searchParams.get('admin') === 'true';
        await dbConnect();
        const query = isAdmin ? {} : { approved: { $ne: false } };
        const items = await Testimonial.find(query).sort({ createdAt: -1 });
        return NextResponse.json(items);
    } catch {
        return NextResponse.json([]);
    }
}

export async function POST(request: Request) {
    try {
        const data = await request.json();
        await dbConnect();
        const newItem = await Testimonial.create(data);
        return NextResponse.json(newItem);
    } catch {
        return NextResponse.json({ error: 'Failed' }, { status: 500 });
    }
}

export async function PUT(request: Request) {
    try {
        const data = await request.json();
        const { _id, ...updateData } = data;
        await dbConnect();

        const updatedItem = await Testimonial.findByIdAndUpdate(_id, updateData, { new: true });
        if (updatedItem) {
            return NextResponse.json(updatedItem);
        }
        return NextResponse.json({ error: 'Not Found' }, { status: 404 });
    } catch {
        return NextResponse.json({ error: 'Failed' }, { status: 500 });
    }
}

export async function DELETE(request: Request) {
    try {
        const { searchParams } = new URL(request.url);
        const id = searchParams.get('id');
        await dbConnect();
        await Testimonial.findByIdAndDelete(id);
        return NextResponse.json({ success: true });
    } catch {
        return NextResponse.json({ error: 'Failed' }, { status: 500 });
    }
}
