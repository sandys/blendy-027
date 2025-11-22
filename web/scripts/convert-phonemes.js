const fs = require('fs');
const path = require('path');

const INPUT_FILE = path.join(__dirname, '../lib/data/ace/phoneme_mapping.md');
const OUTPUT_FILE = path.join(__dirname, '../lib/data/ace/phoneme_map.json');

try {
    console.log(`Reading from ${INPUT_FILE}`);
    const content = fs.readFileSync(INPUT_FILE, 'utf-8');
    const map = {};

    const lines = content.split('\n');
    let inEnglishSection = false;

    for (const line of lines) {
        if (line.includes('## English Phoneme Mapping')) {
            inEnglishSection = true;
            continue;
        }
        if (line.startsWith('## ') && inEnglishSection) {
            inEnglishSection = false; // End of section
        }

        if (inEnglishSection && line.trim().startsWith('|')) {
            const parts = line.split('|').map(s => s.trim()).filter(s => s);
            // parts[0] = ACE, parts[1] = IPA
            if (parts.length >= 2 && parts[0] !== 'ACE Phoneme' && !parts[0].startsWith('---')) {
                const ace = parts[0];
                let ipa = parts[1];
                // Handle "ɔ/ɑ" -> take first
                if (ipa.includes('/')) ipa = ipa.split('/')[0];
                
                map[ace] = ipa;
            }
        }
    }

    fs.writeFileSync(OUTPUT_FILE, JSON.stringify(map, null, 2));
    console.log(`Converted phonemes to ${OUTPUT_FILE}`);
    console.log(`Mapped ${Object.keys(map).length} phonemes.`);
} catch (e) {
    console.error("Conversion failed", e);
    process.exit(1);
}
