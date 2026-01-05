const fs = require('fs');
const path = 'src/components/schematics/HomeAnatomy.tsx';

try {
  let content = fs.readFileSync(path, 'utf8');
  // Find the broken key={} and replace it with key={}
  const fixed = content.replace('key={}', 'key={}');
  
  if (content === fixed) {
    console.log("⚠️  Pattern not found. File might already be fixed or different.");
  } else {
    fs.writeFileSync(path, fixed);
    console.log("✅  SUCCESS: File patched. 'key={}' is now 'key={}'");
  }
} catch (e) {
  console.error("❌  Error:", e.message);
}
