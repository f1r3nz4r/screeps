
require('dotenv').config();

const fs = require('node:fs');
const path = require('node:path');

async function pull() {
    const branch = process.env.SCREEPS_BRANCH || 'default';
    const token = process.env.SCREEPS_TOKEN;

    if (!token) {
        throw new Error('Missing SCREEPS_TOKEN in .env');
    }

    const url = new URL('https://screeps.com/api/user/code');
    url.searchParams.set('branch', branch);

    const response = await fetch(url, {
        headers: {
            'X-Token': token
        }
    });

    if (!response.ok) {
        throw new Error(`Screeps API returned ${response.status}`);
    }

    const data = await response.json();

    if (!data.ok || !data.modules) {
        throw new Error(`Invalid Screeps response: ${JSON.stringify(data)}`);
    }

    const outputDir = path.resolve('src');
    fs.mkdirSync(outputDir, { recursive: true });

    for (const [name, code] of Object.entries(data.modules)) {
        // Avoid overwriting existing local files
        const filename = path.resolve(outputDir, `${name}.js`);

        if (!filename.startsWith(outputDir + path.sep)) {
            throw new Error(`Invalid module name: ${name}`);
        }

        if (fs.existsSync(filename)) {
            console.log(`Skipped existing file: ${name}.js`);
            continue;
        }

        fs.writeFileSync(filename, code, 'utf8');
        console.log(`Downloaded: ${name}.js`);
    }

    console.log(`Finished pulling branch: ${branch}`);
}

pull().catch(error => {
    console.error(error);
    process.exitCode = 1;
});
