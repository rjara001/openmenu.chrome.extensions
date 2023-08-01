const path = require('path');
const fs = require('fs');
const distDir = path.join(__dirname, '../dist');

function cleanDistDir() {
    if (fs.existsSync(distDir)) {
        fs.readdirSync(distDir).forEach((file) => {
            const filePath = path.join(distDir, file);
            if (fs.lstatSync(filePath).isFile()) {
                fs.unlinkSync(filePath);
            } else {
                fs.rmdirSync(filePath, { recursive: true });
            }
        });
        console.log('Dist directory cleaned.');
    }
}

cleanDistDir();
