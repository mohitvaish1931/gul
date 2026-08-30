#!/usr/bin/env node

/**
 * Bundle Analysis Report
 * Analyzes the built bundles and provides optimization suggestions
 */

import fs from 'fs';
import path from 'path';

function getFileSizeInKB(filePath) {
  try {
    const stats = fs.statSync(filePath);
    return (stats.size / 1024).toFixed(2);
  } catch {
    return 'N/A';
  }
}

function analyzeBundle() {
  const distPath = path.join(process.cwd(), '../dist');
  
  if (!fs.existsSync(distPath)) {
    console.log('❌ dist/ folder not found. Run build first.');
    return;
  }

  console.log('\n📊 BUNDLE ANALYSIS REPORT\n');
  console.log('=' .repeat(60));

  const jsFiles = [];
  const cssFiles = [];
  const assetFiles = [];

  function walkDir(dir, prefix = '') {
    const files = fs.readdirSync(dir);
    files.forEach(file => {
      const fullPath = path.join(dir, file);
      const stat = fs.statSync(fullPath);
      if (stat.isDirectory()) {
        walkDir(fullPath, prefix + file + '/');
      } else {
        const relativePath = prefix + file;
        const sizeKB = getFileSizeInKB(fullPath);
        if (file.endsWith('.js')) jsFiles.push({ name: relativePath, size: sizeKB });
        else if (file.endsWith('.css')) cssFiles.push({ name: relativePath, size: sizeKB });
        else if (!file.endsWith('.html')) assetFiles.push({ name: relativePath, size: sizeKB });
      }
    });
  }

  walkDir(distPath);

  // Sort by size
  jsFiles.sort((a, b) => parseFloat(b.size) - parseFloat(a.size));
  cssFiles.sort((a, b) => parseFloat(b.size) - parseFloat(a.size));
  assetFiles.sort((a, b) => parseFloat(b.size) - parseFloat(a.size));

  console.log('\n📜 JavaScript Bundles:');
  console.log('-' .repeat(60));
  jsFiles.slice(0, 10).forEach(f => {
    console.log(`  ${f.name.padEnd(40)} ${f.size.padStart(8)} KB`);
  });
  const totalJS = jsFiles.reduce((sum, f) => sum + parseFloat(f.size), 0);
  console.log('-' .repeat(60));
  console.log(`  TOTAL: ${totalJS.toFixed(2)} KB`);

  console.log('\n🎨 CSS Files:');
  console.log('-' .repeat(60));
  cssFiles.forEach(f => {
    console.log(`  ${f.name.padEnd(40)} ${f.size.padStart(8)} KB`);
  });
  const totalCSS = cssFiles.reduce((sum, f) => sum + parseFloat(f.size), 0);
  console.log('-' .repeat(60));
  console.log(`  TOTAL: ${totalCSS.toFixed(2)} KB`);

  console.log('\n🖼️  Assets (Top 10):');
  console.log('-' .repeat(60));
  assetFiles.slice(0, 10).forEach(f => {
    console.log(`  ${f.name.padEnd(40)} ${f.size.padStart(8)} KB`);
  });
  const totalAssets = assetFiles.reduce((sum, f) => sum + parseFloat(f.size), 0);
  console.log('-' .repeat(60));
  console.log(`  TOTAL: ${totalAssets.toFixed(2)} KB`);

  const totalSize = totalJS + totalCSS + totalAssets;
  console.log('\n' + '=' .repeat(60));
  console.log(`  🎯 TOTAL BUILD SIZE: ${totalSize.toFixed(2)} KB`);
  console.log('=' .repeat(60));

  // Recommendations
  console.log('\n💡 OPTIMIZATION RECOMMENDATIONS:\n');
  if (totalJS > 500) {
    console.log('  ⚠️  JavaScript bundle > 500KB. Consider:');
    console.log('     - Further code splitting');
    console.log('     - Removing unused dependencies');
    console.log('     - Tree-shaking unused exports');
  }
  if (totalCSS > 100) {
    console.log('  ⚠️  CSS bundle > 100KB. Consider:');
    console.log('     - PurgeCSS is enabled in Tailwind');
    console.log('     - Remove unused Tailwind utilities');
  }
  
  console.log('\n✅ Check dist/bundle-analysis.html for visual breakdown\n');
}

analyzeBundle();
