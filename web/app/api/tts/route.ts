import { NextRequest, NextResponse } from 'next/server';
import { generateAudioONNX } from '@/lib/audio/piper_onnx';
import { textToIPA } from '@/lib/audio/phonemize';
import { createWav } from '@/lib/audio/dsp';

/**
 * Sanitize text input - only allow safe characters
 */
function sanitizeInput(text: string): string {
  return text.replace(/[^a-zA-Z0-9\s.,!?'-]/g, '').trim();
}

export async function GET(req: NextRequest) {
  const searchParams = req.nextUrl.searchParams;
  const text = searchParams.get('text');
  const phonemes = searchParams.get('phonemes');
  const speed = parseFloat(searchParams.get('speed') || '1.0');

  if (!text && !phonemes) {
    return NextResponse.json({ error: 'Missing text or phonemes' }, { status: 400 });
  }

  try {
    let ipaInput: string;

    if (phonemes) {
      // Phonemes are already IPA, sanitize and use directly
      ipaInput = sanitizeInput(phonemes);
    } else {
      // Convert text to IPA using espeak-ng
      const safeText = sanitizeInput(text || '');
      ipaInput = textToIPA(safeText);
    }

    // Validate speed is reasonable
    const lengthScale = Math.max(0.1, Math.min(10.0, speed));

    console.log(`[TTS API] Generating audio for: "${ipaInput}" (speed: ${lengthScale})`);

    // Use ONNX Runtime directly (no shell spawning)
    const pcm = await generateAudioONNX(ipaInput, lengthScale);
    const audioBuffer = createWav(pcm);

    return new NextResponse(new Uint8Array(audioBuffer), {
      headers: {
        'Content-Type': 'audio/wav',
        'Content-Length': audioBuffer.length.toString(),
        'Cache-Control': 'public, max-age=31536000, immutable',
      },
    });
  } catch (error) {
    console.error('[TTS API] Generation failed:', error);
    return NextResponse.json({ error: 'TTS generation failed' }, { status: 500 });
  }
}
