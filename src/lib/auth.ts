import crypto from 'crypto';
import { cookies } from 'next/headers';

const SECRET = process.env.SESSION_SECRET || 'fallback-secret-key-123456';

// Generates a base64url HMAC-SHA256 signature
function sign(payloadStr: string): string {
    return crypto.createHmac('sha256', SECRET).update(payloadStr).digest('base64url');
}

// Creates a secure signed token
export function createToken(payload: object): string {
    const encodedPayload = Buffer.from(JSON.stringify(payload)).toString('base64url');
    const signature = sign(encodedPayload);
    return `${encodedPayload}.${signature}`;
}

// Verifies the token signature and expiration
export function verifyToken(token: string): any {
    const parts = token.split('.');
    if (parts.length !== 2) return null;
    const [encodedPayload, signature] = parts;
    const expectedSignature = sign(encodedPayload);
    
    const sigBuffer = Buffer.from(signature);
    const expectedBuffer = Buffer.from(expectedSignature);
    
    if (sigBuffer.length !== expectedBuffer.length) {
        return null;
    }
    
    if (!crypto.timingSafeEqual(sigBuffer, expectedBuffer)) {
        return null;
    }
    
    try {
        const payloadStr = Buffer.from(encodedPayload, 'base64url').toString('utf8');
        const payload = JSON.parse(payloadStr);
        if (payload.exp && Date.now() > payload.exp) {
            return null; // Expired
        }
        return payload;
    } catch {
        return null;
    }
}

// Hashes a password with salt using PBKDF2
export function hashPassword(password: string): { hash: string; salt: string } {
    const salt = crypto.randomBytes(16).toString('hex');
    const hash = crypto.pbkdf2Sync(password, salt, 10000, 64, 'sha512').toString('hex');
    return { hash, salt };
}

// Verifies a password hash
export function verifyPassword(password: string, salt: string, expectedHash: string): boolean {
    const hash = crypto.pbkdf2Sync(password, salt, 10000, 64, 'sha512').toString('hex');
    const hashBuf = Buffer.from(hash);
    const expectedBuf = Buffer.from(expectedHash);
    
    if (hashBuf.length !== expectedBuf.length) {
        return false;
    }
    
    return crypto.timingSafeEqual(hashBuf, expectedBuf);
}

// Helper to verify request session from HttpOnly cookies
export async function verifySession(): Promise<any> {
    try {
        const cookieStore = await cookies();
        const token = cookieStore.get('admin_session')?.value;
        if (!token) return null;
        return verifyToken(token);
    } catch {
        return null;
    }
}
