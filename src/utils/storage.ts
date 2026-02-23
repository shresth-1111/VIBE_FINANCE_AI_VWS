// ===== STORAGE HANDLER =====

const PROFILE_KEY = "vibe_user_profile";
const EXPENSE_KEY = "vibe_expenses";
const SETUP_DATE_KEY = "vibe_setup_date";

/* ================= PROFILE ================= */

export interface UserProfile {
    name: string;
    category: string;
    income: number;
    fixedExpenses: number;
    savingTarget: number;
    behavior: string;
}

/* Save Profile */
export function saveProfile(profile: UserProfile) {
    localStorage.setItem(PROFILE_KEY, JSON.stringify(profile));
    localStorage.setItem(SETUP_DATE_KEY, new Date().toISOString());
}

/* Get Profile */
export function getProfile(): UserProfile | null {
    const data = localStorage.getItem(PROFILE_KEY);
    return data ? JSON.parse(data) : null;
}

/* Clear Profile */
export function clearProfile() {
    localStorage.removeItem(PROFILE_KEY);
    localStorage.removeItem(EXPENSE_KEY);
    localStorage.removeItem(SETUP_DATE_KEY);
}

/* ================= EXPENSES ================= */

export interface Expense {
    id: string;
    amount: number;
    date: string;
    category: string;
}

export function saveExpenses(expenses: Expense[]) {
    localStorage.setItem(EXPENSE_KEY, JSON.stringify(expenses));
}

export function getExpenses(): Expense[] {
    const data = localStorage.getItem(EXPENSE_KEY);
    return data ? JSON.parse(data) : [];
}

/* ================= EXPIRY CHECK ================= */

export function isExpired(): boolean {
    const date = localStorage.getItem(SETUP_DATE_KEY);
    if (!date) return false;

    const setupDate = new Date(date);
    const now = new Date();

    const diffDays =
        (now.getTime() - setupDate.getTime()) / (1000 * 60 * 60 * 24);

    return diffDays >= 30;
}