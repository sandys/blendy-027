# **A Systematic Phonics Curriculum for an Interactive Children's Reading Application**

## **Part I: Foundational Principles and Curriculum Overview**

### **Section 1: Pedagogical Framework**

This document outlines a complete, systematic curriculum for teaching children to read, designed specifically for implementation within an interactive iPad application. The pedagogical framework is grounded in the overwhelming consensus of evidence-based literacy research, commonly known as the Science of Reading. It synthesizes the most effective components of proven, structured literacy programs, including *All About Reading* (AAR), *Blend Phonics*, and *Teach Your Child to Read in 100 Easy Lessons*, to create a curriculum that is both pedagogically sound and optimized for the engagement potential of a digital platform.1

The curriculum is built upon several non-negotiable principles that ensure all learners, including those who may struggle with reading, are provided a clear and successful path to literacy.

#### **Explicit and Systematic Instruction**

Reading is not a natural process; it is a complex cognitive skill that must be taught explicitly. This curriculum rejects the disproven "three-cueing" or "whole language" methods, which encourage guessing based on pictures or context—a primary cause of reading difficulty.4 Instead, every concept is taught directly and systematically. The instructional sequence is meticulously planned, moving from the simplest concepts to the more complex in a logical progression. Each new skill builds directly upon previously mastered skills, ensuring there are no gaps in a child's knowledge.3 This structured approach provides the clarity and predictability that beginning readers require.

#### **Multisensory Engagement**

A core tenet of this curriculum is the Orton-Gillingham (OG) principle of multisensory instruction, which is a hallmark of the *All About Reading* program.3 Learning is most effective when it engages multiple neural pathways simultaneously. Therefore, every exercise within the app must be designed to integrate visual (seeing), auditory (hearing), and kinesthetic-tactile (doing/touching) elements.7 For example, when learning a new letter-sound, a child will see the letterform, hear its corresponding sound, and trace the letter's shape on the screen. This multisensory integration creates stronger, more durable memories of the material, making it accessible to all types of learners.5

A critical distinction of this curriculum is its application of multisensory principles to a digital environment. The goal is not to digitize static worksheets, which can lead to the boredom reported by users of otherwise effective programs.11 Instead, the curriculum specifies interactive mechanics that leverage the iPad's touch interface to create inherently engaging, game-like experiences. This approach aims to merge the rigorous, systematic structure of programs like AAR with the motivational power of well-designed educational apps, avoiding the pedagogical weaknesses—such as exploitable game mechanics or poor pacing—found in some popular reading games.12 Each lesson plan will therefore include "Core Interactive Exercise Types" to serve as a blueprint for translating pedagogical steps into compelling digital interactions.

#### **Mastery-Based and Cumulative Learning**

Instruction will adhere to the mastery-based principle: "Go as fast as you can, but as slow as you must".5 A child must demonstrate proficiency with a concept before the curriculum introduces the next. This prevents the cognitive overload that occurs when a child is advanced without a firm foundation. To ensure long-term retention, every lesson incorporates a cumulative review of all previously taught material.3 This constant, spiraled review is essential for moving knowledge from short-term to long-term memory, leading to the automaticity required for fluent reading.

#### **Decodability as a Cornerstone**

To build confidence and prevent the habit of guessing, this curriculum is built upon the principle of 100% decodable text in the initial stages of learning. A child will only be asked to read words, phrases, and stories composed of the letter-sound correspondences and irregular "sight" words they have already been explicitly taught.3 This controlled-text approach ensures that the child views reading as a process of decoding, not of memorization or guesswork, which is a common struggle for children taught with less systematic methods.4 The readers in the AAR program serve as an excellent model for this approach, providing engaging stories that are perfectly aligned with the lesson sequence.3

### **Section 2: The Learner's Progression (Master Scope and Sequence)**

The curriculum is organized into distinct phases that guide the learner from foundational pre-reading skills to the ability to decode complex words. The sequence for introducing concepts is a strategic hybrid, drawing upon the strengths of several proven programs. It begins with the initial letter grouping from *All About Reading* for its immediate word-building power (m, s, p, a) but is refined by cross-referencing with modern, research-aligned sequences like that of the University of Florida Literacy Institute (UFLI) for the optimal placement of subsequent letters, digraphs, and blends.3 This ensures that the most frequent and useful grapheme-phoneme correspondences are taught first, maximizing the child's ability to read meaningful words as quickly as possible.

The following table provides a high-level overview of the curriculum's structure. A complete, detailed lesson-by-lesson chart is provided in Appendix A. This master chart is the central blueprint for the app's content, progression logic, and asset development, ensuring the systematic nature of the curriculum is preserved.

**Table 1: Master Scope and Sequence Overview**

| Phase | Lesson Range | Core Concept | Key Skills Introduced |
| :---- | :---- | :---- | :---- |
| 1 | 1-5 | Phonological & Phonemic Awareness | Rhyming, Syllable Segmentation, Phoneme Isolation |
| 2 | 6-25 | The Alphabetic Principle & CVC Words | Letter-Sounds, Blending, Decoding CVC Words, Early Irregular Words |
| 3 | 26-45 | Expanding the Phonetic Code | Consonant Digraphs (sh, th, ch, ck), Consonant Blends, FLOSS Rule, Glued Sounds |
| 4 | 46-55 | Advanced Decoding Skills | VCe ("Magic e") Pattern, Plurals (-s, \-es), Compound Words, Syllable Division |

## **Part II: Phase 1 \- Pre-Reading: Phonological & Phonemic Awareness**

This initial phase is entirely auditory and screen-based, designed to develop a child's sensitivity to the sound structure of spoken language. These skills are a critical prerequisite for learning to read and are a strong predictor of future reading success. The exercises involve no letters or print.

### **Section 3: Developing an Ear for Sounds (Lessons 1-5)**

#### **Exercise 3.1: Rhyme Recognition and Production**

* **Objective:** To identify and generate rhyming words.  
* **Interactive Exercise Type ("Rhyme Match"):** The app presents a target picture (e.g., a cat). Three other pictures appear (e.g., a hat, a dog, a car). The app vocally prompts, "Which one rhymes with *cat*?" The child taps the correct picture (the hat). For production, the app shows a picture (e.g., a bug) and prompts, "Can you think of a word that rhymes with *bug*?" The app uses voice recognition to provide positive feedback for correct responses (e.g., "rug," "hug").  
* **Content:**  
  * **Rhyming Sets for Recognition:** (cat, hat), (bug, rug), (pin, fin), (log, dog), (sun, run), (man, pan), (bed, red), (pig, wig), (hop, mop), (jet, net).  
* **Game Design:**  
  * **UI Layout:** A large "target" image is displayed prominently at the top center of the screen (e.g., a picture of a CAT). Below it, three smaller "choice" images are displayed in a row (e.g., HAT, DOG, CAR).  
  * **Game Flow:**  
    1. **Start:** The scene loads with the target and choice images.  
    2. **Audio Prompt:** An audio voiceover plays: "Which one rhymes with *cat*?"  
    3. **User Interaction:** The user must tap one of the three choice images.  
    4. **Success Condition:** If the user taps the correct rhyming image (HAT), the image animates (e.g., grows larger and sparkles), a positive sound effect plays, and the incorrect images fade out. The game then proceeds to the next rhyming set.  
    5. **Failure Condition:** If the user taps an incorrect image (DOG or CAR), the image shakes "no," a gentle negative sound effect plays, and the image remains. The user can try again until the correct image is selected.  
* **Generative AI Prompt:** See Appendix B, Prompt 1\.

#### **Exercise 3.2: Sentence Segmentation (Word Counting)**

* **Objective:** To recognize that sentences are made up of individual words.  
* **Interactive Exercise Type ("Word Tapper"):** The app speaks a sentence (e.g., "The dog ran fast."). A series of empty circles appears at the bottom of the screen. The child's task is to tap a circle for each word they heard in the sentence. Correctly tapping four times results in a rewarding animation.  
* **Content:**  
  * **2-word sentences:** "Dogs run." "Cats play." "Birds fly."  
  * **3-word sentences:** "The dog ran." "A cat sat." "Big birds sing."  
  * **4-word sentences:** "The dog ran fast." "A little cat sat." "The big birds sing."  
* **Game Design:**  
  * **UI Layout:** A simple, clean screen is displayed. A "play audio" button is visible.  
  * **Game Flow:**  
    1. **Start:** An audio voiceover plays a sentence, e.g., "The dog ran."  
    2. **UI Update:** After the audio, a number of empty, tappable circles appear at the bottom of the screen (e.g., three circles for the three-word sentence). A counter is displayed, initialized to "0".  
    3. **User Interaction:** The user taps the circles. Each tap fills one circle with color and increments the counter.  
    4. **Success Condition:** When the number of taps equals the number of words in the sentence, a "Submit" or "Check" button becomes active. Upon pressing it, a success animation plays (e.g., stars explode from the circles), and the game proceeds to the next sentence.  
    5. **Failure Condition:** If the user taps more or fewer circles than the word count and presses "Submit," the circles shake, a gentle "try again" sound plays, and the tapped circles reset to empty. The audio prompt for the sentence can be replayed.  
* **Generative AI Prompt:** See Appendix B, Prompt 2\.

#### **Exercise 3.3: Syllable Blending and Segmenting**

* **Objective:** To blend syllables into words and segment words into syllables.  
* **Interactive Exercise Type ("Syllable Builder" & "Syllable Squish"):**  
  * **Blending:** The app speaks a word in segmented syllables (e.g., "mon...key"). The child is prompted to say the word "the fast way." Voice recognition confirms the correct answer, "monkey."  
  * **Segmenting:** The app says a word (e.g., "butterfly") and shows a picture. The child then taps a large, squishy on-screen button for each syllable they hear, mimicking the "Squish the Syllables" activity.15 For "butterfly," three taps would be correct.  
* **Content:**  
  * **2-Syllable Words:** tiger, puppy, apple, bubble, happy, little  
  * **3-Syllable Words:** butterfly, elephant, banana, computer, umbrella  
  * **4-Syllable Words:** caterpillar, helicopter, watermelon, television  
* **Game Design (Syllable Squish):**  
  * **UI Layout:** A large, colorful image of an object is shown (e.g., BUTTERFLY). Below it is a single, large, animated "squishy" button. A progress bar with empty segments (e.g., 3 segments for "butterfly") is visible.  
  * **Game Flow:**  
    1. **Start:** The image appears, and an audio voiceover says the word clearly: "Butterfly."  
    2. **User Interaction:** The user must tap the squishy button for each syllable they hear in the word.  
    3. **Feedback Loop:** With each tap, the button animates (squishes down and pops back up), a satisfying sound plays, and one segment of the progress bar fills up.  
    4. **Success Condition:** When the user has tapped the correct number of times for the syllables in the word, the final segment of the progress bar fills, and a celebration animation plays (e.g., the butterfly animates and flies around the screen). The game then proceeds to the next word.  
    5. **Failure Condition:** If the user taps too many times, the progress bar flashes red, a gentle "oops" sound plays, and the progress bar resets to empty for the user to try again.  
* **Generative AI Prompt:** See Appendix B, Prompt 3\.

#### **Exercise 3.4: Onset-Rime Blending**

* **Objective:** To blend the initial sound (onset) of a one-syllable word with the rest of the word (rime).  
* **Interactive Exercise Type ("Sound Slide"):** The app presents two sound buttons. The first says the onset (e.g., /b/) and the second says the rime (e.g., /at/). The child slides the first button into the second, and upon collision, the app speaks the complete word, "bat."  
* **Content:**  
  * **\-at family:** /c/ \+ /at/, /b/ \+ /at/, /s/ \+ /at/, /m/ \+ /at/, /h/ \+ /at/  
  * **\-in family:** /p/ \+ /in/, /f/ \+ /in/, /b/ \+ /in/, /w/ \+ /in/  
  * **\-op family:** /t/ \+ /op/, /m/ \+ /op/, /h/ \+ /op/, /p/ \+ /op/  
  * **\-ug family:** /b/ \+ /ug/, /r/ \+ /ug/, /h/ \+ /ug/, /m/ \+ /ug/  
* **Game Design:**  
  * **UI Layout:** Two distinct, interactive tiles are on screen. The "onset" tile is on the left (e.g., showing "b"). The "rime" tile is on the right (e.g., showing "at"). Tapping either tile plays its corresponding sound (/b/ or /at/).  
  * **Game Flow:**  
    1. **Start:** The two tiles appear. An audio prompt says, "Put the sounds together."  
    2. **User Interaction:** The user must tap and drag the onset tile ("b") towards the rime tile ("at"). A visual guide, like a dotted line or track, can appear to guide the user.  
    3. **Success Condition:** When the onset tile collides with or overlaps the rime tile, they merge into a single tile displaying the full word ("bat"). Simultaneously, an audio file of the complete word "bat" plays, and a rewarding animation occurs. The game then proceeds to the next pair.  
    4. **Failure Condition:** The game is designed for exploration. There is no failure state other than inaction. The user can tap the tiles to hear the sounds as many times as needed before dragging.  
* **Generative AI Prompt:** See Appendix B, Prompt 4\.

#### **Exercise 3.5: Phoneme Isolation (First, Last, Medial Sounds)**

* **Objective:** To identify the individual sounds (phonemes) within a spoken word.  
* **Interactive Exercise Type ("Sound Detective"):** The app shows a picture (e.g., a sun) and asks, "What is the *first* sound in *sun*?" Three sound buttons appear (/s/, /m/, /t/), and the child taps the correct one. This is repeated for the final sound (/n/) and the medial vowel sound (/u/).  
* **Content:**  
  * **Words for Isolation:** sun, map, pig, top, bug, cat, dog, fin, hen, jam  
* **Game Design:**  
  * **UI Layout:** An image is displayed at the top of the screen (e.g., SUN). Below it, three tappable buttons are shown, each with a different letter.  
  * **Game Flow:**  
    1. **Start:** The image appears. An audio prompt asks, "What is the *first* sound in *sun*?"  
    2. **User Interaction:** The user taps one of the three letter buttons. Tapping a button plays its corresponding phoneme (e.g., tapping 's' plays /s/).  
    3. **Success Condition:** If the user taps the correct button ('s'), it glows green, a positive chime sounds, and the game proceeds to the next question (e.g., "What is the *last* sound in *sun*?"). After all three sounds (first, medial, last) are identified correctly, a completion animation plays for that word.  
    4. **Failure Condition:** If the user taps an incorrect button ('m' or 't'), it flashes red, a gentle "try again" sound plays, and the user can tap again.  
* **Generative AI Prompt:** See Appendix B, Prompt 5\.

## **Part III: Phase 2 \- The Alphabetic Principle and Early Decoding**

This phase marks the transition to print. The child learns that letters represent sounds and is taught a powerful, interactive method for blending those sounds into words.

### **Section 4: Letter-Sound Introduction Sequence (Lessons 6-15)**

The sequence begins with a carefully selected group of letters that allows for the immediate formation of multiple CVC (Consonant-Vowel-Consonant) words. Each letter-sound correspondence is taught explicitly using a multisensory routine: the child sees the letter, hears its name and sound, and traces its shape on the screen. With each new phoneme introduced, its corresponding card is "unlocked" on the app's Sound Wall (see Part VII).

A key distinction is made between continuous sounds (which can be held, like /m/, /s/, /a/) and stop sounds (which are quick puffs of air, like /t/, /p/).3 Within the app, continuous sounds will be animated with a stretching or flowing visual effect, while stop sounds will have a sharp, popping animation. This provides a critical visual and auditory cue that facilitates the blending process.

* **Lesson 6:** m (/m/), a (/ă/)  
* **Lesson 7:** t (/t/)  
* **Lesson 8:** s (/s/)  
* **Lesson 9:** p (/p/)  
* **Lesson 10:** i (/ĭ/), n (/n/)  
* **Lesson 11:** c (/k/), h (/h/)  
* **Lesson 12:** d (/d/), o (/ŏ/)  
* **Lesson 13:** g (/g/), f (/f/)  
* **Lesson 14:** b (/b/), u (/ŭ/)  
* **Lesson 15:** l (/l/), e (/ĕ/)

### **Section 5: The Core Blending Method**

The primary interactive mechanic for decoding is a step-by-step process that makes the abstract concept of blending concrete and visual. This method is adapted from the *Blend Phonics* methodology for its explicit directional guidance, which is essential for preventing the common habit of reversing letters or sounds.16

* **Step 1 (Auditory Model \- First Blend):** The app first models the initial blend orally. For the word map, it would say: "Listen: /m/... /a/. My turn: /ma/."  
* **Step 2 (Interactive Blend):** The letters 'm' and 'a' appear on screen, separated. The child is prompted to drag the 'm' tile to connect with the 'a' tile. As the tiles touch, they merge, and the blended sound "/ma/" is played, accompanied by a flowing animation.  
* **Step 3 (Auditory Model \- Full Word):** The app models the full word orally: "Listen: /ma/... /p/. My turn: /map/."  
* **Step 4 (Interactive Final Blend):** The letter 'p' tile appears. The child is prompted to drag the merged "ma" tile to connect with the 'p' tile. Upon connection, all three letters merge to form the word "map," and the full word is spoken clearly.

This sequential, interactive blending process provides powerful directional guidance and forces the child to attend to the sounds in the correct left-to-right order, directly combating the guessing habit.

* **Game Design ("Word Builder"):**  
  * **UI Layout:** A clean workspace with a target area or track.  
  * **Game Flow (for CVC word "map"):**  
    1. **Step 1 (First Blend):** Two letter tiles, 'm' and 'a', appear on the left and middle of the screen. An audio prompt says, "Let's make a word. Drag the first sound to the next sound."  
    2. **User Interaction 1:** The user drags the 'm' tile to the 'a' tile.  
    3. **Feedback 1:** Upon collision, the tiles merge into a single "ma" tile. An audio clip plays the blended sound "/ma/". A visual effect (e.g., a flowing line) connects the letters as the sound is made.  
    4. **Step 2 (Final Blend):** A third tile, 'p', appears to the right of the merged "ma" tile. The audio prompts, "Now add the last sound."  
    5. **User Interaction 2:** The user drags the "ma" tile to the 'p' tile.  
    6. **Feedback 2 (Success):** Upon collision, the tiles merge to form the complete word "map". An audio clip plays the full word "map". A celebratory animation plays, and the word might be shown in a simple sentence with an accompanying picture.  
* **Generative AI Prompt:** See Appendix B, Prompt 6\.

### **Section 6: Decoding CVC Words (Lessons 6-25)**

As new letter-sounds are introduced, they are immediately integrated into cumulative word lists for blending practice. These lists form the core decodable vocabulary for the app's initial exercises and stories.

* **Lesson 6-9 (Short 'a' focus):** am, Sam, map, Pam, sap, at, pat, sat, tap  
* **Lesson 10-11 (Short 'i', 'n', 'c', 'h' focus):** in, an, man, pan, tan, nap, pin, tin, tip, sip, sit, pit, cat, cap, can, hat, hit, him, jab, tab, ham  
* **Lesson 12-13 (Short 'o', 'd', 'g', 'f' focus):** on, of, hot, hop, hog, fog, dot, dog, Don, cod, got, god, top, pop, pot, not, mad, sad, bad, bag, tag, gas, dad  
* **Lesson 14-15 (Short 'u', 'e', 'b', 'l' focus):** up, us, bug, bud, bun, but, cup, cub, fun, gum, gun, hug, hum, jug, mud, nut, pup, run, rub, sun, tub, bed, beg, bell, bet, den, fed, get, hen, jet, leg, let, men, met, net, pen, pet, red, set, ten, Ted, vet, web, wet, yes, yet

#### **Core Interactive Exercise Types**

* **"Word Builder":** This is the primary application of the Core Blending Method described in Section 5\.  
* **"Change the Word":** Based on the tile-swapping activity in AAR, this exercise builds phonemic manipulation skills and fluency.3 The app displays a word (e.g., cat). The 'c' tile is highlighted and then visually swapped for an 'm' tile. The child is then prompted to read the new word, mat. This can be done for initial, final, and medial sounds.  
* **Game Design ("Change the Word"):**  
  * **UI Layout:** A word is displayed in the center of the screen using distinct letter tiles (e.g., 'c', 'a', 't').  
  * **Game Flow:**  
    1. **Start:** The word "cat" is displayed. An audio prompt says, "Read the word." Voice recognition or a button press confirms the reading.  
    2. **Animation:** The first tile ('c') glows, then animates off-screen. A new tile ('m') animates into its place. The word now reads "mat".  
    3. **Audio Prompt:** A new prompt asks, "What is the new word?"  
    4. **User Interaction:** The user reads the new word aloud.  
    5. **Success Condition:** Voice recognition detects the correct word ("mat"). A positive chime sounds, and a point is awarded. The game then proceeds to change another letter (e.g., 't' becomes 'p' to make "map").  
    6. **Failure Condition:** If voice recognition detects an incorrect word or no sound, a gentle prompt encourages the user to "Try again." The audio of the individual sounds can be played by tapping the letters as a scaffold.  
* **Generative AI Prompt:** See Appendix B, Prompt 7\.

### **Section 7: First Steps in Connected Text (Cumulative)**

Meaningful sentences are introduced as early as possible to foster engagement and demonstrate the purpose of reading. This is made possible by the parallel introduction of a few high-utility irregular words (see Section 14). Waiting until Lesson 29 to introduce the first sight words, as AAR does, would result in stilted, less engaging sentences (e.g., "Sam sat. Nan pat Sam.").3 By introducing words like the and a early, the curriculum allows for much richer text (e.g., "The cat sat on a mat."), which is a significant advantage for an app-based format that thrives on engagement. AAR also uses "Fluency Practice Sheets" which contain lists of words, phrases, and sentences using the target skill. The app will generate these dynamically for cumulative review, ensuring students develop automaticity.1

* **After Lesson 9 (Short 'a' \+ the, a):**  
  * **Story:** "Sam, a cat"  
    * *Text:* "Sam sat. Sam and Nan sat. Nan can pat Sam."  
* **After Lesson 11 (Short 'i' \+ is):**  
  * **Story:** "A Tin Can"  
    * *Text:* "Fill a tin can. Dip a lid. Mix a fig in a tin can. Win a tin can."  
* **After Lesson 13 (Short 'o' \+ of):**  
  * **Story:** "A Mop"  
    * *Text:* "Hop on a mop, not on a top. A mop cannot sob. A mop got off a box."  
* **After Lesson 15 (Short 'u' & 'e' \+ was):**  
  * **Story 1:** "A Bug"  
    * *Text:* "A bug cut up a muff. Can a bug hum? Can a bug hug? A bug can hug a jug and a cub."  
  * **Story 2:** "A Wet Hen"  
    * *Text:* "A hen got fed in a pen. A hen fell in a cup. A hen got wet, a wet mess."

## **Part IV: Phase 3 \- Expanding the Phonetic Code**

This phase introduces more complex phonetic elements, systematically expanding the child's decoding toolkit.

### **Section 8: Consonant Digraphs (Lessons 26-33)**

A consonant digraph is two letters that represent a single sound.

* **Sequence:** The digraphs are introduced in order of utility: sh  th (unvoiced, as in *thin*)  ch  ck (as a final digraph)  th (voiced, as in *then*).  
* **Word Lists:**  
  * **sh:** cash, dish, fish, hush, shall, shed, shelf, ship, shop, shot, shut, wish  
  * **th:** bath, with, than, that, them, this, thick, thin, thud, thump  
  * **ch:** chat, chin, chill, chick, chop, chip, chum, much, rich, such  
  * **ck:** duck, Jack, kick, lock, luck, neck, pick, quick, quack, rock, sick, tack  
* **Decodable Stories:**  
  * **"Ship on a Shelf" (sh):** "Tim's mom set a gift box on a shelf in a shed. It had a fast ship in it. His mom had his dad get it at a shop."  
  * **"The Thump" (th):** "Did that thump? Shad felt the big thump. THUMP\! Not a bump, but a big, big thump. Thus, this is a thump. A thump, a big thud."  
  * **"The Chick" (ch/tch):** "The rich chick sat in a ditch. The chick got such a shock-a pitch got in the ditch, a big pitch. The chick can not catch the pitch."  
* **Interactive Exercise Type ("Sound Search"):** A picture is displayed (e.g., a sheep). The child must choose the correct digraph (sh, ch, th) that the word begins with from a set of options.  
* **Game Design:**  
  * **UI Layout:** An image is displayed (e.g., SHEEP). Below it, the rest of the word is shown with a blank for the initial sound (e.g., "\_\_eep"). Three bubbles, each containing a digraph ('sh', 'ch', 'th'), are presented as choices.  
  * **Game Flow:**  
    1. **Start:** The image and partial word appear. An audio prompt asks, "What sound does *sheep* start with?"  
    2. **User Interaction:** The user taps one of the three digraph bubbles.  
    3. **Success Condition:** If the user taps the correct bubble ('sh'), it animates, floating up to fill the blank in the word. The completed word "sheep" is then read aloud, and a success sound plays.  
    4. **Failure Condition:** If the user taps an incorrect bubble ('ch' or 'th'), the bubble wiggles and a gentle "nope" sound plays. The user can try again.  
* **Generative AI Prompt:** See Appendix B, Prompt 8\.

### **Section 9: Consonant Blends (Lessons 34-40)**

A consonant blend consists of two or three consonants whose individual sounds are all heard as they are blended together. Following the sound pedagogical sequence of AAR, final blends are taught before initial blends, as they are easier for children to decode.3

* **Final Blends (Lessons 34-36):** \-st, \-mp, \-nd, \-nt, \-sk, \-ft, \-lp, \-lt.  
  * **Word Lists:** fast, lost, nest, best, just, next, pest, rest, test; camp, jump, lamp, bump, damp, hump, lump, pump, ramp, tamp, chimp, limp; hand, send, wind, and, band, bend, fond, fund, land, lend, mend, pond; tent, went, hint, bent, dent; ask, desk; gift, left, loft, raft, soft, sift, shift; help, gulp, yelp; belt, melt, felt, silt, tilt, wilt.  
* **Initial Blends (Lessons 37-40):** s-blends (st, sp, sl, etc.), l-blends (bl, cl, fl, etc.), r-blends (br, cr, tr, etc.).  
  * **Word Lists:** stop, spot, spin, spun, spat, spill, spell, spank; slip, sled, slam, slap, slush; flag, flip, flat, fling, flock; frog, drip, trap, grin, brag, brand, brick, crab, crash, cramp, drag, drop, dress, grand, grass, press, print, track, truck, trust.  
* **Interactive Exercise Type ("Blend Flipper"):** This is a digital adaptation of the AAR "Word Flippers" activity.3 The app displays a rime (e.g., \_\_amp). The child can tap a button to cycle through various onsets (c, l, st, tr), forming and hearing the words camp, lamp, stamp, tramp.  
* **Game Design:**  
  * **UI Layout:** A static "rime" is displayed on the right side of the screen (e.g., "-amp"). On the left, there is a "flipper" element that looks like a stack of cards or a rotating wheel, showing one "onset" at a time (e.g., 'c').  
  * **Game Flow:**  
    1. **Start:** The initial word is formed (e.g., "camp"). An audio prompt says, "Read the word."  
    2. **User Interaction:** The user taps the flipper element.  
    3. **Feedback:** The flipper animates, cycling to the next onset in the sequence (e.g., 'l'). The new word ("lamp") is now displayed. The app automatically plays the audio for the new word: "lamp."  
    4. **Loop:** The user can continue tapping the flipper to cycle through all the onsets for that rime (c, l, st, tr), hearing each new word as it is formed. This is an exploratory, practice-based activity with no failure state.  
* **Generative AI Prompt:** See Appendix B, Prompt 9\.

### **Section 10: The "FLOSS" Rule and Glued Sounds (Lessons 41-45)**

* **FLOSS Rule (Lesson 41-42):** This rule teaches that in a one-syllable word with a short vowel, the final f, l, s, or z is usually doubled.3  
  * **Word Lists:** puff, huff, stuff; hill, bell, will, Bill, dell, fell, fill, full, sell, tell, well; mess, pass, kiss, boss, lass, loss, mass, miss, moss, muss; buzz, jazz.  
* **Glued/Welded Sounds (Lessons 43-45):** These are three-letter combinations where the sounds are "glued" together and are often easier to learn as a chunk.  
  * **\-ng endings:** \-ang, \-ing, \-ong, \-ung. Word Lists: bang, gang, hang, rang, sang; ding, king, ring, sing, thing, wing; gong, long, song; hung, lung, rung, sung.  
  * **\-nk endings:** \-ank, \-ink, \-onk, \-unk. Word Lists: bank, sank, tank, thank; kink, link, mink, pink, rink, sink, think, wink; honk; bunk, chunk, dunk, spunk.  
* **Interactive Exercise Type ("Word Sort"):** An interface with several "buckets" appears, each labeled with a phonetic pattern (e.g., "FLOSS Words," "Glued Sounds," "Blends"). Words appear one by one, and the child must drag each word into the correct bucket.  
* **Game Design:**  
  * **UI Layout:** Three large, labeled "buckets" or containers are at the bottom of the screen (e.g., "FLOSS," "-ng words," "-nk words"). A word on a tile appears at the top of the screen.  
  * **Game Flow:**  
    1. **Start:** The first word tile appears (e.g., "hill").  
    2. **User Interaction:** The user reads the word and drags the tile towards one of the buckets.  
    3. **Success Condition:** If the user drops the tile on the correct bucket ("FLOSS"), the tile is accepted with a positive sound and animation. The next word tile appears.  
    4. **Failure Condition:** If the user drops the tile on an incorrect bucket, the bucket shakes "no," and the tile animates back to its starting position for the user to try again.  
* **Generative AI Prompt:** See Appendix B, Prompt 10\.

## **Part V: Phase 4 \- Advanced Decoding Skills**

This phase introduces long vowel patterns and the foundational concepts of morphology and syllabication, equipping the child with the tools to read a much wider range of words.

### **Section 11: The VCe (Vowel-Consonant-e) Pattern (Lessons 46-50)**

This section explicitly teaches the "Magic e" or "Silent e" rule, where a final, silent 'e' makes the preceding vowel say its long sound (its name).

* **Sequence:** a\_e (e.g., *cake*), i\_e (e.g., *like*), o\_e (e.g., *hope*), u\_e (e.g., *cube*).  
* **Word Lists:**  
  * **a\_e:** ate, bake, came, cane, cape, case, cake, date, daze, fate, fade, game, gate, gaze, hate, haze, lake, lame, make, mane, made, mate, name, pale, pane, quake, rake, rate, safe, sake, same, shame, shake, take, tame, tape, blame, flame, plane, snake, chase, taste, vase, wake, waste, brave, brake, crate, crave, craze, drape, glade, grade, grape, grave, trade  
  * **i\_e:** bite, dime, dine, dike, fine, fife, dive, file, five, hide, hive, lime, life, like, mine, mite, mile, nine, pike, pine, pile, quite, kite, ride, shine, side, time, tile, tide, wife, wine, pipe, size, glide, while, white, drive, pride, prime, prize, spike, smile, slime, stile, swine, spine, ripe  
  * **o\_e:** bone, cone, cope, code, dote, dole, dome, hole, home, hope, joke, lone, lode, lope, mole, mope, note, pole, rope, sole, stone, spoke, slope, smoke, tone, tote, those, stole, vote, woke, broke, drove, globe, probe, quote, robe, rode  
  * **u\_e:** cube, cute, duke, dune, flute, mule, plume, prune, rude, rule, tube, tune  
* **Interactive Exercise Type ("Magic Wand"):** This game provides a powerful visual and auditory representation of the VCe rule. A CVC word is shown (e.g., cap). The child is given a "magic wand" with the letter 'e' on its tip. They drag the wand to the end of the word. As the 'e' attaches, an animation (e.g., a sparkle) connects the 'e' to the 'a', the 'a' visually transforms (e.g., a macron appears above it), and the app pronounces the new word, cape. This mechanic makes the abstract rule concrete and memorable.16  
* **Game Design:**  
  * **UI Layout:** A CVC word is displayed in the center (e.g., "cap"). A "magic wand" tool with the letter 'e' on its tip is located in the corner of the screen.  
  * **Game Flow:**  
    1. **Start:** The word "cap" is displayed. An audio prompt says, "Read the word." After the child reads it, the prompt says, "Now add the magic 'e'\!"  
    2. **User Interaction:** The user drags the magic wand to the end of the word "cap".  
    3. **Success Condition:** When the wand is released at the end of the word, the 'e' attaches to it. A magical animation (e.g., a sparkling arc) flows from the 'e' to the vowel 'a'. The 'a' tile visually changes to 'ā'. The app then plays the audio for the new word, "cape".  
    4. **Loop:** The game proceeds to the next CVC/VCe pair. This is a guided discovery activity with no failure state.  
* **Generative AI Prompt:** See Appendix B, Prompt 11\.

### **Section 12: Introduction to Morphology (Lessons 51-53)**

Morphology is the study of word parts and how they create meaning. This section introduces the most basic morphological concepts.

* **Plural Suffixes (Lessons 51-52):** The rule for adding \-s (which can say /s/ as in *cats* or /z/ as in *dogs*) and \-es (which adds a syllable, as in *wishes*) is taught explicitly.3  
  * **Word Lists:** hats, cups, bugs, tents, bells, lamps, twigs, desks, clocks, songs, hens, dresses, wishes, classes, bushes, benches, boxes  
* **Compound Words (Lesson 53):** The concept of two smaller words combining to form a new, larger word is introduced.3  
  * **Word Lists:** sunset, bathtub, catfish, sandbox, hotdog, cannot, himself, bullfrog, windmill, upon, eggshell, wetland, backstop, dustpan, hubcap, sunspot, napkin, kidnap, trashcan, hilltop  
* **Interactive Exercise Type ("Word Surgery"):** The app displays a compound word (e.g., pancake). The child uses a digital "saw" or "scissors" to drag along a dotted line, splitting the word into its two component parts, pan and cake. The app then reads each part and the whole word again.  
* **Game Design:**  
  * **UI Layout:** A compound word is displayed on a single large tile (e.g., "pancake"). A dotted vertical line appears between the two component words. A "saw" or "scissors" tool is available.  
  * **Game Flow:**  
    1. **Start:** The word "pancake" is displayed. An audio prompt says, "This is a compound word. Can you split it into two smaller words?"  
    2. **User Interaction:** The user drags the saw tool over the dotted line.  
    3. **Feedback:** As the user drags, the tile visually splits along the line. When the cut is complete, the single tile breaks into two separate tiles: "pan" and "cake".  
    4. **Audio Reinforcement:** The app plays the audio for each part ("pan"... "cake") and then the whole word again ("pancake"). The game then proceeds to the next compound word.  
* **Generative AI Prompt:** See Appendix B, Prompt 12\.

### **Section 13: Open and Closed Syllables (Lessons 54-55)**

This section introduces the foundational rules of syllable division, which are essential for decoding multisyllabic words.

* **Concept:** A closed syllable ends in a consonant and has a short vowel sound (e.g., rab in *rabbit*). An open syllable ends in a vowel and has a long vowel sound (e.g., ti in *tiger*).3  
* **Word Lists:**  
  * **Closed/Closed (VC/CV):** napkin, sunset, rabbit, magnet, husband, combat, Hobbit  
  * **Open/Closed (V/CV):** open, tiger, robot, silent, bacon, paper, fever, hero, legal, final, pupil  
* **Interactive Exercise Type ("Syllable Split"):** The app presents a two-syllable word (e.g., robot). The child is prompted to tap where the word should be divided. Upon a correct tap between 'o' and 'b', the word splits. The app then labels the first syllable "Open" and the second "Closed" while reading each syllable and then the whole word.  
* **Game Design:**  
  * **UI Layout:** A two-syllable word is displayed in the center (e.g., "robot").  
  * **Game Flow:**  
    1. **Start:** The word appears. An audio prompt says, "Tap where you think the word splits into two syllables."  
    2. **User Interaction:** The user taps on the space between two letters.  
    3. **Success Condition:** If the user taps the correct division point (between 'o' and 'b'), the word animates, splitting into two parts ("ro" and "bot"). A label "Open" appears under "ro" and "Closed" appears under "bot". An audio voiceover explains, "Good\! 'ro' is an open syllable, so the 'o' is long. 'bot' is a closed syllable, so the 'o' is short. Robot."  
    4. **Failure Condition:** If the user taps an incorrect spot, the word shakes "no" and a gentle sound plays, prompting the user to try again.  
* **Generative AI Prompt:** See Appendix B, Prompt 13\.

## **Part VI: Ancillary Skills Track**

### **Section 14: A Systematic Approach to Irregular (Sight) Words**

This track runs in parallel with the main phonics progression. It introduces high-frequency words that are not phonetically regular according to the rules the child has learned so far. The goal is to teach these words in a way that promotes orthographic mapping rather than rote visual memorization.

* **Methodology ("Heart Word" Method):** This evidence-based strategy helps children make sense of irregular words by analyzing which parts are regular and which parts are "tricky." For a word like said:  
  1. **Hear and Use:** The app says the word "said" and uses it in a simple sentence.  
  2. **Map the Sounds:** The child is prompted to tap a button for each sound they hear in "said": /s/... /ĕ/... /d/. Three sound boxes appear.  
  3. **Represent the Graphemes:** The letters s, ai, d fly into the sound boxes.  
  4. **Identify "Fair" and "Tricky" Parts:** The app highlights the 's' and 'd', explaining that they make their usual sounds. It then places a heart over the 'ai', explaining that this is the "tricky part" that says /ĕ/ and must be "learned by heart."  
* **Game Design:**  
  * **UI Layout:** A clean screen with the target word displayed at the top (e.g., "said").  
  * **Game Flow (A guided, multi-step animation):**  
    1. **Step 1 (Hear and Use):** Audio plays: "This is the word *said*. The cat *said* meow."  
    2. **Step 2 (Map the Sounds):** Audio prompts: "How many sounds do you hear in *said*? Tap for each sound." A large button appears. The user taps it three times. With each tap, an empty square appears, resulting in three squares in a row.  
    3. **Step 3 (Represent Graphemes):** The letters from the word "said" at the top animate and fly down into the squares: 's' into the first, 'ai' into the second, and 'd' into the third.  
    4. **Step 4 (Identify Parts):** The first and third squares ('s' and 'd') glow green. Audio: "The /s/ sound is spelled with 's'. That's fair. The /d/ sound is spelled with 'd'. That's fair, too." Then, the middle square ('ai') glows red, and a heart icon animates over it. Audio: "But the /ĕ/ sound is spelled with 'ai'. That's the tricky part you have to learn by heart\!"  
* **Generative AI Prompt:** See Appendix B, Prompt 14\.  
* **Introduction Sequence:** The sequence is front-loaded with the most essential words from the Fry and Dolch lists to enable the creation of meaningful sentences early in the curriculum.  
  * **Lessons 6-10:** the, a  
  * **Lessons 11-15:** I, is, to  
  * **Lessons 16-20:** was, for, you  
  * **Lessons 21-25:** of, and, he  
  * **Lessons 26-30:** said, she, no

This parallel structure allows the decodable texts in the app to be more natural and engaging from the very beginning, a marked improvement over programs that delay the introduction of all irregular words.

## **Part VII: The Interactive Sound Wall**

### **Section 15: The Sound Wall: A Speech-to-Print Anchor**

The app will feature a dedicated, interactive Sound Wall, a core component based on the Science of Reading. Unlike a traditional A-Z word wall, which is organized alphabetically (a print-to-speech tool), the Sound Wall is organized by the 44 phonemes (sounds) of English, making it a speech-to-print tool.18 This is crucial because children learn to speak first; the Sound Wall starts with what they know—sounds—and explicitly connects them to the letters (graphemes) used for spelling.1 This approach helps prevent the confusion that arises from words like "know," which begins with the /n/ sound but would be located under 'K' on a word wall.1

### **Section 16: Structure of the Digital Sound Wall**

The Sound Wall is divided into two main sections, mirroring best practices in literacy instruction: a Consonant Wall and a Vowel Valley.19

* **The Consonant Wall:** This section organizes the consonant phonemes according to their *place* and *manner* of articulation.21 Sounds are grouped by how they are formed in the mouth (e.g., **Stops**, which are quick puffs of air like /p/ and /t/; **Nasals**, which vibrate in the nose like /m/ and /n/; and **Fricatives**, which involve friction like /f/ and /s/).22 This organization helps children feel the physical differences between sounds, creating a stronger memory for each phoneme.  
* **The Vowel Valley:** This section is arranged in a "V" shape that visually represents the position of the jaw and tongue when making vowel sounds.23 It starts with high-front vowels where the mouth is in a tight smile (like /ē/ in *bee*), moves down as the jaw drops to its most open position (like /ŏ/ in *octopus*), and moves back up as the lips become rounded for high-back vowels (like /oo/ in *spoon*).23 Diphthongs and r-controlled vowels are placed separately but nearby.23

### **Section 17: Integration into the Learning Loop**

The Sound Wall is not a static chart but a dynamic tool that grows with the child and is integrated into daily practice.

* **"Unlocking" the Wall:** The app's Sound Wall will initially appear with all phonemes "locked" or covered.25 As a new phoneme is explicitly taught in a lesson, its corresponding card on the Sound Wall is dramatically "unlocked" and revealed, providing a visual record of the child's progress and creating a gamified sense of achievement.26  
* **Interactive Phoneme Cards:** Each card on the Sound Wall is interactive. When tapped, it will:  
  1. **Show Articulation:** Display a close-up photo or video of a mouth forming the sound, helping the child connect the phoneme to the physical act of producing it.22  
  2. **Play the Sound:** Play a clear, crisp audio of the phoneme, ensuring no extra "uh" sound is added (e.g., /t/, not /tuh/).22  
  3. **Display Anchor Picture:** Show a memorable anchor picture that begins with the target sound (e.g., a picture of a *fish* for the /f/ sound).1  
  4. **Reveal Graphemes:** As the curriculum introduces the different ways to spell a sound, those graphemes (letters or letter patterns) are added to the card. For example, the /f/ card will initially show 'f'. When 'ph' is taught later, it will be added to the same card, showing the child that both spellings represent the same sound.26  
* **Daily Review ("Phonics Bursts"):** Each day's session will begin with a quick, engaging warm-up that prompts the child to review all their unlocked sounds on the Sound Wall.22 This daily recitation builds automaticity in sound-symbol correspondence.  
* **A Tool for Spelling (Encoding):** The Sound Wall serves as a primary support tool during spelling and writing activities. When a child needs to spell a word, they are encouraged to segment the sounds and then use the Sound Wall to find the correct spellings. For example, to spell "cheese," the child identifies the first sound, /ch/, finds it on the Consonant Wall, and sees the possible graphemes 'ch' and 'tch'.1

## **Part VIII: Data Model for Spaced Repetition**

To enable the use of a spaced repetition system (SRS) like FSRS, each individual exercise must be represented as a discrete data object. This allows the SRS algorithm to track a student's performance on every single skill and schedule reviews at optimal intervals for long-term retention.

### **Section 18: Data Model Structure**

Each exercise is defined as a JSON object with a consistent structure. This object contains all the necessary information for the application to render the exercise and for the SRS to manage its review schedule.

* **exercise\_id**: A unique string identifier for the specific exercise instance (e.g., "L1-RhymeMatch-001").  
* **lesson\_number**: The integer of the lesson where this skill is first introduced.  
* **exercise\_type**: A string defining the interactive template to use (e.g., "Rhyme Match", "Word Builder").  
* **skill\_focus**: A string describing the specific pedagogical skill being practiced (e.g., "Rhyme Recognition", "CVC Blending").  
* **prompt**: An object containing the primary information presented to the user. This can include:  
  * text: A string of text for the user to read.  
  * audio: The filename of an audio prompt.  
  * image: The filename of a primary image.  
* **response\_type**: A string indicating the expected user interaction (e.g., "tap\_image", "drag\_and\_drop", "read\_aloud", "voice\_recognition").  
* **correct\_response**: The value or object representing the correct answer. The structure depends on the response\_type.  
* **distractors**: An array of incorrect options, used in multiple-choice scenarios.  
* **steps**: For multi-step exercises like "Word Builder," this is an array of objects, each defining a step in the sequence.  
* **assets**: An object listing all required media assets, categorized by type (e.g., audio, images).  
* **srs\_data**: An object reserved for the spaced repetition algorithm to store its metadata.  
  * due\_date: The next scheduled review date.  
  * stability: A measure of how well the memory is established.  
  * difficulty: A measure of the item's intrinsic difficulty.  
  * review\_history: An array of timestamps and performance ratings for past reviews.

A complete list of data model instances for every exercise in this curriculum is provided in Appendix C.

## **Part IX: Generating Decodable Books with Hierarchical Prompts**

### **Section 19: XML Prompt Structure for AI-Generated Content**

To ensure the consistent generation of high-quality, 100% decodable books that align perfectly with the curriculum's scope and sequence, a structured, hierarchical prompt is necessary. The following XML format provides a comprehensive template for instructing a generative AI model, precisely controlling every aspect of the story's creation to match a child's current lesson. This structure is specifically designed to align with Science of Reading best practices, including the separation of text and illustrations to prevent guessing.

#### **Hierarchical XML Prompt Template**

XML

\<?xml version="1.0" encoding="UTF-8"?\>  
\<DecodableBookPrompt\>

  \<Persona\>  
    You are a structured literacy expert. Your task is to write a decodable text that is strictly aligned with the Science of Reading.  
  \</Persona\>

  \<Context\>  
    \<TargetSkill level\="\[e.g., Kindergarten, First Grade\]"\>  
      \<PhonicsPattern\>\[e.g., CVC words with short 'a'\]\</PhonicsPattern\>  
    \</TargetSkill\>  
      
    \<StoryElements\>  
      \<Characters\>  
        \<Character name\="\[e.g., Pip\]" description\="\[e.g., a friendly cat\]"/\>  
        \<Character name\="\[e.g., Pam\]" description\="\[e.g., a young girl\]"/\>  
      \</Characters\>  
      \<Setting\>\[e.g., A sunny room with a mat\]\</Setting\>  
      \<Plot\>\[e.g., A cat named Pip sits on a mat. Pam pats the cat.\]\</Plot\>  
    \</StoryElements\>  
  \</Context\>

  \<Structure\>  
    \<Title instruction\="Generate a short, decodable title for the story."/\>  
    \<PageLayout\>  
      \<Instruction\>  
        Generate the book page by page. For each page pair, the text for a scene should be on the left page (or first page) and the corresponding illustration prompt should be on the right page (or second page). The reader must read the text BEFORE seeing the picture to prevent guessing.  
      \</Instruction\>  
    \</PageLayout\>  
    \<Story length\="\[e.g., 4-6 sentences\]"\>  
      \<Instruction\>  
        Generate a decodable story based on the provided context and constraints. The story must be simple, engaging, and 100% decodable for the specified skill level. Present the story as a series of page pairs, following the PageLayout instruction.  
      \</Instruction\>  
    \</Story\>  
    \<Review\>  
      \<Instruction\>  
        After the story, create a brief review section that lists the target sound/pattern and a few key words from the story that use it.  
      \</Instruction\>  
    \</Review\>  
    \<Comprehension questions\="\[e.g., 2-3\]"\>  
      \<Instruction\>  
        After the review, provide a set of simple, literal comprehension questions that can be answered directly from the text.  
      \</Instruction\>  
    \</Comprehension\>  
  \</Structure\>

  \<Constraints\>  
    \<Include\>  
      \<WordList\>  
        \<Word\>\[e.g., cat\]\</Word\>  
        \<Word\>\[e.g., mat\]\</Word\>  
        \<Word\>\[e.g., sat\]\</Word\>  
      \</WordList\>  
      \<IrregularWords\>  
        \<Word\>\[e.g., the\]\</Word\>  
        \<Word\>\[e.g., a\]\</Word\>  
      \</IrregularWords\>  
    \</Include\>  
    \<Exclude\>  
      \<PhonicsPatterns\>  
        \<Pattern\>\[e.g., silent 'e'\]\</Pattern\>  
        \<Pattern\>\[e.g., consonant digraphs\]\</Pattern\>  
      \</PhonicsPatterns\>  
    \</Exclude\>  
  \</Constraints\>

\</DecodableBookPrompt\>

#### **Example Implementations of the XML Prompt**

**Example 1: CVC Words with Short "a" (Corresponds to Curriculum Lessons 6-9)**

XML

\<DecodableBookPrompt\>  
  \<Persona\>You are a structured literacy expert. Your task is to write a decodable text that is strictly aligned with the Science of Reading.\</Persona\>  
  \<Context\>  
    \<TargetSkill level\="Kindergarten"\>  
      \<PhonicsPattern\>CVC words with short 'a'\</PhonicsPattern\>  
    \</TargetSkill\>  
    \<StoryElements\>  
      \<Characters\>  
        \<Character name\="Sam" description\="a cat"/\>  
        \<Character name\="Pat" description\="a person"/\>  
      \</Characters\>  
      \<Setting\>A room with a mat.\</Setting\>  
      \<Plot\>A cat named Sam sits on a mat, and a person named Pat pats Sam.\</Plot\>  
    \</StoryElements\>  
  \</Context\>  
  \<Structure\>  
    \<Title instruction\="Generate a short, decodable title for the story."/\>  
    \<PageLayout\>  
      \<Instruction\>Generate the book page by page. For each page pair, the text for a scene should be on the left page and the corresponding illustration prompt should be on the right page. The reader must read the text BEFORE seeing the picture.\</Instruction\>  
    \</PageLayout\>  
    \<Story length\="4 sentences"\>  
      \<Instruction\>Generate a decodable story based on the provided context and constraints, following the PageLayout instruction.\</Instruction\>  
    \</Story\>  
    \<Review\>  
      \<Instruction\>After the story, create a review section for the short 'a' sound.\</Instruction\>  
    \</Review\>  
    \<Comprehension questions\="3"\>  
      \<Instruction\>Provide three literal comprehension questions about the story.\</Instruction\>  
    \</Comprehension\>  
  \</Structure\>  
  \<Constraints\>  
    \<Include\>  
      \<WordList\>  
        \<Word\>Sam\</Word\>  
        \<Word\>sat\</Word\>  
        \<Word\>mat\</Word\>  
        \<Word\>Pat\</Word\>  
        \<Word\>pat\</Word\>  
      \</WordList\>  
      \<IrregularWords\>  
        \<Word\>a\</Word\>  
        \<Word\>the\</Word\>  
      \</IrregularWords\>  
    \</Include\>  
    \<Exclude\>  
      \<PhonicsPatterns\>  
        \<Pattern\>short 'i', 'o', 'u', 'e'\</Pattern\>  
        \<Pattern\>consonant digraphs\</Pattern\>  
        \<Pattern\>consonant blends\</Pattern\>  
        \<Pattern\>silent 'e'\</Pattern\>  
      \</PhonicsPatterns\>  
    \</Exclude\>  
  \</Constraints\>  
\</DecodableBookPrompt\>

**Example 2: Consonant Digraph "sh" (Corresponds to Curriculum Lesson 26\)**

XML

\<DecodableBookPrompt\>  
  \<Persona\>You are a structured literacy expert. Your task is to write a decodable text that is strictly aligned with the Science of Reading.\</Persona\>  
  \<Context\>  
    \<TargetSkill level\="First Grade"\>  
      \<PhonicsPattern\>Consonant Digraph 'sh'\</PhonicsPattern\>  
    \</TargetSkill\>  
    \<StoryElements\>  
      \<Characters\>  
        \<Character name\="Josh" description\="a boy"/\>  
      \</Characters\>  
      \<Setting\>A shop and a shed.\</Setting\>  
      \<Plot\>Josh has cash to spend at a shop. He buys a fish and a dish and puts them in a shed.\</Plot\>  
    \</StoryElements\>  
  \</Context\>  
  \<Structure\>  
    \<Title instruction\="Generate a short, decodable title for the story."/\>  
    \<PageLayout\>  
      \<Instruction\>Generate the book page by page. For each page pair, the text for a scene should be on the left page and the corresponding illustration prompt should be on the right page. The reader must read the text BEFORE seeing the picture.\</Instruction\>  
    \</PageLayout\>  
    \<Story length\="5-6 sentences"\>  
      \<Instruction\>Generate a decodable story based on the provided context and constraints, following the PageLayout instruction.\</Instruction\>  
    \</Story\>  
    \<Review\>  
      \<Instruction\>After the story, create a review section for the 'sh' sound.\</Instruction\>  
    \</Review\>  
    \<Comprehension questions\="3"\>  
      \<Instruction\>Provide three literal comprehension questions about the story.\</Instruction\>  
    \</Comprehension\>  
  \</Structure\>  
  \<Constraints\>  
    \<Include\>  
      \<WordList\>  
        \<Word\>Josh\</Word\>  
        \<Word\>shop\</Word\>  
        \<Word\>cash\</Word\>  
        \<Word\>fish\</Word\>  
        \<Word\>dish\</Word\>  
        \<Word\>shed\</Word\>  
      \</WordList\>  
      \<IrregularWords\>  
        \<Word\>the\</Word\>  
        \<Word\>a\</Word\>  
        \<Word\>is\</Word\>  
        \<Word\>to\</Word\>  
        \<Word\>was\</Word\>  
        \<Word\>of\</Word\>  
        \<Word\>and\</Word\>  
        \<Word\>he\</Word\>  
      \</IrregularWords\>  
    \</Include\>  
    \<Exclude\>  
      \<PhonicsPatterns\>  
        \<Pattern\>digraph 'th'\</Pattern\>  
        \<Pattern\>digraph 'ch'\</Pattern\>  
        \<Pattern\>silent 'e'\</Pattern\>  
      \</PhonicsPatterns\>  
    \</Exclude\>  
  \</Constraints\>  
\</DecodableBookPrompt\>

## **Part X: Additional AAR-Inspired Interactive Exercises**

To enhance variety and multisensory reinforcement, the following game-like exercises, inspired by the *All About Reading* activity book, will be integrated into the app as alternative practice formats.

### **Section 20: Gamified Practice Activities**

#### **Exercise 20.1: Ice Cream Cones (Rhyming)**

* **Objective:** To practice identifying rhyming words.  
* **Interactive Exercise Type:** The screen displays several ice cream cones, each with a word (e.g., "pan"). A conveyor belt moves scoops of ice cream, each with a different word (e.g., "man," "sit," "fan"). The child must drag the rhyming scoops ("man," "fan") and stack them on the correct cone ("pan").1  
* **Game Design:**  
  * **UI Layout:** Three ice cream cones are at the bottom of the screen, each labeled with a word from a different word family (e.g., "pan", "sit", "bug"). At the top, a conveyor belt or slide continuously delivers scoops of ice cream, each labeled with a word.  
  * **Game Flow:**  
    1. **Start:** The cones are in place. The first scoop (e.g., "man") appears on the conveyor.  
    2. **User Interaction:** The user reads the word on the scoop and drags it down to one of the cones.  
    3. **Success Condition:** If the user drops the scoop on the correct rhyming cone ("pan"), it snaps into place, forming a stack. A positive sound plays, and the next scoop appears.  
    4. **Failure Condition:** If the user drops the scoop on a non-rhyming cone, the scoop "melts" or bounces back to the conveyor with a gentle "splat" sound.  
* **Generative AI Prompt:** See Appendix B, Prompt 16\.

#### **Exercise 20.2: Feed the Monster (Word Recognition)**

* **Objective:** To build automaticity in reading decodable words.  
* **Interactive Exercise Type:** A friendly, animated monster appears on screen. The app speaks a word (e.g., "sad"). Several "food" items (e.g., bones, cookies), each labeled with a different word, appear. The child must find the correct food item ("sad") and drag it to the monster's mouth. The monster happily eats correct words and gently spits out incorrect ones.1  
* **Game Design:**  
  * **UI Layout:** A large, friendly, animated monster character is positioned in the center of the screen. The monster's mouth should be a clear target area. At the bottom of the screen, a row of 3-5 "food" items (e.g., cookies, bones, fruits) is displayed. Each food item has a unique, clearly legible decodable word written on it.  
  * **Game Flow:**  
    1. **Start:** The monster appears. An audio prompt plays, with the monster's voice saying, "I'm hungry\! Feed me the word... *sad*."  
    2. **User Interaction:** The user must identify the food item with the word "sad" and drag it towards the monster's mouth.  
    3. **Success Condition:** When the correct food item is dragged over the mouth, the mouth animates open. Upon release, the item is "eaten" with a crunching sound effect. The monster smiles, and a star is awarded. A new set of food items and a new prompt are presented.  
    4. **Failure Condition:** If an incorrect food item is dragged to the mouth, the monster shakes its head "no," makes a "bleh" sound, and the food item animates back to its starting position.  
* **Generative AI Prompt:** See Appendix B, Prompt 17\.

#### **Exercise 20.3: Over Easy (Word Recognition)**

* **Objective:** To practice reading words with a specific phonics pattern.  
* **Interactive Exercise Type:** A frying pan is shown with several sunny-side-up eggs. Each egg has a word on it (e.g., "them," "this," "bath"). The child is given a digital spatula. An audio prompt says, "Find the word *bath*." The child must use the spatula to tap and "flip" the correct egg, which reveals a fun animation.1  
* **Game Design:**  
  * **UI Layout:** A large frying pan is in the center of the screen, containing 5-6 fried eggs. Each egg has a word written on its yolk. A spatula tool is visible on the side.  
  * **Game Flow:**  
    1. **Start:** The scene loads. An audio prompt says, "Use the spatula to flip the word... *bath*."  
    2. **User Interaction:** The user drags the spatula tool and taps it on one of the eggs.  
    3. **Success Condition:** If the user taps the egg with the correct word ("bath"), an animation plays where the spatula flips the egg over. The back of the flipped egg reveals a star or a funny picture. A "sizzle" and "ding\!" sound effect plays. The game proceeds with a new prompt.  
    4. **Failure Condition:** If the user taps an incorrect egg, a dull "clank" sound plays, and the egg does not flip. The user can try again.  
* **Generative AI Prompt:** See Appendix B, Prompt 18\.

#### **Exercise 20.4: Letter Sounds Bingo**

* **Objective:** To reinforce rapid recognition of letter-sound correspondences.  
* **Interactive Exercise Type:** The child is shown a 3x3 bingo card with letters in each square. The app calls out a sound (e.g., "/k/"). The child must find and tap the corresponding letter on their card ('k' or 'c'). The goal is to get three in a row.1  
* **Game Design:**  
  * **UI Layout:** A 3x3 grid (bingo card) is displayed, with a different letter in each of the 9 squares.  
  * **Game Flow:**  
    1. **Start:** The bingo card is displayed.  
    2. **Audio Prompt:** An audio voiceover calls out a phoneme: "/p/".  
    3. **User Interaction:** The user must find the letter that represents that sound on the card and tap it.  
    4. **Success Condition:** If the user taps the correct letter ('p'), the square is marked with a chip or an 'X'. The game then calls out the next sound. When the user gets three marks in a row (horizontally, vertically, or diagonally), a "BINGO\!" animation and sound plays, and a new card is generated.  
    5. **Failure Condition:** If the user taps an incorrect letter, a buzzer sound plays, and the square flashes red briefly. The user can try again.  
* **Generative AI Prompt:** See Appendix B, Prompt 19\.

#### **Exercise 20.5: Make a Match (Comprehension)**

* **Objective:** To match sentences from a story to their corresponding illustrations, reinforcing comprehension.  
* **Interactive Exercise Type:** After reading a story, the child is presented with several illustrations from the story on one side of the screen and several sentences from the story on the other. The child must draw a line to connect each sentence to the picture it describes.1  
* **Game Design:**  
  * **UI Layout:** The screen is split into two columns. The left column displays three illustrations from a recently read story, in a jumbled order. The right column displays the three corresponding sentences, also in a jumbled order.  
  * **Game Flow:**  
    1. **Start:** The illustrations and sentences are displayed. An audio prompt says, "Match the sentence to the picture."  
    2. **User Interaction:** The user taps a sentence and then taps the corresponding picture, or drags a line from the sentence to the picture.  
    3. **Success Condition:** When a correct match is made, the line connects, turns green, and locks into place. A positive chime sounds. Once all pairs are correctly matched, a "Well Done\!" animation plays.  
    4. **Failure Condition:** If an incorrect match is attempted, the line turns red and disappears, and a gentle "whoops" sound plays, allowing the user to try again.  
* **Generative AI Prompt:** See Appendix B, Prompt 20\.

#### **Exercise 20.6: Why Did They Do That? (Comprehension & Inference)**

* **Objective:** To practice making simple inferences about character motivation.  
* **Interactive Exercise Type:** The app displays a picture of an animal doing something (e.g., a monkey reaching for a banana). An audio prompt asks, "Why does the monkey want the banana?" Three simple, illustrated answer choices appear (e.g., "He is hungry," "He is sleepy," "He is cold"). The child taps the most logical answer.1  
* **Game Design:**  
  * **UI Layout:** A central image shows a character performing an action (e.g., a bird with a twig in its mouth). Below, three tappable choice boxes are displayed, each containing a simple illustration representing a reason (e.g., a nest, a worm, a sleeping bird).  
  * **Game Flow:**  
    1. **Start:** The central image and choices appear. An audio prompt asks an inference question: "Why does the bird have a twig in her mouth?"  
    2. **User Interaction:** The user taps one of the three illustrated choice boxes.  
    3. **Success Condition:** If the user taps the correct reason (the nest), the box glows green, a positive sound plays, and the central image might animate to confirm the choice (e.g., the bird flies to the nest and adds the twig).  
    4. **Failure Condition:** If the user taps an incorrect choice, the box shakes "no," and a gentle prompt encourages them to think again.  
* **Generative AI Prompt:** See Appendix B, Prompt 21\.

## **Part XI: Appendices**

### **Appendix A: Master Scope and Sequence Chart**

| Lesson | New Graphemes/Phonemes | New Irregular Words | Decodable Word List | Decodable Sentences/Story Titles | Core Interactive Exercise |
| :---- | :---- | :---- | :---- | :---- | :---- |
| 1-5 | (None \- Auditory Only) | (None) | (None) | (None) | Rhyme Match, Word Tapper, Syllable Squish, Sound Slide, Sound Detective |
| 6-9 | m, s, p, a (Unlocks sounds on Sound Wall) | the, a | am, Sam, map, Pam, sap, at, pat, sat, tap | "Sam, a cat" | Word Builder, Change the Word |
| 10-11 | i, n, c, h (Unlocks sounds on Sound Wall) | is | in, an, man, pan, tan, nap, pin, tin, tip, sip, sit, pit, cat, cap, can, hat, hit, him, jab, tab, ham | "A Tin Can" | Word Builder, Change the Word |
| 12-13 | o, d, g, f (Unlocks sounds on Sound Wall) | of | on, hot, hop, hog, fog, dot, dog, Don, cod, got, god, top, pop, pot, not, mad, sad, bad, bag, tag, gas, dad | "A Mop" | Word Builder, Change the Word |
| 14-15 | b, u, l, e (Unlocks sounds on Sound Wall) | was, I, to | up, us, bug, bud, bun, but, cup, cub, fun, gum, gun, hug, hum, jug, mud, nut, pup, run, rub, sun, tub, bed, beg, bell, bet, den, fed, get, hen, jet, leg, let, men, met, net, pen, pet, red, set, ten, Ted, vet, web, wet, yes, yet | "A Bug", "A Wet Hen" | Word Builder, Change the Word |
| 26-33 | sh, th, ch, ck (Unlocks sounds on Sound Wall) | said, she, no | cash, dish, fish, hush, shall, shed, shelf, ship, shop, shot, shut, wish, bath, with, than, that, them, this, thick, thin, thud, thump, chat, chin, chill, chick, chop, chip, chum, much, rich, such, duck, Jack, kick, lock, luck, neck, pick, quick, quack, rock, sick, tack | "Ship on a Shelf", "The Thump", "The Chick" | Sound Search |
| 34-40 | Final & Initial Blends | for, do | fast, lost, nest, camp, jump, hand, send, tent, ask, gift, help, belt, stop, spot, slip, sled, flag, flip, frog, drip, trap, grin | "The Flag", "The Sled", "The Brass Band" | Blend Flipper |
| 41-45 | FLOSS Rule, \-ng, \-nk (Unlocks sounds on Sound Wall) |  | puff, hill, mess, buzz, bang, sing, long, hung, bank, pink, honk, sunk |  | Word Sort |
| 46-50 | VCe (a\_e, i\_e, o\_e, u\_e) |  | cake, bake, name, five, like, time, hope, bone, rope, cute, mule, rule |  | Magic Wand |
| 51-53 | Plurals (-s, \-es), Compound Words |  | hats, bugs, wishes, boxes, sunset, bathtub, hotdog, sandbox |  | Word Surgery |
| 54-55 | Open & Closed Syllables |  | napkin, rabbit, open, tiger, robot |  | Syllable Split |

### **Appendix B: Generative AI Prompts for Interactive Exercises**

1. **Prompt 1 (Rhyme Match):** "Generate a set of 10 visual assets for a children's reading game. Each set should contain one 'target' image and three 'choice' images. One of the choice images must rhyme with the target image. The other two choices should be non-rhyming distractors. The art style should be simple, colorful, and clear for a 4-5 year old. For each set, provide a voice-over script: 'Which one rhymes with \[target word\]?' Also provide audio files for each individual word."  
2. **Prompt 2 (Word Tapper):** "Create an interactive exercise. The sequence is: 1\. Play an audio file of a sentence (e.g., 'The dog ran fast.'). 2\. Display a number of empty, tappable circles on the screen corresponding to the word count of the sentence. 3\. The user must tap one circle for each word. 4\. On correct number of taps, trigger a 'success' animation (e.g., stars exploding from the circles). 5\. On incorrect taps, provide a gentle 'try again' visual cue. Generate 10 sentences with corresponding audio, ranging from 2 to 5 words."  
3. **Prompt 3 (Syllable Squish):** "Design a game mechanic called 'Syllable Squish'. An image of an object is displayed (e.g., 'butterfly'). An audio prompt says the word clearly. A large, animated, 'squishy' button is on screen. The user must tap the button once for each syllable in the word. For each correct tap, the button squishes and a segment of a progress bar fills. On the final correct tap, the progress bar completes and a celebration animation plays. Generate visual assets and audio for the following words: tiger, apple, butterfly, elephant, caterpillar, helicopter."  
4. **Prompt 4 (Sound Slide):** "Create an interactive blending exercise. Two separate tiles appear on screen, each with a letter or letter group (grapheme). The first tile is the onset, the second is the rime. The user must drag the onset tile to the rime tile. When they collide, they merge into a single tile and an audio file of the blended word plays. Generate the required audio files (onsets, rimes, and full words) for the following pairs: /c/ \+ /at/, /b/ \+ /at/, /s/ \+ /at/; /p/ \+ /in/, /f/ \+ /in/; /t/ \+ /op/, /m/ \+ /op/."  
5. **Prompt 5 (Sound Detective):** "Generate a game sequence. An image appears (e.g., 'sun'). An audio prompt asks, 'What is the first sound in sun?'. Three tappable buttons appear, each playing a different phoneme when tapped (e.g., /s/, /m/, /t/). If the user taps the correct sound, the button glows green and a positive sound effect plays. If incorrect, it flashes red. Create this sequence for the first, middle, and last sounds for the words: sun, map, pig, top, bug."  
6. **Prompt 6 (Core Blending Method):** "Generate a complete, multi-step interactive animation for teaching word blending with the word 'map'. Step 1: Animate the letters 'm' and 'a' appearing separately. Play audio: '/m/... /a/... /ma/'. Step 2: Prompt the user to drag the 'm' tile to the 'a' tile. On contact, merge them and play audio '/ma/'. Step 3: Animate the letter 'p' appearing. Play audio: '/ma/... /p/... /map/'. Step 4: Prompt the user to drag the 'ma' tile to the 'p' tile. On contact, merge all three into the word 'map' and play the full word audio 'map' with a celebratory visual effect."  
7. **Prompt 7 (Change the Word):** "Create an interactive exercise. A word is displayed with letter tiles (e.g., 'c-a-t'). The initial letter 'c' glows, then animates off-screen while a new letter, 'm', animates into its place. The new word 'mat' is now displayed. An audio prompt asks, 'What is the new word?'. Use voice recognition to check the child's answer. Generate sequences for: cat-\>mat-\>pat; pin-\>fin-\>win; hop-\>top-\>mop."  
8. **Prompt 8 (Sound Search):** "Generate a game where a picture is shown (e.g., a 'ship'). Below the picture, three bubbles appear containing the digraphs 'sh', 'ch', and 'th'. An audio prompt asks, 'What sound does ship start with?'. The user must tap the correct bubble. On correct tap, the bubble floats up and places the digraph at the beginning of the word '\_\_ip' to complete it. Generate image assets and audio for: ship, fish, chin, chop, bath, thin."  
9. **Prompt 9 (Blend Flipper):** "Create a 'Word Flipper' interactive element. Display a static rime (e.g., '\_\_amp'). To the left, create a flipper element with a list of onsets (c, l, st, tr). When the user taps the flipper, it cycles to the next onset in the list, and the corresponding full word audio is played (e.g., 'camp', 'lamp', 'stamp', 'tramp'). Create flippers for the rimes: \-amp, \-est, \-ick, \-op."  
10. **Prompt 10 (Word Sort):** "Design a drag-and-drop game. Three labeled buckets are on screen: 'FLOSS Words', 'Glued Sounds (-ng)', and 'Blends'. A conveyor belt at the top of the screen presents one word at a time on a tile. The user must drag the word tile into the correct bucket. Generate word tiles for: mess, hill, puff, sing, long, hung, fast, camp, stop, flag."  
11. **Prompt 11 (Magic Wand):** "Create an animation sequence for the 'Magic e' rule. A CVC word is shown (e.g., 'cap'). A magic wand with the letter 'e' on its tip appears. The user drags the wand to the end of the word. When the 'e' touches the word, a sparkling particle effect animates from the 'e' to the vowel 'a'. The vowel 'a' transforms to show it is now a long vowel (e.g., a macron appears above it). The audio plays the new word 'cape'. Create this for the pairs: cap/cape, dim/dime, hop/hope, cub/cube."  
12. **Prompt 12 (Word Surgery):** "Design a game called 'Word Surgery'. A compound word is shown on a tile (e.g., 'pancake') with a dotted line between the two smaller words ('pan' and 'cake'). The user is given a 'saw' tool. They must drag the saw along the dotted line. As they drag, the word splits apart into two separate tiles. When the cut is complete, play audio for each part ('pan'... 'cake') and then the whole word ('pancake'). Generate assets for: pancake, sunset, hotdog, catfish."  
13. **Prompt 13 (Syllable Split):** "Create an interactive exercise for syllable division. A two-syllable word is displayed (e.g., 'robot'). The user must tap between the letters where the word divides. If correct (between 'o' and 'b'), the word animates splitting into two parts. A label 'Open' appears under the first syllable ('ro') and 'Closed' appears under the second ('bot'). Audio plays for each syllable and then the whole word. If the tap is incorrect, the word shakes 'no'. Generate assets for: robot, napkin, tiger, sunset."  
14. **Prompt 14 (Heart Word Method):** "Create a multi-step animation for the irregular word 'said'. 1\. Display the word 'said'. Play audio: 'This is the word said. The cat said meow.' 2\. Animate three empty boxes appearing below the word. Play audio: 'Let's count the sounds in said: /s/ /e/ /d/.' 3\. Animate the letters 's', 'ai', and 'd' flying from the word into their respective boxes. 4\. The 's' and 'd' boxes glow green. Play audio: '/s/ makes its usual sound. /d/ makes its usual sound.' 5\. A heart animates over the 'ai' box. Play audio: 'This is the tricky part. It says /e/. We have to learn this part by heart.' The animation should be clear, slow, and engaging for a young child."  
15. **Prompt 15 (Interactive Sound Wall):** "Design an interactive sound wall for a children's reading app. The wall should be divided into a 'Vowel Valley' and a 'Consonant Wall'. Each of the 44 phonemes should be represented by a card that is initially 'locked'. When a phoneme is taught, the card 'unlocks'. Tapping an unlocked card must trigger a modal window with four elements: 1\. A high-quality, close-up video of a real mouth articulating the sound. 2\. A clear audio file of the phoneme being pronounced correctly. 3\. A memorable anchor image and word (e.g., a picture of an 'apple' for the /ă/ sound). 4\. A section to display all the graphemes (spelling patterns) for that sound, which will be populated progressively as each grapheme is taught in the curriculum."  
16. **Prompt 16 (Ice Cream Cones):** "Design a rhyming game. The user is shown three ice cream cones, each with a CVC word (e.g., 'cat', 'bug', 'pin'). A series of ice cream scoops with other CVC words appears. The user must drag each scoop to the cone that it rhymes with. Correct matches stack neatly; incorrect matches melt. Generate assets for the cones (cat, bug, pin) and scoops (hat, sat, rug, hug, fin, tin, dog, log)."  
17. **Prompt 17 (Feed the Monster):** "Create a word recognition game. An animated monster character is on screen. The monster says, 'I'm hungry for the word *run*\!' A set of five bones, each with a different CVC word, appears. The user must drag the bone with the word 'run' to the monster's mouth. If correct, the monster eats it with a happy animation. If incorrect, the monster spits it out. Generate assets for the monster and word items for the sets: (run, sat, fun, map, ten) and (pig, top, sad, get, him)."  
18. **Prompt 18 (Over Easy):** "Create a word recognition game. A frying pan is on screen with five fried eggs. Each egg has a word with the 'th' digraph written on it. An audio prompt says, 'Flip the word *bath*.' The user is given a spatula. When the user taps the correct egg ('bath'), the spatula animates to flip it, revealing a star. Tapping an incorrect egg produces a 'sizzle' sound with no flip. Generate assets for the pan, spatula, and eggs with the words: bath, them, this, thin, moth."  
19. **Prompt 19 (Letter Sounds Bingo):** "Create a bingo game for letter-sound recognition. The game displays a 3x3 grid with 9 different letters. An audio voice calls out a sound (e.g., '/p/'). The user must tap the square containing the letter 'p'. When a row, column, or diagonal is completed, a 'BINGO\!' animation plays. Generate 5 different bingo cards using the letters: m, s, p, a, t, n, c, h, d, g, f, b."  
20. **Prompt 20 (Make a Match):** "Create a comprehension game. After a story is read, display three key illustrations from the story in a column on the left. On the right, display the three corresponding sentences in a jumbled order. The user must draw a line connecting the correct sentence to its matching illustration. Use content from the 'A Wet Hen' story."  
21. **Prompt 21 (Why Did They Do That?):** "Create an inference game. Display an image of a bird with a twig in its mouth. The audio prompt asks, 'Why does the bird have a twig in her mouth?'. Three simple, illustrated answer choices appear as buttons: 1\. An image of a nest ('She wants to build a nest'). 2\. An image of a bird eating ('She is hungry'). 3\. An image of a bird sleeping ('She is tired'). The user taps the correct answer."

### **Appendix C: Exercise Data Models**

This appendix contains the data model representation for each individual exercise in the curriculum. Each object is a "card" that can be fed into a spaced repetition system.

*(Note: For brevity, only a representative sample of exercises is shown here. A full implementation would include an object for every single word, sentence, and activity instance.)*

JSON

,  
    "assets": { "audio": \["audio\_rhymes\_with\_cat.mp3"\], "images": \["cat.png", "hat.png", "dog.png", "car.png"\] },  
    "srs\_data": { "due\_date": null, "stability": 0, "difficulty": 0, "review\_history": }  
  },  
  {  
    "exercise\_id": "L2-WordTapper-001",  
    "lesson\_number": 2,  
    "exercise\_type": "Word Tapper",  
    "skill\_focus": "Sentence Segmentation",  
    "prompt": { "audio": "audio\_dogs\_run.mp3" },  
    "response\_type": "tap\_count",  
    "correct\_response": 2,  
    "assets": { "audio": \["audio\_dogs\_run.mp3"\], "images": },  
    "srs\_data": { "due\_date": null, "stability": 0, "difficulty": 0, "review\_history": }  
  },  
  {  
    "exercise\_id": "L3-SyllableSquish-001",  
    "lesson\_number": 3,  
    "exercise\_type": "Syllable Squish",  
    "skill\_focus": "Syllable Segmentation",  
    "prompt": { "audio": "audio\_tiger.mp3", "image": "tiger.png" },  
    "response\_type": "tap\_count",  
    "correct\_response": 2,  
    "assets": { "audio": \["audio\_tiger.mp3"\], "images": \["tiger.png"\] },  
    "srs\_data": { "due\_date": null, "stability": 0, "difficulty": 0, "review\_history": }  
  },  
  {  
    "exercise\_id": "L6-WordBuilder-001",  
    "lesson\_number": 6,  
    "exercise\_type": "Word Builder",  
    "skill\_focus": "CVC Blending",  
    "prompt": { "text": "map" },  
    "response\_type": "read\_aloud",  
    "correct\_response": "map",  
    "assets": { "audio": \["audio\_map.mp3"\], "images": },  
    "srs\_data": { "due\_date": null, "stability": 0, "difficulty": 0, "review\_history": }  
  },  
  {  
    "exercise\_id": "L6-WordBuilder-002",  
    "lesson\_number": 6,  
    "exercise\_type": "Word Builder",  
    "skill\_focus": "CVC Blending",  
    "prompt": { "text": "Sam" },  
    "response\_type": "read\_aloud",  
    "correct\_response": "Sam",  
    "assets": { "audio":, "images": },  
    "srs\_data": { "due\_date": null, "stability": 0, "difficulty": 0, "review\_history": }  
  },  
  {  
    "exercise\_id": "L9-ReadSentence-001",  
    "lesson\_number": 9,  
    "exercise\_type": "Read Sentence",  
    "skill\_focus": "Connected Text",  
    "prompt": { "text": "Sam sat." },  
    "response\_type": "read\_aloud",  
    "correct\_response": "Sam sat.",  
    "assets": { "audio":, "images": },  
    "srs\_data": { "due\_date": null, "stability": 0, "difficulty": 0, "review\_history": }  
  },  
  {  
    "exercise\_id": "L14-HeartWord-001",  
    "lesson\_number": 14,  
    "exercise\_type": "Heart Word",  
    "skill\_focus": "Irregular Word",  
    "prompt": { "text": "was" },  
    "response\_type": "read\_aloud",  
    "correct\_response": "was",  
    "assets": { "audio": \["audio\_was.mp3"\], "images": },  
    "srs\_data": { "due\_date": null, "stability": 0, "difficulty": 0, "review\_history": }  
  }  
\]

### **Appendix D: Master Word Bank**

This appendix provides a complete, sortable database of every decodable word introduced in the curriculum. Each word is tagged by its primary phonetic skill, the lesson in which it is introduced, and its syllable structure.

| Word | Primary Phonetic Skill | Lesson Introduced | Syllable Structure |  
|---|---|---|  
| am | CVC (Short a) | 6 | CVC |  
| Sam | CVC (Short a) | 6 | CVC |  
| map | CVC (Short a) | 6 | CVC |  
| at | CVC (Short a) | 7 | VC |  
| pat | CVC (Short a) | 7 | CVC |  
| sat | CVC (Short a) | 8 | CVC |  
| sap | CVC (Short a) | 8 | CVC |  
| Pam | CVC (Short a) | 9 | CVC |  
| tap | CVC (Short a) | 9 | CVC |  
| in | CVC (Short i) | 10 | VC |  
| an | CVC (Short a) | 10 | VC |  
| man | CVC (Short a) | 10 | CVC |  
| pan | CVC (Short a) | 10 | CVC |  
| tan | CVC (Short a) | 10 | CVC |  
| nap | CVC (Short a) | 10 | CVC |  
| pin | CVC (Short i) | 10 | CVC |  
| tin | CVC (Short i) | 10 | CVC |  
| tip | CVC (Short i) | 10 | CVC |  
| sip | CVC (Short i) | 10 | CVC |  
| sit | CVC (Short i) | 10 | CVC |  
| pit | CVC (Short i) | 10 | CVC |  
| cat | CVC (Short a) | 11 | CVC |  
| cap | CVC (Short a) | 11 | CVC |  
| can | CVC (Short a) | 11 | CVC |  
| hat | CVC (Short a) | 11 | CVC |  
| hit | CVC (Short i) | 11 | CVC |  
| him | CVC (Short i) | 11 | CVC |  
| on | CVC (Short o) | 12 | VC |  
| hot | CVC (Short o) | 12 | CVC |  
| hop | CVC (Short o) | 12 | CVC |  
| dot | CVC (Short o) | 12 | CVC |  
| top | CVC (Short o) | 12 | CVC |  
| pop | CVC (Short o) | 12 | CVC |  
| pot | CVC (Short o) | 12 | CVC |  
| not | CVC (Short o) | 12 | CVC |  
| mad | CVC (Short a) | 12 | CVC |  
| sad | CVC (Short a) | 12 | CVC |  
| dad | CVC (Short a) | 12 | CVC |  
| hog | CVC (Short o) | 13 | CVC |  
| fog | CVC (Short o) | 13 | CVC |  
| dog | CVC (Short o) | 13 | CVC |  
| Don | CVC (Short o) | 13 | CVC |  
| cod | CVC (Short o) | 13 | CVC |  
| got | CVC (Short o) | 13 | CVC |  
| god | CVC (Short o) | 13 | CVC |  
| bad | CVC (Short a) | 13 | CVC |  
| bag | CVC (Short a) | 13 | CVC |  
| tag | CVC (Short a) | 13 | CVC |  
| gas | CVC (Short a) | 13 | CVC |  
| up | CVC (Short u) | 14 | VC |  
| us | CVC (Short u) | 14 | VC |  
| bug | CVC (Short u) | 14 | CVC |  
| bud | CVC (Short u) | 14 | CVC |  
| bun | CVC (Short u) | 14 | CVC |  
| but | CVC (Short u) | 14 | CVC |  
| cup | CVC (Short u) | 14 | CVC |  
| cub | CVC (Short u) | 14 | CVC |  
| fun | CVC (Short u) | 14 | CVC |  
| gum | CVC

#### **Works cited**

1. All\_About\_Reading\_Level1\_TM\_Sample.pdf  
2. My first grader is struggling to read. Her school uses the Lucy ..., accessed October 1, 2025, [https://www.reddit.com/r/teaching/comments/1g05kxp/my\_first\_grader\_is\_struggling\_to\_read\_her\_school/](https://www.reddit.com/r/teaching/comments/1g05kxp/my_first_grader_is_struggling_to_read_her_school/)  
3. The Orton-Gillingham Approach to Reading and Spelling \- All About Learning Press, accessed October 1, 2025, [https://www.allaboutlearningpress.com/blog/orton-gillingham/](https://www.allaboutlearningpress.com/blog/orton-gillingham/)  
4. All About Reading \- Cathy Duffy Reviews, accessed October 1, 2025, [https://cathyduffyreviews.com/homeschool-reviews-core-curricula/phonics-reading/phonics-reading-programs/all-about-reading\#](https://cathyduffyreviews.com/homeschool-reviews-core-curricula/phonics-reading/phonics-reading-programs/all-about-reading#)  
5. A Guide to the Orton-Gillingham Approach for Reading Success | Lexia®, accessed October 1, 2025, [https://www.lexialearning.com/blog/guide-orton-gillingham-approach](https://www.lexialearning.com/blog/guide-orton-gillingham-approach)  
6. What is the Orton-Gillingham Approach? | Academy of Orton-Gillingham Practitioners and Educators, accessed October 1, 2025, [https://www.ortonacademy.org/resources/what-is-the-orton-gillingham-approach/](https://www.ortonacademy.org/resources/what-is-the-orton-gillingham-approach/)  
7. What is Orton-Gillingham? \- DyslexAbility, accessed October 1, 2025, [https://www.dyslexability.com.au/post/what-is-orton-gillingham](https://www.dyslexability.com.au/post/what-is-orton-gillingham)  
8. Multisensory Activities to Teach Reading Skills \- Literacy Minnesota, accessed October 1, 2025, [https://www.literacymn.org/multisensory-activities-to-teach-reading-skills](https://www.literacymn.org/multisensory-activities-to-teach-reading-skills)  
9. AAR level one : r/homeschool \- Reddit, accessed October 1, 2025, [https://www.reddit.com/r/homeschool/comments/15vx3s4/aar\_level\_one/](https://www.reddit.com/r/homeschool/comments/15vx3s4/aar_level_one/)  
10. Building Early Literacy Skills: Teach Your Monster to Read Review \- Phonics.org, accessed October 1, 2025, [https://www.phonics.org/teach-your-monster-to-read-review/](https://www.phonics.org/teach-your-monster-to-read-review/)  
11. Orton Gillingham Principles, accessed October 1, 2025, [https://ortongillinghammama.com/orton-gillingham-principles/](https://ortongillinghammama.com/orton-gillingham-principles/)  
12. 35 Easy-to-Use Multisensory Activities Free Download\! \- Savvas, accessed October 1, 2025, [https://www.savvas.com/resource-request/35-multisensory-activities](https://www.savvas.com/resource-request/35-multisensory-activities)  
13. 10 FUN Games and Activities for CVCe Words in Kindergarten & First Grade, accessed October 1, 2025, [https://polkadotsplease.com/2025/02/10-games-and-activities-for-cvce-words.html](https://polkadotsplease.com/2025/02/10-games-and-activities-for-cvce-words.html)  
14. Silent E Games for Kids \- Fun ELA Games \- SplashLearn, accessed October 1, 2025, [https://www.splashlearn.com/ela/silent-e-games](https://www.splashlearn.com/ela/silent-e-games)  
15. Dolch Sight Words List \- Sight Words: Teach Your Child to Read, accessed October 1, 2025, [https://sightwords.com/sight-words/dolch/](https://sightwords.com/sight-words/dolch/)  
16. Dolch Sight Words, accessed October 1, 2025, [https://sightwords.com/pdfs/word\_lists/dolch\_kindergarten.pdf](https://sightwords.com/pdfs/word_lists/dolch_kindergarten.pdf)  
17. Dolch Sight Words List \- ClassWeekly, accessed October 1, 2025, [https://www.classweekly.com/blog/dolch-sight-words/](https://www.classweekly.com/blog/dolch-sight-words/)  
18. Using Sound Walls in Early Elementary Classrooms | Edutopia, accessed October 1, 2025, [https://www.edutopia.org/article/using-sound-walls-early-elementary-classrooms/](https://www.edutopia.org/article/using-sound-walls-early-elementary-classrooms/)  
19. Teachers Are Adopting Sound Walls Over Word Walls: Should You? | Teach Starter, accessed October 1, 2025, [https://www.teachstarter.com/us/blog/why-teachers-are-adopting-sound-walls-over-word-walls-us/](https://www.teachstarter.com/us/blog/why-teachers-are-adopting-sound-walls-over-word-walls-us/)  
20. Science of Reading: Sound Walls in the Classroom \- HMH, accessed October 1, 2025, [https://www.hmhco.com/blog/science-of-reading-sound-walls-in-the-classroom](https://www.hmhco.com/blog/science-of-reading-sound-walls-in-the-classroom)  
21. How to Set Up a Sound Wall in Kindergarten, Early Elementary \- Lessons for Little Ones, accessed October 1, 2025, [https://lessons4littleones.com/how-to-set-up-a-sound-wall-in-kindergarten-early-elementary/](https://lessons4littleones.com/how-to-set-up-a-sound-wall-in-kindergarten-early-elementary/)  
22. How To Use A Sound Wall In The Classroom \- FREE SOR Guide \- Thrive Literacy Corner, accessed October 1, 2025, [https://thriveedservices.com/sound-wall/](https://thriveedservices.com/sound-wall/)  
23. What is a Vowel Valley Sound Wall? \- Lead in Literacy \- Resources For Kindergarten, 1st & 2nd Grade, accessed October 1, 2025, [https://leadinliteracy.com/what-is-a-vowel-valley-sound-wall/](https://leadinliteracy.com/what-is-a-vowel-valley-sound-wall/)  
24. Vowel Valley Printable PDF \- Reading Universe, accessed October 1, 2025, [https://readinguniverse.org/resources/pdf/articulation-pronunciation/vowel-valley](https://readinguniverse.org/resources/pdf/articulation-pronunciation/vowel-valley)  
25. How to Use a Sound Wall in the Classroom \- Natalie Lynn Kindergarten, accessed October 1, 2025, [https://natalielynnkindergarten.com/how-to-use-a-sound-wall-in-the-classroom/](https://natalielynnkindergarten.com/how-to-use-a-sound-wall-in-the-classroom/)  
26. How to Use a Sound Wall in the Classroom (Or At Home\!) \- Naomi O'Brien, accessed October 1, 2025, [https://readlikearockstarteaching.com/how-to-use-a-sound-wall-in-the-classroom-or-at-home/](https://readlikearockstarteaching.com/how-to-use-a-sound-wall-in-the-classroom-or-at-home/)