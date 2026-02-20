import { existsSync } from 'node:fs';
import { readdir } from 'node:fs/promises';
import path from 'node:path';

const scanRoots = process.argv.slice(2);
const blockedExtensions = new Set(['.pdf', '.doc', '.docx', '.odt', '.rtf']);

if (scanRoots.length === 0) {
  console.error('Usage: node scripts/check-no-sensitive-docs.mjs <folder> [folder...]');
  process.exit(1);
}

const findings = [];

async function walkDirectory(dirPath) {
  const entries = await readdir(dirPath, { withFileTypes: true });

  for (const entry of entries) {
    const fullPath = path.join(dirPath, entry.name);
    if (entry.isSymbolicLink()) {
      continue;
    }

    if (entry.isDirectory()) {
      await walkDirectory(fullPath);
      continue;
    }

    if (!entry.isFile()) {
      continue;
    }

    const ext = path.extname(entry.name).toLowerCase();
    if (blockedExtensions.has(ext)) {
      findings.push(fullPath);
    }
  }
}

for (const root of scanRoots) {
  const absoluteRoot = path.resolve(root);
  if (!existsSync(absoluteRoot)) {
    continue;
  }

  await walkDirectory(absoluteRoot);
}

if (findings.length > 0) {
  console.error('Blocked document files detected. Remove these before build/deploy:');
  for (const filePath of findings) {
    console.error(`- ${path.relative(process.cwd(), filePath)}`);
  }
  process.exit(1);
}

console.log(`No blocked document files found in: ${scanRoots.join(', ')}`);
