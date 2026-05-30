import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import { Settings } from '@/lib/models';
import crypto from 'crypto';

export const dynamic = 'force-dynamic';

export async function POST(request: Request) {
    try {
        const { username, password } = await request.json();
        await dbConnect();

        // 1. Fetch credentials from Settings
        const credsSetting = await Settings.findOne({ key: 'admin_credentials' });

        let allowedUsername = "admin";
        let allowedPasswordHash = crypto.createHash('sha256').update("sumit123").digest('hex');

        if (credsSetting && credsSetting.value) {
            allowedUsername = credsSetting.value.username || allowedUsername;
            allowedPasswordHash = credsSetting.value.passwordHash || allowedPasswordHash;
        }

        // 2. Hash the input password to compare
        const inputPasswordHash = crypto.createHash('sha256').update(password).digest('hex');

        if (username === allowedUsername && inputPasswordHash === allowedPasswordHash) {
            return NextResponse.json({ success: true });
        } else {
            return NextResponse.json({ success: false, error: "Invalid credentials. Access denied." }, { status: 401 });
        }
    } catch (error) {
        console.error("Login API error:", error);
        return NextResponse.json({ success: false, error: "Internal server error" }, { status: 500 });
    }
}
