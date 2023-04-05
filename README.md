# Generate Project Summary (script for Node.js)

This script generates a summary of the files and folders in the directory where the script is run. It creates a text file named output.txt in the same directory, which includes a file tree of the project (excluding some folders/files, defined in excludedFolders, excludedFiles, and excludedPaths arrays) and, after the file tree, the contents of specific files copied as they are.

## Setup

Clone or download this repository to your local machine.

Install Node.js.

Open a terminal window and navigate to the directory where the script is located.

Run `npm install` to install dependencies.

## Usage
Open a terminal window and navigate to the directory where the script is located.

Run `node generate-summary.js` to generate the summary.

The output will be written to output.txt in the same directory.

## Configuration

`excludedFolders`

An array of folders to exclude from the file tree.

Example:

```
const excludedFolders = [
  'node_modules',
  '.git',
];
```

`excludedFiles`

An array of exact file names to exclude from the file tree.

Example:

```
const excludedFiles = [
  '.env',
];
```

`excludedPaths`

An array of paths to exclude from the file tree.

Example:
```
const excludedPaths = [
  'app/Http/Middleware/',
];
```

`outputPath`

The path of the output file.

Example:

```
const outputPath = './output.txt';
```

Notes
- The script will clear the output file before writing to it.
- If you encounter a "Possible EventEmitter memory leak detected" warning, you can increase the maximum number of listeners by setting writeStream.setMaxListeners(n) to a higher number.