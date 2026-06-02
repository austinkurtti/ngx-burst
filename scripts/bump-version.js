#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const bumpType = process.argv[2];

if (!['major', 'minor', 'patch'].includes(bumpType)) {
    console.error('Usage: node bump-version.js <major|minor|patch>');
    process.exit(1);
}

const packagePath = path.join(__dirname, '../projects/ngx-burst/package.json');

try {
    // Read current package.json
    const packageJson = JSON.parse(fs.readFileSync(packagePath, 'utf8'));
    const currentVersion = packageJson.version;

    // Parse version
    const [major, minor, patch] = currentVersion.split('.').map(Number);

    // Bump version based on type
    let newVersion;
    if (bumpType === 'major') {
        newVersion = `${major + 1}.0.0`;
    } else if (bumpType === 'minor') {
        newVersion = `${major}.${minor + 1}.0`;
    } else if (bumpType === 'patch') {
        newVersion = `${major}.${minor}.${patch + 1}`;
    }

    // Update package.json
    packageJson.version = newVersion;
    fs.writeFileSync(packagePath, JSON.stringify(packageJson, null, 2) + '\n');
    console.log(`✓ Updated version: ${currentVersion} → ${newVersion}`);

    // Stage the change
    execSync('git add projects/ngx-burst/package.json', { stdio: 'inherit' });
    console.log('✓ Staged package.json change');

    // Commit the change
    execSync(`git commit -m "Bump library version to ${newVersion}"`, { stdio: 'inherit' });
    console.log(`✓ Created commit`);

    // Create git tag
    const tagName = `v${newVersion}`;
    execSync(`git tag -a ${tagName} -m "Release ${tagName}"`, { stdio: 'inherit' });
    console.log(`✓ Created git tag: ${tagName}`);
} catch (error) {
    console.error('Error:', error.message);
    process.exit(1);
}
