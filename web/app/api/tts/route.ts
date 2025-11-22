import { NextRequest, NextResponse } from 'next/server';
import { spawn } from 'child_process';
import fs from 'fs';

export async function GET(req: NextRequest) {
  const searchParams = req.nextUrl.searchParams;
  const text = searchParams.get('text');
  const phonemes = searchParams.get('phonemes');
  const speed = searchParams.get('speed') || '1.0'; 

  if (!text && !phonemes) {
    return NextResponse.json({ error: 'Missing text or phonemes' }, { status: 400 });
  }

  const piperPath = '/usr/local/bin/piper';
  const modelPath = '/usr/local/share/piper/en_US-amy-medium.onnx';

  if (!fs.existsSync(piperPath)) {
      console.warn("Piper binary not found. Is this running in Docker?");
      return NextResponse.json({ error: 'Piper binary not found' }, { status: 500 });
  }

  // If phonemes provided, use Piper's raw input mode [[...]]
  // Otherwise use text
  const input = phonemes ? `[[${phonemes}]]` : text;
  
  console.log(`Piper Input [Speed ${speed}]:`, input);

  const piper = spawn(piperPath, [
    '--model', modelPath,
    '--output_file', '-',
    '--length_scale', speed
  ]);

  piper.stdin.write(input);
  piper.stdin.end();

  const chunks: Buffer[] = [];
  
  return new Promise((resolve) => {
    piper.stdout.on('data', (chunk) => chunks.push(chunk));
    
    piper.stderr.on('data', (data) => {
        // Piper logs info to stderr, don't panic unless error code
        // console.log(`Piper log: ${data}`);
    });

    piper.on('close', (code) => {
      if (code !== 0) {
        console.error("Piper exited with code", code);
        resolve(NextResponse.json({ error: 'TTS generation failed' }, { status: 500 }));
        return;
      }
      
      const audioBuffer = Buffer.concat(chunks);
      
      resolve(new NextResponse(audioBuffer, {
        headers: {
          'Content-Type': 'audio/wav',
          'Content-Length': audioBuffer.length.toString(),
          // Cache it heavily
          'Cache-Control': 'public, max-age=31536000, immutable',
        },
      }));
    });
  });
}
