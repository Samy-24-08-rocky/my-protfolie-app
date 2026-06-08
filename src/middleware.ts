import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const SECRET = process.env.SESSION_SECRET || 'fallback-secret-key-123456';

// Helper to generate base64url HMAC-SHA256 signature using Web Crypto API (fully supported in Edge)
async function hmacSha256(keyStr: string, dataStr: string): Promise<string> {
    const encoder = new TextEncoder();
    const keyData = encoder.encode(keyStr);
    const dataData = encoder.encode(dataStr);
    
    const cryptoKey = await globalThis.crypto.subtle.importKey(
        'raw',
        keyData,
        { name: 'HMAC', hash: 'SHA-256' },
        false,
        ['sign']
    );
    
    const signature = await globalThis.crypto.subtle.sign(
        'HMAC',
        cryptoKey,
        dataData
    );
    
    // Convert ArrayBuffer to base64url string
    const uint8 = new Uint8Array(signature);
    let binary = '';
    for (let i = 0; i < uint8.byteLength; i++) {
        binary += String.fromCharCode(uint8[i]);
    }
    return btoa(binary)
        .replace(/\+/g, '-')
        .replace(/\//g, '_')
        .replace(/=/g, '');
}

// Verifies the token signature and expiration
async function verifyToken(token: string): Promise<any> {
    const parts = token.split('.');
    if (parts.length !== 2) return null;
    const [encodedPayload, signature] = parts;
    const expectedSignature = await hmacSha256(SECRET, encodedPayload);
    
    if (signature !== expectedSignature) {
        return null;
    }
    
    try {
        const base64 = encodedPayload.replace(/-/g, '+').replace(/_/g, '/');
        const pad = base64.length % 4;
        const padded = pad ? base64 + '='.repeat(4 - pad) : base64;
        const payloadStr = atob(padded);
        const payload = JSON.parse(payloadStr);
        if (payload.exp && Date.now() > payload.exp) {
            return null; // Expired
        }
        return payload;
    } catch {
        return null;
    }
}

export async function middleware(request: NextRequest) {
    const { pathname } = request.nextUrl;
    const method = request.method;

    // Define routes that require authentication
    // 1. All methods on these paths require authentication
    const fullyProtectedPaths = [
        '/api/admin/change-credentials',
        '/api/maintenance',
        '/api/upload'
    ];

    // 2. Specific methods on these paths require authentication (mutations)
    const mutationProtectedPaths = [
        '/api/projects',
        '/api/gallery',
        '/api/settings',
        '/api/testimonials'
    ];

    // 3. Messages endpoint: GET and DELETE are protected, POST is public.
    const messageProtectedMethods = ['GET', 'DELETE'];

    let requiresAuth = false;

    if (fullyProtectedPaths.some(path => pathname === path || pathname.startsWith(path + '/'))) {
        requiresAuth = true;
    } else if (mutationProtectedPaths.some(path => pathname === path || pathname.startsWith(path + '/'))) {
        if (['POST', 'PUT', 'DELETE'].includes(method)) {
            requiresAuth = true;
        }
    } else if (pathname === '/api/messages' || pathname.startsWith('/api/messages/')) {
        if (messageProtectedMethods.includes(method)) {
            requiresAuth = true;
        }
    }

    if (requiresAuth) {
        const token = request.cookies.get('admin_session')?.value;
        if (!token || !(await verifyToken(token))) {
            return new NextResponse(
                JSON.stringify({ success: false, error: 'Unauthorized' }),
                { status: 401, headers: { 'content-type': 'application/json' } }
            );
        }
    }

    return NextResponse.next();
}

// Config to target only specific paths for optimization
export const config = {
    matcher: [
        '/api/admin/change-credentials',
        '/api/maintenance/:path*',
        '/api/upload/:path*',
        '/api/messages/:path*',
        '/api/projects/:path*',
        '/api/gallery/:path*',
        '/api/settings/:path*',
        '/api/testimonials/:path*',
    ],
};
