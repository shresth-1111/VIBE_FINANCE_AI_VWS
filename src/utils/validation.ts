import { UserProfile, Expense } from "./storage";
import {
    calculateInitialUsable,
    calculateRemaining,
} from "../services/financeService";

/* ================= SETUP VALIDATION ================= */

/* Check if fixed + saving exceeds income */
export function isSetupValid(profile: UserProfile): boolean {
    return profile.fixedExpenses + profile.savingTarget <= profile.income;
}

/* ================= DASHBOARD VALIDATION ================= */

/* Check if expense is allowed */
export function isExpenseAllowed(
    profile: UserProfile,
    expenses: Expense[],
    newAmount: number
): boolean {
    const remaining = calculateRemaining(profile, expenses);
    return newAmount <= remaining && newAmount > 0;
}

/* Check if user already exists */
export function userExists(profile: UserProfile | null): boolean {
    return profile !== null;
}