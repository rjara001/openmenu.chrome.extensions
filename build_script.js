const fs = require('fs');
const path = require('path');
const glob = require('glob');

const srcDir = path.join(__dirname, '');
const distDir = path.join(__dirname, 'dist');

// List of file patterns to move
const filesToMovePatterns = ['manifest.json'
    , 'pop_v1.html'
    , 'jquery/jquery.min.js'
    , 'html/index.html'
    , 'css/*'
    , 'icons/*'];


// Function to move a single file
function moveFile(sourcePath, destPath) {
    fs.copyFileSync(sourcePath, destPath);
    console.log(`Moved ${sourcePath} to ${destPath}`);
}

cleanDistDir();

// Ensure the dist directory exists
if (!fs.existsSync(distDir)) {
    fs.mkdirSync(distDir, { recursive: true });
}

// Move files matching each pattern to the dist folder
filesToMovePatterns.forEach((pattern) => {
    const files = glob.sync(pattern, { cwd: srcDir });
    files.forEach((file) => {
        const sourcePath = path.join(srcDir, file);
        const destPath = path.join(distDir, file);

        // Ensure the destination directory for each file exists
        const destDir = path.dirname(destPath);
        if (!fs.existsSync(destDir)) {
            fs.mkdirSync(destDir, { recursive: true });
        }

        moveFile(sourcePath, destPath);
    });
});

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
  
  

console.log('All files matching the patterns moved to the dist folder!');