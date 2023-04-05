const fs = require('fs-extra');
const path = require('path');

const excludedFolders = [
    /* Add the folders you want to exclude. This will exclude all files 
    and folders in the folder. Only works for folders on same level as 
    'generate-summary.js'. For nested folders, use 'excludedPaths' 
    instead.*/
    // 'node_modules',
    // '.git',
];

const excludedFiles = [
    /* Add exact file name if on same level as 'generate-summary.js' */
    //'.env',

    /* Add exact file path if not on same level as 'generate-summary.js' */
    //'./app/Console/Kernel.php', 
];

const excludedPaths = [
    /* Add the paths you want to exclude. This will exclude all files and 
    folders in the path */
    // 'app/Http/Middleware/', 
   
];

// Output file path
const outputPath = './output.txt';

function shouldBeExcluded(filePath) {
    return (
        excludedPaths.some(excludedPath => filePath.includes(excludedPath)) ||
        excludedFiles.some(excludedFile => {
            const relativeFilePath = path.relative('.', excludedFile);
            return relativeFilePath === filePath || filePath === excludedFile; // Add exact file match check
        })
    );
}

function generateFolderTree(folder, parentFolder, level) {
    const folderPath = `${parentFolder}/${folder}`;
    const files = fs.readdirSync(folderPath).filter(file => {
        const filePath = `${folderPath}/${file}`;
        const relativeFilePath = filePath.slice(2);
        const excludeFolder = excludedFolders.includes(file) && fs.statSync(filePath).isDirectory();
        const excludeFile = excludedFiles.includes(file) && !fs.statSync(filePath).isDirectory();
        return !excludeFolder && !excludeFile && !shouldBeExcluded(relativeFilePath);
    });

    const prefix = '  '.repeat(level) + '|_';

    files.forEach(file => {
        const filePath = `${folderPath}/${file}`;
        const isDirectory = fs.statSync(filePath).isDirectory();

        if (!shouldBeExcluded(filePath.slice(2))) {
            if (!isDirectory) {
                const fileContent = fs.readFileSync(filePath, 'utf-8');
                const writeStream = fs.createWriteStream(outputPath, { flags: 'a' });
                writeStream.setMaxListeners(20); // Increase max listeners
                writeStream.write(`${prefix}${file}\n\n${fileContent}\n\n`);
                writeStream.close();
            } else {
                const writeStream = fs.createWriteStream(outputPath, { flags: 'a' });
                writeStream.setMaxListeners(20); // Increase max listeners
                writeStream.write(`${prefix}${file}\n`);
                writeStream.close();
                generateFolderTree(file, folderPath, level + 1);
            }
        }
    });
}

fs.writeFileSync(outputPath, ''); // Clear the output file before writing
generateFolderTree('.', '.', 0);
