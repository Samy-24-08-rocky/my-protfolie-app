import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import { Settings } from '@/lib/models';
import { verifySession } from '@/lib/auth';

export const dynamic = 'force-dynamic';

export async function GET() {
    try {
        await dbConnect();
        const items = await Settings.find({ key: { $ne: 'admin_credentials' } });
        // Reduce the array to a single key/value object that the frontend is expecting
        const mappedSettings = items.reduce((acc: any, curr: any) => {
            acc[curr.key] = curr.value;
            return acc;
        }, {});

        return NextResponse.json(mappedSettings);
    } catch (error) {
        return NextResponse.json({});
    }
}

export async function POST(request: Request) {
    try {
        const session = await verifySession();
        if (!session) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const data = await request.json();
        // Prevent privilege escalation
        if (data.key === 'admin_credentials') {
            return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
        }

        await dbConnect();

        // Upsert setting key
        const updatedItem = await Settings.findOneAndUpdate(
            { key: data.key },
            { value: data.value },
            { new: true, upsert: true }
        );

        return NextResponse.json({ success: true, item: updatedItem });
    } catch (error) {
        return NextResponse.json({ error: 'Failed' }, { status: 500 });
    }
}

