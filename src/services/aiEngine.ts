// import { initSDK, ModelManager } from "../runanywhere";
// import { TextGeneration } from "@runanywhere/web-llamacpp";

// type Expense = {
//     date: string;
//     category: string;
//     amount: number;
// };

// type Profile = {
//     income: number;
//     fixedExpenses: number;
//     savingTarget: number;
// };

// let modelLoaded = false;

// export async function generateInsight(
//     profile: Profile,
//     dailyExpenses: Expense[]
// ): Promise<string> {

//     await initSDK();

//     if (!modelLoaded) {
//         await ModelManager.loadModel("lfm2-350m-q4_k_m");
//         modelLoaded = true;
//     }

//     const totalSpent = dailyExpenses.reduce(
//         (sum, e) => sum + e.amount,
//         0
//     );

//     const usable =
//         profile.income - (profile.fixedExpenses + profile.savingTarget);

//     const remaining = usable - totalSpent;


//     const prompt = `
// You are an intelligent offline financial advisor.

// Analyze the user's finances and respond in this EXACT format:

// PERSONALITY:
// (2 short sentences only)

// RISK:
// (1 short paragraph)

// TOP SPENDING CATEGORY:
// (mention only one category)

// SUGGESTION:
// (1 clear and practical action step)

// Rules:
// - Keep total response under 120 words
// - Use simple, professional language
// - No markdown symbols
// - No emojis
// - No long paragraphs
// - No repetition

// Financial Data:
// Income: ₹${profile.income}
// Fixed Expenses: ₹${profile.fixedExpenses}
// Savings Goal: ₹${profile.savingTarget}
// Usable Budget: ₹${usable}
// Total Spent So Far: ₹${totalSpent}
// Remaining Balance: ₹${remaining}

// Daily Expenses:
// ${dailyExpenses
//             .map((e) => `${e.date} - ${e.category}: ₹${e.amount}`)
//             .join("\n")}
// `;

//     //     const prompt = `
//     // You are an intelligent offline financial AI.

//     // Income: ₹${profile.income}
//     // Fixed Expenses: ₹${profile.fixedExpenses}
//     // Savings Goal: ₹${profile.savingTarget}
//     // Usable Budget: ₹${usable}
//     // Total Spent So Far: ₹${totalSpent}
//     // Remaining Balance: ₹${remaining}

//     // Daily Expenses:
//     // ${dailyExpenses
//     //             .map((e) => `${e.date} - ${e.category}: ₹${e.amount}`)
//     //             .join("\n")}

//     // Instructions:
//     // 1. Give short financial personality insight.
//     // 2. Warn if spending trend is risky.
//     // 3. Mention category where overspending is highest.
//     // 4. Give one actionable suggestion.
//     // Keep response short and practical.
//     // `;

//     const { result } = await TextGeneration.generateStream(prompt, {
//         maxTokens: 250,
//         temperature: 0.7,
//     });

//     const final = await result;

//     return final.text;
// }

//UPAR WALA CODE KAAM KAR RAHA HAI 

// import { initSDK, ModelManager } from "../runanywhere";
// import { TextGeneration } from "@runanywhere/web-llamacpp";

// type Expense = {
//     date: string;
//     category: string;
//     amount: number;
// };

// type Profile = {
//     income: number;
//     expenses: number;
//     savings: number;
//     dailyExpenses: Expense[];
// };

// let modelLoaded = false;

// export async function generateInsight(profile: Profile): Promise<string> {
//     await initSDK();

//     // ✅ Ensure LLM model is loaded
//     if (!modelLoaded) {
//         await ModelManager.loadModel("lfm2-350m-q4_k_m");
//         modelLoaded = true;
//     }

//     const totalSpent = profile.dailyExpenses.reduce(
//         (sum: number, e: Expense) => sum + e.amount,
//         0
//     );

//     const prompt = `
// You are a smart financial AI assistant.

// Income: ₹${profile.income}
// Fixed Expenses: ₹${profile.expenses}
// Savings Goal: ₹${profile.savings}
// Total Spent: ₹${totalSpent}

// Daily Expenses:
// ${profile.dailyExpenses
//             .map((e: Expense) => `${e.date} - ${e.category}: ₹${e.amount}`)
//             .join("\n")}

// Give:
// 1. Short financial insight
// 2. Spending warning if overspending
// 3. One improvement suggestion
// Keep response short and practical.
// `;

//     const { result } = await TextGeneration.generateStream(prompt, {
//         maxTokens: 200,
//         temperature: 0.7,
//     });

//     const final = await result;

//     return final.text;
// }

//NICHE JYADA ACHA RESPONSE WALA HAI 

// import { initSDK, ModelManager } from "../runanywhere";
// import { TextGeneration } from "@runanywhere/web-llamacpp";

// type Expense = {
//     date: string;
//     category: string;
//     amount: number;
// };

// type Profile = {
//     income: number;
//     fixedExpenses: number;
//     savingTarget: number;
// };

// let modelLoaded = false;

// export async function generateInsight(
//     profile: Profile,
//     dailyExpenses: Expense[]
// ): Promise<string> {
//     await initSDK();

//     // Load model only once
//     if (!modelLoaded) {
//         await ModelManager.loadModel("lfm2-350m-q4_k_m");
//         modelLoaded = true;
//     }

//     const totalSpent = dailyExpenses.reduce(
//         (sum, e) => sum + e.amount,
//         0
//     );

//     const usable =
//         profile.income - (profile.fixedExpenses + profile.savingTarget);

//     const remaining = usable - totalSpent;

//     // Cleaner, stricter prompt for small model
//     const prompt = `
// You are a professional financial advisor.

// Write a clear and simple financial analysis.

// Follow this EXACT format:

// PERSONALITY:
// Write 2 short simple sentences.

// RISK:
// Write 1 short clear paragraph.

// TOP CATEGORY:
// Write only one category name.

// SUGGESTION:
// Write 1 short practical action sentence.

// Rules:
// - Use very simple English.
// - No emojis.
// - No markdown.
// - No numbering.
// - No special symbols.
// - Keep response under 100 words.
// - Do not repeat numbers unnecessarily.

// User Financial Data:
// Income: INR ${profile.income}
// Fixed Expenses: INR ${profile.fixedExpenses}
// Savings Goal: INR ${profile.savingTarget}
// Usable Budget: INR ${usable}
// Total Spent: INR ${totalSpent}
// Remaining Balance: INR ${remaining}
// `;

//     const { result } = await TextGeneration.generateStream(prompt, {
//         maxTokens: 180,
//         temperature: 0.4, // lower = more stable output
//     });

//     const final = await result;

//     // ---- Clean Output ----
//     let cleanText = final.text;

//     // Remove non-ASCII characters (fix square boxes issue)
//     cleanText = cleanText.replace(/[^\x00-\x7F]/g, "");

//     // Remove extra spaces
//     cleanText = cleanText.replace(/\s+/g, " ").trim();

//     // Restore proper line breaks after section titles
//     cleanText = cleanText
//         .replace("PERSONALITY:", "\nPERSONALITY:\n")
//         .replace("RISK:", "\nRISK:\n")
//         .replace("TOP CATEGORY:", "\nTOP CATEGORY:\n")
//         .replace("SUGGESTION:", "\nSUGGESTION:\n");

//     return cleanText.trim();
// }

import { initSDK, ModelManager } from "../runanywhere";
import { TextGeneration } from "@runanywhere/web-llamacpp";

type Expense = {
    date: string;
    category: string;
    amount: number;
};

type Profile = {
    income: number;
    fixedExpenses: number;
    savingTarget: number;
};

let modelLoaded = false;

export async function generateInsight(
    profile: Profile,
    dailyExpenses: Expense[]
): Promise<string> {
    await initSDK();

    if (!modelLoaded) {
        await ModelManager.loadModel("lfm2-350m-q4_k_m");
        modelLoaded = true;
    }

    // ---------- BASIC CALCULATIONS ----------
    const totalSpent = dailyExpenses.reduce(
        (sum, e) => sum + e.amount,
        0
    );

    const usable =
        profile.income - (profile.fixedExpenses + profile.savingTarget);

    const remaining = usable - totalSpent;

    // ---------- FIND TOP CATEGORY ----------
    const categoryMap: Record<string, number> = {};

    dailyExpenses.forEach((e) => {
        categoryMap[e.category] =
            (categoryMap[e.category] || 0) + e.amount;
    });

    let topCategory = "None";

    if (dailyExpenses.length > 0) {
        topCategory = Object.keys(categoryMap).reduce((a, b) =>
            categoryMap[a] > categoryMap[b] ? a : b
        );
    }

    // ---------- DETERMINE RISK ----------
    let riskLevel = "Low";

    if (remaining < 0) {
        riskLevel = "High";
    } else if (remaining < usable * 0.2) {
        riskLevel = "Moderate";
    }

    // ---------- SIMPLIFIED PROMPT ----------
    // We let AI only write nicely — no complex formatting

    const prompt = `
Write a short financial advice message in simple English.

Financial Summary:
Income: ${profile.income}
Usable Budget: ${usable}
Total Spent: ${totalSpent}
Remaining: ${remaining}
Risk Level: ${riskLevel}
Highest Spending Category: ${topCategory}

Rules:
- 4 to 6 short sentences.
- Clear and practical.
- Supportive tone.
- No headings.
- No special symbols.
`;

    const { result } = await TextGeneration.generateStream(prompt, {
        maxTokens: 150,
        temperature: 0.3,
    });

    const final = await result;

    // ---------- CLEAN OUTPUT ----------
    let cleanText = final.text;

    // Remove weird characters
    cleanText = cleanText.replace(/[^\x00-\x7F]/g, "");

    // Clean spacing
    cleanText = cleanText.replace(/\s+/g, " ").trim();

    return cleanText;
}