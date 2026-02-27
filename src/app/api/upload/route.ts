import { NextResponse } from 'next/server';
import { v2 as cloudinary } from 'cloudinary';

// Configure Cloudinary with your backend secrets
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function GET() {
    try {
        const timestamp = Math.round(new Date().getTime() / 1000);

        // Parameters that need to be signed
        const paramsToSign = {
            timestamp,
            folder: 'portfolio_uploads'
        };

        const signature = cloudinary.utils.api_sign_request(
            paramsToSign,
            process.env.CLOUDINARY_API_SECRET as string
        );

        return NextResponse.json({
            signature,
            timestamp,
            cloudName: process.env.CLOUDINARY_CLOUD_NAME,
            apiKey: process.env.CLOUDINARY_API_KEY
        });
    } catch (error: any) {
        console.error('Signature generation error:', error);
        return NextResponse.json({ error: 'Signature failed', details: error?.message }, { status: 500 });
    }
}
