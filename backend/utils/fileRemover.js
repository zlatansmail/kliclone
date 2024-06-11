import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export const fileRemover = (filename) => {
    fs.unlink(path.join(__dirname, '../uploads/', filename), (error) => {
        if (error && error.code === 'ENOENT') {
            console.log(`File ${filename} not found`);
        } else if (error) {
            console.error(`Error occurred while removing file ${filename}`);
        } else {
            console.log(`File ${filename} removed`);
        }
    })
};