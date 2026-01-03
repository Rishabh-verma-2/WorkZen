const fs = require('fs');

const source = 'C:\\Users\\Home\\.gemini\\antigravity\\brain\\88e8e013-e4ec-48fe-8e03-b320800568bf\\uploaded_image_1767425714262.png';
const dest = 'e:\\workzen\\frontend\\base64.txt';

try {
    const data = fs.readFileSync(source);
    const base64 = data.toString('base64');
    fs.writeFileSync(dest, 'data:image/png;base64,' + base64);
    console.log('Done');
} catch (err) {
    fs.writeFileSync(dest, 'Error: ' + err.message);
}
