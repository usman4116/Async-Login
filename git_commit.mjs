import git from 'isomorphic-git';
import http from 'isomorphic-git/http/node/index.js';
import fs from 'node:fs';
import path from 'node:path';

const dir = process.cwd();

async function main() {
  console.log('Initializing git repository in:', dir);
  await git.init({ fs, dir, defaultBranch: 'main' });

  // List all files to add
  const files = [
    'package.json',
    'tsconfig.json',
    'next.config.mjs',
    'middleware.ts',
    '.gitignore',
    '.env.example',
    '.env.local',
    'README.md',
    'app/layout.tsx',
    'app/page.tsx',
    'app/globals.css',
    'app/login/page.tsx'
  ];

  for (const file of files) {
    const fullPath = path.join(dir, file);
    if (fs.existsSync(fullPath)) {
      await git.add({ fs, dir, filepath: file });
      console.log('Added:', file);
    }
  }

  const sha = await git.commit({
    fs,
    dir,
    author: {
      name: 'AetherSync',
      email: 'dev@theaethersync.com',
    },
    message: 'Initial commit: AetherSync Clerk Authentication for Vercel',
  });
  console.log('Committed SHA:', sha);
}

main().catch(err => {
  console.error('Git error:', err);
  process.exit(1);
});
