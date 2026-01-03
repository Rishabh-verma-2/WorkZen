const fs = require('fs');

const source = 'C:\\Users\\Home\\.gemini\\antigravity\\brain\\88e8e013-e4ec-48fe-8e03-b320800568bf\\workzen_logo_generated_1767425907108.png';

try {
    if (fs.existsSync(source)) {
        const data = fs.readFileSync(source);
        const base64 = data.toString('base64');
        console.log('BASE64_START');
        const chunkSize = 1000;
        for (let i = 0; i < base64.length; i += chunkSize) {
            console.log(base64.substring(i, i + chunkSize));
        }
        console.log('BASE64_END');
    } else {
        console.error('Source file not found');
    }
} catch (err) {
    console.error('Error:', err.message);
}
