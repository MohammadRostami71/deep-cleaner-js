import type { DeepCleanOptions } from './types';

/** Check if value is a plain object */
function isPlainObject(value: unknown): value is Record<string | symbol, unknown> {
    return Object.prototype.toString.call(value) === '[object Object]';
}

/** Determine if value should be treated as atomic */
function isAtomicValue(value: unknown): boolean {
    return (
        typeof value !== 'object' ||
        value === null ||
        (!isPlainObject(value) && !Array.isArray(value)) ||
        ((value as any)?.type === 'Buffer' && Array.isArray((value as any)?.data))
    );
}

/**
 * Recursively remove null/undefined/empty strings/zeros/objects/arrays
 * Handles circular references safely using a WeakMap.
 */
export function deepClean<T>(value: T, options: DeepCleanOptions = {}, seen = new WeakMap()): T {
    const {
        removeNull = true,
        removeUndefined = true,
        cleanEmptyString = false,
        cleanZero = false,
    } = options;

    // Atomic values — handle directly
    if (isAtomicValue(value)) {
        if (value === null) return (removeNull ? undefined : value) as any;
        if (value === undefined) return (removeUndefined ? undefined : value) as any;
        if (cleanEmptyString && value === '') return undefined as any;
        if (cleanZero && value === 0) return undefined as any;
        return value;
    }

    // Prevent infinite recursion for circular references
    if (seen.has(value as any)) {
        return seen.get(value as any) as T;
    }

    // Handle arrays
    if (Array.isArray(value)) {
        const arr: any[] = [];
        seen.set(value as any, arr);

        for (const item of value) {
            const cleaned = deepClean(item, options, seen);

            if (removeNull && cleaned === null) continue;
            if (removeUndefined && cleaned === undefined) continue;
            if (cleanEmptyString && cleaned === '') continue;
            if (cleanZero && cleaned === 0) continue;
            if (Array.isArray(cleaned) && cleaned.length === 0) continue;
            if (isPlainObject(cleaned) && Object.keys(cleaned).length === 0) continue;

            arr.push(cleaned);
        }

        return arr as any;
    }

    // Handle plain objects
    const cleanedObj: Record<string | symbol, unknown> = {};
    seen.set(value as any, cleanedObj);

    const keys = [
        ...Object.keys(value as Record<string, unknown>),
        ...Object.getOwnPropertySymbols(value as object),
    ];

    for (const key of keys) {
        const val = (value as any)[key];
        const cleaned = deepClean(val, options, seen);

        if (removeNull && cleaned === null) continue;
        if (removeUndefined && cleaned === undefined) continue;
        if (cleanEmptyString && cleaned === '') continue;
        if (cleanZero && cleaned === 0) continue;
        if (Array.isArray(cleaned) && cleaned.length === 0) continue;
        if (isPlainObject(cleaned) && Object.keys(cleaned).length === 0) continue;

        cleanedObj[key] = cleaned;
    }

    return cleanedObj as T;
}

export default deepClean;

