import mongoose from 'mongoose';

/**
 * Global is used here to maintain a cached connection across hot reloads
 * in development. This prevents connections growing exponentially
 * during API Route usage.
 *
 * NOTE: The MONGODB_URI check is intentionally INSIDE dbConnect() so that
 * Next.js build-time static analysis does NOT throw an error when the
 * environment variable isn't in the build environment (it's only needed
 * at runtime on the server).
 */
let cached = (global as any).mongoose;

if (!cached) {
    cached = (global as any).mongoose = { conn: null, promise: null };
}

async function dbConnect() {
    const MONGODB_URI = process.env.MONGODB_URI || '';

    if (!MONGODB_URI) {
        throw new Error('Please define the MONGODB_URI environment variable in your Vercel project settings or .env.local');
    }

    if (cached.conn) {
        return cached.conn;
    }

    if (!cached.promise) {
        const opts = {
            bufferCommands: false,
        };

        cached.promise = mongoose.connect(MONGODB_URI, opts).then((mongoose) => {
            return mongoose;
        });
    }

    cached.conn = await cached.promise;
    return cached.conn;
}

export default dbConnect;
