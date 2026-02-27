import { NextResponse } from 'next/server';
import { v2 as cloudinary } from 'cloudinary';

// Configure Cloudinary with your backend secrets
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function POST(request: Request) {
    try {
        const formData = await request.formData();
        const file = formData.get('file') as File | null;

        if (!file) {
            return NextResponse.json({ error: 'No file provided' }, { status: 400 });
        }

        // Convert file to buffer for Cloudinary SDK
        const arrayBuffer = await file.arrayBuffer();
        const buffer = Buffer.from(arrayBuffer);

        // Upload using a Promise so we can await it
        const uploadResult: any = await new Promise((resolve, reject) => {
            cloudinary.uploader.upload_stream(
                {
                    resource_type: 'auto',
                    folder: 'portfolio_uploads',
                    timeout: 600000, // 10 minutes for slow network/large video files
                    chunk_size: 6000000 // 6MB chunks for massive files
                },
                (error, result) => {
                    if (error) {
                        reject(error);
                    } else {
                        resolve(result);
                    }
                }
            ).end(buffer);
        });

        // Return the result containing the secure URL
        return NextResponse.json(uploadResult);

    } catch (error: any) {
        console.error('Upload error deep dive:', error);
        return NextResponse.json({
            error: 'Upload failed',
            details: error?.message || error?.toString() || JSON.stringify(error)
        }, { status: 500 });
    }
}
