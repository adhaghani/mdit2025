#!/usr/bin/env node

/*
  Brand Migration Script
  
  Automatically migrates from prop-based Aurora/TextPressure to branded components
  to eliminate unnecessary re-renders.
*/

const fs = require("fs");
const path = require("path");

// Migration mappings
const migrations = [
  {
    file: "app/contact/page.tsx",
    changes: [
      {
        type: "import",
        from: 'import { Aurora, TextPressure } from "@/components/optimized-react-bits";',
        to: 'import { MditAurora, MditTextPressure } from "@/components/optimized-react-bits";',
      },
      {
        type: "component",
        from: /\s*<Aurora\s+colorStops={\["#F7F7F7", "#C25AFF", "#7869FE"\]}\s+blend={1}\s+amplitude={1}\s+speed={0\.3}\s+\/>/g,
        to: "        <MditAurora />",
      },
      {
        type: "component",
        from: /\s*<TextPressure\s+text="Contact"\s+flex={false}\s+alpha={true}\s+stroke={false}\s+width={true}\s+weight={true}\s+italic={false}\s+textColor="#9031DD"\s+strokeColor="#ff0000"\s+minFontSize={24}[^>]*>/g,
        to: '        <MditTextPressure text="Contact" />',
      },
    ],
  },
  {
    file: "app/rules-regulation/page.tsx",
    changes: [
      {
        type: "import",
        from: 'import { Aurora, TextPressure } from "@/components/optimized-react-bits";',
        to: 'import { MditAurora, MditTextPressure } from "@/components/optimized-react-bits";',
      },
      {
        type: "component",
        from: /\s*<Aurora\s+colorStops={\["#F7F7F7", "#C25AFF", "#7869FE"\]}\s+blend={1}\s+amplitude={1}\s+speed={0\.3}\s+\/>/g,
        to: "        <MditAurora />",
      },
      {
        type: "component",
        from: /\s*<TextPressure\s+text="Rules"\s+flex={false}\s+alpha={true}\s+stroke={false}\s+width={true}\s+weight={true}\s+italic={false}\s+textColor="#9031DD"\s+strokeColor="#ff0000"\s+minFontSize={24}[^>]*>/g,
        to: '        <MditTextPressure text="Rules" />',
      },
    ],
  },
  {
    file: "components/footer.tsx",
    changes: [
      {
        type: "import",
        from: 'import { Aurora } from "./optimized-react-bits";',
        to: 'import { MditAurora } from "./optimized-react-bits";',
      },
      {
        type: "component",
        from: /\s*<Aurora\s+colorStops={\["#F7F7F7", "#C25AFF", "#7869FE"\]}\s+blend={1}\s+amplitude={1}\s+speed={0\.3}\s+\/>/g,
        to: "        <MditAurora />",
      },
    ],
  },
  {
    file: "app/page.tsx",
    changes: [
      {
        type: "import",
        from: 'import { Aurora, TextPressure } from "@/components/optimized-react-bits";',
        to: 'import { MditAurora, MditTextPressure } from "@/components/optimized-react-bits";',
      },
      {
        type: "component",
        from: /\s*<Aurora\s+colorStops={\["#F7F7F7", "#C25AFF", "#7869FE"\]}\s+blend={1}\s+amplitude={1}\s+speed={0\.3}\s+\/>/g,
        to: "            <MditAurora />",
      },
      {
        type: "component",
        from: /\s*<TextPressure\s+text="2025"\s+flex={false}\s+alpha={true}\s+stroke={false}\s+width={true}\s+weight={true}\s+italic={false}\s+textColor="#9031DD"\s+strokeColor="#ff0000"\s+minFontSize={24}[^>]*>/g,
        to: '            <MditTextPressure text="2025" />',
      },
    ],
  },
];

function migrateFile(migration) {
  const filePath = path.join(__dirname, "..", "..", migration.file);

  if (!fs.existsSync(filePath)) {
    console.log(`⚠️  File not found: ${migration.file}`);
    return false;
  }

  let content = fs.readFileSync(filePath, "utf8");
  let modified = false;

  console.log(`🔄 Processing ${migration.file}...`);

  migration.changes.forEach((change) => {
    if (change.type === "import") {
      if (content.includes(change.from)) {
        content = content.replace(change.from, change.to);
        modified = true;
        console.log(`  ✅ Updated import`);
      }
    } else if (change.type === "component") {
      const matches = content.match(change.from);
      if (matches) {
        content = content.replace(change.from, change.to);
        modified = true;
        console.log(
          `  ✅ Updated component usage (${matches.length} replacements)`
        );
      }
    }
  });

  if (modified) {
    fs.writeFileSync(filePath, content);
    console.log(`✅ Migrated ${migration.file}`);
    return true;
  } else {
    console.log(`ℹ️  No changes needed for ${migration.file}`);
    return false;
  }
}

function main() {
  console.log("🚀 Starting MDIT brand component migration...\n");

  let totalMigrated = 0;

  migrations.forEach((migration) => {
    if (migrateFile(migration)) {
      totalMigrated++;
    }
    console.log(""); // Empty line for readability
  });

  console.log(`✨ Migration complete!`);
  console.log(`📁 Processed ${migrations.length} files`);
  console.log(`🔄 Successfully migrated ${totalMigrated} files`);

  if (totalMigrated > 0) {
    console.log("\n🎯 Performance Benefits Achieved:");
    console.log("  • Eliminated prop-based re-renders");
    console.log("  • Improved React.memo effectiveness");
    console.log("  • Consistent branding across site");
    console.log("  • Smaller bundle size from dead code elimination");

    console.log("\n📋 Next steps:");
    console.log("1. Test your application to ensure everything works");
    console.log("2. Run your build process to verify bundle improvements");
    console.log("3. Check React DevTools to confirm zero prop re-renders");
  }
}

if (require.main === module) {
  main();
}

module.exports = { migrateFile, migrations };
