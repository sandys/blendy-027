import { spawn } from 'child_process';
import fs from 'fs';
import { readWav, PCM } from './dsp';

const PIPER_BIN = '/usr/local/bin/piper';
const MODEL_PATH = '/usr/local/share/piper/en_US-amy-low.onnx';

export async function generateAudio(text: string, lengthScale: number = 1.0): Promise<PCM> {
    if (!fs.existsSync(PIPER_BIN)) {
        console.warn("Piper binary missing, returning 1s silence stub");
        return { samples: new Int16Array(16000), sampleRate: 16000 };
    }

    return new Promise((resolve, reject) => {
        console.log(`[Piper] Spawning: ${PIPER_BIN} --model ${MODEL_PATH} --length_scale ${lengthScale}`);
        console.log(`[Piper] Input Text: "${text}"`);

        const piper = spawn(PIPER_BIN, [
            '--model', MODEL_PATH,
            '--output_file', '-',
            '--length_scale', lengthScale.toString(),
            '--noise_scale', '0.333',  // Lower noise = more stable/smoother (default 0.667)
            '--noise_w', '0.333'       // Lower noise_w = less variation (default 0.8)
        ]);

        const chunks: Buffer[] = [];
        
        piper.stdout.on('data', c => chunks.push(c));
        piper.stderr.on('data', (d) => console.log(`[Piper STDERR] ${d}`));

        piper.stdin.write(text);
        piper.stdin.end();

        piper.on('close', code => {
            console.log(`[Piper] Exited with code ${code}`);
            if (code !== 0) return reject(new Error(`Piper failed with code ${code}`));
            try {
                const wavBuffer = Buffer.concat(chunks);
                console.log(`[Piper] Generated ${wavBuffer.length} bytes`);
                const pcm = readWav(wavBuffer);
                resolve(pcm);
            } catch (e) {
                console.error("[Piper] WAV parsing error", e);
                reject(e);
            }
        });
    });
}
