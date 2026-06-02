import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import { Settings } from '@/lib/models';
import { hashPassword, verifyPassword, verifySession } from '@/lib/auth';
import crypto from 'crypto';

export const dynamic = 'force-dynamic';

export async function POST(request: Request) {
    try {
        // 0. Verify the current admin session first
        const session = await verifySession();
        if (!session) {
            return NextResponse.json({ success: false, error: "Unauthorized access" }, { status: 401 });
        }

        const { currentPassword, newUsername, newPassword } = await request.json();
        
        if (!currentPassword || !newUsername || !newPassword) {
            return NextResponse.json({ success: false, error: "Missing required fields" }, { status: 400 });
        }

        await dbConnect();

        // 1. Fetch current credentials to verify
        const credsSetting = await Settings.findOne({ key: 'admin_credentials' });

        let allowedUsername = "admin";
        let allowedPasswordHash = crypto.createHash('sha256').update("sumit123").digest('hex');
        let salt = "";

        if (credsSetting && credsSetting.value) {
            allowedUsername = credsSetting.value.username || allowedUsername;
            allowedPasswordHash = credsSetting.value.passwordHash || allowedPasswordHash;
            salt = credsSetting.value.salt || "";
        }

        // 2. Verify current password (support legacy SHA-256 and salted PBKDF2)
        let isMatch = false;
        if (salt) {
            isMatch = verifyPassword(currentPassword, salt, allowedPasswordHash);
        } else {
            const currentPasswordHash = crypto.createHash('sha256').update(currentPassword).digest('hex');
            isMatch = currentPasswordHash === allowedPasswordHash;
        }

        if (!isMatch) {
            return NextResponse.json({ success: false, error: "Incorrect current password. Verification failed." }, { status: 401 });
        }

        // 3. Hash the new password using secure PBKDF2 and update the DB
        const newCrypto = hashPassword(newPassword);

        await Settings.findOneAndUpdate(
            { key: 'admin_credentials' },
            { 
                value: {
                    username: newUsername,
                    passwordHash: newCrypto.hash,
                    salt: newCrypto.salt
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

