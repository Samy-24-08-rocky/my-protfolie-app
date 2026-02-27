const cloudinary = require('cloudinary').v2;
require('dotenv').config({ path: '.env.local' });

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

async function testUpload() {
    try {
        console.log("Testing ping to cloudinary...");
        const result = await cloudinary.api.ping();
        console.log("Ping success:", result);
    } catch (e) {
        console.error("Ping error:", e);
    }
}

testUpload();
