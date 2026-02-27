const fs = require('fs');
// Create a small dummy image for testing
const fileBuffer = Buffer.from('iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII=', 'base64');
fs.writeFileSync('dummy.png', fileBuffer);

async function testApi() {
    const formData = new FormData();
    const file = new Blob([fileBuffer], { type: 'image/png' });
    formData.append('file', file, 'dummy.png');

    try {
        const res = await fetch('http://127.0.0.1:3000/api/upload', {
            method: 'POST',
            body: formData
        });
        const data = await res.json();
        console.log("Response:", data);
        process.exit(0);
    } catch (e) {
        console.error("Fetch error:", e);
        process.exit(1);
    }
}
testApi();
