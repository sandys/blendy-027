const fs = require('fs');
const path = require('path');
const https = require('https');
const { execSync } = require('child_process');

const MODEL_DIR = path.join(__dirname, '../assets/models/piper');
const ESPEAK_DIR = path.join(MODEL_DIR, 'espeak-ng-data');

if (!fs.existsSync(MODEL_DIR)) {
  fs.mkdirSync(MODEL_DIR, { recursive: true });
}

// URLs for vits-piper-en_US-amy-low
const BASE_URL = "https://github.com/k2-fsa/sherpa-onnx/releases/download/tts-models";
const MODEL_TAR = "vits-piper-en_US-amy-low.tar.bz2"; 
// Actually, getting the tarball is easier to extract all needed files including tokens and json.

const DOWNLOAD_URL = `${BASE_URL}/${MODEL_TAR}`;
const OUTPUT_FILE = path.join(MODEL_DIR, MODEL_TAR);

console.log(`Downloading ${MODEL_TAR}...`);

// Helper to download
const download = (url, dest) => {
  return new Promise((resolve, reject) => {
    const file = fs.createWriteStream(dest);
    https.get(url, (response) => {
      response.pipe(file);
      file.on('finish', () => {
        file.close(resolve);
      });
    }).on('error', (err) => {
      fs.unlink(dest, () => reject(err));
    });
  });
};

download(DOWNLOAD_URL, OUTPUT_FILE).then(() => {
  console.log("Download complete. Extracting...");
  try {
    // Use tar to extract
    execSync(`tar -xvf ${OUTPUT_FILE} -C ${MODEL_DIR}`, { stdio: 'inherit' });
    
    // Clean up tar
    fs.unlinkSync(OUTPUT_FILE);
    
    console.log("Extraction complete.");
    console.log(`Models located in ${MODEL_DIR}`);
  } catch (e) {
    console.error("Extraction failed. Do you have 'tar' installed?", e);
  }
}).catch(console.error);
