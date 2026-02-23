import { UserProfile, Expense } from "../utils/storage";

/* ================= CORE CALCULATIONS ================= */

/* Initial usable amount */
export function calculateInitialUsable(profile: UserProfile): number {
    return profile.income - (profile.fixedExpenses + profile.savingTarget);
}

/* Total dynamic expenses */
export function calculateTotalExpenses(expenses: Expense[]): number {
    return expenses.reduce((total, exp) => total + exp.amount, 0);
}

/* Remaining balance */
export function calculateRemaining(
    profile: UserProfile,
    expenses: Expense[]
): number {
    const initial = calculateInitialUsable(profile);
    const spent = calculateTotalExpenses(expenses);
    return initial - spent;
}

/* Progress percentage for filler */
export function calculateProgressPercentage(
    profile: UserProfile,
    expenses: Expense[]
): number {
    const initial = calculateInitialUsable(profile);
    if (initial <= 0) return 0;

    const remaining = calculateRemaining(profile, expenses);
    return Math.max((remaining / initial) * 100, 0);
}