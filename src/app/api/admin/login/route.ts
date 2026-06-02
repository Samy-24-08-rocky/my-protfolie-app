import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import { Settings } from '@/lib/models';
import { createToken, verifyPassword } from '@/lib/auth';
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
        let salt = "";

        if (credsSetting && credsSetting.value) {
            allowedUsername = credsSetting.value.username || allowedUsername;
            allowedPasswordHash = credsSetting.value.passwordHash || allowedPasswordHash;
            salt = credsSetting.value.salt || "";
        }

        // 2. Validate password (support both legacy SHA-256 and salted PBKDF2)
        let isMatch = false;
        if (username === allowedUsername) {
            if (salt) {
                isMatch = verifyPassword(password, salt, allowedPasswordHash);
            } else {
                const inputPasswordHash = crypto.createHash('sha256').update(password).digest('hex');
                isMatch = inputPasswordHash === allowedPasswordHash;
            }
        }

        if (isMatch) {
            const token = createToken({
                username: allowedUsername,
                exp: Date.now() + 1000 * 60 * 60 * 24 // 24 hours
            });

            const response = NextResponse.json({ success: true });
            response.cookies.set({
                name: 'admin_session',
                value: token,
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production',
                sameSite: 'strict',
                maxAge: 60 * 60 * 24, // 1 day
                path: '/'
            });

            return response;
        } else {
            return NextResponse.json({ success: false, error: "Invalid credentials. Access denied." }, { status: 401 });
        }
    } catch (error) {
        console.error("Login API error:", error);
        return NextResponse.json({ success: false, error: "Internal server error" }, { status: 500 });
    }
}

