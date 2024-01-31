const { execSync } = require('node:child_process');
const fs = require('fs');
const sanitize = require('sanitize-filename');
const CLAM_PATH = 'c:\\Program Files\\ClamAV';

function clamScan(filename:string):boolean {
    const sanitizedFile = sanitize(filename);
    execSync(CLAM_PATH + '\\bin\\clamscan --remove ' + sanitizedFile );
    return fs.existsSync(filename);
}