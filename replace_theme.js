const fs = require('fs');
const path = require('path');

const srcDir = path.join(__dirname, 'src');

const replacements = [
  // Backgrounds
  { search: /bg-\[#FAF9F7\]/g, replace: 'bg-brand-pale' },
  { search: /bg-\[#F5F3FF\]/g, replace: 'bg-brand-lavender/30' },
  { search: /from-\[#F5F3FF\]/g, replace: 'from-brand-lavender' },
  { search: /to-\[#F5F3FF\]/g, replace: 'to-brand-pale' },
  { search: /from-\[#E0D4F5\]/g, replace: 'from-brand-lavender' },
  { search: /bg-white\/80/g, replace: 'bg-brand-pale/80' },
  { search: /bg-white\/50/g, replace: 'bg-brand-pale/50' },
  { search: /bg-white\/60/g, replace: 'bg-brand-pale/60' },
  { search: /border-violet-100/g, replace: 'border-brand-lavender' },
  { search: /border-violet-50/g, replace: 'border-brand-lavender' },
  { search: /bg-violet-50/g, replace: 'bg-brand-pale' },
  { search: /bg-violet-100/g, replace: 'bg-brand-pale' },
  { search: /hover:bg-violet-50/g, replace: 'hover:bg-brand-pale' },
  
  // Text
  { search: /text-\[#1A1A1A\]/g, replace: 'text-brand-navy' },
  { search: /text-\[#4B5563\]/g, replace: 'text-brand-steel' },
  { search: /text-\[#9d7dbc\]/g, replace: 'text-brand-periwinkle' },
  { search: /fill-\[#9d7dbc\]/g, replace: 'fill-brand-periwinkle' },

  // Gradients (Buttons and Accents)
  { search: /bg-gradient-to-r from-\[#9d7dbc\] to-\[#9d7dbc\]/g, replace: 'bg-gradient-to-r from-brand-navy to-brand-periwinkle hover:from-brand-periwinkle hover:to-brand-navy' },
  { search: /from-\[#9d7dbc\] to-\[#9d7dbc\]/g, replace: 'from-brand-navy to-brand-periwinkle' },
  { search: /from-transparent via-\[#9d7dbc\] to-transparent/g, replace: 'from-transparent via-brand-periwinkle to-transparent' },
  { search: /border-\[#9d7dbc\]/g, replace: 'border-brand-navy' },

  // Shadows
  { search: /shadow-\[0_0_15px_rgba\(124,58,237,0\.4\)\]/g, replace: 'shadow-[0_0_15px_rgba(112,145,230,0.4)]' },
  { search: /shadow-\[0_0_20px_rgba\(124,58,237,0\.5\)\]/g, replace: 'shadow-[0_0_20px_rgba(112,145,230,0.5)]' },
  { search: /shadow-\[0_0_25px_rgba\(124,58,237,0\.4\)\]/g, replace: 'shadow-[0_0_25px_rgba(112,145,230,0.4)]' },
  { search: /shadow-\[0_10px_40px_-10px_rgba\(124,58,237,0\.2\)\]/g, replace: 'shadow-[0_10px_40px_-10px_rgba(112,145,230,0.2)]' },
  { search: /shadow-\[0_10px_40px_-10px_rgba\(124,58,237,0\.15\)\]/g, replace: 'shadow-[0_10px_40px_-10px_rgba(112,145,230,0.15)]' },
  { search: /shadow-\[0_8px_30px_rgba\(124,58,237,0\.05\)\]/g, replace: 'shadow-[0_8px_30px_rgba(112,145,230,0.05)]' },
  { search: /shadow-\[0_8px_30px_rgba\(124,58,237,0\.08\)\]/g, replace: 'shadow-[0_8px_30px_rgba(112,145,230,0.08)]' },
  { search: /shadow-\[0_15px_40px_rgba\(124,58,237,0\.15\)\]/g, replace: 'shadow-[0_15px_40px_rgba(112,145,230,0.15)]' },
  { search: /shadow-\[0_0_30px_rgba\(124,58,237,0\.3\)\]/g, replace: 'shadow-[0_0_30px_rgba(112,145,230,0.3)]' },
  
  // Specific Footer / Nav BG overrides
  { search: /hover:bg-\[#9d7dbc\] hover:text-white/g, replace: 'hover:bg-gradient-to-r hover:from-brand-periwinkle hover:to-brand-navy hover:text-white hover:border-transparent' },
  { search: /bg-\[#9d7dbc\]/g, replace: 'bg-brand-navy' },
];

function processFile(filePath) {
  let content = fs.readFileSync(filePath, 'utf8');
  let originalContent = content;
  
  replacements.forEach(({ search, replace }) => {
    content = content.replace(search, replace);
  });

  if (content !== originalContent) {
    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`Updated colors in ${path.basename(filePath)}`);
  }
}

function walkDir(dir) {
  fs.readdirSync(dir).forEach(file => {
    const fullPath = path.join(dir, file);
    if (fs.lstatSync(fullPath).isDirectory()) {
      walkDir(fullPath);
    } else if (fullPath.endsWith('.js')) {
      processFile(fullPath);
    }
  });
}

walkDir(srcDir);
console.log('Done.');
