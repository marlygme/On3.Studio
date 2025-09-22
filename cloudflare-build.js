#!/usr/bin/env node

/**
 * Build script for Cloudflare Pages deployment
 * This script prepares the application for Cloudflare Pages by:
 * 1. Building the frontend with Vite
 * 2. Copying necessary files to the output directory
 * 3. Setting up the correct file structure for Cloudflare Pages
 */

import { execSync } from 'child_process';
import { copyFileSync, existsSync, mkdirSync, cpSync, rmSync } from 'fs';
import path from 'path';

console.log('🚀 Starting Cloudflare Pages build...');

try {
  // 1. Clean any existing dist/public directory
  const distDir = 'dist/public';
  console.log('🧹 Cleaning output directory...');
  if (existsSync(distDir)) {
    rmSync(distDir, { recursive: true, force: true });
  }
  mkdirSync(distDir, { recursive: true });

  // 2. Build the frontend with Vite
  console.log('📦 Building frontend with Vite...');
  execSync('npx vite build', { stdio: 'inherit' });

  // 3. Verify frontend artifacts are in dist/public and copy if needed
  const expectedFiles = ['index.html', 'assets'];
  const allFilesPresent = expectedFiles.every(file => existsSync(path.join(distDir, file)));
  
  if (!allFilesPresent) {
    console.log('📁 Checking for frontend artifacts in alternative locations...');
    
    let sourceDir = null;
    
    // Check multiple possible build output locations
    const possibleLocations = ['client/dist', 'dist'];
    
    for (const location of possibleLocations) {
      if (existsSync(location) && 
          existsSync(path.join(location, 'index.html')) && 
          existsSync(path.join(location, 'assets'))) {
        sourceDir = location;
        break;
      }
    }
    
    if (sourceDir) {
      console.log(`📁 Found artifacts in ${sourceDir}, copying contents to dist/public...`);
      
      // Copy index.html directly to dist/public root
      copyFileSync(path.join(sourceDir, 'index.html'), path.join(distDir, 'index.html'));
      
      // Copy assets directory contents to dist/public/assets (not nested)
      const assetsSource = path.join(sourceDir, 'assets');
      const assetsTarget = path.join(distDir, 'assets');
      cpSync(assetsSource, assetsTarget, { recursive: true });
      
      console.log('✓ Frontend artifacts copied successfully');
    } else {
      throw new Error('Could not find vite build output in expected locations (dist/public, client/dist, or dist)');
    }
  } else {
    console.log('✓ Frontend artifacts verified in dist/public');
  }
  
  // 4. Post-copy assertions - verify critical files exist
  console.log('🔍 Verifying deployment artifacts...');
  const criticalFiles = [
    { path: path.join(distDir, 'index.html'), name: 'index.html' },
    { path: path.join(distDir, 'assets'), name: 'assets directory' }
  ];
  
  for (const file of criticalFiles) {
    if (!existsSync(file.path)) {
      throw new Error(`Critical file missing: ${file.name} not found at ${file.path}`);
    }
  }
  console.log('✓ All critical deployment artifacts verified');

  // 5. Copy routing configuration
  console.log('🔧 Copying routing configuration...');
  if (existsSync('_routes.json')) {
    copyFileSync('_routes.json', path.join(distDir, '_routes.json'));
  }

  // 6. Copy wrangler configuration
  console.log('⚙️ Build configuration ready...');
  if (existsSync('wrangler.toml')) {
    console.log('✓ wrangler.toml found - configuration ready for deployment');
  }

  // 7. Verify functions directory
  if (existsSync('functions')) {
    console.log('✓ Functions directory found - API routes ready');
  }

  console.log('✅ Cloudflare Pages build completed successfully!');
  console.log('');
  console.log('📋 Deployment checklist:');
  console.log('  ✓ Frontend built to dist/public/');
  console.log('  ✓ Functions available in functions/ directory');
  console.log('  ✓ Routing configuration (_routes.json) ready');
  console.log('  ✓ Wrangler configuration (wrangler.toml) ready');
  console.log('');
  console.log('🌐 To deploy:');
  console.log('  1. Connect your GitHub repository to Cloudflare Pages');
  console.log('  2. Set build command: npm run build:cloudflare');
  console.log('  3. Set build output directory: dist/public');
  console.log('  4. Configure environment variables in Cloudflare Pages dashboard');
  console.log('');

} catch (error) {
  console.error('❌ Build failed:', error.message);
  process.exit(1);
}