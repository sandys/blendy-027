import PHONEME_MAP from '@/lib/data/ace/phoneme_map.json';

export function toIPA(ace: string): string {
    const map = PHONEME_MAP as Record<string, string>;
    return map[ace] || ace;
}