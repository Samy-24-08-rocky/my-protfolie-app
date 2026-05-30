import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import { Settings } from '@/lib/models';
import crypto from 'crypto';

export const dynamic = 'force-dynamic';

export async function POST(request: Request) {
    try {
        const { currentPassword, newUsername, newPassword } = await request.json();
        
        if (!currentPassword || !newUsername || !newPassword) {
            return NextResponse.json({ success: false, error: "Missing required fields" }, { status: 400 });
        }

        await dbConnect();

        // 1. Fetch current credentials to verify
        const credsSetting = await Settings.findOne({ key: 'admin_credentials' });

        let allowedUsername = "admin";
        let allowedPasswordHash = crypto.createHash('sha256').update("sumit123").digest('hex');

        if (credsSetting && credsSetting.value) {
            allowedUsername = credsSetting.value.username || allowedUsername;
            allowedPasswordHash = credsSetting.value.passwordHash || allowedPasswordHash;
        }

        // 2. Verify current password
        const currentPasswordHash = crypto.createHash('sha256').update(currentPassword).digest('hex');
        if (currentPasswordHash !== allowedPasswordHash) {
            return NextResponse.json({ success: false, error: "Incorrect current password. Verification failed." }, { status: 401 });
        }

        // 3. Hash the new password and update the DB
        const newPasswordHash = crypto.createHash('sha256').update(newPassword).digest('hex');

        await Settings.findOneAndUpdate(
            { key: 'admin_credentials' },
            { 
                value: {
                    username: newUsername,
                    passwordHash: newPasswordHash
                }
            },
            { new: true, upsert: true }
        );

        return NextResponse.json({ success: true, message: "Credentials updated successfully" });

    } catch (error) {
        console.error("Change credentials API error:", error);
        return NextResponse.json({ success: false, error: "Internal server error" }, { status: 500 });
    }
}
