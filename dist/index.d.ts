interface DeepCleanOptions {
    removeNull?: boolean;
    removeUndefined?: boolean;
    cleanEmptyString?: boolean;
    cleanZero?: boolean;
}

/**
 * Recursively remove null/undefined/empty strings/zeros/objects/arrays
 * Handles circular references safely using a WeakMap.
 */
declare function deepClean<T>(value: T, options?: DeepCleanOptions, seen?: WeakMap<WeakKey, any>): T;

export { deepClean, deepClean as default };
