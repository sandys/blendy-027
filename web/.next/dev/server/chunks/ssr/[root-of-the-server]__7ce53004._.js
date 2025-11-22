module.exports = [
"[externals]/next/dist/server/app-render/action-async-storage.external.js [external] (next/dist/server/app-render/action-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/action-async-storage.external.js", () => require("next/dist/server/app-render/action-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/work-unit-async-storage.external.js [external] (next/dist/server/app-render/work-unit-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/work-unit-async-storage.external.js", () => require("next/dist/server/app-render/work-unit-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/work-async-storage.external.js [external] (next/dist/server/app-render/work-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/work-async-storage.external.js", () => require("next/dist/server/app-render/work-async-storage.external.js"));

module.exports = mod;
}),
"[project]/web/lib/theme.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "COLORS",
    ()=>COLORS,
    "LAYOUT",
    ()=>LAYOUT,
    "SPACING",
    ()=>SPACING,
    "TYPOGRAPHY",
    ()=>TYPOGRAPHY
]);
const COLORS = {
    primary: "#FF6B9D",
    secondary: "#4ECDC4",
    background: "#FFF5F7",
    white: "#FFFFFF",
    text: "#333333",
    textLight: "#666666",
    success: "#4CAF50",
    error: "#F44336",
    warning: "#FFC107",
    // Game specific palettes
    rhymeMatch: {
        primary: "#FF6B9D",
        background: "#FFF5F7",
        accent: "#E91E63"
    },
    wordTapper: {
        primary: "#4ECDC4",
        background: "#F0F8FF",
        accent: "#009688"
    },
    soundSearch: {
        primary: "#A5D6A7",
        background: "#F0F4F8",
        accent: "#2E7D32"
    },
    soundDetective: {
        primary: "#4CAF50",
        background: "#E8F5E9",
        accent: "#2E7D32"
    },
    wordBuilder: {
        primary: "#2196F3",
        background: "#E3F2FD",
        accent: "#1976D2"
    },
    syllableSquish: {
        primary: "#FFB84D",
        background: "#FFF9E6",
        accent: "#F57C00"
    },
    soundSlide: {
        primary: "#FFA000",
        background: "#FFF7DC",
        accent: "#FF6F00"
    }
};
const SPACING = {
    xs: 4,
    s: 8,
    m: 16,
    l: 24,
    xl: 32,
    xxl: 48
};
const TYPOGRAPHY = {
    h1: {
        fontSize: 32,
        fontWeight: "bold"
    },
    h2: {
        fontSize: 24,
        fontWeight: "bold"
    },
    h3: {
        fontSize: 20,
        fontWeight: "600"
    },
    body: {
        fontSize: 16,
        fontWeight: "400"
    },
    instruction: {
        fontSize: 22,
        fontWeight: "600"
    }
};
const LAYOUT = {
    maxContentWidth: 1024,
    borderRadius: 20
};
}),
"[project]/web/components/GameLayout.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "GameLayout",
    ()=>GameLayout
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/web/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/web/node_modules/next/navigation.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$x$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__X$3e$__ = __turbopack_context__.i("[project]/web/node_modules/lucide-react/dist/esm/icons/x.js [app-ssr] (ecmascript) <export default as X>");
var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$lib$2f$theme$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/web/lib/theme.ts [app-ssr] (ecmascript)");
'use client';
;
;
;
;
const GameLayout = ({ children, title, instruction, progress, backgroundColor = __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$lib$2f$theme$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["COLORS"].background, primaryColor = __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$lib$2f$theme$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["COLORS"].primary, onBack })=>{
    const router = (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRouter"])();
    const handleBack = ()=>{
        if (onBack) {
            onBack();
        } else {
            router.back();
        }
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "flex flex-col h-screen w-screen overflow-hidden select-none touch-none",
        style: {
            backgroundColor
        },
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex items-center justify-between px-4 py-3 z-10 h-16 shrink-0",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex flex-1 items-center gap-4",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                onClick: handleBack,
                                className: "w-10 h-10 rounded-full bg-white flex items-center justify-center shadow-md active:scale-95 transition-transform",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$x$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__X$3e$__["X"], {
                                    size: 24,
                                    color: primaryColor
                                }, void 0, false, {
                                    fileName: "[project]/web/components/GameLayout.tsx",
                                    lineNumber: 49,
                                    columnNumber: 13
                                }, ("TURBOPACK compile-time value", void 0))
                            }, void 0, false, {
                                fileName: "[project]/web/components/GameLayout.tsx",
                                lineNumber: 45,
                                columnNumber: 11
                            }, ("TURBOPACK compile-time value", void 0)),
                            progress && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "px-3 py-1 rounded-xl bg-white/50 backdrop-blur-sm",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: "text-sm font-semibold text-gray-600",
                                    children: progress
                                }, void 0, false, {
                                    fileName: "[project]/web/components/GameLayout.tsx",
                                    lineNumber: 54,
                                    columnNumber: 15
                                }, ("TURBOPACK compile-time value", void 0))
                            }, void 0, false, {
                                fileName: "[project]/web/components/GameLayout.tsx",
                                lineNumber: 53,
                                columnNumber: 13
                            }, ("TURBOPACK compile-time value", void 0))
                        ]
                    }, void 0, true, {
                        fileName: "[project]/web/components/GameLayout.tsx",
                        lineNumber: 44,
                        columnNumber: 9
                    }, ("TURBOPACK compile-time value", void 0)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex-[2] flex justify-center text-center",
                        children: instruction && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                            className: "text-xl md:text-2xl font-bold",
                            style: {
                                color: primaryColor
                            },
                            children: instruction
                        }, void 0, false, {
                            fileName: "[project]/web/components/GameLayout.tsx",
                            lineNumber: 61,
                            columnNumber: 13
                        }, ("TURBOPACK compile-time value", void 0))
                    }, void 0, false, {
                        fileName: "[project]/web/components/GameLayout.tsx",
                        lineNumber: 59,
                        columnNumber: 9
                    }, ("TURBOPACK compile-time value", void 0)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex-1"
                    }, void 0, false, {
                        fileName: "[project]/web/components/GameLayout.tsx",
                        lineNumber: 70,
                        columnNumber: 9
                    }, ("TURBOPACK compile-time value", void 0))
                ]
            }, void 0, true, {
                fileName: "[project]/web/components/GameLayout.tsx",
                lineNumber: 43,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex-1 w-full p-4 flex justify-center items-center relative",
                children: children
            }, void 0, false, {
                fileName: "[project]/web/components/GameLayout.tsx",
                lineNumber: 74,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0))
        ]
    }, void 0, true, {
        fileName: "[project]/web/components/GameLayout.tsx",
        lineNumber: 38,
        columnNumber: 5
    }, ("TURBOPACK compile-time value", void 0));
};
}),
"[project]/web/lib/data/curriculum.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "ALL_PHONEME_CARDS",
    ()=>ALL_PHONEME_CARDS,
    "PHASES",
    ()=>PHASES,
    "SAMPLE_LESSONS",
    ()=>SAMPLE_LESSONS
]);
const PHASES = [
    {
        phase: 1,
        title: "Pre-Reading Skills",
        description: "Phonological & Phonemic Awareness",
        lessonRange: [
            1,
            5
        ],
        color: "#FF6B9D"
    },
    {
        phase: 2,
        title: "The Alphabetic Principle",
        description: "Letter-Sounds & CVC Words",
        lessonRange: [
            6,
            25
        ],
        color: "#4ECDC4"
    },
    {
        phase: 3,
        title: "Expanding the Code",
        description: "Digraphs, Blends & Patterns",
        lessonRange: [
            26,
            45
        ],
        color: "#FFD93D"
    },
    {
        phase: 4,
        title: "Advanced Decoding",
        description: "VCe, Syllables & Morphology",
        lessonRange: [
            46,
            55
        ],
        color: "#A78BFA"
    }
];
const ALL_PHONEME_CARDS = [
    // VOWELS - Organized in Vowel Valley shape
    // Long e (high front)
    {
        phoneme: "/ē/",
        graphemes: [
            "ee",
            "e_e",
            "e",
            "ea",
            "ey",
            "y",
            "ie",
            "ei"
        ],
        anchorWord: "bee",
        anchorImage: "🐝",
        category: "vowel",
        subcategory: "long_e",
        unlocked: false
    },
    // Short i
    {
        phoneme: "/ĭ/",
        graphemes: [
            "i",
            "y"
        ],
        anchorWord: "igloo",
        anchorImage: "🏔️",
        category: "vowel",
        subcategory: "short_i",
        unlocked: false
    },
    // Long a
    {
        phoneme: "/ā/",
        graphemes: [
            "a",
            "a_e",
            "ai",
            "ay",
            "ei",
            "ey",
            "ea"
        ],
        anchorWord: "alien",
        anchorImage: "👽",
        category: "vowel",
        subcategory: "long_a",
        unlocked: false
    },
    // Short e
    {
        phoneme: "/ĕ/",
        graphemes: [
            "e",
            "ea"
        ],
        anchorWord: "egg",
        anchorImage: "🥚",
        category: "vowel",
        subcategory: "short_e",
        unlocked: false
    },
    // Short a
    {
        phoneme: "/ă/",
        graphemes: [
            "a"
        ],
        anchorWord: "apple",
        anchorImage: "🍎",
        category: "vowel",
        subcategory: "short_a",
        unlocked: false
    },
    // Long i
    {
        phoneme: "/ī/",
        graphemes: [
            "i",
            "i_e",
            "ie",
            "y",
            "igh",
            "ig"
        ],
        anchorWord: "ice",
        anchorImage: "🧊",
        category: "vowel",
        subcategory: "long_i",
        unlocked: false
    },
    // Short o
    {
        phoneme: "/ŏ/",
        graphemes: [
            "o",
            "a"
        ],
        anchorWord: "octopus",
        anchorImage: "🐙",
        category: "vowel",
        subcategory: "short_o",
        unlocked: false
    },
    // Short u
    {
        phoneme: "/ŭ/",
        graphemes: [
            "u"
        ],
        anchorWord: "umbrella",
        anchorImage: "☂️",
        category: "vowel",
        subcategory: "short_u",
        unlocked: false
    },
    // aw sound
    {
        phoneme: "/aw/",
        graphemes: [
            "aw",
            "au",
            "al"
        ],
        anchorWord: "paw",
        anchorImage: "🐾",
        category: "vowel",
        subcategory: "aw",
        unlocked: false
    },
    // Long o
    {
        phoneme: "/ō/",
        graphemes: [
            "o",
            "o_e",
            "ow",
            "oa",
            "oe"
        ],
        anchorWord: "oval",
        anchorImage: "⭕",
        category: "vowel",
        subcategory: "long_o",
        unlocked: false
    },
    // oo (book)
    {
        phoneme: "/oo/",
        graphemes: [
            "oo",
            "u"
        ],
        anchorWord: "book",
        anchorImage: "📖",
        category: "vowel",
        subcategory: "oo_short",
        unlocked: false
    },
    // Long u (ue)
    {
        phoneme: "/ū/",
        graphemes: [
            "ue",
            "u_e",
            "ew",
            "ew",
            "u"
        ],
        anchorWord: "unicorn",
        anchorImage: "🦄",
        category: "vowel",
        subcategory: "long_u",
        unlocked: false
    },
    // yoo sound
    {
        phoneme: "/yū/",
        graphemes: [
            "u",
            "u_e",
            "ue"
        ],
        anchorWord: "music",
        anchorImage: "🎵",
        category: "vowel",
        subcategory: "yoo",
        unlocked: false
    },
    // oi/oy
    {
        phoneme: "/oi/",
        graphemes: [
            "oi",
            "oy"
        ],
        anchorWord: "coin",
        anchorImage: "🪙",
        category: "vowel",
        subcategory: "oi",
        unlocked: false
    },
    // ou/ow
    {
        phoneme: "/ou/",
        graphemes: [
            "ou",
            "ow"
        ],
        anchorWord: "cloud",
        anchorImage: "☁️",
        category: "vowel",
        subcategory: "ou",
        unlocked: false
    },
    // er/ir/ur
    {
        phoneme: "/er/",
        graphemes: [
            "er",
            "ir",
            "ur",
            "or"
        ],
        anchorWord: "bird",
        anchorImage: "🐦",
        category: "vowel",
        subcategory: "r_controlled_er",
        unlocked: false
    },
    // ar
    {
        phoneme: "/ar/",
        graphemes: [
            "ar",
            "a"
        ],
        anchorWord: "barn",
        anchorImage: "🏚️",
        category: "vowel",
        subcategory: "r_controlled_ar",
        unlocked: false
    },
    // or
    {
        phoneme: "/or/",
        graphemes: [
            "or",
            "ore",
            "oar",
            "our",
            "oor"
        ],
        anchorWord: "fork",
        anchorImage: "🍴",
        category: "vowel",
        subcategory: "r_controlled_or",
        unlocked: false
    },
    // schwa
    {
        phoneme: "/ə/",
        graphemes: [
            "a",
            "e",
            "i",
            "o",
            "u"
        ],
        anchorWord: "banana",
        anchorImage: "🍌",
        category: "vowel",
        subcategory: "schwa",
        unlocked: false
    },
    // CONSONANTS - Organized by manner and place of articulation
    // STOPS
    {
        phoneme: "/p/",
        graphemes: [
            "p",
            "pp"
        ],
        anchorWord: "pig",
        anchorImage: "🐷",
        category: "consonant",
        subcategory: "stop",
        unlocked: false
    },
    {
        phoneme: "/b/",
        graphemes: [
            "b",
            "bb"
        ],
        anchorWord: "ball",
        anchorImage: "⚽",
        category: "consonant",
        subcategory: "stop",
        unlocked: false
    },
    {
        phoneme: "/t/",
        graphemes: [
            "t",
            "tt",
            "ed"
        ],
        anchorWord: "tiger",
        anchorImage: "🐯",
        category: "consonant",
        subcategory: "stop",
        unlocked: false
    },
    {
        phoneme: "/d/",
        graphemes: [
            "d",
            "dd",
            "ed"
        ],
        anchorWord: "dog",
        anchorImage: "🐕",
        category: "consonant",
        subcategory: "stop",
        unlocked: false
    },
    {
        phoneme: "/k/",
        graphemes: [
            "c",
            "k",
            "ck",
            "ch",
            "qu"
        ],
        anchorWord: "cat",
        anchorImage: "🐱",
        category: "consonant",
        subcategory: "stop",
        unlocked: false
    },
    {
        phoneme: "/g/",
        graphemes: [
            "g",
            "gg",
            "gh",
            "gu",
            "gue"
        ],
        anchorWord: "goat",
        anchorImage: "🐐",
        category: "consonant",
        subcategory: "stop",
        unlocked: false
    },
    // AFFRICATES
    {
        phoneme: "/ch/",
        graphemes: [
            "ch",
            "tch"
        ],
        anchorWord: "cheese",
        anchorImage: "🧀",
        category: "consonant",
        subcategory: "affricate",
        unlocked: false
    },
    {
        phoneme: "/j/",
        graphemes: [
            "j",
            "g",
            "dge",
            "ge"
        ],
        anchorWord: "jam",
        anchorImage: "🍓",
        category: "consonant",
        subcategory: "affricate",
        unlocked: false
    },
    // NASALS
    {
        phoneme: "/m/",
        graphemes: [
            "m",
            "mm",
            "mb"
        ],
        anchorWord: "moon",
        anchorImage: "🌙",
        category: "consonant",
        subcategory: "nasal",
        unlocked: false
    },
    {
        phoneme: "/n/",
        graphemes: [
            "n",
            "nn",
            "kn",
            "gn"
        ],
        anchorWord: "nest",
        anchorImage: "🪺",
        category: "consonant",
        subcategory: "nasal",
        unlocked: false
    },
    {
        phoneme: "/ng/",
        graphemes: [
            "ng",
            "n"
        ],
        anchorWord: "ring",
        anchorImage: "💍",
        category: "consonant",
        subcategory: "nasal",
        unlocked: false
    },
    // FRICATIVES
    {
        phoneme: "/s/",
        graphemes: [
            "s",
            "ss",
            "c",
            "ce",
            "se"
        ],
        anchorWord: "sun",
        anchorImage: "☀️",
        category: "consonant",
        subcategory: "fricative",
        unlocked: false
    },
    {
        phoneme: "/z/",
        graphemes: [
            "z",
            "zz",
            "s",
            "se"
        ],
        anchorWord: "zebra",
        anchorImage: "🦓",
        category: "consonant",
        subcategory: "fricative",
        unlocked: false
    },
    {
        phoneme: "/th/",
        graphemes: [
            "th"
        ],
        anchorWord: "thumb",
        anchorImage: "👍",
        category: "consonant",
        subcategory: "fricative",
        unlocked: false
    },
    {
        phoneme: "/th/",
        graphemes: [
            "th"
        ],
        anchorWord: "this",
        anchorImage: "👈",
        category: "consonant",
        subcategory: "fricative",
        unlocked: false
    },
    {
        phoneme: "/sh/",
        graphemes: [
            "sh",
            "ch",
            "ti",
            "ci",
            "s",
            "ss"
        ],
        anchorWord: "ship",
        anchorImage: "🚢",
        category: "consonant",
        subcategory: "fricative",
        unlocked: false
    },
    {
        phoneme: "/zh/",
        graphemes: [
            "s",
            "ge"
        ],
        anchorWord: "treasure",
        anchorImage: "💎",
        category: "consonant",
        subcategory: "fricative",
        unlocked: false
    },
    {
        phoneme: "/f/",
        graphemes: [
            "f",
            "ff",
            "ph",
            "gh"
        ],
        anchorWord: "fish",
        anchorImage: "🐟",
        category: "consonant",
        subcategory: "fricative",
        unlocked: false
    },
    {
        phoneme: "/v/",
        graphemes: [
            "v",
            "ve"
        ],
        anchorWord: "van",
        anchorImage: "🚐",
        category: "consonant",
        subcategory: "fricative",
        unlocked: false
    },
    {
        phoneme: "/h/",
        graphemes: [
            "h",
            "wh"
        ],
        anchorWord: "hat",
        anchorImage: "🎩",
        category: "consonant",
        subcategory: "fricative",
        unlocked: false
    },
    // GLIDES
    {
        phoneme: "/y/",
        graphemes: [
            "y"
        ],
        anchorWord: "yarn",
        anchorImage: "🧶",
        category: "consonant",
        subcategory: "glide",
        unlocked: false
    },
    {
        phoneme: "/wh/",
        graphemes: [
            "wh"
        ],
        anchorWord: "whale",
        anchorImage: "🐋",
        category: "consonant",
        subcategory: "glide",
        unlocked: false
    },
    {
        phoneme: "/w/",
        graphemes: [
            "w"
        ],
        anchorWord: "wagon",
        anchorImage: "🛒",
        category: "consonant",
        subcategory: "glide",
        unlocked: false
    },
    // LIQUIDS
    {
        phoneme: "/r/",
        graphemes: [
            "r",
            "rr",
            "wr",
            "rh"
        ],
        anchorWord: "rainbow",
        anchorImage: "🌈",
        category: "consonant",
        subcategory: "liquid",
        unlocked: false
    },
    {
        phoneme: "/l/",
        graphemes: [
            "l",
            "ll"
        ],
        anchorWord: "lion",
        anchorImage: "🦁",
        category: "consonant",
        subcategory: "liquid",
        unlocked: false
    },
    // TWO SOUNDS
    {
        phoneme: "/x/",
        graphemes: [
            "x"
        ],
        anchorWord: "fox",
        anchorImage: "🦊",
        category: "consonant",
        subcategory: "two_sounds",
        unlocked: false
    },
    {
        phoneme: "/qu/",
        graphemes: [
            "qu"
        ],
        anchorWord: "queen",
        anchorImage: "👸",
        category: "consonant",
        subcategory: "two_sounds",
        unlocked: false
    }
];
const SAMPLE_LESSONS = [
    {
        lesson_number: 1,
        phase: 1,
        title: "Rhyme Time",
        description: "Learn to recognize and create rhyming words",
        exercises: [
            {
                exercise_id: "L1-RhymeMatch-001",
                lesson_number: 1,
                exercise_type: "Rhyme Match",
                skill_focus: "Rhyme Recognition",
                data: {
                    target: {
                        word: "cat",
                        image: "🐱"
                    },
                    choices: [
                        {
                            word: "hat",
                            image: "🎩",
                            isCorrect: true
                        },
                        {
                            word: "dog",
                            image: "🐕",
                            isCorrect: false
                        },
                        {
                            word: "car",
                            image: "🚗",
                            isCorrect: false
                        }
                    ]
                },
                response_type: "tap_image",
                assets: {
                    audio: [
                        "cat.mp3",
                        "hat.mp3",
                        "dog.mp3",
                        "car.mp3"
                    ]
                },
                srs_data: {
                    due_date: null,
                    stability: 0,
                    difficulty: 0,
                    review_history: []
                }
            },
            {
                exercise_id: "L1-RhymeMatch-002",
                lesson_number: 1,
                exercise_type: "Rhyme Match",
                skill_focus: "Rhyme Recognition",
                data: {
                    target: {
                        word: "bug",
                        image: "🐛"
                    },
                    choices: [
                        {
                            word: "rug",
                            image: "🧶",
                            isCorrect: true
                        },
                        {
                            word: "sun",
                            image: "☀️",
                            isCorrect: false
                        },
                        {
                            word: "tree",
                            image: "🌳",
                            isCorrect: false
                        }
                    ]
                },
                response_type: "tap_image",
                assets: {
                    audio: [
                        "bug.mp3",
                        "rug.mp3",
                        "sun.mp3",
                        "tree.mp3"
                    ]
                },
                srs_data: {
                    due_date: null,
                    stability: 0,
                    difficulty: 0,
                    review_history: []
                }
            },
            {
                exercise_id: "L1-RhymeMatch-003",
                lesson_number: 1,
                exercise_type: "Rhyme Match",
                skill_focus: "Rhyme Recognition",
                data: {
                    target: {
                        word: "pin",
                        image: "📌"
                    },
                    choices: [
                        {
                            word: "fin",
                            image: "🐟",
                            isCorrect: true
                        },
                        {
                            word: "cup",
                            image: "☕",
                            isCorrect: false
                        },
                        {
                            word: "ball",
                            image: "⚽",
                            isCorrect: false
                        }
                    ]
                },
                response_type: "tap_image",
                assets: {
                    audio: [
                        "pin.mp3",
                        "fin.mp3",
                        "cup.mp3",
                        "ball.mp3"
                    ]
                },
                srs_data: {
                    due_date: null,
                    stability: 0,
                    difficulty: 0,
                    review_history: []
                }
            },
            {
                exercise_id: "L1-RhymeMatch-004",
                lesson_number: 1,
                exercise_type: "Rhyme Match",
                skill_focus: "Rhyme Recognition",
                data: {
                    target: {
                        word: "log",
                        image: "🪵"
                    },
                    choices: [
                        {
                            word: "dog",
                            image: "🐕",
                            isCorrect: true
                        },
                        {
                            word: "cat",
                            image: "🐱",
                            isCorrect: false
                        },
                        {
                            word: "fish",
                            image: "🐟",
                            isCorrect: false
                        }
                    ]
                },
                response_type: "tap_image",
                assets: {
                    audio: [
                        "log.mp3",
                        "dog.mp3",
                        "cat.mp3",
                        "fish.mp3"
                    ]
                },
                srs_data: {
                    due_date: null,
                    stability: 0,
                    difficulty: 0,
                    review_history: []
                }
            },
            {
                exercise_id: "L1-RhymeMatch-005",
                lesson_number: 1,
                exercise_type: "Rhyme Match",
                skill_focus: "Rhyme Recognition",
                data: {
                    target: {
                        word: "sun",
                        image: "☀️"
                    },
                    choices: [
                        {
                            word: "run",
                            image: "🏃",
                            isCorrect: true
                        },
                        {
                            word: "moon",
                            image: "🌙",
                            isCorrect: false
                        },
                        {
                            word: "star",
                            image: "⭐",
                            isCorrect: false
                        }
                    ]
                },
                response_type: "tap_image",
                assets: {
                    audio: [
                        "sun.mp3",
                        "run.mp3",
                        "moon.mp3",
                        "star.mp3"
                    ]
                },
                srs_data: {
                    due_date: null,
                    stability: 0,
                    difficulty: 0,
                    review_history: []
                }
            },
            {
                exercise_id: "L1-RhymeMatch-006",
                lesson_number: 1,
                exercise_type: "Rhyme Match",
                skill_focus: "Rhyme Recognition",
                data: {
                    target: {
                        word: "man",
                        image: "👨"
                    },
                    choices: [
                        {
                            word: "pan",
                            image: "🍳",
                            isCorrect: true
                        },
                        {
                            word: "dog",
                            image: "🐕",
                            isCorrect: false
                        },
                        {
                            word: "cup",
                            image: "☕",
                            isCorrect: false
                        }
                    ]
                },
                response_type: "tap_image",
                assets: {
                    audio: [
                        "man.mp3",
                        "pan.mp3",
                        "dog.mp3",
                        "cup.mp3"
                    ]
                },
                srs_data: {
                    due_date: null,
                    stability: 0,
                    difficulty: 0,
                    review_history: []
                }
            },
            {
                exercise_id: "L1-RhymeMatch-007",
                lesson_number: 1,
                exercise_type: "Rhyme Match",
                skill_focus: "Rhyme Recognition",
                data: {
                    target: {
                        word: "bed",
                        image: "🛏️"
                    },
                    choices: [
                        {
                            word: "red",
                            image: "🔴",
                            isCorrect: true
                        },
                        {
                            word: "blue",
                            image: "🔵",
                            isCorrect: false
                        },
                        {
                            word: "green",
                            image: "🟢",
                            isCorrect: false
                        }
                    ]
                },
                response_type: "tap_image",
                assets: {
                    audio: [
                        "bed.mp3",
                        "red.mp3",
                        "blue.mp3",
                        "green.mp3"
                    ]
                },
                srs_data: {
                    due_date: null,
                    stability: 0,
                    difficulty: 0,
                    review_history: []
                }
            },
            {
                exercise_id: "L1-RhymeMatch-008",
                lesson_number: 1,
                exercise_type: "Rhyme Match",
                skill_focus: "Rhyme Recognition",
                data: {
                    target: {
                        word: "pig",
                        image: "🐷"
                    },
                    choices: [
                        {
                            word: "wig",
                            image: "💇",
                            isCorrect: true
                        },
                        {
                            word: "cow",
                            image: "🐄",
                            isCorrect: false
                        },
                        {
                            word: "hen",
                            image: "🐔",
                            isCorrect: false
                        }
                    ]
                },
                response_type: "tap_image",
                assets: {
                    audio: [
                        "pig.mp3",
                        "wig.mp3",
                        "cow.mp3",
                        "hen.mp3"
                    ]
                },
                srs_data: {
                    due_date: null,
                    stability: 0,
                    difficulty: 0,
                    review_history: []
                }
            },
            {
                exercise_id: "L1-RhymeMatch-009",
                lesson_number: 1,
                exercise_type: "Rhyme Match",
                skill_focus: "Rhyme Recognition",
                data: {
                    target: {
                        word: "hop",
                        image: "🦘"
                    },
                    choices: [
                        {
                            word: "mop",
                            image: "🧹",
                            isCorrect: true
                        },
                        {
                            word: "run",
                            image: "🏃",
                            isCorrect: false
                        },
                        {
                            word: "sit",
                            image: "🪑",
                            isCorrect: false
                        }
                    ]
                },
                response_type: "tap_image",
                assets: {
                    audio: [
                        "hop.mp3",
                        "mop.mp3",
                        "run.mp3",
                        "sit.mp3"
                    ]
                },
                srs_data: {
                    due_date: null,
                    stability: 0,
                    difficulty: 0,
                    review_history: []
                }
            },
            {
                exercise_id: "L1-RhymeMatch-010",
                lesson_number: 1,
                exercise_type: "Rhyme Match",
                skill_focus: "Rhyme Recognition",
                data: {
                    target: {
                        word: "jet",
                        image: "✈️"
                    },
                    choices: [
                        {
                            word: "net",
                            image: "🥅",
                            isCorrect: true
                        },
                        {
                            word: "car",
                            image: "🚗",
                            isCorrect: false
                        },
                        {
                            word: "boat",
                            image: "⛵",
                            isCorrect: false
                        }
                    ]
                },
                response_type: "tap_image",
                assets: {
                    audio: [
                        "jet.mp3",
                        "net.mp3",
                        "car.mp3",
                        "boat.mp3"
                    ]
                },
                srs_data: {
                    due_date: null,
                    stability: 0,
                    difficulty: 0,
                    review_history: []
                }
            },
            {
                exercise_id: "L1-RhymeMatch-011",
                lesson_number: 1,
                exercise_type: "Rhyme Match",
                skill_focus: "Rhyme Recognition",
                data: {
                    target: {
                        word: "box",
                        image: "📦"
                    },
                    choices: [
                        {
                            word: "fox",
                            image: "🦊",
                            isCorrect: true
                        },
                        {
                            word: "bag",
                            image: "👜",
                            isCorrect: false
                        },
                        {
                            word: "pen",
                            image: "🖊️",
                            isCorrect: false
                        }
                    ]
                },
                response_type: "tap_image",
                assets: {
                    audio: [
                        "box.mp3",
                        "fox.mp3",
                        "bag.mp3",
                        "pen.mp3"
                    ]
                },
                srs_data: {
                    due_date: null,
                    stability: 0,
                    difficulty: 0,
                    review_history: []
                }
            },
            {
                exercise_id: "L1-RhymeMatch-012",
                lesson_number: 1,
                exercise_type: "Rhyme Match",
                skill_focus: "Rhyme Recognition",
                data: {
                    target: {
                        word: "cake",
                        image: "🎂"
                    },
                    choices: [
                        {
                            word: "lake",
                            image: "🏞️",
                            isCorrect: true
                        },
                        {
                            word: "book",
                            image: "📖",
                            isCorrect: false
                        },
                        {
                            word: "sock",
                            image: "🧦",
                            isCorrect: false
                        }
                    ]
                },
                response_type: "tap_image",
                assets: {
                    audio: [
                        "cake.mp3",
                        "lake.mp3",
                        "book.mp3",
                        "sock.mp3"
                    ]
                },
                srs_data: {
                    due_date: null,
                    stability: 0,
                    difficulty: 0,
                    review_history: []
                }
            },
            {
                exercise_id: "L1-RhymeMatch-013",
                lesson_number: 1,
                exercise_type: "Rhyme Match",
                skill_focus: "Rhyme Recognition",
                data: {
                    target: {
                        word: "bell",
                        image: "🔔"
                    },
                    choices: [
                        {
                            word: "shell",
                            image: "🐚",
                            isCorrect: true
                        },
                        {
                            word: "drum",
                            image: "🥁",
                            isCorrect: false
                        },
                        {
                            word: "horn",
                            image: "📯",
                            isCorrect: false
                        }
                    ]
                },
                response_type: "tap_image",
                assets: {
                    audio: [
                        "bell.mp3",
                        "shell.mp3",
                        "drum.mp3",
                        "horn.mp3"
                    ]
                },
                srs_data: {
                    due_date: null,
                    stability: 0,
                    difficulty: 0,
                    review_history: []
                }
            },
            {
                exercise_id: "L1-RhymeMatch-014",
                lesson_number: 1,
                exercise_type: "Rhyme Match",
                skill_focus: "Rhyme Recognition",
                data: {
                    target: {
                        word: "king",
                        image: "👑"
                    },
                    choices: [
                        {
                            word: "ring",
                            image: "💍",
                            isCorrect: true
                        },
                        {
                            word: "queen",
                            image: "👸",
                            isCorrect: false
                        },
                        {
                            word: "crown",
                            image: "👑",
                            isCorrect: false
                        }
                    ]
                },
                response_type: "tap_image",
                assets: {
                    audio: [
                        "king.mp3",
                        "ring.mp3",
                        "queen.mp3",
                        "crown.mp3"
                    ]
                },
                srs_data: {
                    due_date: null,
                    stability: 0,
                    difficulty: 0,
                    review_history: []
                }
            },
            {
                exercise_id: "L1-RhymeMatch-015",
                lesson_number: 1,
                exercise_type: "Rhyme Match",
                skill_focus: "Rhyme Recognition",
                data: {
                    target: {
                        word: "boat",
                        image: "⛵"
                    },
                    choices: [
                        {
                            word: "coat",
                            image: "🧥",
                            isCorrect: true
                        },
                        {
                            word: "ship",
                            image: "🚢",
                            isCorrect: false
                        },
                        {
                            word: "plane",
                            image: "✈️",
                            isCorrect: false
                        }
                    ]
                },
                response_type: "tap_image",
                assets: {
                    audio: [
                        "boat.mp3",
                        "coat.mp3",
                        "ship.mp3",
                        "plane.mp3"
                    ]
                },
                srs_data: {
                    due_date: null,
                    stability: 0,
                    difficulty: 0,
                    review_history: []
                }
            }
        ]
    },
    {
        lesson_number: 2,
        phase: 1,
        title: "Counting Words",
        description: "Learn that sentences are made of individual words",
        exercises: [
            {
                exercise_id: "L2-WordTapper-001",
                lesson_number: 2,
                exercise_type: "Word Tapper",
                skill_focus: "Sentence Segmentation",
                data: {
                    sentence: "Dogs run.",
                    wordCount: 2
                },
                response_type: "tap_count",
                assets: {
                    audio: [
                        "dogs_run.mp3"
                    ]
                },
                srs_data: {
                    due_date: null,
                    stability: 0,
                    difficulty: 0,
                    review_history: []
                }
            },
            {
                exercise_id: "L2-WordTapper-002",
                lesson_number: 2,
                exercise_type: "Word Tapper",
                skill_focus: "Sentence Segmentation",
                data: {
                    sentence: "Cats play.",
                    wordCount: 2
                },
                response_type: "tap_count",
                assets: {
                    audio: [
                        "cats_play.mp3"
                    ]
                },
                srs_data: {
                    due_date: null,
                    stability: 0,
                    difficulty: 0,
                    review_history: []
                }
            },
            {
                exercise_id: "L2-WordTapper-003",
                lesson_number: 2,
                exercise_type: "Word Tapper",
                skill_focus: "Sentence Segmentation",
                data: {
                    sentence: "Birds fly.",
                    wordCount: 2
                },
                response_type: "tap_count",
                assets: {
                    audio: [
                        "birds_fly.mp3"
                    ]
                },
                srs_data: {
                    due_date: null,
                    stability: 0,
                    difficulty: 0,
                    review_history: []
                }
            },
            {
                exercise_id: "L2-WordTapper-004",
                lesson_number: 2,
                exercise_type: "Word Tapper",
                skill_focus: "Sentence Segmentation",
                data: {
                    sentence: "The dog ran.",
                    wordCount: 3
                },
                response_type: "tap_count",
                assets: {
                    audio: [
                        "the_dog_ran.mp3"
                    ]
                },
                srs_data: {
                    due_date: null,
                    stability: 0,
                    difficulty: 0,
                    review_history: []
                }
            },
            {
                exercise_id: "L2-WordTapper-005",
                lesson_number: 2,
                exercise_type: "Word Tapper",
                skill_focus: "Sentence Segmentation",
                data: {
                    sentence: "A cat sat.",
                    wordCount: 3
                },
                response_type: "tap_count",
                assets: {
                    audio: [
                        "a_cat_sat.mp3"
                    ]
                },
                srs_data: {
                    due_date: null,
                    stability: 0,
                    difficulty: 0,
                    review_history: []
                }
            },
            {
                exercise_id: "L2-WordTapper-006",
                lesson_number: 2,
                exercise_type: "Word Tapper",
                skill_focus: "Sentence Segmentation",
                data: {
                    sentence: "Big birds sing.",
                    wordCount: 3
                },
                response_type: "tap_count",
                assets: {
                    audio: [
                        "big_birds_sing.mp3"
                    ]
                },
                srs_data: {
                    due_date: null,
                    stability: 0,
                    difficulty: 0,
                    review_history: []
                }
            },
            {
                exercise_id: "L2-WordTapper-007",
                lesson_number: 2,
                exercise_type: "Word Tapper",
                skill_focus: "Sentence Segmentation",
                data: {
                    sentence: "The dog ran fast.",
                    wordCount: 4
                },
                response_type: "tap_count",
                assets: {
                    audio: [
                        "the_dog_ran_fast.mp3"
                    ]
                },
                srs_data: {
                    due_date: null,
                    stability: 0,
                    difficulty: 0,
                    review_history: []
                }
            },
            {
                exercise_id: "L2-WordTapper-008",
                lesson_number: 2,
                exercise_type: "Word Tapper",
                skill_focus: "Sentence Segmentation",
                data: {
                    sentence: "A little cat sat.",
                    wordCount: 4
                },
                response_type: "tap_count",
                assets: {
                    audio: [
                        "a_little_cat_sat.mp3"
                    ]
                },
                srs_data: {
                    due_date: null,
                    stability: 0,
                    difficulty: 0,
                    review_history: []
                }
            },
            {
                exercise_id: "L2-WordTapper-009",
                lesson_number: 2,
                exercise_type: "Word Tapper",
                skill_focus: "Sentence Segmentation",
                data: {
                    sentence: "The big birds sing.",
                    wordCount: 4
                },
                response_type: "tap_count",
                assets: {
                    audio: [
                        "the_big_birds_sing.mp3"
                    ]
                },
                srs_data: {
                    due_date: null,
                    stability: 0,
                    difficulty: 0,
                    review_history: []
                }
            },
            {
                exercise_id: "L2-WordTapper-010",
                lesson_number: 2,
                exercise_type: "Word Tapper",
                skill_focus: "Sentence Segmentation",
                data: {
                    sentence: "I see a cat.",
                    wordCount: 4
                },
                response_type: "tap_count",
                assets: {
                    audio: [
                        "i_see_a_cat.mp3"
                    ]
                },
                srs_data: {
                    due_date: null,
                    stability: 0,
                    difficulty: 0,
                    review_history: []
                }
            },
            {
                exercise_id: "L2-WordTapper-011",
                lesson_number: 2,
                exercise_type: "Word Tapper",
                skill_focus: "Sentence Segmentation",
                data: {
                    sentence: "The sun is hot.",
                    wordCount: 4
                },
                response_type: "tap_count",
                assets: {
                    audio: [
                        "the_sun_is_hot.mp3"
                    ]
                },
                srs_data: {
                    due_date: null,
                    stability: 0,
                    difficulty: 0,
                    review_history: []
                }
            },
            {
                exercise_id: "L2-WordTapper-012",
                lesson_number: 2,
                exercise_type: "Word Tapper",
                skill_focus: "Sentence Segmentation",
                data: {
                    sentence: "We can play games.",
                    wordCount: 4
                },
                response_type: "tap_count",
                assets: {
                    audio: [
                        "we_can_play_games.mp3"
                    ]
                },
                srs_data: {
                    due_date: null,
                    stability: 0,
                    difficulty: 0,
                    review_history: []
                }
            },
            {
                exercise_id: "L2-WordTapper-013",
                lesson_number: 2,
                exercise_type: "Word Tapper",
                skill_focus: "Sentence Segmentation",
                data: {
                    sentence: "The big dog ran fast.",
                    wordCount: 5
                },
                response_type: "tap_count",
                assets: {
                    audio: [
                        "the_big_dog_ran_fast.mp3"
                    ]
                },
                srs_data: {
                    due_date: null,
                    stability: 0,
                    difficulty: 0,
                    review_history: []
                }
            },
            {
                exercise_id: "L2-WordTapper-014",
                lesson_number: 2,
                exercise_type: "Word Tapper",
                skill_focus: "Sentence Segmentation",
                data: {
                    sentence: "I like to eat apples.",
                    wordCount: 5
                },
                response_type: "tap_count",
                assets: {
                    audio: [
                        "i_like_to_eat_apples.mp3"
                    ]
                },
                srs_data: {
                    due_date: null,
                    stability: 0,
                    difficulty: 0,
                    review_history: []
                }
            },
            {
                exercise_id: "L2-WordTapper-015",
                lesson_number: 2,
                exercise_type: "Word Tapper",
                skill_focus: "Sentence Segmentation",
                data: {
                    sentence: "My mom can bake good cookies.",
                    wordCount: 6
                },
                response_type: "tap_count",
                assets: {
                    audio: [
                        "my_mom_can_bake_good_cookies.mp3"
                    ]
                },
                srs_data: {
                    due_date: null,
                    stability: 0,
                    difficulty: 0,
                    review_history: []
                }
            }
        ]
    },
    {
        lesson_number: 3,
        phase: 1,
        title: "Syllable Fun",
        description: "Learn to blend and segment syllables in words",
        exercises: [
            {
                exercise_id: "L3-SyllableSquish-001",
                lesson_number: 3,
                exercise_type: "Syllable Squish",
                skill_focus: "Syllable Segmentation",
                data: {
                    word: "tiger",
                    image: "🐯",
                    syllableCount: 2
                },
                response_type: "tap_count",
                assets: {
                    audio: [
                        "tiger.mp3"
                    ]
                },
                srs_data: {
                    due_date: null,
                    stability: 0,
                    difficulty: 0,
                    review_history: []
                }
            },
            {
                exercise_id: "L3-SyllableSquish-002",
                lesson_number: 3,
                exercise_type: "Syllable Squish",
                skill_focus: "Syllable Segmentation",
                data: {
                    word: "puppy",
                    image: "🐶",
                    syllableCount: 2
                },
                response_type: "tap_count",
                assets: {
                    audio: [
                        "puppy.mp3"
                    ]
                },
                srs_data: {
                    due_date: null,
                    stability: 0,
                    difficulty: 0,
                    review_history: []
                }
            },
            {
                exercise_id: "L3-SyllableSquish-003",
                lesson_number: 3,
                exercise_type: "Syllable Squish",
                skill_focus: "Syllable Segmentation",
                data: {
                    word: "apple",
                    image: "🍎",
                    syllableCount: 2
                },
                response_type: "tap_count",
                assets: {
                    audio: [
                        "apple.mp3"
                    ]
                },
                srs_data: {
                    due_date: null,
                    stability: 0,
                    difficulty: 0,
                    review_history: []
                }
            },
            {
                exercise_id: "L3-SyllableSquish-004",
                lesson_number: 3,
                exercise_type: "Syllable Squish",
                skill_focus: "Syllable Segmentation",
                data: {
                    word: "bubble",
                    image: "🫧",
                    syllableCount: 2
                },
                response_type: "tap_count",
                assets: {
                    audio: [
                        "bubble.mp3"
                    ]
                },
                srs_data: {
                    due_date: null,
                    stability: 0,
                    difficulty: 0,
                    review_history: []
                }
            },
            {
                exercise_id: "L3-SyllableSquish-005",
                lesson_number: 3,
                exercise_type: "Syllable Squish",
                skill_focus: "Syllable Segmentation",
                data: {
                    word: "happy",
                    image: "😊",
                    syllableCount: 2
                },
                response_type: "tap_count",
                assets: {
                    audio: [
                        "happy.mp3"
                    ]
                },
                srs_data: {
                    due_date: null,
                    stability: 0,
                    difficulty: 0,
                    review_history: []
                }
            },
            {
                exercise_id: "L3-SyllableSquish-006",
                lesson_number: 3,
                exercise_type: "Syllable Squish",
                skill_focus: "Syllable Segmentation",
                data: {
                    word: "little",
                    image: "🐭",
                    syllableCount: 2
                },
                response_type: "tap_count",
                assets: {
                    audio: [
                        "little.mp3"
                    ]
                },
                srs_data: {
                    due_date: null,
                    stability: 0,
                    difficulty: 0,
                    review_history: []
                }
            },
            {
                exercise_id: "L3-SyllableSquish-007",
                lesson_number: 3,
                exercise_type: "Syllable Squish",
                skill_focus: "Syllable Segmentation",
                data: {
                    word: "butterfly",
                    image: "🦋",
                    syllableCount: 3
                },
                response_type: "tap_count",
                assets: {
                    audio: [
                        "butterfly.mp3"
                    ]
                },
                srs_data: {
                    due_date: null,
                    stability: 0,
                    difficulty: 0,
                    review_history: []
                }
            },
            {
                exercise_id: "L3-SyllableSquish-008",
                lesson_number: 3,
                exercise_type: "Syllable Squish",
                skill_focus: "Syllable Segmentation",
                data: {
                    word: "elephant",
                    image: "🐘",
                    syllableCount: 3
                },
                response_type: "tap_count",
                assets: {
                    audio: [
                        "elephant.mp3"
                    ]
                },
                srs_data: {
                    due_date: null,
                    stability: 0,
                    difficulty: 0,
                    review_history: []
                }
            },
            {
                exercise_id: "L3-SyllableSquish-009",
                lesson_number: 3,
                exercise_type: "Syllable Squish",
                skill_focus: "Syllable Segmentation",
                data: {
                    word: "banana",
                    image: "🍌",
                    syllableCount: 3
                },
                response_type: "tap_count",
                assets: {
                    audio: [
                        "banana.mp3"
                    ]
                },
                srs_data: {
                    due_date: null,
                    stability: 0,
                    difficulty: 0,
                    review_history: []
                }
            },
            {
                exercise_id: "L3-SyllableSquish-010",
                lesson_number: 3,
                exercise_type: "Syllable Squish",
                skill_focus: "Syllable Segmentation",
                data: {
                    word: "computer",
                    image: "💻",
                    syllableCount: 3
                },
                response_type: "tap_count",
                assets: {
                    audio: [
                        "computer.mp3"
                    ]
                },
                srs_data: {
                    due_date: null,
                    stability: 0,
                    difficulty: 0,
                    review_history: []
                }
            },
            {
                exercise_id: "L3-SyllableSquish-011",
                lesson_number: 3,
                exercise_type: "Syllable Squish",
                skill_focus: "Syllable Segmentation",
                data: {
                    word: "umbrella",
                    image: "☂️",
                    syllableCount: 3
                },
                response_type: "tap_count",
                assets: {
                    audio: [
                        "umbrella.mp3"
                    ]
                },
                srs_data: {
                    due_date: null,
                    stability: 0,
                    difficulty: 0,
                    review_history: []
                }
            },
            {
                exercise_id: "L3-SyllableSquish-012",
                lesson_number: 3,
                exercise_type: "Syllable Squish",
                skill_focus: "Syllable Segmentation",
                data: {
                    word: "caterpillar",
                    image: "🐛",
                    syllableCount: 4
                },
                response_type: "tap_count",
                assets: {
                    audio: [
                        "caterpillar.mp3"
                    ]
                },
                srs_data: {
                    due_date: null,
                    stability: 0,
                    difficulty: 0,
                    review_history: []
                }
            },
            {
                exercise_id: "L3-SyllableSquish-013",
                lesson_number: 3,
                exercise_type: "Syllable Squish",
                skill_focus: "Syllable Segmentation",
                data: {
                    word: "helicopter",
                    image: "🚁",
                    syllableCount: 4
                },
                response_type: "tap_count",
                assets: {
                    audio: [
                        "helicopter.mp3"
                    ]
                },
                srs_data: {
                    due_date: null,
                    stability: 0,
                    difficulty: 0,
                    review_history: []
                }
            },
            {
                exercise_id: "L3-SyllableSquish-014",
                lesson_number: 3,
                exercise_type: "Syllable Squish",
                skill_focus: "Syllable Segmentation",
                data: {
                    word: "watermelon",
                    image: "🍉",
                    syllableCount: 4
                },
                response_type: "tap_count",
                assets: {
                    audio: [
                        "watermelon.mp3"
                    ]
                },
                srs_data: {
                    due_date: null,
                    stability: 0,
                    difficulty: 0,
                    review_history: []
                }
            },
            {
                exercise_id: "L3-SyllableSquish-015",
                lesson_number: 3,
                exercise_type: "Syllable Squish",
                skill_focus: "Syllable Segmentation",
                data: {
                    word: "television",
                    image: "📺",
                    syllableCount: 4
                },
                response_type: "tap_count",
                assets: {
                    audio: [
                        "television.mp3"
                    ]
                },
                srs_data: {
                    due_date: null,
                    stability: 0,
                    difficulty: 0,
                    review_history: []
                }
            }
        ]
    },
    {
        lesson_number: 4,
        phase: 1,
        title: "Sound Slide",
        description: "Learn to blend onset and rime sounds together",
        exercises: [
            {
                exercise_id: "L4-SoundSlide-001",
                lesson_number: 4,
                exercise_type: "Sound Slide",
                skill_focus: "Onset-Rime Blending",
                data: {
                    onset: "c",
                    rime: "at",
                    word: "cat",
                    image: "🐱"
                },
                response_type: "drag_and_drop",
                assets: {
                    audio: [
                        "c.mp3",
                        "at.mp3",
                        "cat.mp3"
                    ]
                },
                srs_data: {
                    due_date: null,
                    stability: 0,
                    difficulty: 0,
                    review_history: []
                }
            },
            {
                exercise_id: "L4-SoundSlide-002",
                lesson_number: 4,
                exercise_type: "Sound Slide",
                skill_focus: "Onset-Rime Blending",
                data: {
                    onset: "b",
                    rime: "at",
                    word: "bat",
                    image: "🦇"
                },
                response_type: "drag_and_drop",
                assets: {
                    audio: [
                        "b.mp3",
                        "at.mp3",
                        "bat.mp3"
                    ]
                },
                srs_data: {
                    due_date: null,
                    stability: 0,
                    difficulty: 0,
                    review_history: []
                }
            },
            {
                exercise_id: "L4-SoundSlide-003",
                lesson_number: 4,
                exercise_type: "Sound Slide",
                skill_focus: "Onset-Rime Blending",
                data: {
                    onset: "s",
                    rime: "at",
                    word: "sat",
                    image: "🪑"
                },
                response_type: "drag_and_drop",
                assets: {
                    audio: [
                        "s.mp3",
                        "at.mp3",
                        "sat.mp3"
                    ]
                },
                srs_data: {
                    due_date: null,
                    stability: 0,
                    difficulty: 0,
                    review_history: []
                }
            },
            {
                exercise_id: "L4-SoundSlide-004",
                lesson_number: 4,
                exercise_type: "Sound Slide",
                skill_focus: "Onset-Rime Blending",
                data: {
                    onset: "m",
                    rime: "at",
                    word: "mat",
                    image: "🧘"
                },
                response_type: "drag_and_drop",
                assets: {
                    audio: [
                        "m.mp3",
                        "at.mp3",
                        "mat.mp3"
                    ]
                },
                srs_data: {
                    due_date: null,
                    stability: 0,
                    difficulty: 0,
                    review_history: []
                }
            },
            {
                exercise_id: "L4-SoundSlide-005",
                lesson_number: 4,
                exercise_type: "Sound Slide",
                skill_focus: "Onset-Rime Blending",
                data: {
                    onset: "h",
                    rime: "at",
                    word: "hat",
                    image: "🎩"
                },
                response_type: "drag_and_drop",
                assets: {
                    audio: [
                        "h.mp3",
                        "at.mp3",
                        "hat.mp3"
                    ]
                },
                srs_data: {
                    due_date: null,
                    stability: 0,
                    difficulty: 0,
                    review_history: []
                }
            },
            {
                exercise_id: "L4-SoundSlide-006",
                lesson_number: 4,
                exercise_type: "Sound Slide",
                skill_focus: "Onset-Rime Blending",
                data: {
                    onset: "p",
                    rime: "in",
                    word: "pin",
                    image: "📌"
                },
                response_type: "drag_and_drop",
                assets: {
                    audio: [
                        "p.mp3",
                        "in.mp3",
                        "pin.mp3"
                    ]
                },
                srs_data: {
                    due_date: null,
                    stability: 0,
                    difficulty: 0,
                    review_history: []
                }
            },
            {
                exercise_id: "L4-SoundSlide-007",
                lesson_number: 4,
                exercise_type: "Sound Slide",
                skill_focus: "Onset-Rime Blending",
                data: {
                    onset: "f",
                    rime: "in",
                    word: "fin",
                    image: "🐟"
                },
                response_type: "drag_and_drop",
                assets: {
                    audio: [
                        "f.mp3",
                        "in.mp3",
                        "fin.mp3"
                    ]
                },
                srs_data: {
                    due_date: null,
                    stability: 0,
                    difficulty: 0,
                    review_history: []
                }
            },
            {
                exercise_id: "L4-SoundSlide-008",
                lesson_number: 4,
                exercise_type: "Sound Slide",
                skill_focus: "Onset-Rime Blending",
                data: {
                    onset: "b",
                    rime: "in",
                    word: "bin",
                    image: "🗑️"
                },
                response_type: "drag_and_drop",
                assets: {
                    audio: [
                        "b.mp3",
                        "in.mp3",
                        "bin.mp3"
                    ]
                },
                srs_data: {
                    due_date: null,
                    stability: 0,
                    difficulty: 0,
                    review_history: []
                }
            },
            {
                exercise_id: "L4-SoundSlide-009",
                lesson_number: 4,
                exercise_type: "Sound Slide",
                skill_focus: "Onset-Rime Blending",
                data: {
                    onset: "w",
                    rime: "in",
                    word: "win",
                    image: "🏆"
                },
                response_type: "drag_and_drop",
                assets: {
                    audio: [
                        "w.mp3",
                        "in.mp3",
                        "win.mp3"
                    ]
                },
                srs_data: {
                    due_date: null,
                    stability: 0,
                    difficulty: 0,
                    review_history: []
                }
            },
            {
                exercise_id: "L4-SoundSlide-010",
                lesson_number: 4,
                exercise_type: "Sound Slide",
                skill_focus: "Onset-Rime Blending",
                data: {
                    onset: "t",
                    rime: "op",
                    word: "top",
                    image: "🔝"
                },
                response_type: "drag_and_drop",
                assets: {
                    audio: [
                        "t.mp3",
                        "op.mp3",
                        "top.mp3"
                    ]
                },
                srs_data: {
                    due_date: null,
                    stability: 0,
                    difficulty: 0,
                    review_history: []
                }
            },
            {
                exercise_id: "L4-SoundSlide-011",
                lesson_number: 4,
                exercise_type: "Sound Slide",
                skill_focus: "Onset-Rime Blending",
                data: {
                    onset: "m",
                    rime: "op",
                    word: "mop",
                    image: "🧹"
                },
                response_type: "drag_and_drop",
                assets: {
                    audio: [
                        "m.mp3",
                        "op.mp3",
                        "mop.mp3"
                    ]
                },
                srs_data: {
                    due_date: null,
                    stability: 0,
                    difficulty: 0,
                    review_history: []
                }
            },
            {
                exercise_id: "L4-SoundSlide-012",
                lesson_number: 4,
                exercise_type: "Sound Slide",
                skill_focus: "Onset-Rime Blending",
                data: {
                    onset: "h",
                    rime: "op",
                    word: "hop",
                    image: "🦘"
                },
                response_type: "drag_and_drop",
                assets: {
                    audio: [
                        "h.mp3",
                        "op.mp3",
                        "hop.mp3"
                    ]
                },
                srs_data: {
                    due_date: null,
                    stability: 0,
                    difficulty: 0,
                    review_history: []
                }
            },
            {
                exercise_id: "L4-SoundSlide-013",
                lesson_number: 4,
                exercise_type: "Sound Slide",
                skill_focus: "Onset-Rime Blending",
                data: {
                    onset: "p",
                    rime: "op",
                    word: "pop",
                    image: "🎈"
                },
                response_type: "drag_and_drop",
                assets: {
                    audio: [
                        "p.mp3",
                        "op.mp3",
                        "pop.mp3"
                    ]
                },
                srs_data: {
                    due_date: null,
                    stability: 0,
                    difficulty: 0,
                    review_history: []
                }
            },
            {
                exercise_id: "L4-SoundSlide-014",
                lesson_number: 4,
                exercise_type: "Sound Slide",
                skill_focus: "Onset-Rime Blending",
                data: {
                    onset: "b",
                    rime: "ug",
                    word: "bug",
                    image: "🐛"
                },
                response_type: "drag_and_drop",
                assets: {
                    audio: [
                        "b.mp3",
                        "ug.mp3",
                        "bug.mp3"
                    ]
                },
                srs_data: {
                    due_date: null,
                    stability: 0,
                    difficulty: 0,
                    review_history: []
                }
            },
            {
                exercise_id: "L4-SoundSlide-015",
                lesson_number: 4,
                exercise_type: "Sound Slide",
                skill_focus: "Onset-Rime Blending",
                data: {
                    onset: "r",
                    rime: "ug",
                    word: "rug",
                    image: "🧶"
                },
                response_type: "drag_and_drop",
                assets: {
                    audio: [
                        "r.mp3",
                        "ug.mp3",
                        "rug.mp3"
                    ]
                },
                srs_data: {
                    due_date: null,
                    stability: 0,
                    difficulty: 0,
                    review_history: []
                }
            },
            {
                exercise_id: "L4-SoundSlide-016",
                lesson_number: 4,
                exercise_type: "Sound Slide",
                skill_focus: "Onset-Rime Blending",
                data: {
                    onset: "h",
                    rime: "ug",
                    word: "hug",
                    image: "🤗"
                },
                response_type: "drag_and_drop",
                assets: {
                    audio: [
                        "h.mp3",
                        "ug.mp3",
                        "hug.mp3"
                    ]
                },
                srs_data: {
                    due_date: null,
                    stability: 0,
                    difficulty: 0,
                    review_history: []
                }
            },
            {
                exercise_id: "L4-SoundSlide-017",
                lesson_number: 4,
                exercise_type: "Sound Slide",
                skill_focus: "Onset-Rime Blending",
                data: {
                    onset: "m",
                    rime: "ug",
                    word: "mug",
                    image: "☕"
                },
                response_type: "drag_and_drop",
                assets: {
                    audio: [
                        "m.mp3",
                        "ug.mp3",
                        "mug.mp3"
                    ]
                },
                srs_data: {
                    due_date: null,
                    stability: 0,
                    difficulty: 0,
                    review_history: []
                }
            }
        ]
    },
    {
        lesson_number: 5,
        phase: 1,
        title: "Sound Detective",
        description: "Find the first, last, and middle sounds in words",
        exercises: [
            {
                exercise_id: "L5-SoundDetective-001",
                lesson_number: 5,
                exercise_type: "Sound Detective",
                skill_focus: "Phoneme Isolation (First Sound)",
                data: {
                    word: "sun",
                    image: "☀️",
                    targetPosition: "first",
                    correctSound: "s",
                    choices: [
                        "s",
                        "m",
                        "t"
                    ]
                },
                response_type: "tap_choice",
                assets: {
                    audio: [
                        "sun.mp3",
                        "s.mp3",
                        "m.mp3",
                        "t.mp3"
                    ]
                },
                srs_data: {
                    due_date: null,
                    stability: 0,
                    difficulty: 0,
                    review_history: []
                }
            },
            {
                exercise_id: "L5-SoundDetective-002",
                lesson_number: 5,
                exercise_type: "Sound Detective",
                skill_focus: "Phoneme Isolation (Last Sound)",
                data: {
                    word: "sun",
                    image: "☀️",
                    targetPosition: "last",
                    correctSound: "n",
                    choices: [
                        "n",
                        "s",
                        "p"
                    ]
                },
                response_type: "tap_choice",
                assets: {
                    audio: [
                        "sun.mp3",
                        "n.mp3",
                        "s.mp3",
                        "p.mp3"
                    ]
                },
                srs_data: {
                    due_date: null,
                    stability: 0,
                    difficulty: 0,
                    review_history: []
                }
            },
            {
                exercise_id: "L5-SoundDetective-003",
                lesson_number: 5,
                exercise_type: "Sound Detective",
                skill_focus: "Phoneme Isolation (Middle Sound)",
                data: {
                    word: "sun",
                    image: "☀️",
                    targetPosition: "middle",
                    correctSound: "u",
                    choices: [
                        "u",
                        "a",
                        "i"
                    ]
                },
                response_type: "tap_choice",
                assets: {
                    audio: [
                        "sun.mp3",
                        "u.mp3",
                        "a.mp3",
                        "i.mp3"
                    ]
                },
                srs_data: {
                    due_date: null,
                    stability: 0,
                    difficulty: 0,
                    review_history: []
                }
            },
            {
                exercise_id: "L5-SoundDetective-004",
                lesson_number: 5,
                exercise_type: "Sound Detective",
                skill_focus: "Phoneme Isolation (First Sound)",
                data: {
                    word: "map",
                    image: "🗺️",
                    targetPosition: "first",
                    correctSound: "m",
                    choices: [
                        "m",
                        "p",
                        "b"
                    ]
                },
                response_type: "tap_choice",
                assets: {
                    audio: [
                        "map.mp3",
                        "m.mp3",
                        "p.mp3",
                        "b.mp3"
                    ]
                },
                srs_data: {
                    due_date: null,
                    stability: 0,
                    difficulty: 0,
                    review_history: []
                }
            },
            {
                exercise_id: "L5-SoundDetective-005",
                lesson_number: 5,
                exercise_type: "Sound Detective",
                skill_focus: "Phoneme Isolation (Last Sound)",
                data: {
                    word: "map",
                    image: "🗺️",
                    targetPosition: "last",
                    correctSound: "p",
                    choices: [
                        "p",
                        "t",
                        "d"
                    ]
                },
                response_type: "tap_choice",
                assets: {
                    audio: [
                        "map.mp3",
                        "p.mp3",
                        "t.mp3",
                        "d.mp3"
                    ]
                },
                srs_data: {
                    due_date: null,
                    stability: 0,
                    difficulty: 0,
                    review_history: []
                }
            },
            {
                exercise_id: "L5-SoundDetective-006",
                lesson_number: 5,
                exercise_type: "Sound Detective",
                skill_focus: "Phoneme Isolation (Middle Sound)",
                data: {
                    word: "map",
                    image: "🗺️",
                    targetPosition: "middle",
                    correctSound: "a",
                    choices: [
                        "a",
                        "e",
                        "o"
                    ]
                },
                response_type: "tap_choice",
                assets: {
                    audio: [
                        "map.mp3",
                        "a.mp3",
                        "e.mp3",
                        "o.mp3"
                    ]
                },
                srs_data: {
                    due_date: null,
                    stability: 0,
                    difficulty: 0,
                    review_history: []
                }
            },
            {
                exercise_id: "L5-SoundDetective-007",
                lesson_number: 5,
                exercise_type: "Sound Detective",
                skill_focus: "Phoneme Isolation (First Sound)",
                data: {
                    word: "pig",
                    image: "🐷",
                    targetPosition: "first",
                    correctSound: "p",
                    choices: [
                        "p",
                        "b",
                        "d"
                    ]
                },
                response_type: "tap_choice",
                assets: {
                    audio: [
                        "pig.mp3",
                        "p.mp3",
                        "b.mp3",
                        "d.mp3"
                    ]
                },
                srs_data: {
                    due_date: null,
                    stability: 0,
                    difficulty: 0,
                    review_history: []
                }
            },
            {
                exercise_id: "L5-SoundDetective-008",
                lesson_number: 5,
                exercise_type: "Sound Detective",
                skill_focus: "Phoneme Isolation (Last Sound)",
                data: {
                    word: "pig",
                    image: "🐷",
                    targetPosition: "last",
                    correctSound: "g",
                    choices: [
                        "g",
                        "k",
                        "d"
                    ]
                },
                response_type: "tap_choice",
                assets: {
                    audio: [
                        "pig.mp3",
                        "g.mp3",
                        "k.mp3",
                        "d.mp3"
                    ]
                },
                srs_data: {
                    due_date: null,
                    stability: 0,
                    difficulty: 0,
                    review_history: []
                }
            },
            {
                exercise_id: "L5-SoundDetective-009",
                lesson_number: 5,
                exercise_type: "Sound Detective",
                skill_focus: "Phoneme Isolation (Middle Sound)",
                data: {
                    word: "pig",
                    image: "🐷",
                    targetPosition: "middle",
                    correctSound: "i",
                    choices: [
                        "i",
                        "e",
                        "a"
                    ]
                },
                response_type: "tap_choice",
                assets: {
                    audio: [
                        "pig.mp3",
                        "i.mp3",
                        "e.mp3",
                        "a.mp3"
                    ]
                },
                srs_data: {
                    due_date: null,
                    stability: 0,
                    difficulty: 0,
                    review_history: []
                }
            },
            {
                exercise_id: "L5-SoundDetective-010",
                lesson_number: 5,
                exercise_type: "Sound Detective",
                skill_focus: "Phoneme Isolation (First Sound)",
                data: {
                    word: "top",
                    image: "🔝",
                    targetPosition: "first",
                    correctSound: "t",
                    choices: [
                        "t",
                        "d",
                        "p"
                    ]
                },
                response_type: "tap_choice",
                assets: {
                    audio: [
                        "top.mp3",
                        "t.mp3",
                        "d.mp3",
                        "p.mp3"
                    ]
                },
                srs_data: {
                    due_date: null,
                    stability: 0,
                    difficulty: 0,
                    review_history: []
                }
            },
            {
                exercise_id: "L5-SoundDetective-011",
                lesson_number: 5,
                exercise_type: "Sound Detective",
                skill_focus: "Phoneme Isolation (Last Sound)",
                data: {
                    word: "top",
                    image: "🔝",
                    targetPosition: "last",
                    correctSound: "p",
                    choices: [
                        "p",
                        "b",
                        "t"
                    ]
                },
                response_type: "tap_choice",
                assets: {
                    audio: [
                        "top.mp3",
                        "p.mp3",
                        "b.mp3",
                        "t.mp3"
                    ]
                },
                srs_data: {
                    due_date: null,
                    stability: 0,
                    difficulty: 0,
                    review_history: []
                }
            },
            {
                exercise_id: "L5-SoundDetective-012",
                lesson_number: 5,
                exercise_type: "Sound Detective",
                skill_focus: "Phoneme Isolation (Middle Sound)",
                data: {
                    word: "top",
                    image: "🔝",
                    targetPosition: "middle",
                    correctSound: "o",
                    choices: [
                        "o",
                        "a",
                        "u"
                    ]
                },
                response_type: "tap_choice",
                assets: {
                    audio: [
                        "top.mp3",
                        "o.mp3",
                        "a.mp3",
                        "u.mp3"
                    ]
                },
                srs_data: {
                    due_date: null,
                    stability: 0,
                    difficulty: 0,
                    review_history: []
                }
            },
            {
                exercise_id: "L5-SoundDetective-013",
                lesson_number: 5,
                exercise_type: "Sound Detective",
                skill_focus: "Phoneme Isolation (First Sound)",
                data: {
                    word: "bug",
                    image: "🐛",
                    targetPosition: "first",
                    correctSound: "b",
                    choices: [
                        "b",
                        "d",
                        "p"
                    ]
                },
                response_type: "tap_choice",
                assets: {
                    audio: [
                        "bug.mp3",
                        "b.mp3",
                        "d.mp3",
                        "p.mp3"
                    ]
                },
                srs_data: {
                    due_date: null,
                    stability: 0,
                    difficulty: 0,
                    review_history: []
                }
            },
            {
                exercise_id: "L5-SoundDetective-014",
                lesson_number: 5,
                exercise_type: "Sound Detective",
                skill_focus: "Phoneme Isolation (Last Sound)",
                data: {
                    word: "bug",
                    image: "🐛",
                    targetPosition: "last",
                    correctSound: "g",
                    choices: [
                        "g",
                        "k",
                        "d"
                    ]
                },
                response_type: "tap_choice",
                assets: {
                    audio: [
                        "bug.mp3",
                        "g.mp3",
                        "k.mp3",
                        "d.mp3"
                    ]
                },
                srs_data: {
                    due_date: null,
                    stability: 0,
                    difficulty: 0,
                    review_history: []
                }
            },
            {
                exercise_id: "L5-SoundDetective-015",
                lesson_number: 5,
                exercise_type: "Sound Detective",
                skill_focus: "Phoneme Isolation (Middle Sound)",
                data: {
                    word: "bug",
                    image: "🐛",
                    targetPosition: "middle",
                    correctSound: "u",
                    choices: [
                        "u",
                        "o",
                        "i"
                    ]
                },
                response_type: "tap_choice",
                assets: {
                    audio: [
                        "bug.mp3",
                        "u.mp3",
                        "o.mp3",
                        "i.mp3"
                    ]
                },
                srs_data: {
                    due_date: null,
                    stability: 0,
                    difficulty: 0,
                    review_history: []
                }
            },
            {
                exercise_id: "L5-SoundDetective-016",
                lesson_number: 5,
                exercise_type: "Sound Detective",
                skill_focus: "Phoneme Isolation (First Sound)",
                data: {
                    word: "dog",
                    image: "🐕",
                    targetPosition: "first",
                    correctSound: "d",
                    choices: [
                        "d",
                        "b",
                        "g"
                    ]
                },
                response_type: "tap_choice",
                assets: {
                    audio: [
                        "dog.mp3",
                        "d.mp3",
                        "b.mp3",
                        "g.mp3"
                    ]
                },
                srs_data: {
                    due_date: null,
                    stability: 0,
                    difficulty: 0,
                    review_history: []
                }
            },
            {
                exercise_id: "L5-SoundDetective-017",
                lesson_number: 5,
                exercise_type: "Sound Detective",
                skill_focus: "Phoneme Isolation (Last Sound)",
                data: {
                    word: "dog",
                    image: "🐕",
                    targetPosition: "last",
                    correctSound: "g",
                    choices: [
                        "g",
                        "k",
                        "d"
                    ]
                },
                response_type: "tap_choice",
                assets: {
                    audio: [
                        "dog.mp3",
                        "g.mp3",
                        "k.mp3",
                        "d.mp3"
                    ]
                },
                srs_data: {
                    due_date: null,
                    stability: 0,
                    difficulty: 0,
                    review_history: []
                }
            },
            {
                exercise_id: "L5-SoundDetective-018",
                lesson_number: 5,
                exercise_type: "Sound Detective",
                skill_focus: "Phoneme Isolation (Middle Sound)",
                data: {
                    word: "dog",
                    image: "🐕",
                    targetPosition: "middle",
                    correctSound: "o",
                    choices: [
                        "o",
                        "a",
                        "u"
                    ]
                },
                response_type: "tap_choice",
                assets: {
                    audio: [
                        "dog.mp3",
                        "o.mp3",
                        "a.mp3",
                        "u.mp3"
                    ]
                },
                srs_data: {
                    due_date: null,
                    stability: 0,
                    difficulty: 0,
                    review_history: []
                }
            },
            {
                exercise_id: "L5-SoundDetective-019",
                lesson_number: 5,
                exercise_type: "Sound Detective",
                skill_focus: "Phoneme Isolation (First Sound)",
                data: {
                    word: "fan",
                    image: "🪭",
                    targetPosition: "first",
                    correctSound: "f",
                    choices: [
                        "f",
                        "v",
                        "p"
                    ]
                },
                response_type: "tap_choice",
                assets: {
                    audio: [
                        "fan.mp3",
                        "f.mp3",
                        "v.mp3",
                        "p.mp3"
                    ]
                },
                srs_data: {
                    due_date: null,
                    stability: 0,
                    difficulty: 0,
                    review_history: []
                }
            },
            {
                exercise_id: "L5-SoundDetective-020",
                lesson_number: 5,
                exercise_type: "Sound Detective",
                skill_focus: "Phoneme Isolation (Last Sound)",
                data: {
                    word: "fan",
                    image: "🪭",
                    targetPosition: "last",
                    correctSound: "n",
                    choices: [
                        "n",
                        "m",
                        "ng"
                    ]
                },
                response_type: "tap_choice",
                assets: {
                    audio: [
                        "fan.mp3",
                        "n.mp3",
                        "m.mp3",
                        "ng.mp3"
                    ]
                },
                srs_data: {
                    due_date: null,
                    stability: 0,
                    difficulty: 0,
                    review_history: []
                }
            }
        ]
    },
    {
        lesson_number: 6,
        phase: 2,
        title: "First Letters: m, s, p, a",
        description: "Learn your first letter sounds and build words!",
        new_graphemes: [
            "m",
            "s",
            "p",
            "a"
        ],
        new_irregular_words: [
            "the",
            "a"
        ],
        exercises: [
            {
                exercise_id: "L6-WordBuilder-001",
                lesson_number: 6,
                exercise_type: "Word Builder",
                skill_focus: "CVC Blending",
                data: {
                    word: "map",
                    letters: [
                        "m",
                        "a",
                        "p"
                    ],
                    image: "🗺️"
                },
                response_type: "drag_and_drop",
                assets: {
                    audio: [
                        "m.mp3",
                        "a.mp3",
                        "p.mp3",
                        "map.mp3"
                    ]
                },
                srs_data: {
                    due_date: null,
                    stability: 0,
                    difficulty: 0,
                    review_history: []
                }
            },
            {
                exercise_id: "L6-WordBuilder-002",
                lesson_number: 6,
                exercise_type: "Word Builder",
                skill_focus: "CVC Blending",
                data: {
                    word: "Sam",
                    letters: [
                        "S",
                        "a",
                        "m"
                    ],
                    image: "👦"
                },
                response_type: "drag_and_drop",
                assets: {
                    audio: [
                        "s.mp3",
                        "a.mp3",
                        "m.mp3",
                        "sam.mp3"
                    ]
                },
                srs_data: {
                    due_date: null,
                    stability: 0,
                    difficulty: 0,
                    review_history: []
                }
            },
            {
                exercise_id: "L6-WordBuilder-003",
                lesson_number: 6,
                exercise_type: "Word Builder",
                skill_focus: "CVC Blending",
                data: {
                    word: "am",
                    letters: [
                        "a",
                        "m"
                    ],
                    image: "✋"
                },
                response_type: "drag_and_drop",
                assets: {
                    audio: [
                        "a.mp3",
                        "m.mp3",
                        "am.mp3"
                    ]
                },
                srs_data: {
                    due_date: null,
                    stability: 0,
                    difficulty: 0,
                    review_history: []
                }
            },
            {
                exercise_id: "L6-WordBuilder-004",
                lesson_number: 6,
                exercise_type: "Word Builder",
                skill_focus: "CVC Blending",
                data: {
                    word: "Pam",
                    letters: [
                        "P",
                        "a",
                        "m"
                    ],
                    image: "👧"
                },
                response_type: "drag_and_drop",
                assets: {
                    audio: [
                        "p.mp3",
                        "a.mp3",
                        "m.mp3",
                        "pam.mp3"
                    ]
                },
                srs_data: {
                    due_date: null,
                    stability: 0,
                    difficulty: 0,
                    review_history: []
                }
            },
            {
                exercise_id: "L6-WordBuilder-005",
                lesson_number: 6,
                exercise_type: "Word Builder",
                skill_focus: "CVC Blending",
                data: {
                    word: "sap",
                    letters: [
                        "s",
                        "a",
                        "p"
                    ],
                    image: "🌳"
                },
                response_type: "drag_and_drop",
                assets: {
                    audio: [
                        "s.mp3",
                        "a.mp3",
                        "p.mp3",
                        "sap.mp3"
                    ]
                },
                srs_data: {
                    due_date: null,
                    stability: 0,
                    difficulty: 0,
                    review_history: []
                }
            },
            {
                exercise_id: "L6-WordBuilder-006",
                lesson_number: 6,
                exercise_type: "Word Builder",
                skill_focus: "CVC Blending",
                data: {
                    word: "at",
                    letters: [
                        "a",
                        "t"
                    ],
                    image: "📍"
                },
                response_type: "drag_and_drop",
                assets: {
                    audio: [
                        "a.mp3",
                        "t.mp3",
                        "at.mp3"
                    ]
                },
                srs_data: {
                    due_date: null,
                    stability: 0,
                    difficulty: 0,
                    review_history: []
                }
            },
            {
                exercise_id: "L6-WordBuilder-007",
                lesson_number: 6,
                exercise_type: "Word Builder",
                skill_focus: "CVC Blending",
                data: {
                    word: "pat",
                    letters: [
                        "p",
                        "a",
                        "t"
                    ],
                    image: "✋"
                },
                response_type: "drag_and_drop",
                assets: {
                    audio: [
                        "p.mp3",
                        "a.mp3",
                        "t.mp3",
                        "pat.mp3"
                    ]
                },
                srs_data: {
                    due_date: null,
                    stability: 0,
                    difficulty: 0,
                    review_history: []
                }
            },
            {
                exercise_id: "L6-WordBuilder-008",
                lesson_number: 6,
                exercise_type: "Word Builder",
                skill_focus: "CVC Blending",
                data: {
                    word: "sat",
                    letters: [
                        "s",
                        "a",
                        "t"
                    ],
                    image: "🪑"
                },
                response_type: "drag_and_drop",
                assets: {
                    audio: [
                        "s.mp3",
                        "a.mp3",
                        "t.mp3",
                        "sat.mp3"
                    ]
                },
                srs_data: {
                    due_date: null,
                    stability: 0,
                    difficulty: 0,
                    review_history: []
                }
            },
            {
                exercise_id: "L6-WordBuilder-009",
                lesson_number: 6,
                exercise_type: "Word Builder",
                skill_focus: "CVC Blending",
                data: {
                    word: "tap",
                    letters: [
                        "t",
                        "a",
                        "p"
                    ],
                    image: "👆"
                },
                response_type: "drag_and_drop",
                assets: {
                    audio: [
                        "t.mp3",
                        "a.mp3",
                        "p.mp3",
                        "tap.mp3"
                    ]
                },
                srs_data: {
                    due_date: null,
                    stability: 0,
                    difficulty: 0,
                    review_history: []
                }
            },
            {
                exercise_id: "L6-WordBuilder-010",
                lesson_number: 6,
                exercise_type: "Word Builder",
                skill_focus: "CVC Blending",
                data: {
                    word: "mat",
                    letters: [
                        "m",
                        "a",
                        "t"
                    ],
                    image: "🧘"
                },
                response_type: "drag_and_drop",
                assets: {
                    audio: [
                        "m.mp3",
                        "a.mp3",
                        "t.mp3",
                        "mat.mp3"
                    ]
                },
                srs_data: {
                    due_date: null,
                    stability: 0,
                    difficulty: 0,
                    review_history: []
                }
            },
            {
                exercise_id: "L6-WordBuilder-011",
                lesson_number: 6,
                exercise_type: "Word Builder",
                skill_focus: "CVC Blending",
                data: {
                    word: "sap",
                    letters: [
                        "s",
                        "a",
                        "p"
                    ],
                    image: "🌳"
                },
                response_type: "drag_and_drop",
                assets: {
                    audio: [
                        "s.mp3",
                        "a.mp3",
                        "p.mp3",
                        "sap.mp3"
                    ]
                },
                srs_data: {
                    due_date: null,
                    stability: 0,
                    difficulty: 0,
                    review_history: []
                }
            },
            {
                exercise_id: "L6-WordBuilder-012",
                lesson_number: 6,
                exercise_type: "Word Builder",
                skill_focus: "CVC Blending",
                data: {
                    word: "as",
                    letters: [
                        "a",
                        "s"
                    ],
                    image: "➡️"
                },
                response_type: "drag_and_drop",
                assets: {
                    audio: [
                        "a.mp3",
                        "s.mp3",
                        "as.mp3"
                    ]
                },
                srs_data: {
                    due_date: null,
                    stability: 0,
                    difficulty: 0,
                    review_history: []
                }
            }
        ],
        story: {
            title: "Sam, a cat",
            text: "Sam sat. Sam and Nan sat. Nan can pat Sam."
        }
    },
    {
        lesson_number: 7,
        phase: 2,
        title: "New Letters: t, i, n",
        description: "Learn more letter sounds and build new words!",
        new_graphemes: [
            "t",
            "i",
            "n"
        ],
        new_irregular_words: [
            "I",
            "to"
        ],
        exercises: [
            {
                exercise_id: "L7-WordBuilder-001",
                lesson_number: 7,
                exercise_type: "Word Builder",
                skill_focus: "CVC Blending",
                data: {
                    word: "tin",
                    letters: [
                        "t",
                        "i",
                        "n"
                    ],
                    image: "🥫"
                },
                response_type: "drag_and_drop",
                assets: {
                    audio: [
                        "t.mp3",
                        "i.mp3",
                        "n.mp3",
                        "tin.mp3"
                    ]
                },
                srs_data: {
                    due_date: null,
                    stability: 0,
                    difficulty: 0,
                    review_history: []
                }
            },
            {
                exercise_id: "L7-WordBuilder-002",
                lesson_number: 7,
                exercise_type: "Word Builder",
                skill_focus: "CVC Blending",
                data: {
                    word: "sit",
                    letters: [
                        "s",
                        "i",
                        "t"
                    ],
                    image: "🪑"
                },
                response_type: "drag_and_drop",
                assets: {
                    audio: [
                        "s.mp3",
                        "i.mp3",
                        "t.mp3",
                        "sit.mp3"
                    ]
                },
                srs_data: {
                    due_date: null,
                    stability: 0,
                    difficulty: 0,
                    review_history: []
                }
            },
            {
                exercise_id: "L7-WordBuilder-003",
                lesson_number: 7,
                exercise_type: "Word Builder",
                skill_focus: "CVC Blending",
                data: {
                    word: "pin",
                    letters: [
                        "p",
                        "i",
                        "n"
                    ],
                    image: "📌"
                },
                response_type: "drag_and_drop",
                assets: {
                    audio: [
                        "p.mp3",
                        "i.mp3",
                        "n.mp3",
                        "pin.mp3"
                    ]
                },
                srs_data: {
                    due_date: null,
                    stability: 0,
                    difficulty: 0,
                    review_history: []
                }
            },
            {
                exercise_id: "L7-WordBuilder-004",
                lesson_number: 7,
                exercise_type: "Word Builder",
                skill_focus: "CVC Blending",
                data: {
                    word: "nap",
                    letters: [
                        "n",
                        "a",
                        "p"
                    ],
                    image: "😴"
                },
                response_type: "drag_and_drop",
                assets: {
                    audio: [
                        "n.mp3",
                        "a.mp3",
                        "p.mp3",
                        "nap.mp3"
                    ]
                },
                srs_data: {
                    due_date: null,
                    stability: 0,
                    difficulty: 0,
                    review_history: []
                }
            },
            {
                exercise_id: "L7-WordBuilder-005",
                lesson_number: 7,
                exercise_type: "Word Builder",
                skill_focus: "CVC Blending",
                data: {
                    word: "tan",
                    letters: [
                        "t",
                        "a",
                        "n"
                    ],
                    image: "🟤"
                },
                response_type: "drag_and_drop",
                assets: {
                    audio: [
                        "t.mp3",
                        "a.mp3",
                        "n.mp3",
                        "tan.mp3"
                    ]
                },
                srs_data: {
                    due_date: null,
                    stability: 0,
                    difficulty: 0,
                    review_history: []
                }
            },
            {
                exercise_id: "L7-WordBuilder-006",
                lesson_number: 7,
                exercise_type: "Word Builder",
                skill_focus: "CVC Blending",
                data: {
                    word: "tip",
                    letters: [
                        "t",
                        "i",
                        "p"
                    ],
                    image: "☝️"
                },
                response_type: "drag_and_drop",
                assets: {
                    audio: [
                        "t.mp3",
                        "i.mp3",
                        "p.mp3",
                        "tip.mp3"
                    ]
                },
                srs_data: {
                    due_date: null,
                    stability: 0,
                    difficulty: 0,
                    review_history: []
                }
            },
            {
                exercise_id: "L7-WordBuilder-007",
                lesson_number: 7,
                exercise_type: "Word Builder",
                skill_focus: "CVC Blending",
                data: {
                    word: "nit",
                    letters: [
                        "n",
                        "i",
                        "t"
                    ],
                    image: "🪲"
                },
                response_type: "drag_and_drop",
                assets: {
                    audio: [
                        "n.mp3",
                        "i.mp3",
                        "t.mp3",
                        "nit.mp3"
                    ]
                },
                srs_data: {
                    due_date: null,
                    stability: 0,
                    difficulty: 0,
                    review_history: []
                }
            },
            {
                exercise_id: "L7-WordBuilder-008",
                lesson_number: 7,
                exercise_type: "Word Builder",
                skill_focus: "CVC Blending",
                data: {
                    word: "sip",
                    letters: [
                        "s",
                        "i",
                        "p"
                    ],
                    image: "🥤"
                },
                response_type: "drag_and_drop",
                assets: {
                    audio: [
                        "s.mp3",
                        "i.mp3",
                        "p.mp3",
                        "sip.mp3"
                    ]
                },
                srs_data: {
                    due_date: null,
                    stability: 0,
                    difficulty: 0,
                    review_history: []
                }
            },
            {
                exercise_id: "L7-WordBuilder-009",
                lesson_number: 7,
                exercise_type: "Word Builder",
                skill_focus: "CVC Blending",
                data: {
                    word: "pit",
                    letters: [
                        "p",
                        "i",
                        "t"
                    ],
                    image: "🕳️"
                },
                response_type: "drag_and_drop",
                assets: {
                    audio: [
                        "p.mp3",
                        "i.mp3",
                        "t.mp3",
                        "pit.mp3"
                    ]
                },
                srs_data: {
                    due_date: null,
                    stability: 0,
                    difficulty: 0,
                    review_history: []
                }
            },
            {
                exercise_id: "L7-WordBuilder-010",
                lesson_number: 7,
                exercise_type: "Word Builder",
                skill_focus: "CVC Blending",
                data: {
                    word: "ant",
                    letters: [
                        "a",
                        "n",
                        "t"
                    ],
                    image: "🐜"
                },
                response_type: "drag_and_drop",
                assets: {
                    audio: [
                        "a.mp3",
                        "n.mp3",
                        "t.mp3",
                        "ant.mp3"
                    ]
                },
                srs_data: {
                    due_date: null,
                    stability: 0,
                    difficulty: 0,
                    review_history: []
                }
            },
            {
                exercise_id: "L7-WordBuilder-011",
                lesson_number: 7,
                exercise_type: "Word Builder",
                skill_focus: "CVC Blending",
                data: {
                    word: "nip",
                    letters: [
                        "n",
                        "i",
                        "p"
                    ],
                    image: "🦀"
                },
                response_type: "drag_and_drop",
                assets: {
                    audio: [
                        "n.mp3",
                        "i.mp3",
                        "p.mp3",
                        "nip.mp3"
                    ]
                },
                srs_data: {
                    due_date: null,
                    stability: 0,
                    difficulty: 0,
                    review_history: []
                }
            },
            {
                exercise_id: "L7-WordBuilder-012",
                lesson_number: 7,
                exercise_type: "Word Builder",
                skill_focus: "CVC Blending",
                data: {
                    word: "pan",
                    letters: [
                        "p",
                        "a",
                        "n"
                    ],
                    image: "🍳"
                },
                response_type: "drag_and_drop",
                assets: {
                    audio: [
                        "p.mp3",
                        "a.mp3",
                        "n.mp3",
                        "pan.mp3"
                    ]
                },
                srs_data: {
                    due_date: null,
                    stability: 0,
                    difficulty: 0,
                    review_history: []
                }
            }
        ],
        story: {
            title: "Nat and Tim",
            text: "Nat sat. Tim sat. Nat and Tim can nap."
        }
    },
    {
        lesson_number: 8,
        phase: 2,
        title: "New Letters: c, k, d",
        description: "Learn the /k/ sound and /d/ sound",
        new_graphemes: [
            "c",
            "k",
            "d"
        ],
        new_irregular_words: [
            "is",
            "his"
        ],
        exercises: [
            {
                exercise_id: "L8-WordBuilder-001",
                lesson_number: 8,
                exercise_type: "Word Builder",
                skill_focus: "CVC Blending",
                data: {
                    word: "cat",
                    letters: [
                        "c",
                        "a",
                        "t"
                    ],
                    image: "🐱"
                },
                response_type: "drag_and_drop",
                assets: {
                    audio: [
                        "c.mp3",
                        "a.mp3",
                        "t.mp3",
                        "cat.mp3"
                    ]
                },
                srs_data: {
                    due_date: null,
                    stability: 0,
                    difficulty: 0,
                    review_history: []
                }
            },
            {
                exercise_id: "L8-WordBuilder-002",
                lesson_number: 8,
                exercise_type: "Word Builder",
                skill_focus: "CVC Blending",
                data: {
                    word: "kid",
                    letters: [
                        "k",
                        "i",
                        "d"
                    ],
                    image: "👦"
                },
                response_type: "drag_and_drop",
                assets: {
                    audio: [
                        "k.mp3",
                        "i.mp3",
                        "d.mp3",
                        "kid.mp3"
                    ]
                },
                srs_data: {
                    due_date: null,
                    stability: 0,
                    difficulty: 0,
                    review_history: []
                }
            },
            {
                exercise_id: "L8-WordBuilder-003",
                lesson_number: 8,
                exercise_type: "Word Builder",
                skill_focus: "CVC Blending",
                data: {
                    word: "dad",
                    letters: [
                        "d",
                        "a",
                        "d"
                    ],
                    image: "👨"
                },
                response_type: "drag_and_drop",
                assets: {
                    audio: [
                        "d.mp3",
                        "a.mp3",
                        "d.mp3",
                        "dad.mp3"
                    ]
                },
                srs_data: {
                    due_date: null,
                    stability: 0,
                    difficulty: 0,
                    review_history: []
                }
            },
            {
                exercise_id: "L8-WordBuilder-004",
                lesson_number: 8,
                exercise_type: "Word Builder",
                skill_focus: "CVC Blending",
                data: {
                    word: "can",
                    letters: [
                        "c",
                        "a",
                        "n"
                    ],
                    image: "🥫"
                },
                response_type: "drag_and_drop",
                assets: {
                    audio: [
                        "c.mp3",
                        "a.mp3",
                        "n.mp3",
                        "can.mp3"
                    ]
                },
                srs_data: {
                    due_date: null,
                    stability: 0,
                    difficulty: 0,
                    review_history: []
                }
            },
            {
                exercise_id: "L8-WordBuilder-005",
                lesson_number: 8,
                exercise_type: "Word Builder",
                skill_focus: "CVC Blending",
                data: {
                    word: "kit",
                    letters: [
                        "k",
                        "i",
                        "t"
                    ],
                    image: "🧰"
                },
                response_type: "drag_and_drop",
                assets: {
                    audio: [
                        "k.mp3",
                        "i.mp3",
                        "t.mp3",
                        "kit.mp3"
                    ]
                },
                srs_data: {
                    due_date: null,
                    stability: 0,
                    difficulty: 0,
                    review_history: []
                }
            },
            {
                exercise_id: "L8-WordBuilder-006",
                lesson_number: 8,
                exercise_type: "Word Builder",
                skill_focus: "CVC Blending",
                data: {
                    word: "dip",
                    letters: [
                        "d",
                        "i",
                        "p"
                    ],
                    image: "🍯"
                },
                response_type: "drag_and_drop",
                assets: {
                    audio: [
                        "d.mp3",
                        "i.mp3",
                        "p.mp3",
                        "dip.mp3"
                    ]
                },
                srs_data: {
                    due_date: null,
                    stability: 0,
                    difficulty: 0,
                    review_history: []
                }
            },
            {
                exercise_id: "L8-WordBuilder-007",
                lesson_number: 8,
                exercise_type: "Word Builder",
                skill_focus: "CVC Blending",
                data: {
                    word: "cap",
                    letters: [
                        "c",
                        "a",
                        "p"
                    ],
                    image: "🧢"
                },
                response_type: "drag_and_drop",
                assets: {
                    audio: [
                        "c.mp3",
                        "a.mp3",
                        "p.mp3",
                        "cap.mp3"
                    ]
                },
                srs_data: {
                    due_date: null,
                    stability: 0,
                    difficulty: 0,
                    review_history: []
                }
            },
            {
                exercise_id: "L8-WordBuilder-008",
                lesson_number: 8,
                exercise_type: "Word Builder",
                skill_focus: "CVC Blending",
                data: {
                    word: "dim",
                    letters: [
                        "d",
                        "i",
                        "m"
                    ],
                    image: "🔅"
                },
                response_type: "drag_and_drop",
                assets: {
                    audio: [
                        "d.mp3",
                        "i.mp3",
                        "m.mp3",
                        "dim.mp3"
                    ]
                },
                srs_data: {
                    due_date: null,
                    stability: 0,
                    difficulty: 0,
                    review_history: []
                }
            },
            {
                exercise_id: "L8-WordBuilder-009",
                lesson_number: 8,
                exercise_type: "Word Builder",
                skill_focus: "CVC Blending",
                data: {
                    word: "cot",
                    letters: [
                        "c",
                        "o",
                        "t"
                    ],
                    image: "🛏️"
                },
                response_type: "drag_and_drop",
                assets: {
                    audio: [
                        "c.mp3",
                        "o.mp3",
                        "t.mp3",
                        "cot.mp3"
                    ]
                },
                srs_data: {
                    due_date: null,
                    stability: 0,
                    difficulty: 0,
                    review_history: []
                }
            },
            {
                exercise_id: "L8-WordBuilder-010",
                lesson_number: 8,
                exercise_type: "Word Builder",
                skill_focus: "CVC Blending",
                data: {
                    word: "den",
                    letters: [
                        "d",
                        "e",
                        "n"
                    ],
                    image: "🏠"
                },
                response_type: "drag_and_drop",
                assets: {
                    audio: [
                        "d.mp3",
                        "e.mp3",
                        "n.mp3",
                        "den.mp3"
                    ]
                },
                srs_data: {
                    due_date: null,
                    stability: 0,
                    difficulty: 0,
                    review_history: []
                }
            },
            {
                exercise_id: "L8-WordBuilder-011",
                lesson_number: 8,
                exercise_type: "Word Builder",
                skill_focus: "CVC Blending",
                data: {
                    word: "kid",
                    letters: [
                        "k",
                        "i",
                        "d"
                    ],
                    image: "👦"
                },
                response_type: "drag_and_drop",
                assets: {
                    audio: [
                        "k.mp3",
                        "i.mp3",
                        "d.mp3",
                        "kid.mp3"
                    ]
                },
                srs_data: {
                    due_date: null,
                    stability: 0,
                    difficulty: 0,
                    review_history: []
                }
            },
            {
                exercise_id: "L8-WordBuilder-012",
                lesson_number: 8,
                exercise_type: "Word Builder",
                skill_focus: "CVC Blending",
                data: {
                    word: "cod",
                    letters: [
                        "c",
                        "o",
                        "d"
                    ],
                    image: "🐟"
                },
                response_type: "drag_and_drop",
                assets: {
                    audio: [
                        "c.mp3",
                        "o.mp3",
                        "d.mp3",
                        "cod.mp3"
                    ]
                },
                srs_data: {
                    due_date: null,
                    stability: 0,
                    difficulty: 0,
                    review_history: []
                }
            }
        ],
        story: {
            title: "A cat and a kid",
            text: "A cat sat. A kid can pat the cat. The cat is sad."
        }
    },
    {
        lesson_number: 9,
        phase: 2,
        title: "New Letters: o, g, h",
        description: "Learn /o/, /g/, and /h/ sounds",
        new_graphemes: [
            "o",
            "g",
            "h"
        ],
        new_irregular_words: [
            "he",
            "she"
        ],
        exercises: [
            {
                exercise_id: "L9-WordBuilder-001",
                lesson_number: 9,
                exercise_type: "Word Builder",
                skill_focus: "CVC Blending",
                data: {
                    word: "hot",
                    letters: [
                        "h",
                        "o",
                        "t"
                    ],
                    image: "🔥"
                },
                response_type: "drag_and_drop",
                assets: {
                    audio: [
                        "h.mp3",
                        "o.mp3",
                        "t.mp3",
                        "hot.mp3"
                    ]
                },
                srs_data: {
                    due_date: null,
                    stability: 0,
                    difficulty: 0,
                    review_history: []
                }
            },
            {
                exercise_id: "L9-WordBuilder-002",
                lesson_number: 9,
                exercise_type: "Word Builder",
                skill_focus: "CVC Blending",
                data: {
                    word: "dog",
                    letters: [
                        "d",
                        "o",
                        "g"
                    ],
                    image: "🐕"
                },
                response_type: "drag_and_drop",
                assets: {
                    audio: [
                        "d.mp3",
                        "o.mp3",
                        "g.mp3",
                        "dog.mp3"
                    ]
                },
                srs_data: {
                    due_date: null,
                    stability: 0,
                    difficulty: 0,
                    review_history: []
                }
            },
            {
                exercise_id: "L9-WordBuilder-003",
                lesson_number: 9,
                exercise_type: "Word Builder",
                skill_focus: "CVC Blending",
                data: {
                    word: "got",
                    letters: [
                        "g",
                        "o",
                        "t"
                    ],
                    image: "✅"
                },
                response_type: "drag_and_drop",
                assets: {
                    audio: [
                        "g.mp3",
                        "o.mp3",
                        "t.mp3",
                        "got.mp3"
                    ]
                },
                srs_data: {
                    due_date: null,
                    stability: 0,
                    difficulty: 0,
                    review_history: []
                }
            },
            {
                exercise_id: "L9-WordBuilder-004",
                lesson_number: 9,
                exercise_type: "Word Builder",
                skill_focus: "CVC Blending",
                data: {
                    word: "hop",
                    letters: [
                        "h",
                        "o",
                        "p"
                    ],
                    image: "🦘"
                },
                response_type: "drag_and_drop",
                assets: {
                    audio: [
                        "h.mp3",
                        "o.mp3",
                        "p.mp3",
                        "hop.mp3"
                    ]
                },
                srs_data: {
                    due_date: null,
                    stability: 0,
                    difficulty: 0,
                    review_history: []
                }
            },
            {
                exercise_id: "L9-WordBuilder-005",
                lesson_number: 9,
                exercise_type: "Word Builder",
                skill_focus: "CVC Blending",
                data: {
                    word: "hog",
                    letters: [
                        "h",
                        "o",
                        "g"
                    ],
                    image: "🐗"
                },
                response_type: "drag_and_drop",
                assets: {
                    audio: [
                        "h.mp3",
                        "o.mp3",
                        "g.mp3",
                        "hog.mp3"
                    ]
                },
                srs_data: {
                    due_date: null,
                    stability: 0,
                    difficulty: 0,
                    review_history: []
                }
            },
            {
                exercise_id: "L9-WordBuilder-006",
                lesson_number: 9,
                exercise_type: "Word Builder",
                skill_focus: "CVC Blending",
                data: {
                    word: "god",
                    letters: [
                        "g",
                        "o",
                        "d"
                    ],
                    image: "⚡"
                },
                response_type: "drag_and_drop",
                assets: {
                    audio: [
                        "g.mp3",
                        "o.mp3",
                        "d.mp3",
                        "god.mp3"
                    ]
                },
                srs_data: {
                    due_date: null,
                    stability: 0,
                    difficulty: 0,
                    review_history: []
                }
            },
            {
                exercise_id: "L9-WordBuilder-007",
                lesson_number: 9,
                exercise_type: "Word Builder",
                skill_focus: "CVC Blending",
                data: {
                    word: "hog",
                    letters: [
                        "h",
                        "o",
                        "g"
                    ],
                    image: "🐗"
                },
                response_type: "drag_and_drop",
                assets: {
                    audio: [
                        "h.mp3",
                        "o.mp3",
                        "g.mp3",
                        "hog.mp3"
                    ]
                },
                srs_data: {
                    due_date: null,
                    stability: 0,
                    difficulty: 0,
                    review_history: []
                }
            },
            {
                exercise_id: "L9-WordBuilder-008",
                lesson_number: 9,
                exercise_type: "Word Builder",
                skill_focus: "CVC Blending",
                data: {
                    word: "dot",
                    letters: [
                        "d",
                        "o",
                        "t"
                    ],
                    image: "⚫"
                },
                response_type: "drag_and_drop",
                assets: {
                    audio: [
                        "d.mp3",
                        "o.mp3",
                        "t.mp3",
                        "dot.mp3"
                    ]
                },
                srs_data: {
                    due_date: null,
                    stability: 0,
                    difficulty: 0,
                    review_history: []
                }
            },
            {
                exercise_id: "L9-WordBuilder-009",
                lesson_number: 9,
                exercise_type: "Word Builder",
                skill_focus: "CVC Blending",
                data: {
                    word: "hog",
                    letters: [
                        "h",
                        "o",
                        "g"
                    ],
                    image: "🐗"
                },
                response_type: "drag_and_drop",
                assets: {
                    audio: [
                        "h.mp3",
                        "o.mp3",
                        "g.mp3",
                        "hog.mp3"
                    ]
                },
                srs_data: {
                    due_date: null,
                    stability: 0,
                    difficulty: 0,
                    review_history: []
                }
            },
            {
                exercise_id: "L9-WordBuilder-010",
                lesson_number: 9,
                exercise_type: "Word Builder",
                skill_focus: "CVC Blending",
                data: {
                    word: "hog",
                    letters: [
                        "h",
                        "o",
                        "g"
                    ],
                    image: "🐗"
                },
                response_type: "drag_and_drop",
                assets: {
                    audio: [
                        "h.mp3",
                        "o.mp3",
                        "g.mp3",
                        "hog.mp3"
                    ]
                },
                srs_data: {
                    due_date: null,
                    stability: 0,
                    difficulty: 0,
                    review_history: []
                }
            }
        ],
        story: {
            title: "A hot dog",
            text: "A dog is hot. The dog can hop. He got a hat."
        }
    },
    {
        lesson_number: 10,
        phase: 2,
        title: "New Letters: b, f, l",
        description: "Learn /b/, /f/, and /l/ sounds",
        new_graphemes: [
            "b",
            "f",
            "l"
        ],
        new_irregular_words: [
            "of",
            "was"
        ],
        exercises: [
            {
                exercise_id: "L10-WordBuilder-001",
                lesson_number: 10,
                exercise_type: "Word Builder",
                skill_focus: "CVC Blending",
                data: {
                    word: "bat",
                    letters: [
                        "b",
                        "a",
                        "t"
                    ],
                    image: "🦇"
                },
                response_type: "drag_and_drop",
                assets: {
                    audio: [
                        "b.mp3",
                        "a.mp3",
                        "t.mp3",
                        "bat.mp3"
                    ]
                },
                srs_data: {
                    due_date: null,
                    stability: 0,
                    difficulty: 0,
                    review_history: []
                }
            },
            {
                exercise_id: "L10-WordBuilder-002",
                lesson_number: 10,
                exercise_type: "Word Builder",
                skill_focus: "CVC Blending",
                data: {
                    word: "fan",
                    letters: [
                        "f",
                        "a",
                        "n"
                    ],
                    image: "🪭"
                },
                response_type: "drag_and_drop",
                assets: {
                    audio: [
                        "f.mp3",
                        "a.mp3",
                        "n.mp3",
                        "fan.mp3"
                    ]
                },
                srs_data: {
                    due_date: null,
                    stability: 0,
                    difficulty: 0,
                    review_history: []
                }
            },
            {
                exercise_id: "L10-WordBuilder-003",
                lesson_number: 10,
                exercise_type: "Word Builder",
                skill_focus: "CVC Blending",
                data: {
                    word: "lap",
                    letters: [
                        "l",
                        "a",
                        "p"
                    ],
                    image: "🧘"
                },
                response_type: "drag_and_drop",
                assets: {
                    audio: [
                        "l.mp3",
                        "a.mp3",
                        "p.mp3",
                        "lap.mp3"
                    ]
                },
                srs_data: {
                    due_date: null,
                    stability: 0,
                    difficulty: 0,
                    review_history: []
                }
            },
            {
                exercise_id: "L10-WordBuilder-004",
                lesson_number: 10,
                exercise_type: "Word Builder",
                skill_focus: "CVC Blending",
                data: {
                    word: "big",
                    letters: [
                        "b",
                        "i",
                        "g"
                    ],
                    image: "🐘"
                },
                response_type: "drag_and_drop",
                assets: {
                    audio: [
                        "b.mp3",
                        "i.mp3",
                        "g.mp3",
                        "big.mp3"
                    ]
                },
                srs_data: {
                    due_date: null,
                    stability: 0,
                    difficulty: 0,
                    review_history: []
                }
            },
            {
                exercise_id: "L10-WordBuilder-005",
                lesson_number: 10,
                exercise_type: "Word Builder",
                skill_focus: "CVC Blending",
                data: {
                    word: "fit",
                    letters: [
                        "f",
                        "i",
                        "t"
                    ],
                    image: "💪"
                },
                response_type: "drag_and_drop",
                assets: {
                    audio: [
                        "f.mp3",
                        "i.mp3",
                        "t.mp3",
                        "fit.mp3"
                    ]
                },
                srs_data: {
                    due_date: null,
                    stability: 0,
                    difficulty: 0,
                    review_history: []
                }
            },
            {
                exercise_id: "L10-WordBuilder-006",
                lesson_number: 10,
                exercise_type: "Word Builder",
                skill_focus: "CVC Blending",
                data: {
                    word: "log",
                    letters: [
                        "l",
                        "o",
                        "g"
                    ],
                    image: "🪵"
                },
                response_type: "drag_and_drop",
                assets: {
                    audio: [
                        "l.mp3",
                        "o.mp3",
                        "g.mp3",
                        "log.mp3"
                    ]
                },
                srs_data: {
                    due_date: null,
                    stability: 0,
                    difficulty: 0,
                    review_history: []
                }
            },
            {
                exercise_id: "L10-WordBuilder-007",
                lesson_number: 10,
                exercise_type: "Word Builder",
                skill_focus: "CVC Blending",
                data: {
                    word: "bag",
                    letters: [
                        "b",
                        "a",
                        "g"
                    ],
                    image: "👜"
                },
                response_type: "drag_and_drop",
                assets: {
                    audio: [
                        "b.mp3",
                        "a.mp3",
                        "g.mp3",
                        "bag.mp3"
                    ]
                },
                srs_data: {
                    due_date: null,
                    stability: 0,
                    difficulty: 0,
                    review_history: []
                }
            },
            {
                exercise_id: "L10-WordBuilder-008",
                lesson_number: 10,
                exercise_type: "Word Builder",
                skill_focus: "CVC Blending",
                data: {
                    word: "fog",
                    letters: [
                        "f",
                        "o",
                        "g"
                    ],
                    image: "🌫️"
                },
                response_type: "drag_and_drop",
                assets: {
                    audio: [
                        "f.mp3",
                        "o.mp3",
                        "g.mp3",
                        "fog.mp3"
                    ]
                },
                srs_data: {
                    due_date: null,
                    stability: 0,
                    difficulty: 0,
                    review_history: []
                }
            },
            {
                exercise_id: "L10-WordBuilder-009",
                lesson_number: 10,
                exercise_type: "Word Builder",
                skill_focus: "CVC Blending",
                data: {
                    word: "lab",
                    letters: [
                        "l",
                        "a",
                        "b"
                    ],
                    image: "🔬"
                },
                response_type: "drag_and_drop",
                assets: {
                    audio: [
                        "l.mp3",
                        "a.mp3",
                        "b.mp3",
                        "lab.mp3"
                    ]
                },
                srs_data: {
                    due_date: null,
                    stability: 0,
                    difficulty: 0,
                    review_history: []
                }
            },
            {
                exercise_id: "L10-WordBuilder-010",
                lesson_number: 10,
                exercise_type: "Word Builder",
                skill_focus: "CVC Blending",
                data: {
                    word: "fib",
                    letters: [
                        "f",
                        "i",
                        "b"
                    ],
                    image: "🤥"
                },
                response_type: "drag_and_drop",
                assets: {
                    audio: [
                        "f.mp3",
                        "i.mp3",
                        "b.mp3",
                        "fib.mp3"
                    ]
                },
                srs_data: {
                    due_date: null,
                    stability: 0,
                    difficulty: 0,
                    review_history: []
                }
            }
        ],
        story: {
            title: "A big bat",
            text: "A big bat can fit in a bag. The bat was fat."
        }
    },
    {
        lesson_number: 11,
        phase: 2,
        title: "New Letters: r, u, j",
        description: "Learn /r/, /u/, and /j/ sounds",
        new_graphemes: [
            "r",
            "u",
            "j"
        ],
        new_irregular_words: [
            "you",
            "are"
        ],
        exercises: [
            {
                exercise_id: "L11-WordBuilder-001",
                lesson_number: 11,
                exercise_type: "Word Builder",
                skill_focus: "CVC Blending",
                data: {
                    word: "run",
                    letters: [
                        "r",
                        "u",
                        "n"
                    ],
                    image: "🏃"
                },
                response_type: "drag_and_drop",
                assets: {
                    audio: [
                        "r.mp3",
                        "u.mp3",
                        "n.mp3",
                        "run.mp3"
                    ]
                },
                srs_data: {
                    due_date: null,
                    stability: 0,
                    difficulty: 0,
                    review_history: []
                }
            },
            {
                exercise_id: "L11-WordBuilder-002",
                lesson_number: 11,
                exercise_type: "Word Builder",
                skill_focus: "CVC Blending",
                data: {
                    word: "jug",
                    letters: [
                        "j",
                        "u",
                        "g"
                    ],
                    image: "🏺"
                },
                response_type: "drag_and_drop",
                assets: {
                    audio: [
                        "j.mp3",
                        "u.mp3",
                        "g.mp3",
                        "jug.mp3"
                    ]
                },
                srs_data: {
                    due_date: null,
                    stability: 0,
                    difficulty: 0,
                    review_history: []
                }
            },
            {
                exercise_id: "L11-WordBuilder-003",
                lesson_number: 11,
                exercise_type: "Word Builder",
                skill_focus: "CVC Blending",
                data: {
                    word: "rug",
                    letters: [
                        "r",
                        "u",
                        "g"
                    ],
                    image: "🧶"
                },
                response_type: "drag_and_drop",
                assets: {
                    audio: [
                        "r.mp3",
                        "u.mp3",
                        "g.mp3",
                        "rug.mp3"
                    ]
                },
                srs_data: {
                    due_date: null,
                    stability: 0,
                    difficulty: 0,
                    review_history: []
                }
            },
            {
                exercise_id: "L11-WordBuilder-004",
                lesson_number: 11,
                exercise_type: "Word Builder",
                skill_focus: "CVC Blending",
                data: {
                    word: "jam",
                    letters: [
                        "j",
                        "a",
                        "m"
                    ],
                    image: "🍓"
                },
                response_type: "drag_and_drop",
                assets: {
                    audio: [
                        "j.mp3",
                        "a.mp3",
                        "m.mp3",
                        "jam.mp3"
                    ]
                },
                srs_data: {
                    due_date: null,
                    stability: 0,
                    difficulty: 0,
                    review_history: []
                }
            },
            {
                exercise_id: "L11-WordBuilder-005",
                lesson_number: 11,
                exercise_type: "Word Builder",
                skill_focus: "CVC Blending",
                data: {
                    word: "rat",
                    letters: [
                        "r",
                        "a",
                        "t"
                    ],
                    image: "🐀"
                },
                response_type: "drag_and_drop",
                assets: {
                    audio: [
                        "r.mp3",
                        "a.mp3",
                        "t.mp3",
                        "rat.mp3"
                    ]
                },
                srs_data: {
                    due_date: null,
                    stability: 0,
                    difficulty: 0,
                    review_history: []
                }
            }
        ],
        story: {
            title: "Run, run, run",
            text: "A rat can run. A jug is on a rug. You are big."
        }
    },
    {
        lesson_number: 12,
        phase: 2,
        title: "New Letters: v, w, x",
        description: "Learn /v/, /w/, and /x/ sounds",
        new_graphemes: [
            "v",
            "w",
            "x"
        ],
        new_irregular_words: [
            "we",
            "me"
        ],
        exercises: [
            {
                exercise_id: "L12-WordBuilder-001",
                lesson_number: 12,
                exercise_type: "Word Builder",
                skill_focus: "CVC Blending",
                data: {
                    word: "van",
                    letters: [
                        "v",
                        "a",
                        "n"
                    ],
                    image: "🚐"
                },
                response_type: "drag_and_drop",
                assets: {
                    audio: [
                        "v.mp3",
                        "a.mp3",
                        "n.mp3",
                        "van.mp3"
                    ]
                },
                srs_data: {
                    due_date: null,
                    stability: 0,
                    difficulty: 0,
                    review_history: []
                }
            },
            {
                exercise_id: "L12-WordBuilder-002",
                lesson_number: 12,
                exercise_type: "Word Builder",
                skill_focus: "CVC Blending",
                data: {
                    word: "wet",
                    letters: [
                        "w",
                        "e",
                        "t"
                    ],
                    image: "💧"
                },
                response_type: "drag_and_drop",
                assets: {
                    audio: [
                        "w.mp3",
                        "e.mp3",
                        "t.mp3",
                        "wet.mp3"
                    ]
                },
                srs_data: {
                    due_date: null,
                    stability: 0,
                    difficulty: 0,
                    review_history: []
                }
            },
            {
                exercise_id: "L12-WordBuilder-003",
                lesson_number: 12,
                exercise_type: "Word Builder",
                skill_focus: "CVC Blending",
                data: {
                    word: "fox",
                    letters: [
                        "f",
                        "o",
                        "x"
                    ],
                    image: "🦊"
                },
                response_type: "drag_and_drop",
                assets: {
                    audio: [
                        "f.mp3",
                        "o.mp3",
                        "x.mp3",
                        "fox.mp3"
                    ]
                },
                srs_data: {
                    due_date: null,
                    stability: 0,
                    difficulty: 0,
                    review_history: []
                }
            },
            {
                exercise_id: "L12-WordBuilder-004",
                lesson_number: 12,
                exercise_type: "Word Builder",
                skill_focus: "CVC Blending",
                data: {
                    word: "wig",
                    letters: [
                        "w",
                        "i",
                        "g"
                    ],
                    image: "💇"
                },
                response_type: "drag_and_drop",
                assets: {
                    audio: [
                        "w.mp3",
                        "i.mp3",
                        "g.mp3",
                        "wig.mp3"
                    ]
                },
                srs_data: {
                    due_date: null,
                    stability: 0,
                    difficulty: 0,
                    review_history: []
                }
            },
            {
                exercise_id: "L12-WordBuilder-005",
                lesson_number: 12,
                exercise_type: "Word Builder",
                skill_focus: "CVC Blending",
                data: {
                    word: "box",
                    letters: [
                        "b",
                        "o",
                        "x"
                    ],
                    image: "📦"
                },
                response_type: "drag_and_drop",
                assets: {
                    audio: [
                        "b.mp3",
                        "o.mp3",
                        "x.mp3",
                        "box.mp3"
                    ]
                },
                srs_data: {
                    due_date: null,
                    stability: 0,
                    difficulty: 0,
                    review_history: []
                }
            }
        ],
        story: {
            title: "A wet fox",
            text: "A fox is wet. We can get a box. The fox is in the van."
        }
    },
    {
        lesson_number: 13,
        phase: 2,
        title: "New Letters: y, z, qu",
        description: "Learn /y/, /z/, and /qu/ sounds",
        new_graphemes: [
            "y",
            "z",
            "qu"
        ],
        new_irregular_words: [
            "my",
            "be"
        ],
        exercises: [
            {
                exercise_id: "L13-WordBuilder-001",
                lesson_number: 13,
                exercise_type: "Word Builder",
                skill_focus: "CVC Blending",
                data: {
                    word: "yes",
                    letters: [
                        "y",
                        "e",
                        "s"
                    ],
                    image: "✅"
                },
                response_type: "drag_and_drop",
                assets: {
                    audio: [
                        "y.mp3",
                        "e.mp3",
                        "s.mp3",
                        "yes.mp3"
                    ]
                },
                srs_data: {
                    due_date: null,
                    stability: 0,
                    difficulty: 0,
                    review_history: []
                }
            },
            {
                exercise_id: "L13-WordBuilder-002",
                lesson_number: 13,
                exercise_type: "Word Builder",
                skill_focus: "CVC Blending",
                data: {
                    word: "zip",
                    letters: [
                        "z",
                        "i",
                        "p"
                    ],
                    image: "🤐"
                },
                response_type: "drag_and_drop",
                assets: {
                    audio: [
                        "z.mp3",
                        "i.mp3",
                        "p.mp3",
                        "zip.mp3"
                    ]
                },
                srs_data: {
                    due_date: null,
                    stability: 0,
                    difficulty: 0,
                    review_history: []
                }
            },
            {
                exercise_id: "L13-WordBuilder-003",
                lesson_number: 13,
                exercise_type: "Word Builder",
                skill_focus: "Digraph Blending",
                data: {
                    word: "quiz",
                    letters: [
                        "qu",
                        "i",
                        "z"
                    ],
                    image: "📝"
                },
                response_type: "drag_and_drop",
                assets: {
                    audio: [
                        "qu.mp3",
                        "i.mp3",
                        "z.mp3",
                        "quiz.mp3"
                    ]
                },
                srs_data: {
                    due_date: null,
                    stability: 0,
                    difficulty: 0,
                    review_history: []
                }
            },
            {
                exercise_id: "L13-WordBuilder-004",
                lesson_number: 13,
                exercise_type: "Word Builder",
                skill_focus: "CVC Blending",
                data: {
                    word: "yam",
                    letters: [
                        "y",
                        "a",
                        "m"
                    ],
                    image: "🍠"
                },
                response_type: "drag_and_drop",
                assets: {
                    audio: [
                        "y.mp3",
                        "a.mp3",
                        "m.mp3",
                        "yam.mp3"
                    ]
                },
                srs_data: {
                    due_date: null,
                    stability: 0,
                    difficulty: 0,
                    review_history: []
                }
            },
            {
                exercise_id: "L13-WordBuilder-005",
                lesson_number: 13,
                exercise_type: "Word Builder",
                skill_focus: "CVC Blending",
                data: {
                    word: "zap",
                    letters: [
                        "z",
                        "a",
                        "p"
                    ],
                    image: "⚡"
                },
                response_type: "drag_and_drop",
                assets: {
                    audio: [
                        "z.mp3",
                        "a.mp3",
                        "p.mp3",
                        "zap.mp3"
                    ]
                },
                srs_data: {
                    due_date: null,
                    stability: 0,
                    difficulty: 0,
                    review_history: []
                }
            }
        ],
        story: {
            title: "My quiz",
            text: "Yes, I can zip my bag. My quiz is in the bag."
        }
    },
    {
        lesson_number: 14,
        phase: 2,
        title: "New Letter: e",
        description: "Learn the /e/ sound",
        new_graphemes: [
            "e"
        ],
        new_irregular_words: [
            "said",
            "have"
        ],
        exercises: [
            {
                exercise_id: "L14-WordBuilder-001",
                lesson_number: 14,
                exercise_type: "Word Builder",
                skill_focus: "CVC Blending",
                data: {
                    word: "bed",
                    letters: [
                        "b",
                        "e",
                        "d"
                    ],
                    image: "🛏️"
                },
                response_type: "drag_and_drop",
                assets: {
                    audio: [
                        "b.mp3",
                        "e.mp3",
                        "d.mp3",
                        "bed.mp3"
                    ]
                },
                srs_data: {
                    due_date: null,
                    stability: 0,
                    difficulty: 0,
                    review_history: []
                }
            },
            {
                exercise_id: "L14-WordBuilder-002",
                lesson_number: 14,
                exercise_type: "Word Builder",
                skill_focus: "CVC Blending",
                data: {
                    word: "pen",
                    letters: [
                        "p",
                        "e",
                        "n"
                    ],
                    image: "🖊️"
                },
                response_type: "drag_and_drop",
                assets: {
                    audio: [
                        "p.mp3",
                        "e.mp3",
                        "n.mp3",
                        "pen.mp3"
                    ]
                },
                srs_data: {
                    due_date: null,
                    stability: 0,
                    difficulty: 0,
                    review_history: []
                }
            },
            {
                exercise_id: "L14-WordBuilder-003",
                lesson_number: 14,
                exercise_type: "Word Builder",
                skill_focus: "CVC Blending",
                data: {
                    word: "hen",
                    letters: [
                        "h",
                        "e",
                        "n"
                    ],
                    image: "🐔"
                },
                response_type: "drag_and_drop",
                assets: {
                    audio: [
                        "h.mp3",
                        "e.mp3",
                        "n.mp3",
                        "hen.mp3"
                    ]
                },
                srs_data: {
                    due_date: null,
                    stability: 0,
                    difficulty: 0,
                    review_history: []
                }
            },
            {
                exercise_id: "L14-WordBuilder-004",
                lesson_number: 14,
                exercise_type: "Word Builder",
                skill_focus: "CVC Blending",
                data: {
                    word: "leg",
                    letters: [
                        "l",
                        "e",
                        "g"
                    ],
                    image: "🦵"
                },
                response_type: "drag_and_drop",
                assets: {
                    audio: [
                        "l.mp3",
                        "e.mp3",
                        "g.mp3",
                        "leg.mp3"
                    ]
                },
                srs_data: {
                    due_date: null,
                    stability: 0,
                    difficulty: 0,
                    review_history: []
                }
            },
            {
                exercise_id: "L14-WordBuilder-005",
                lesson_number: 14,
                exercise_type: "Word Builder",
                skill_focus: "CVC Blending",
                data: {
                    word: "net",
                    letters: [
                        "n",
                        "e",
                        "t"
                    ],
                    image: "🥅"
                },
                response_type: "drag_and_drop",
                assets: {
                    audio: [
                        "n.mp3",
                        "e.mp3",
                        "t.mp3",
                        "net.mp3"
                    ]
                },
                srs_data: {
                    due_date: null,
                    stability: 0,
                    difficulty: 0,
                    review_history: []
                }
            }
        ],
        story: {
            title: "A red hen",
            text: "A red hen is in a pen. The hen said yes. I have a net."
        }
    },
    {
        lesson_number: 15,
        phase: 2,
        title: "Consonant Digraph: sh",
        description: "Learn the /sh/ sound",
        new_graphemes: [
            "sh"
        ],
        new_irregular_words: [
            "they",
            "all"
        ],
        exercises: [
            {
                exercise_id: "L15-WordBuilder-001",
                lesson_number: 15,
                exercise_type: "Word Builder",
                skill_focus: "Digraph Blending",
                data: {
                    word: "ship",
                    letters: [
                        "sh",
                        "i",
                        "p"
                    ],
                    image: "🚢"
                },
                response_type: "drag_and_drop",
                assets: {
                    audio: [
                        "sh.mp3",
                        "i.mp3",
                        "p.mp3",
                        "ship.mp3"
                    ]
                },
                srs_data: {
                    due_date: null,
                    stability: 0,
                    difficulty: 0,
                    review_history: []
                }
            },
            {
                exercise_id: "L15-WordBuilder-002",
                lesson_number: 15,
                exercise_type: "Word Builder",
                skill_focus: "Digraph Blending",
                data: {
                    word: "shop",
                    letters: [
                        "sh",
                        "o",
                        "p"
                    ],
                    image: "🏪"
                },
                response_type: "drag_and_drop",
                assets: {
                    audio: [
                        "sh.mp3",
                        "o.mp3",
                        "p.mp3",
                        "shop.mp3"
                    ]
                },
                srs_data: {
                    due_date: null,
                    stability: 0,
                    difficulty: 0,
                    review_history: []
                }
            },
            {
                exercise_id: "L15-WordBuilder-003",
                lesson_number: 15,
                exercise_type: "Word Builder",
                skill_focus: "Digraph Blending",
                data: {
                    word: "fish",
                    letters: [
                        "f",
                        "i",
                        "sh"
                    ],
                    image: "🐟"
                },
                response_type: "drag_and_drop",
                assets: {
                    audio: [
                        "f.mp3",
                        "i.mp3",
                        "sh.mp3",
                        "fish.mp3"
                    ]
                },
                srs_data: {
                    due_date: null,
                    stability: 0,
                    difficulty: 0,
                    review_history: []
                }
            },
            {
                exercise_id: "L15-WordBuilder-004",
                lesson_number: 15,
                exercise_type: "Word Builder",
                skill_focus: "Digraph Blending",
                data: {
                    word: "dish",
                    letters: [
                        "d",
                        "i",
                        "sh"
                    ],
                    image: "🍽️"
                },
                response_type: "drag_and_drop",
                assets: {
                    audio: [
                        "d.mp3",
                        "i.mp3",
                        "sh.mp3",
                        "dish.mp3"
                    ]
                },
                srs_data: {
                    due_date: null,
                    stability: 0,
                    difficulty: 0,
                    review_history: []
                }
            },
            {
                exercise_id: "L15-WordBuilder-005",
                lesson_number: 15,
                exercise_type: "Word Builder",
                skill_focus: "Digraph Blending",
                data: {
                    word: "rush",
                    letters: [
                        "r",
                        "u",
                        "sh"
                    ],
                    image: "💨"
                },
                response_type: "drag_and_drop",
                assets: {
                    audio: [
                        "r.mp3",
                        "u.mp3",
                        "sh.mp3",
                        "rush.mp3"
                    ]
                },
                srs_data: {
                    due_date: null,
                    stability: 0,
                    difficulty: 0,
                    review_history: []
                }
            }
        ],
        story: {
            title: "Fish shop",
            text: "They all rush to the shop. A fish is in a dish."
        }
    },
    {
        lesson_number: 16,
        phase: 2,
        title: "Consonant Digraph: ch",
        description: "Learn the /ch/ sound",
        new_graphemes: [
            "ch"
        ],
        new_irregular_words: [
            "some",
            "come"
        ],
        exercises: [
            {
                exercise_id: "L16-WordBuilder-001",
                lesson_number: 16,
                exercise_type: "Word Builder",
                skill_focus: "Digraph Blending",
                data: {
                    word: "chip",
                    letters: [
                        "ch",
                        "i",
                        "p"
                    ],
                    image: "🍟"
                },
                response_type: "drag_and_drop",
                assets: {
                    audio: [
                        "ch.mp3",
                        "i.mp3",
                        "p.mp3",
                        "chip.mp3"
                    ]
                },
                srs_data: {
                    due_date: null,
                    stability: 0,
                    difficulty: 0,
                    review_history: []
                }
            },
            {
                exercise_id: "L16-WordBuilder-002",
                lesson_number: 16,
                exercise_type: "Word Builder",
                skill_focus: "Digraph Blending",
                data: {
                    word: "chat",
                    letters: [
                        "ch",
                        "a",
                        "t"
                    ],
                    image: "💬"
                },
                response_type: "drag_and_drop",
                assets: {
                    audio: [
                        "ch.mp3",
                        "a.mp3",
                        "t.mp3",
                        "chat.mp3"
                    ]
                },
                srs_data: {
                    due_date: null,
                    stability: 0,
                    difficulty: 0,
                    review_history: []
                }
            },
            {
                exercise_id: "L16-WordBuilder-003",
                lesson_number: 16,
                exercise_type: "Word Builder",
                skill_focus: "Digraph Blending",
                data: {
                    word: "much",
                    letters: [
                        "m",
                        "u",
                        "ch"
                    ],
                    image: "📊"
                },
                response_type: "drag_and_drop",
                assets: {
                    audio: [
                        "m.mp3",
                        "u.mp3",
                        "ch.mp3",
                        "much.mp3"
                    ]
                },
                srs_data: {
                    due_date: null,
                    stability: 0,
                    difficulty: 0,
                    review_history: []
                }
            },
            {
                exercise_id: "L16-WordBuilder-004",
                lesson_number: 16,
                exercise_type: "Word Builder",
                skill_focus: "Digraph Blending",
                data: {
                    word: "chop",
                    letters: [
                        "ch",
                        "o",
                        "p"
                    ],
                    image: "🪓"
                },
                response_type: "drag_and_drop",
                assets: {
                    audio: [
                        "ch.mp3",
                        "o.mp3",
                        "p.mp3",
                        "chop.mp3"
                    ]
                },
                srs_data: {
                    due_date: null,
                    stability: 0,
                    difficulty: 0,
                    review_history: []
                }
            },
            {
                exercise_id: "L16-WordBuilder-005",
                lesson_number: 16,
                exercise_type: "Word Builder",
                skill_focus: "Digraph Blending",
                data: {
                    word: "rich",
                    letters: [
                        "r",
                        "i",
                        "ch"
                    ],
                    image: "💰"
                },
                response_type: "drag_and_drop",
                assets: {
                    audio: [
                        "r.mp3",
                        "i.mp3",
                        "ch.mp3",
                        "rich.mp3"
                    ]
                },
                srs_data: {
                    due_date: null,
                    stability: 0,
                    difficulty: 0,
                    review_history: []
                }
            }
        ],
        story: {
            title: "Chip chat",
            text: "Come and chat. I have some chips. They are rich."
        }
    },
    {
        lesson_number: 17,
        phase: 2,
        title: "Consonant Digraph: th",
        description: "Learn the /th/ sound",
        new_graphemes: [
            "th"
        ],
        new_irregular_words: [
            "there",
            "were"
        ],
        exercises: [
            {
                exercise_id: "L17-WordBuilder-001",
                lesson_number: 17,
                exercise_type: "Word Builder",
                skill_focus: "Digraph Blending",
                data: {
                    word: "this",
                    letters: [
                        "th",
                        "i",
                        "s"
                    ],
                    image: "👈"
                },
                response_type: "drag_and_drop",
                assets: {
                    audio: [
                        "th.mp3",
                        "i.mp3",
                        "s.mp3",
                        "this.mp3"
                    ]
                },
                srs_data: {
                    due_date: null,
                    stability: 0,
                    difficulty: 0,
                    review_history: []
                }
            },
            {
                exercise_id: "L17-WordBuilder-002",
                lesson_number: 17,
                exercise_type: "Word Builder",
                skill_focus: "Digraph Blending",
                data: {
                    word: "that",
                    letters: [
                        "th",
                        "a",
                        "t"
                    ],
                    image: "👉"
                },
                response_type: "drag_and_drop",
                assets: {
                    audio: [
                        "th.mp3",
                        "a.mp3",
                        "t.mp3",
                        "that.mp3"
                    ]
                },
                srs_data: {
                    due_date: null,
                    stability: 0,
                    difficulty: 0,
                    review_history: []
                }
            },
            {
                exercise_id: "L17-WordBuilder-003",
                lesson_number: 17,
                exercise_type: "Word Builder",
                skill_focus: "Digraph Blending",
                data: {
                    word: "path",
                    letters: [
                        "p",
                        "a",
                        "th"
                    ],
                    image: "🛤️"
                },
                response_type: "drag_and_drop",
                assets: {
                    audio: [
                        "p.mp3",
                        "a.mp3",
                        "th.mp3",
                        "path.mp3"
                    ]
                },
                srs_data: {
                    due_date: null,
                    stability: 0,
                    difficulty: 0,
                    review_history: []
                }
            },
            {
                exercise_id: "L17-WordBuilder-004",
                lesson_number: 17,
                exercise_type: "Word Builder",
                skill_focus: "Digraph Blending",
                data: {
                    word: "with",
                    letters: [
                        "w",
                        "i",
                        "th"
                    ],
                    image: "🤝"
                },
                response_type: "drag_and_drop",
                assets: {
                    audio: [
                        "w.mp3",
                        "i.mp3",
                        "th.mp3",
                        "with.mp3"
                    ]
                },
                srs_data: {
                    due_date: null,
                    stability: 0,
                    difficulty: 0,
                    review_history: []
                }
            },
            {
                exercise_id: "L17-WordBuilder-005",
                lesson_number: 17,
                exercise_type: "Word Builder",
                skill_focus: "Digraph Blending",
                data: {
                    word: "bath",
                    letters: [
                        "b",
                        "a",
                        "th"
                    ],
                    image: "🛁"
                },
                response_type: "drag_and_drop",
                assets: {
                    audio: [
                        "b.mp3",
                        "a.mp3",
                        "th.mp3",
                        "bath.mp3"
                    ]
                },
                srs_data: {
                    due_date: null,
                    stability: 0,
                    difficulty: 0,
                    review_history: []
                }
            }
        ],
        story: {
            title: "This path",
            text: "This is a path. There were baths with that."
        }
    },
    {
        lesson_number: 18,
        phase: 2,
        title: "Consonant Digraph: wh, ng",
        description: "Learn the /wh/ and /ng/ sounds",
        new_graphemes: [
            "wh",
            "ng"
        ],
        new_irregular_words: [
            "what",
            "when"
        ],
        exercises: [
            {
                exercise_id: "L18-WordBuilder-001",
                lesson_number: 18,
                exercise_type: "Word Builder",
                skill_focus: "Digraph Blending",
                data: {
                    word: "when",
                    letters: [
                        "wh",
                        "e",
                        "n"
                    ],
                    image: "⏰"
                },
                response_type: "drag_and_drop",
                assets: {
                    audio: [
                        "wh.mp3",
                        "e.mp3",
                        "n.mp3",
                        "when.mp3"
                    ]
                },
                srs_data: {
                    due_date: null,
                    stability: 0,
                    difficulty: 0,
                    review_history: []
                }
            },
            {
                exercise_id: "L18-WordBuilder-002",
                lesson_number: 18,
                exercise_type: "Word Builder",
                skill_focus: "Digraph Blending",
                data: {
                    word: "ring",
                    letters: [
                        "r",
                        "i",
                        "ng"
                    ],
                    image: "💍"
                },
                response_type: "drag_and_drop",
                assets: {
                    audio: [
                        "r.mp3",
                        "i.mp3",
                        "ng.mp3",
                        "ring.mp3"
                    ]
                },
                srs_data: {
                    due_date: null,
                    stability: 0,
                    difficulty: 0,
                    review_history: []
                }
            },
            {
                exercise_id: "L18-WordBuilder-003",
                lesson_number: 18,
                exercise_type: "Word Builder",
                skill_focus: "Digraph Blending",
                data: {
                    word: "sing",
                    letters: [
                        "s",
                        "i",
                        "ng"
                    ],
                    image: "🎤"
                },
                response_type: "drag_and_drop",
                assets: {
                    audio: [
                        "s.mp3",
                        "i.mp3",
                        "ng.mp3",
                        "sing.mp3"
                    ]
                },
                srs_data: {
                    due_date: null,
                    stability: 0,
                    difficulty: 0,
                    review_history: []
                }
            },
            {
                exercise_id: "L18-WordBuilder-004",
                lesson_number: 18,
                exercise_type: "Word Builder",
                skill_focus: "Digraph Blending",
                data: {
                    word: "bang",
                    letters: [
                        "b",
                        "a",
                        "ng"
                    ],
                    image: "💥"
                },
                response_type: "drag_and_drop",
                assets: {
                    audio: [
                        "b.mp3",
                        "a.mp3",
                        "ng.mp3",
                        "bang.mp3"
                    ]
                },
                srs_data: {
                    due_date: null,
                    stability: 0,
                    difficulty: 0,
                    review_history: []
                }
            },
            {
                exercise_id: "L18-WordBuilder-005",
                lesson_number: 18,
                exercise_type: "Word Builder",
                skill_focus: "Digraph Blending",
                data: {
                    word: "king",
                    letters: [
                        "k",
                        "i",
                        "ng"
                    ],
                    image: "👑"
                },
                response_type: "drag_and_drop",
                assets: {
                    audio: [
                        "k.mp3",
                        "i.mp3",
                        "ng.mp3",
                        "king.mp3"
                    ]
                },
                srs_data: {
                    due_date: null,
                    stability: 0,
                    difficulty: 0,
                    review_history: []
                }
            }
        ],
        story: {
            title: "When the king sings",
            text: "What is that? When the king sings, the ring goes bang!"
        }
    },
    {
        lesson_number: 19,
        phase: 2,
        title: "Consonant Digraph: ck",
        description: "Learn the /ck/ spelling pattern",
        new_graphemes: [
            "ck"
        ],
        new_irregular_words: [
            "little",
            "one"
        ],
        exercises: [
            {
                exercise_id: "L19-WordBuilder-001",
                lesson_number: 19,
                exercise_type: "Word Builder",
                skill_focus: "Digraph Blending",
                data: {
                    word: "duck",
                    letters: [
                        "d",
                        "u",
                        "ck"
                    ],
                    image: "🦆"
                },
                response_type: "drag_and_drop",
                assets: {
                    audio: [
                        "d.mp3",
                        "u.mp3",
                        "ck.mp3",
                        "duck.mp3"
                    ]
                },
                srs_data: {
                    due_date: null,
                    stability: 0,
                    difficulty: 0,
                    review_history: []
                }
            },
            {
                exercise_id: "L19-WordBuilder-002",
                lesson_number: 19,
                exercise_type: "Word Builder",
                skill_focus: "Digraph Blending",
                data: {
                    word: "sock",
                    letters: [
                        "s",
                        "o",
                        "ck"
                    ],
                    image: "🧦"
                },
                response_type: "drag_and_drop",
                assets: {
                    audio: [
                        "s.mp3",
                        "o.mp3",
                        "ck.mp3",
                        "sock.mp3"
                    ]
                },
                srs_data: {
                    due_date: null,
                    stability: 0,
                    difficulty: 0,
                    review_history: []
                }
            },
            {
                exercise_id: "L19-WordBuilder-003",
                lesson_number: 19,
                exercise_type: "Word Builder",
                skill_focus: "Digraph Blending",
                data: {
                    word: "lock",
                    letters: [
                        "l",
                        "o",
                        "ck"
                    ],
                    image: "🔒"
                },
                response_type: "drag_and_drop",
                assets: {
                    audio: [
                        "l.mp3",
                        "o.mp3",
                        "ck.mp3",
                        "lock.mp3"
                    ]
                },
                srs_data: {
                    due_date: null,
                    stability: 0,
                    difficulty: 0,
                    review_history: []
                }
            },
            {
                exercise_id: "L19-WordBuilder-004",
                lesson_number: 19,
                exercise_type: "Word Builder",
                skill_focus: "Digraph Blending",
                data: {
                    word: "pick",
                    letters: [
                        "p",
                        "i",
                        "ck"
                    ],
                    image: "☝️"
                },
                response_type: "drag_and_drop",
                assets: {
                    audio: [
                        "p.mp3",
                        "i.mp3",
                        "ck.mp3",
                        "pick.mp3"
                    ]
                },
                srs_data: {
                    due_date: null,
                    stability: 0,
                    difficulty: 0,
                    review_history: []
                }
            },
            {
                exercise_id: "L19-WordBuilder-005",
                lesson_number: 19,
                exercise_type: "Word Builder",
                skill_focus: "Digraph Blending",
                data: {
                    word: "back",
                    letters: [
                        "b",
                        "a",
                        "ck"
                    ],
                    image: "⬅️"
                },
                response_type: "drag_and_drop",
                assets: {
                    audio: [
                        "b.mp3",
                        "a.mp3",
                        "ck.mp3",
                        "back.mp3"
                    ]
                },
                srs_data: {
                    due_date: null,
                    stability: 0,
                    difficulty: 0,
                    review_history: []
                }
            }
        ],
        story: {
            title: "One little duck",
            text: "One little duck can pick a sock. The duck is back with a lock."
        }
    },
    {
        lesson_number: 20,
        phase: 2,
        title: "Double Letters: ff, ll, ss",
        description: "Learn double consonant patterns",
        new_graphemes: [
            "ff",
            "ll",
            "ss"
        ],
        new_irregular_words: [
            "do",
            "so"
        ],
        exercises: [
            {
                exercise_id: "L20-WordBuilder-001",
                lesson_number: 20,
                exercise_type: "Word Builder",
                skill_focus: "Double Consonant Blending",
                data: {
                    word: "puff",
                    letters: [
                        "p",
                        "u",
                        "ff"
                    ],
                    image: "💨"
                },
                response_type: "drag_and_drop",
                assets: {
                    audio: [
                        "p.mp3",
                        "u.mp3",
                        "ff.mp3",
                        "puff.mp3"
                    ]
                },
                srs_data: {
                    due_date: null,
                    stability: 0,
                    difficulty: 0,
                    review_history: []
                }
            },
            {
                exercise_id: "L20-WordBuilder-002",
                lesson_number: 20,
                exercise_type: "Word Builder",
                skill_focus: "Double Consonant Blending",
                data: {
                    word: "bell",
                    letters: [
                        "b",
                        "e",
                        "ll"
                    ],
                    image: "🔔"
                },
                response_type: "drag_and_drop",
                assets: {
                    audio: [
                        "b.mp3",
                        "e.mp3",
                        "ll.mp3",
                        "bell.mp3"
                    ]
                },
                srs_data: {
                    due_date: null,
                    stability: 0,
                    difficulty: 0,
                    review_history: []
                }
            },
            {
                exercise_id: "L20-WordBuilder-003",
                lesson_number: 20,
                exercise_type: "Word Builder",
                skill_focus: "Double Consonant Blending",
                data: {
                    word: "miss",
                    letters: [
                        "m",
                        "i",
                        "ss"
                    ],
                    image: "🎯"
                },
                response_type: "drag_and_drop",
                assets: {
                    audio: [
                        "m.mp3",
                        "i.mp3",
                        "ss.mp3",
                        "miss.mp3"
                    ]
                },
                srs_data: {
                    due_date: null,
                    stability: 0,
                    difficulty: 0,
                    review_history: []
                }
            },
            {
                exercise_id: "L20-WordBuilder-004",
                lesson_number: 20,
                exercise_type: "Word Builder",
                skill_focus: "Double Consonant Blending",
                data: {
                    word: "doll",
                    letters: [
                        "d",
                        "o",
                        "ll"
                    ],
                    image: "🪆"
                },
                response_type: "drag_and_drop",
                assets: {
                    audio: [
                        "d.mp3",
                        "o.mp3",
                        "ll.mp3",
                        "doll.mp3"
                    ]
                },
                srs_data: {
                    due_date: null,
                    stability: 0,
                    difficulty: 0,
                    review_history: []
                }
            },
            {
                exercise_id: "L20-WordBuilder-005",
                lesson_number: 20,
                exercise_type: "Word Builder",
                skill_focus: "Double Consonant Blending",
                data: {
                    word: "pass",
                    letters: [
                        "p",
                        "a",
                        "ss"
                    ],
                    image: "✅"
                },
                response_type: "drag_and_drop",
                assets: {
                    audio: [
                        "p.mp3",
                        "a.mp3",
                        "ss.mp3",
                        "pass.mp3"
                    ]
                },
                srs_data: {
                    due_date: null,
                    stability: 0,
                    difficulty: 0,
                    review_history: []
                }
            }
        ],
        story: {
            title: "Do not miss",
            text: "Do not miss the bell. So the doll can pass with a puff."
        }
    },
    {
        lesson_number: 21,
        phase: 2,
        title: "Consonant Blends: bl, cl, fl",
        description: "Learn initial L-blends",
        new_graphemes: [
            "bl",
            "cl",
            "fl"
        ],
        new_irregular_words: [
            "like",
            "out"
        ],
        exercises: [
            {
                exercise_id: "L21-WordBuilder-001",
                lesson_number: 21,
                exercise_type: "Word Builder",
                skill_focus: "Consonant Blend",
                data: {
                    word: "blue",
                    letters: [
                        "bl",
                        "ue"
                    ],
                    image: "🔵"
                },
                response_type: "drag_and_drop",
                assets: {
                    audio: [
                        "bl.mp3",
                        "ue.mp3",
                        "blue.mp3"
                    ]
                },
                srs_data: {
                    due_date: null,
                    stability: 0,
                    difficulty: 0,
                    review_history: []
                }
            },
            {
                exercise_id: "L21-WordBuilder-002",
                lesson_number: 21,
                exercise_type: "Word Builder",
                skill_focus: "Consonant Blend",
                data: {
                    word: "clap",
                    letters: [
                        "cl",
                        "a",
                        "p"
                    ],
                    image: "👏"
                },
                response_type: "drag_and_drop",
                assets: {
                    audio: [
                        "cl.mp3",
                        "a.mp3",
                        "p.mp3",
                        "clap.mp3"
                    ]
                },
                srs_data: {
                    due_date: null,
                    stability: 0,
                    difficulty: 0,
                    review_history: []
                }
            },
            {
                exercise_id: "L21-WordBuilder-003",
                lesson_number: 21,
                exercise_type: "Word Builder",
                skill_focus: "Consonant Blend",
                data: {
                    word: "flag",
                    letters: [
                        "fl",
                        "a",
                        "g"
                    ],
                    image: "🚩"
                },
                response_type: "drag_and_drop",
                assets: {
                    audio: [
                        "fl.mp3",
                        "a.mp3",
                        "g.mp3",
                        "flag.mp3"
                    ]
                },
                srs_data: {
                    due_date: null,
                    stability: 0,
                    difficulty: 0,
                    review_history: []
                }
            },
            {
                exercise_id: "L21-WordBuilder-004",
                lesson_number: 21,
                exercise_type: "Word Builder",
                skill_focus: "Consonant Blend",
                data: {
                    word: "club",
                    letters: [
                        "cl",
                        "u",
                        "b"
                    ],
                    image: "♣️"
                },
                response_type: "drag_and_drop",
                assets: {
                    audio: [
                        "cl.mp3",
                        "u.mp3",
                        "b.mp3",
                        "club.mp3"
                    ]
                },
                srs_data: {
                    due_date: null,
                    stability: 0,
                    difficulty: 0,
                    review_history: []
                }
            },
            {
                exercise_id: "L21-WordBuilder-005",
                lesson_number: 21,
                exercise_type: "Word Builder",
                skill_focus: "Consonant Blend",
                data: {
                    word: "flip",
                    letters: [
                        "fl",
                        "i",
                        "p"
                    ],
                    image: "🔄"
                },
                response_type: "drag_and_drop",
                assets: {
                    audio: [
                        "fl.mp3",
                        "i.mp3",
                        "p.mp3",
                        "flip.mp3"
                    ]
                },
                srs_data: {
                    due_date: null,
                    stability: 0,
                    difficulty: 0,
                    review_history: []
                }
            }
        ],
        story: {
            title: "Blue flag",
            text: "I like the blue flag. Clap and flip out the club."
        }
    },
    {
        lesson_number: 22,
        phase: 2,
        title: "Consonant Blends: pl, sl, gl",
        description: "Learn more initial L-blends",
        new_graphemes: [
            "pl",
            "sl",
            "gl"
        ],
        new_irregular_words: [
            "look",
            "good"
        ],
        exercises: [
            {
                exercise_id: "L22-WordBuilder-001",
                lesson_number: 22,
                exercise_type: "Word Builder",
                skill_focus: "Consonant Blend",
                data: {
                    word: "plan",
                    letters: [
                        "pl",
                        "a",
                        "n"
                    ],
                    image: "📋"
                },
                response_type: "drag_and_drop",
                assets: {
                    audio: [
                        "pl.mp3",
                        "a.mp3",
                        "n.mp3",
                        "plan.mp3"
                    ]
                },
                srs_data: {
                    due_date: null,
                    stability: 0,
                    difficulty: 0,
                    review_history: []
                }
            },
            {
                exercise_id: "L22-WordBuilder-002",
                lesson_number: 22,
                exercise_type: "Word Builder",
                skill_focus: "Consonant Blend",
                data: {
                    word: "slip",
                    letters: [
                        "sl",
                        "i",
                        "p"
                    ],
                    image: "🧊"
                },
                response_type: "drag_and_drop",
                assets: {
                    audio: [
                        "sl.mp3",
                        "i.mp3",
                        "p.mp3",
                        "slip.mp3"
                    ]
                },
                srs_data: {
                    due_date: null,
                    stability: 0,
                    difficulty: 0,
                    review_history: []
                }
            },
            {
                exercise_id: "L22-WordBuilder-003",
                lesson_number: 22,
                exercise_type: "Word Builder",
                skill_focus: "Consonant Blend",
                data: {
                    word: "glad",
                    letters: [
                        "gl",
                        "a",
                        "d"
                    ],
                    image: "😊"
                },
                response_type: "drag_and_drop",
                assets: {
                    audio: [
                        "gl.mp3",
                        "a.mp3",
                        "d.mp3",
                        "glad.mp3"
                    ]
                },
                srs_data: {
                    due_date: null,
                    stability: 0,
                    difficulty: 0,
                    review_history: []
                }
            },
            {
                exercise_id: "L22-WordBuilder-004",
                lesson_number: 22,
                exercise_type: "Word Builder",
                skill_focus: "Consonant Blend",
                data: {
                    word: "plus",
                    letters: [
                        "pl",
                        "u",
                        "s"
                    ],
                    image: "➕"
                },
                response_type: "drag_and_drop",
                assets: {
                    audio: [
                        "pl.mp3",
                        "u.mp3",
                        "s.mp3",
                        "plus.mp3"
                    ]
                },
                srs_data: {
                    due_date: null,
                    stability: 0,
                    difficulty: 0,
                    review_history: []
                }
            },
            {
                exercise_id: "L22-WordBuilder-005",
                lesson_number: 22,
                exercise_type: "Word Builder",
                skill_focus: "Consonant Blend",
                data: {
                    word: "slug",
                    letters: [
                        "sl",
                        "u",
                        "g"
                    ],
                    image: "🐌"
                },
                response_type: "drag_and_drop",
                assets: {
                    audio: [
                        "sl.mp3",
                        "u.mp3",
                        "g.mp3",
                        "slug.mp3"
                    ]
                },
                srs_data: {
                    due_date: null,
                    stability: 0,
                    difficulty: 0,
                    review_history: []
                }
            }
        ],
        story: {
            title: "Good plan",
            text: "Look at the good plan. The glad slug can slip plus."
        }
    },
    {
        lesson_number: 23,
        phase: 2,
        title: "Consonant Blends: br, cr, dr",
        description: "Learn initial R-blends",
        new_graphemes: [
            "br",
            "cr",
            "dr"
        ],
        new_irregular_words: [
            "down",
            "now"
        ],
        exercises: [
            {
                exercise_id: "L23-WordBuilder-001",
                lesson_number: 23,
                exercise_type: "Word Builder",
                skill_focus: "Consonant Blend",
                data: {
                    word: "brag",
                    letters: [
                        "br",
                        "a",
                        "g"
                    ],
                    image: "💪"
                },
                response_type: "drag_and_drop",
                assets: {
                    audio: [
                        "br.mp3",
                        "a.mp3",
                        "g.mp3",
                        "brag.mp3"
                    ]
                },
                srs_data: {
                    due_date: null,
                    stability: 0,
                    difficulty: 0,
                    review_history: []
                }
            },
            {
                exercise_id: "L23-WordBuilder-002",
                lesson_number: 23,
                exercise_type: "Word Builder",
                skill_focus: "Consonant Blend",
                data: {
                    word: "crab",
                    letters: [
                        "cr",
                        "a",
                        "b"
                    ],
                    image: "🦀"
                },
                response_type: "drag_and_drop",
                assets: {
                    audio: [
                        "cr.mp3",
                        "a.mp3",
                        "b.mp3",
                        "crab.mp3"
                    ]
                },
                srs_data: {
                    due_date: null,
                    stability: 0,
                    difficulty: 0,
                    review_history: []
                }
            },
            {
                exercise_id: "L23-WordBuilder-003",
                lesson_number: 23,
                exercise_type: "Word Builder",
                skill_focus: "Consonant Blend",
                data: {
                    word: "drop",
                    letters: [
                        "dr",
                        "o",
                        "p"
                    ],
                    image: "💧"
                },
                response_type: "drag_and_drop",
                assets: {
                    audio: [
                        "dr.mp3",
                        "o.mp3",
                        "p.mp3",
                        "drop.mp3"
                    ]
                },
                srs_data: {
                    due_date: null,
                    stability: 0,
                    difficulty: 0,
                    review_history: []
                }
            },
            {
                exercise_id: "L23-WordBuilder-004",
                lesson_number: 23,
                exercise_type: "Word Builder",
                skill_focus: "Consonant Blend",
                data: {
                    word: "crop",
                    letters: [
                        "cr",
                        "o",
                        "p"
                    ],
                    image: "🌾"
                },
                response_type: "drag_and_drop",
                assets: {
                    audio: [
                        "cr.mp3",
                        "o.mp3",
                        "p.mp3",
                        "crop.mp3"
                    ]
                },
                srs_data: {
                    due_date: null,
                    stability: 0,
                    difficulty: 0,
                    review_history: []
                }
            },
            {
                exercise_id: "L23-WordBuilder-005",
                lesson_number: 23,
                exercise_type: "Word Builder",
                skill_focus: "Consonant Blend",
                data: {
                    word: "drum",
                    letters: [
                        "dr",
                        "u",
                        "m"
                    ],
                    image: "🥁"
                },
                response_type: "drag_and_drop",
                assets: {
                    audio: [
                        "dr.mp3",
                        "u.mp3",
                        "m.mp3",
                        "drum.mp3"
                    ]
                },
                srs_data: {
                    due_date: null,
                    stability: 0,
                    difficulty: 0,
                    review_history: []
                }
            }
        ],
        story: {
            title: "Crab drops down",
            text: "Now the crab drops down. The drum can brag with the crop."
        }
    },
    {
        lesson_number: 24,
        phase: 2,
        title: "Consonant Blends: fr, gr, pr, tr",
        description: "Learn more initial R-blends",
        new_graphemes: [
            "fr",
            "gr",
            "pr",
            "tr"
        ],
        new_irregular_words: [
            "from",
            "them"
        ],
        exercises: [
            {
                exercise_id: "L24-WordBuilder-001",
                lesson_number: 24,
                exercise_type: "Word Builder",
                skill_focus: "Consonant Blend",
                data: {
                    word: "frog",
                    letters: [
                        "fr",
                        "o",
                        "g"
                    ],
                    image: "🐸"
                },
                response_type: "drag_and_drop",
                assets: {
                    audio: [
                        "fr.mp3",
                        "o.mp3",
                        "g.mp3",
                        "frog.mp3"
                    ]
                },
                srs_data: {
                    due_date: null,
                    stability: 0,
                    difficulty: 0,
                    review_history: []
                }
            },
            {
                exercise_id: "L24-WordBuilder-002",
                lesson_number: 24,
                exercise_type: "Word Builder",
                skill_focus: "Consonant Blend",
                data: {
                    word: "grab",
                    letters: [
                        "gr",
                        "a",
                        "b"
                    ],
                    image: "✊"
                },
                response_type: "drag_and_drop",
                assets: {
                    audio: [
                        "gr.mp3",
                        "a.mp3",
                        "b.mp3",
                        "grab.mp3"
                    ]
                },
                srs_data: {
                    due_date: null,
                    stability: 0,
                    difficulty: 0,
                    review_history: []
                }
            },
            {
                exercise_id: "L24-WordBuilder-003",
                lesson_number: 24,
                exercise_type: "Word Builder",
                skill_focus: "Consonant Blend",
                data: {
                    word: "trip",
                    letters: [
                        "tr",
                        "i",
                        "p"
                    ],
                    image: "🧳"
                },
                response_type: "drag_and_drop",
                assets: {
                    audio: [
                        "tr.mp3",
                        "i.mp3",
                        "p.mp3",
                        "trip.mp3"
                    ]
                },
                srs_data: {
                    due_date: null,
                    stability: 0,
                    difficulty: 0,
                    review_history: []
                }
            },
            {
                exercise_id: "L24-WordBuilder-004",
                lesson_number: 24,
                exercise_type: "Word Builder",
                skill_focus: "Consonant Blend",
                data: {
                    word: "grin",
                    letters: [
                        "gr",
                        "i",
                        "n"
                    ],
                    image: "😁"
                },
                response_type: "drag_and_drop",
                assets: {
                    audio: [
                        "gr.mp3",
                        "i.mp3",
                        "n.mp3",
                        "grin.mp3"
                    ]
                },
                srs_data: {
                    due_date: null,
                    stability: 0,
                    difficulty: 0,
                    review_history: []
                }
            },
            {
                exercise_id: "L24-WordBuilder-005",
                lesson_number: 24,
                exercise_type: "Word Builder",
                skill_focus: "Consonant Blend",
                data: {
                    word: "from",
                    letters: [
                        "fr",
                        "o",
                        "m"
                    ],
                    image: "➡️"
                },
                response_type: "drag_and_drop",
                assets: {
                    audio: [
                        "fr.mp3",
                        "o.mp3",
                        "m.mp3",
                        "from.mp3"
                    ]
                },
                srs_data: {
                    due_date: null,
                    stability: 0,
                    difficulty: 0,
                    review_history: []
                }
            }
        ],
        story: {
            title: "Frog trip",
            text: "The frog can grab them. From the trip, the frog can grin."
        }
    },
    {
        lesson_number: 25,
        phase: 2,
        title: "Consonant Blends: sc, sk, sm, sn, sp, st, sw",
        description: "Learn initial S-blends",
        new_graphemes: [
            "sc",
            "sk",
            "sm",
            "sn",
            "sp",
            "st",
            "sw"
        ],
        new_irregular_words: [
            "into",
            "could"
        ],
        exercises: [
            {
                exercise_id: "L25-WordBuilder-001",
                lesson_number: 25,
                exercise_type: "Word Builder",
                skill_focus: "Consonant Blend",
                data: {
                    word: "skip",
                    letters: [
                        "sk",
                        "i",
                        "p"
                    ],
                    image: "🦘"
                },
                response_type: "drag_and_drop",
                assets: {
                    audio: [
                        "sk.mp3",
                        "i.mp3",
                        "p.mp3",
                        "skip.mp3"
                    ]
                },
                srs_data: {
                    due_date: null,
                    stability: 0,
                    difficulty: 0,
                    review_history: []
                }
            },
            {
                exercise_id: "L25-WordBuilder-002",
                lesson_number: 25,
                exercise_type: "Word Builder",
                skill_focus: "Consonant Blend",
                data: {
                    word: "snap",
                    letters: [
                        "sn",
                        "a",
                        "p"
                    ],
                    image: "📸"
                },
                response_type: "drag_and_drop",
                assets: {
                    audio: [
                        "sn.mp3",
                        "a.mp3",
                        "p.mp3",
                        "snap.mp3"
                    ]
                },
                srs_data: {
                    due_date: null,
                    stability: 0,
                    difficulty: 0,
                    review_history: []
                }
            },
            {
                exercise_id: "L25-WordBuilder-003",
                lesson_number: 25,
                exercise_type: "Word Builder",
                skill_focus: "Consonant Blend",
                data: {
                    word: "stop",
                    letters: [
                        "st",
                        "o",
                        "p"
                    ],
                    image: "🛑"
                },
                response_type: "drag_and_drop",
                assets: {
                    audio: [
                        "st.mp3",
                        "o.mp3",
                        "p.mp3",
                        "stop.mp3"
                    ]
                },
                srs_data: {
                    due_date: null,
                    stability: 0,
                    difficulty: 0,
                    review_history: []
                }
            },
            {
                exercise_id: "L25-WordBuilder-004",
                lesson_number: 25,
                exercise_type: "Word Builder",
                skill_focus: "Consonant Blend",
                data: {
                    word: "swim",
                    letters: [
                        "sw",
                        "i",
                        "m"
                    ],
                    image: "🏊"
                },
                response_type: "drag_and_drop",
                assets: {
                    audio: [
                        "sw.mp3",
                        "i.mp3",
                        "m.mp3",
                        "swim.mp3"
                    ]
                },
                srs_data: {
                    due_date: null,
                    stability: 0,
                    difficulty: 0,
                    review_history: []
                }
            },
            {
                exercise_id: "L25-WordBuilder-005",
                lesson_number: 25,
                exercise_type: "Word Builder",
                skill_focus: "Consonant Blend",
                data: {
                    word: "spin",
                    letters: [
                        "sp",
                        "i",
                        "n"
                    ],
                    image: "🌀"
                },
                response_type: "drag_and_drop",
                assets: {
                    audio: [
                        "sp.mp3",
                        "i.mp3",
                        "n.mp3",
                        "spin.mp3"
                    ]
                },
                srs_data: {
                    due_date: null,
                    stability: 0,
                    difficulty: 0,
                    review_history: []
                }
            }
        ],
        story: {
            title: "Skip and swim",
            text: "Skip into the swim. Stop and snap. I could spin."
        }
    },
    {
        lesson_number: 26,
        phase: 3,
        title: "Digraph sh",
        description: "Identify the /sh/ sound at the start of words.",
        new_graphemes: [
            "sh"
        ],
        exercises: [
            {
                exercise_id: "L26-SoundSearch-001",
                lesson_number: 26,
                exercise_type: "Sound Search",
                skill_focus: "Blend the /sh/ digraph with word endings.",
                data: {
                    image: "🚢",
                    word: "ship",
                    wordWithBlank: "__ip",
                    prompt: "What sound starts ship?",
                    choicePrompt: "Tap the correct digraph",
                    choices: [
                        {
                            label: "sh",
                            isCorrect: true
                        },
                        {
                            label: "ch",
                            isCorrect: false
                        },
                        {
                            label: "th",
                            isCorrect: false
                        }
                    ]
                },
                response_type: "tap_choice",
                assets: {
                    audio: [],
                    images: []
                },
                srs_data: {
                    due_date: null,
                    stability: 0,
                    difficulty: 0,
                    review_history: []
                }
            }
        ],
        story: {
            title: "Ship on a Shelf",
            text: "Tim's mom set a gift box on a shelf in a shed. It had a fast ship in it. His mom had his dad get it at a shop."
        }
    }
];
}),
"[project]/web/lib/hooks/useResponsiveLayout.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "useResponsiveLayout",
    ()=>useResponsiveLayout
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/web/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
'use client';
;
// Base dimensions for scaling (using a standard iPad as reference for "1.0" scale in landscape)
const BASE_WIDTH = 1024;
const BASE_HEIGHT = 768;
function useWindowSize() {
    const [windowSize, setWindowSize] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])({
        width: ("TURBOPACK compile-time falsy", 0) ? "TURBOPACK unreachable" : 0,
        height: ("TURBOPACK compile-time falsy", 0) ? "TURBOPACK unreachable" : 0
    });
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        if ("TURBOPACK compile-time truthy", 1) return;
        //TURBOPACK unreachable
        ;
        function handleResize() {
            setWindowSize({
                width: window.innerWidth,
                height: window.innerHeight
            });
        }
    }, []);
    return windowSize;
}
const useResponsiveLayout = ()=>{
    const { width, height } = useWindowSize();
    // Web is almost always "safe" except for mobile browser chrome which window size accounts for.
    // We assume full window availability.
    const isLandscape = width > height;
    // Effective usable area
    const safeWidth = width;
    const safeHeight = height;
    // Calculate scale factor based on the smaller dimension (height in landscape)
    const scaleRef = isLandscape ? safeHeight / BASE_HEIGHT : safeWidth / BASE_WIDTH;
    const isPhone = isLandscape ? safeHeight < 600 : safeWidth < 600;
    const scaleFactor = isPhone ? Math.max(scaleRef * 1.2, 0.6) : Math.min(Math.max(scaleRef, 0.7), 1.2);
    return {
        // Dimensions
        width,
        height,
        safeWidth,
        safeHeight,
        isLandscape,
        isPhone,
        // Standard Element Sizes
        tileSize: Math.round(120 * scaleFactor),
        cardSize: Math.round(300 * scaleFactor),
        buttonSize: Math.round(80 * scaleFactor),
        iconSize: Math.round(48 * scaleFactor),
        // Layout
        spacing: Math.round(24 * scaleFactor),
        gutter: Math.round(32 * scaleFactor),
        // Typography
        fontSize: {
            small: Math.round(16 * scaleFactor),
            medium: Math.round(24 * scaleFactor),
            large: Math.round(32 * scaleFactor),
            xl: Math.round(48 * scaleFactor),
            xxl: Math.round(64 * scaleFactor)
        },
        // Game Specific
        soundSlide: {
            trackWidth: isLandscape ? safeWidth * 0.6 : safeWidth * 0.8,
            startOffset: isLandscape ? safeWidth * 0.1 : 0
        }
    };
};
}),
"[project]/web/lib/utils/audio.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "getStretchedWord",
    ()=>getStretchedWord,
    "playAudio",
    ()=>playAudio,
    "speakText",
    ()=>speakText,
    "stopSpeaking",
    ()=>stopSpeaking,
    "textToPhoneme",
    ()=>textToPhoneme
]);
'use client';
// Web Audio Utility using Server-Side Piper TTS
let currentAudio = null;
const PHONEME_MAP = {
    "a": "aaa",
    "b": "buh",
    "c": "kuh",
    "d": "duh",
    "e": "eh",
    "f": "fuh",
    "g": "guh",
    "h": "huh",
    "i": "ih",
    "j": "juh",
    "k": "kuh",
    "l": "luh",
    "m": "muh",
    "n": "nuh",
    "o": "ah",
    "p": "puh",
    "q": "kuh",
    "r": "ruh",
    "s": "suh",
    "t": "tuh",
    "u": "uh",
    "v": "vuh",
    "w": "wuh",
    "x": "ks",
    "y": "yuh",
    "z": "zuh",
    "sh": "shh",
    "ch": "chh",
    "th": "thh",
    "wh": "whh",
    "ng": "ng",
    "ck": "kuh",
    "qu": "kwuh",
    "ff": "fuh",
    "ll": "luh",
    "ss": "suh",
    "bl": "bluh",
    "cl": "kluh",
    "fl": "fluh",
    "pl": "pluh",
    "sl": "sluh",
    "gl": "gluh",
    "br": "bruh",
    "cr": "kruh",
    "dr": "druh",
    "fr": "fruh",
    "gr": "gruh",
    "pr": "pruh",
    "tr": "truh",
    "sc": "skuh",
    "sk": "skuh",
    "sm": "smuh",
    "sn": "snuh",
    "sp": "spuh",
    "st": "stuh",
    "sw": "swuh"
};
function textToPhoneme(text) {
    const lower = text.toLowerCase().trim();
    return PHONEME_MAP[lower] || text;
}
async function speakText(text, options) {
    // Convert rate (speed) to Piper's length_scale (slowness)
    // rate 1.0 -> length_scale 1.0
    // rate 0.5 -> length_scale 2.0 (2x slower)
    // rate 0.1 -> length_scale 10.0 (10x slower)
    const rate = options?.rate || 1.0;
    const lengthScale = Math.max(0.1, 1 / rate).toFixed(2); // Ensure valid scale
    const shouldInterrupt = options?.interrupt ?? true;
    if (shouldInterrupt) {
        stopSpeaking();
    }
    const textToSpeak = options?.usePhoneme ? textToPhoneme(text) : text;
    // Call API
    const url = `/api/tts?text=${encodeURIComponent(textToSpeak)}&speed=${lengthScale}`;
    return new Promise((resolve)=>{
        const audio = new Audio(url);
        // If interrupting, set as current
        if (shouldInterrupt) {
            currentAudio = audio;
        }
        audio.onended = ()=>{
            if (currentAudio === audio) currentAudio = null;
            resolve();
        };
        audio.onerror = (e)=>{
            console.error("Audio playback error:", e);
            resolve();
        };
        audio.play().catch((e)=>{
            console.warn("Autoplay blocked or network error:", e);
            resolve();
        });
    });
}
function stopSpeaking() {
    if (currentAudio) {
        currentAudio.pause();
        currentAudio = null;
    }
    // Also cancel synthesis just in case legacy code used it
    if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
    ;
}
function getStretchedWord(word) {
    // Legacy helper - mostly unused with Piper's native stretching
    return word;
}
function playAudio(src) {
    stopSpeaking();
    return new Promise((resolve, reject)=>{
        const audio = new Audio(src);
        currentAudio = audio;
        audio.onended = ()=>{
            currentAudio = null;
            resolve();
        };
        audio.onerror = (e)=>reject(e);
        audio.play().catch(reject);
    });
}
}),
"[project]/web/app/games/sound-slide/page.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>SoundSlideGame
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/web/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/web/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/web/node_modules/next/navigation.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/web/node_modules/framer-motion/dist/es/render/components/motion/proxy.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$animation$2f$hooks$2f$use$2d$animation$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/web/node_modules/framer-motion/dist/es/animation/hooks/use-animation.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$components$2f$GameLayout$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/web/components/GameLayout.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$lib$2f$theme$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/web/lib/theme.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$lib$2f$data$2f$curriculum$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/web/lib/data/curriculum.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$lib$2f$hooks$2f$useResponsiveLayout$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/web/lib/hooks/useResponsiveLayout.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$lib$2f$utils$2f$audio$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/web/lib/utils/audio.ts [app-ssr] (ecmascript)");
'use client';
;
;
;
;
;
;
;
;
;
function SoundSlideGame() {
    const router = (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRouter"])();
    const searchParams = (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useSearchParams"])();
    const lessonNumber = parseInt(searchParams.get('lesson') || '4');
    const exerciseIndex = parseInt(searchParams.get('exercise') || '0');
    const layout = (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$lib$2f$hooks$2f$useResponsiveLayout$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useResponsiveLayout"])();
    const { isLandscape } = layout;
    const lesson = __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$lib$2f$data$2f$curriculum$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["SAMPLE_LESSONS"].find((l)=>l.lesson_number === lessonNumber);
    const exercise = lesson?.exercises[exerciseIndex];
    const exerciseData = exercise?.data;
    const [stage, setStage] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])("drag");
    const [showFeedback, setShowFeedback] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const [mounted, setMounted] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const [started, setStarted] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const audioLoopRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(true);
    const controls = (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$animation$2f$hooks$2f$use$2d$animation$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useAnimationControls"])();
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        setMounted(true);
    }, []);
    // Dimensions
    const tileSize = layout.tileSize;
    // Track width logic: The track length should be enough to separate onset and rime.
    // If we align onset left and rime right, the travel distance is width - tileSize.
    // framer-motion drag="x" with constraints makes 0 the start.
    const containerWidth = layout.soundSlide.trackWidth + tileSize;
    const dragDistance = layout.soundSlide.trackWidth;
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        if (!exerciseData || !started) return;
        audioLoopRef.current = true;
        setStage("drag");
        setShowFeedback(false);
        controls.set({
            x: 0
        }); // Reset position
        const playLoop = async ()=>{
            await new Promise((resolve)=>setTimeout(resolve, 500));
            while(audioLoopRef.current){
                // "kuh at" phrase logic - matching RN fix
                const phrase = (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$lib$2f$utils$2f$audio$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["textToPhoneme"])(exerciseData.onset) + " " + exerciseData.rime;
                await (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$lib$2f$utils$2f$audio$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["speakText"])(phrase, {
                    rate: 0.4,
                    usePhoneme: false
                });
                if (!audioLoopRef.current) break;
                await new Promise((resolve)=>setTimeout(resolve, 2500));
            }
        };
        playLoop();
        return ()=>{
            audioLoopRef.current = false;
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$lib$2f$utils$2f$audio$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["stopSpeaking"])();
        };
    }, [
        exerciseIndex,
        exerciseData,
        controls,
        started
    ]);
    const handleSuccess = ()=>{
        setStage("merged");
        audioLoopRef.current = false;
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$lib$2f$utils$2f$audio$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["stopSpeaking"])();
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$lib$2f$utils$2f$audio$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["speakText"])(exerciseData?.word || "");
        setShowFeedback(true);
        setTimeout(()=>{
            const nextExerciseIndex = exerciseIndex + 1;
            if (lesson && nextExerciseIndex < lesson.exercises.length) {
                // Navigate to next exercise
                router.replace(`/games/sound-slide?lesson=${lessonNumber}&exercise=${nextExerciseIndex}`);
            } else {
                router.back();
            }
        }, 2500);
    };
    const handleDragEnd = (event, info)=>{
        // info.offset.x gives the distance dragged from start
        const currentX = info.offset.x;
        const threshold = dragDistance * 0.7;
        if (currentX > threshold) {
            // Snap to end
            controls.start({
                x: dragDistance
            }).then(()=>{
                handleSuccess();
            });
        } else {
            // Snap back
            controls.start({
                x: 0
            });
        }
    };
    if (!mounted || !exerciseData) return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "flex items-center justify-center h-screen",
        children: "Loading..."
    }, void 0, false, {
        fileName: "[project]/web/app/games/sound-slide/page.tsx",
        lineNumber: 108,
        columnNumber: 41
    }, this);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$web$2f$components$2f$GameLayout$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["GameLayout"], {
        instruction: "Slide the sounds together",
        progress: `Exercise ${exerciseIndex + 1} of ${lesson?.exercises.length || 0}`,
        primaryColor: __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$lib$2f$theme$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["COLORS"].soundSlide.primary,
        backgroundColor: __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$lib$2f$theme$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["COLORS"].soundSlide.background,
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "relative flex items-center justify-center w-full h-full",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "relative flex items-center",
                    style: {
                        width: containerWidth,
                        height: tileSize
                    },
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "absolute left-0 h-4 bg-black/5 rounded-full",
                            style: {
                                width: containerWidth,
                                top: '50%',
                                marginTop: -8
                            }
                        }, void 0, false, {
                            fileName: "[project]/web/app/games/sound-slide/page.tsx",
                            lineNumber: 124,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "absolute right-0 flex items-center justify-center rounded-full shadow-md text-white font-bold select-none",
                            style: {
                                width: tileSize,
                                height: tileSize,
                                backgroundColor: __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$lib$2f$theme$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["COLORS"].soundSlide.primary,
                                fontSize: tileSize * 0.4,
                                zIndex: 1
                            },
                            children: exerciseData.rime
                        }, void 0, false, {
                            fileName: "[project]/web/app/games/sound-slide/page.tsx",
                            lineNumber: 130,
                            columnNumber: 13
                        }, this),
                        stage === 'drag' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["motion"].div, {
                            drag: "x",
                            dragConstraints: {
                                left: 0,
                                right: dragDistance
                            },
                            dragElastic: 0.1,
                            dragMomentum: false,
                            animate: controls,
                            onDragEnd: handleDragEnd,
                            className: "absolute left-0 flex items-center justify-center rounded-full shadow-xl text-white font-bold cursor-grab active:cursor-grabbing select-none z-10",
                            style: {
                                width: tileSize,
                                height: tileSize,
                                backgroundColor: __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$lib$2f$theme$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["COLORS"].soundSlide.accent,
                                fontSize: tileSize * 0.4
                            },
                            children: exerciseData.onset
                        }, void 0, false, {
                            fileName: "[project]/web/app/games/sound-slide/page.tsx",
                            lineNumber: 145,
                            columnNumber: 17
                        }, this),
                        stage === 'merged' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["motion"].div, {
                            initial: {
                                scale: 0.8,
                                opacity: 0
                            },
                            animate: {
                                scale: 1,
                                opacity: 1
                            },
                            className: "absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center justify-center bg-white rounded-3xl shadow-2xl z-20 border-4",
                            style: {
                                padding: tileSize * 0.3,
                                borderColor: __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$lib$2f$theme$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["COLORS"].soundSlide.primary,
                                minWidth: tileSize * 2.5
                            },
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    style: {
                                        fontSize: tileSize * 0.8
                                    },
                                    children: exerciseData.image
                                }, void 0, false, {
                                    fileName: "[project]/web/app/games/sound-slide/page.tsx",
                                    lineNumber: 176,
                                    columnNumber: 21
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "mt-2 font-bold text-gray-800",
                                    style: {
                                        fontSize: tileSize * 0.4
                                    },
                                    children: exerciseData.word
                                }, void 0, false, {
                                    fileName: "[project]/web/app/games/sound-slide/page.tsx",
                                    lineNumber: 177,
                                    columnNumber: 21
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/web/app/games/sound-slide/page.tsx",
                            lineNumber: 166,
                            columnNumber: 17
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/web/app/games/sound-slide/page.tsx",
                    lineNumber: 119,
                    columnNumber: 9
                }, this),
                showFeedback && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "absolute bottom-10 bg-green-500 text-white px-8 py-3 rounded-full text-2xl font-bold shadow-lg animate-bounce",
                    children: "Excellent!"
                }, void 0, false, {
                    fileName: "[project]/web/app/games/sound-slide/page.tsx",
                    lineNumber: 185,
                    columnNumber: 13
                }, this),
                !started && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "absolute inset-0 bg-black/40 flex items-center justify-center z-50 cursor-pointer backdrop-blur-sm",
                    onClick: ()=>setStarted(true),
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "bg-white px-8 py-6 rounded-2xl shadow-2xl flex flex-col items-center animate-pulse",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "text-4xl mb-2",
                                children: "▶️"
                            }, void 0, false, {
                                fileName: "[project]/web/app/games/sound-slide/page.tsx",
                                lineNumber: 196,
                                columnNumber: 21
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "text-2xl font-bold text-gray-800",
                                children: "Tap to Start"
                            }, void 0, false, {
                                fileName: "[project]/web/app/games/sound-slide/page.tsx",
                                lineNumber: 197,
                                columnNumber: 21
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/web/app/games/sound-slide/page.tsx",
                        lineNumber: 195,
                        columnNumber: 17
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/web/app/games/sound-slide/page.tsx",
                    lineNumber: 191,
                    columnNumber: 13
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/web/app/games/sound-slide/page.tsx",
            lineNumber: 117,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/web/app/games/sound-slide/page.tsx",
        lineNumber: 111,
        columnNumber: 5
    }, this);
}
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__7ce53004._.js.map