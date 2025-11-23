const G2P_ENG: Record<string, string[]> = {
  // ----- consonant single letters -----
  "b": ["b"],
  "c": ["k"],       // early stage: treat 'c' as /k/
  "d": ["d"],
  "f": ["f"],
  "g": ["g"],       // hard g
  "h": ["hh"],      // /h/ = hh
  "j": ["jh"],
  "k": ["k"],
  "l": ["l"],
  "m": ["m"],
  "n": ["n"],
  "p": ["p"],
  "q": ["k","w"],   // fallback if not qu
  "r": ["r"],
  "s": ["s"],       // soft s/z later via exceptions
  "t": ["t"],
  "v": ["v"],
  "w": ["w"],
  "x": ["k","s"],   // "fox"
  "y": ["y"],       // consonant /j/
  "z": ["z"],

  // ----- consonant digraphs & clusters -----
  "sh": ["sh"],
  "ch": ["ch"],
  "th": ["th"],      // voiceless default
  "ph": ["f"],
  "wh": ["w"],       // or hh w
  "ng": ["ng"],
  "ck": ["k"],
  "tch": ["ch"],
  "dr": ["dr"],
  "tr": ["tr"],
  "qu": ["k", "w"],

  // ----- short vowels -----
  "a": ["ae"],       // cat
  "e": ["eh"],       // bed
  "i": ["ih"],       // sit
  "o": ["aa"],       // hot
  "u": ["ah"],       // cup

  // ----- common long vowels / digraphs -----
  "ai": ["ey"],      // rain
  "ay": ["ey"],      // day
  "ee": ["iy"],      // see
  "ea": ["iy"],      // eat
  "ie": ["iy"],      // pie
  "igh": ["ay"],     // night
  "oa": ["ow"],      // boat
  "oe": ["ow"],      // toe
  "ow": ["aw"],      // cow (context dependent, default aw/ow?) "cow" is aw. "snow" is ow. Let's default to aw for now? Or ow? "ow" -> /oʊ/. "aw" -> /aʊ/. 
  // In ACE map: ow -> /əu/ (boat). aw -> /au/ (cow).
  // Let's map "ow" grapheme to ACE "aw" (cow) for now? Or "ow" (boat)?
  // "slow" -> s l ow.
  // "cow" -> k aw.
  // Let's use "ow" (ACE /əu/) for 'oa', 'oe'.
  // For 'ow' grapheme... it's ambiguous. Let's skip or pick one.
  "ou": ["aw"],      // out
  "oi": ["oy"],      // coin
  "oy": ["oy"],      // boy
  "oo": ["uw"],      // moon (default)

  // ----- r-controlled -----
  "ar": ["aa","r"],  // car
  "or": ["ao","r"],  // for
  "er": ["er"],      // her
  "ir": ["er"],      // bird
  "ur": ["er"],      // fur
};

export function wordToGraphemes(word: string): string[] {
  const lower = word.toLowerCase();
  const graphemes: string[] = [];
  let i = 0;

  while (i < lower.length) {
    // 3-letter
    if (i + 3 <= lower.length) {
        const three = lower.slice(i, i + 3);
        if (G2P_ENG[three]) {
            graphemes.push(three);
            i += 3;
            continue;
        }
    }

    // 2-letter
    if (i + 2 <= lower.length) {
        const two = lower.slice(i, i + 2);
        if (G2P_ENG[two]) {
            graphemes.push(two);
            i += 2;
            continue;
        }
    }

    // 1-letter
    const one = lower[i];
    if (G2P_ENG[one]) {
        graphemes.push(one);
        i += 1;
    } else {
        // Skip unknown chars or treat as silent?
        console.warn(`Unknown grapheme: ${one}`);
        i += 1;
    }
  }
  return graphemes;
}

export function wordToAce(word: string): string[] {
  const gs = wordToGraphemes(word);
  const ace: string[] = [];
  for (const g of gs) {
    const phones = G2P_ENG[g];
    if (phones) ace.push(...phones);
  }
  return ace;
}

// Helper to get onset/rime in ACE
export function breakdownWord(word: string, onsetGrapheme: string, rimeGrapheme: string) {
    return {
        wordAce: wordToAce(word),
        onsetAce: wordToAce(onsetGrapheme),
        rimeAce: wordToAce(rimeGrapheme)
    };
}
